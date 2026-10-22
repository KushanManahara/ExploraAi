# apps/api/src/exploraai_api/auth.py
# VERIFIES SUPABASE SIGN-IN TOKENS (JWTS) ON EVERY PROTECTED REQUEST.
# PLAN §4: "JWT VERIFIED ON EVERY REQUEST, PLUS RLS".
#
# RULES:
#   - ONLY ASYMMETRIC ALGORITHMS (ES256, RS256) WITH KEYS FROM THE PROJECT'S PUBLIC JWKS.
#     HS256 IS NEVER ACCEPTED: NO ALGORITHM-CONFUSION ATTACKS, AND THE API HOLDS NO JWT SECRET.
#   - ISSUER, AUDIENCE ("authenticated"), EXPIRY, ISSUED-AT AND SUBJECT ARE REQUIRED AND CHECKED.
#   - ONLY THE "authenticated" ROLE IS ALLOWED; ANON AND SERVICE-ROLE TOKENS ARE REJECTED.
#   - FAIL CLOSED: IF THE KEYS CAN'T BE FETCHED OR AUTH ISN'T CONFIGURED, THE REQUEST IS
#     REFUSED (503), NEVER ALLOWED.
#   - TOKENS ARE NEVER LOGGED.

import logging
from collections.abc import Callable
from dataclasses import dataclass
from typing import Annotated, Any
from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from exploraai_api.settings import AuthSettings

logger = logging.getLogger(__name__)

ALLOWED_ALGORITHMS = ("ES256", "RS256")
AUDIENCE = "authenticated"
REQUIRED_CLAIMS = ("exp", "iat", "iss", "aud", "sub")
# SMALL ALLOWANCE FOR CLOCK DIFFERENCES BETWEEN SUPABASE AND THE API HOST.
LEEWAY_SECONDS = 10
# KEEP FETCHED KEYS FOR 10 MINUTES. AN UNKNOWN KEY ID TRIGGERS A REFETCH, SO ROTATION STILL WORKS.
JWKS_CACHE_SECONDS = 600
JWKS_TIMEOUT_SECONDS = 5

# A KEY RESOLVER TURNS A RAW TOKEN INTO THE PUBLIC KEY THAT SHOULD HAVE SIGNED IT.
KeyResolver = Callable[[str], Any]


@dataclass(frozen=True, slots=True)
class AuthenticatedUser:
    user_id: UUID
    email: str | None


class InvalidTokenError(Exception):
    """THE TOKEN IS MISSING, MALFORMED, EXPIRED, OR NOT FOR THIS PROJECT. MAPS TO 401."""


class AuthUnavailableError(Exception):
    """THE TOKEN CAN'T BE CHECKED RIGHT NOW (E.G. KEYS UNREACHABLE). MAPS TO 503 (FAIL CLOSED)."""


def jwks_key_resolver(settings: AuthSettings) -> KeyResolver:
    client = jwt.PyJWKClient(
        settings.jwks_url,
        cache_jwk_set=True,
        lifespan=JWKS_CACHE_SECONDS,
        timeout=JWKS_TIMEOUT_SECONDS,
    )

    def resolve(token: str) -> Any:
        return client.get_signing_key_from_jwt(token).key

    return resolve


class TokenVerifier:
    def __init__(self, settings: AuthSettings, key_resolver: KeyResolver | None = None) -> None:
        self._issuer = settings.issuer
        self._resolve_key = key_resolver or jwks_key_resolver(settings)

    def verify(self, token: str) -> AuthenticatedUser:
        try:
            header = jwt.get_unverified_header(token)
        except jwt.PyJWTError as exc:
            raise InvalidTokenError("malformed token") from exc

        # CHECK THE ALGORITHM BEFORE LOOKING UP ANY KEY.
        if header.get("alg") not in ALLOWED_ALGORITHMS:
            raise InvalidTokenError("algorithm not allowed")

        try:
            key = self._resolve_key(token)
        except jwt.PyJWKClientConnectionError as exc:
            raise AuthUnavailableError("signing keys unreachable") from exc
        except jwt.PyJWKClientError as exc:
            # NO MATCHING KEY ID IN THE PROJECT'S JWKS: NOT SIGNED BY THIS PROJECT.
            raise InvalidTokenError("unknown signing key") from exc
        except jwt.PyJWTError as exc:
            raise InvalidTokenError("malformed token") from exc

        try:
            claims: dict[str, Any] = jwt.decode(
                token,
                key=key,
                algorithms=list(ALLOWED_ALGORITHMS),
                audience=AUDIENCE,
                issuer=self._issuer,
                leeway=LEEWAY_SECONDS,
                options={"require": list(REQUIRED_CLAIMS)},
            )
        except jwt.ExpiredSignatureError as exc:
            raise InvalidTokenError("token expired") from exc
        except jwt.PyJWTError as exc:
            raise InvalidTokenError("token rejected") from exc

        if claims.get("role") != AUDIENCE:
            raise InvalidTokenError("role not allowed")

        try:
            user_id = UUID(str(claims["sub"]))
        except ValueError as exc:
            raise InvalidTokenError("subject is not a user id") from exc

        email = claims.get("email")
        return AuthenticatedUser(user_id=user_id, email=email if isinstance(email, str) else None)


_bearer = HTTPBearer(auto_error=False)


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def current_user(
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> AuthenticatedUser:
    """FASTAPI DEPENDENCY FOR PROTECTED ROUTES.

    A PLAIN def, SO THE BLOCKING KEY FETCH RUNS IN THE THREAD POOL, NOT ON THE EVENT LOOP.
    """
    verifier: TokenVerifier | None = request.app.state.token_verifier
    if verifier is None:
        logger.error("auth_not_configured path=%s", request.url.path)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Sign-in is unavailable"
        )

    if credentials is None or credentials.scheme.lower() != "bearer" or not credentials.credentials:
        raise _unauthorized("Not signed in")

    try:
        return verifier.verify(credentials.credentials)
    except InvalidTokenError as exc:
        logger.info("auth_rejected reason=%s path=%s", exc, request.url.path)
        raise _unauthorized("Invalid or expired sign-in") from exc
    except AuthUnavailableError as exc:
        logger.warning("auth_unavailable reason=%s path=%s", exc, request.url.path)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Sign-in is unavailable"
        ) from exc


CurrentUser = Annotated[AuthenticatedUser, Depends(current_user)]
