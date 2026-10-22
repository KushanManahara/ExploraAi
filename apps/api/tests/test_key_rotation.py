# apps/api/tests/test_key_rotation.py
# KEY ROTATION, END TO END WITH THE REAL JWKS CLIENT. A LOCAL HTTP SERVER PLAYS THE JWKS URL.
# A NEWLY PUBLISHED SIGNING KEY MUST BE PICKED UP WITHOUT A RESTART, WHILE FORGED KEY IDS
# MUST NOT BE ABLE TO MAKE THE API HAMMER THE JWKS ENDPOINT.

import json
import threading
import time
from collections.abc import Iterator
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, ClassVar

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import ec
from jwt.algorithms import ECAlgorithm

from exploraai_api.auth import (
    AuthUnavailableError,
    InvalidTokenError,
    TokenVerifier,
    jwks_key_resolver,
)
from exploraai_api.settings import AuthSettings


def _jwk(key: ec.EllipticCurvePrivateKey, kid: str) -> dict[str, Any]:
    jwk: dict[str, Any] = json.loads(ECAlgorithm.to_jwk(key.public_key()))
    jwk.update({"kid": kid, "alg": "ES256", "use": "sig"})
    return jwk


class _JwksHandler(BaseHTTPRequestHandler):
    keys: ClassVar[list[dict[str, Any]]] = []
    hits: ClassVar[int] = 0

    def do_GET(self) -> None:
        type(self).hits += 1
        body = json.dumps({"keys": type(self).keys}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:
        return


@pytest.fixture
def jwks_server(monkeypatch: pytest.MonkeyPatch) -> Iterator[AuthSettings]:
    # THE TEST TALKS TO 127.0.0.1 DIRECTLY, NEVER THROUGH AN HTTP PROXY FROM THE ENVIRONMENT.
    monkeypatch.setenv("NO_PROXY", "127.0.0.1,localhost")
    monkeypatch.setenv("no_proxy", "127.0.0.1,localhost")
    _JwksHandler.keys = []
    _JwksHandler.hits = 0
    server = ThreadingHTTPServer(("127.0.0.1", 0), _JwksHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    # JWKS URL = {supabase_url}/auth/v1/.well-known/jwks.json; THE HANDLER ANSWERS ANY PATH.
    yield AuthSettings(supabase_url=f"http://127.0.0.1:{server.server_port}")
    server.shutdown()
    server.server_close()


def _token(settings: AuthSettings, key: ec.EllipticCurvePrivateKey, kid: str) -> str:
    now = int(time.time())
    claims = {
        "iss": settings.issuer,
        "aud": "authenticated",
        "sub": "00000000-0000-0000-0000-0000000000aa",
        "role": "authenticated",
        "iat": now,
        "exp": now + 300,
    }
    return jwt.encode(claims, key, algorithm="ES256", headers={"kid": kid})


def test_new_signing_key_is_picked_up_without_restart(jwks_server: AuthSettings) -> None:
    old_key = ec.generate_private_key(ec.SECP256R1())
    new_key = ec.generate_private_key(ec.SECP256R1())
    _JwksHandler.keys = [_jwk(old_key, "old")]
    # COOLDOWN 0 STANDS IN FOR "MORE THAN 30 SECONDS SINCE THE LAST FETCH".
    verifier = TokenVerifier(
        jwks_server, jwks_key_resolver(jwks_server, refresh_cooldown_seconds=0)
    )

    assert verifier.verify(_token(jwks_server, old_key, "old")).email is None

    # SUPABASE ROTATES: THE NEW KEY IS PUBLISHED. AN UNKNOWN KEY ID FORCES A REFETCH.
    _JwksHandler.keys = [_jwk(new_key, "new"), _jwk(old_key, "old")]
    assert verifier.verify(_token(jwks_server, new_key, "new")) is not None
    assert _JwksHandler.hits >= 2


def test_forged_key_ids_cannot_flood_the_jwks_endpoint(jwks_server: AuthSettings) -> None:
    key = ec.generate_private_key(ec.SECP256R1())
    rogue = ec.generate_private_key(ec.SECP256R1())
    _JwksHandler.keys = [_jwk(key, "real")]
    verifier = TokenVerifier(jwks_server)  # DEFAULT 30-SECOND COOLDOWN
    verifier.verify(_token(jwks_server, key, "real"))
    for i in range(20):
        with pytest.raises(InvalidTokenError):
            verifier.verify(_token(jwks_server, rogue, f"forged-{i}"))
    # ONE INITIAL FETCH ONLY: NONE OF THE 20 FORGED KEY IDS TRIGGERED ANOTHER REQUEST.
    assert _JwksHandler.hits == 1


def test_token_with_unpublished_key_is_rejected(jwks_server: AuthSettings) -> None:
    key = ec.generate_private_key(ec.SECP256R1())
    rogue = ec.generate_private_key(ec.SECP256R1())
    _JwksHandler.keys = [_jwk(key, "real")]
    verifier = TokenVerifier(jwks_server)
    with pytest.raises(InvalidTokenError):
        verifier.verify(_token(jwks_server, rogue, "rogue"))
    # A FORGED TOKEN THAT REUSES THE REAL KEY ID FAILS THE SIGNATURE CHECK.
    with pytest.raises(InvalidTokenError):
        verifier.verify(_token(jwks_server, rogue, "real"))


def test_unreachable_jwks_fails_closed() -> None:
    # NOTHING LISTENS ON THIS PORT.
    settings = AuthSettings(supabase_url="http://127.0.0.1:9")
    key = ec.generate_private_key(ec.SECP256R1())
    with pytest.raises(AuthUnavailableError):
        TokenVerifier(settings).verify(_token(settings, key, "any"))
