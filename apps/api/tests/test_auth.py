# apps/api/tests/test_auth.py
# SIGN-IN TOKEN CHECKS: ONLY VALID, UNEXPIRED, PROJECT-SIGNED TOKENS OF SIGNED-IN USERS GET THROUGH.
# KEYS ARE GENERATED PER TEST RUN; NOTHING HERE TALKS TO THE NETWORK.

import time
from collections.abc import Callable
from typing import Any
from uuid import uuid4

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import ec
from fastapi.testclient import TestClient

from exploraai_api.auth import TokenVerifier
from exploraai_api.main import create_app
from exploraai_api.settings import AuthSettings, load_auth_settings

SETTINGS = AuthSettings(supabase_url="https://example-ref.supabase.co")
ISSUER = "https://example-ref.supabase.co/auth/v1"
HMAC_KEY = "shared-secret-of-adequate-length-xx"
SIGNING_KEY = ec.generate_private_key(ec.SECP256R1())
OTHER_KEY = ec.generate_private_key(ec.SECP256R1())
USER_ID = str(uuid4())


def _claims(**overrides: Any) -> dict[str, Any]:
    now = int(time.time())
    claims: dict[str, Any] = {
        "iss": ISSUER,
        "aud": "authenticated",
        "sub": USER_ID,
        "role": "authenticated",
        "email": "user@example.test",
        "iat": now,
        "exp": now + 3600,
    }
    claims.update(overrides)
    return {k: v for k, v in claims.items() if v is not None}


def _token(key: Any = SIGNING_KEY, algorithm: str = "ES256", **overrides: Any) -> str:
    return jwt.encode(_claims(**overrides), key, algorithm=algorithm, headers={"kid": "test-key"})


def _resolver(_: str) -> Any:
    return SIGNING_KEY.public_key()


def _client(resolver: Callable[[str], Any] = _resolver) -> TestClient:
    return TestClient(create_app(token_verifier=TokenVerifier(SETTINGS, key_resolver=resolver)))


def _get_me(client: TestClient, token: str | None) -> Any:
    headers = {"Authorization": f"Bearer {token}"} if token is not None else {}
    return client.get("/me", headers=headers)


def test_valid_token_returns_the_user() -> None:
    response = _get_me(_client(), _token())
    assert response.status_code == 200
    assert response.json() == {"user_id": USER_ID, "email": "user@example.test"}


def test_missing_token_is_rejected_with_bearer_challenge() -> None:
    response = _get_me(_client(), None)
    assert response.status_code == 401
    assert response.headers["www-authenticate"] == "Bearer"


@pytest.mark.parametrize(
    "token",
    [
        pytest.param("not-a-jwt", id="malformed"),
        pytest.param(_token(exp=int(time.time()) - 120), id="expired"),
        pytest.param(_token(aud="other"), id="wrong-audience"),
        pytest.param(_token(iss="https://evil.example/auth/v1"), id="wrong-issuer"),
        pytest.param(_token(role="anon"), id="anon-role"),
        pytest.param(_token(role="service_role"), id="service-role"),
        pytest.param(_token(role=None), id="no-role"),
        pytest.param(_token(is_anonymous=True), id="anonymous-user"),
        pytest.param(_token(sub=None), id="no-subject"),
        pytest.param(_token(sub="not-a-uuid"), id="subject-not-uuid"),
        pytest.param(_token(exp=None), id="no-expiry"),
        pytest.param(_token(iat=None), id="no-issued-at"),
        pytest.param(_token(key=OTHER_KEY), id="signed-by-another-key"),
        pytest.param(_token(key=HMAC_KEY, algorithm="HS256"), id="hs256"),
        pytest.param(_token(key=None, algorithm="none"), id="alg-none"),
    ],
)
def test_bad_tokens_are_rejected(token: str) -> None:
    response = _get_me(_client(), token)
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid or expired sign-in"}


def test_unknown_signing_key_is_rejected() -> None:
    def resolver(_: str) -> Any:
        raise jwt.PyJWKClientError("no matching key")

    assert _get_me(_client(resolver), _token()).status_code == 401


def test_unreachable_keys_fail_closed() -> None:
    def resolver(_: str) -> Any:
        raise jwt.PyJWKClientConnectionError("timeout")

    response = _get_me(_client(resolver), _token())
    assert response.status_code == 503


def test_protected_route_fails_closed_when_auth_is_not_configured(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    client = TestClient(create_app())
    assert client.get("/health").status_code == 200
    assert _get_me(client, _token()).status_code == 503


def test_settings_derive_issuer_and_jwks_url() -> None:
    settings = load_auth_settings({"SUPABASE_URL": "https://example-ref.supabase.co/"})
    assert settings is not None
    assert settings.issuer == ISSUER
    assert settings.jwks_url == f"{ISSUER}/.well-known/jwks.json"
    assert load_auth_settings({}) is None
    assert load_auth_settings({"SUPABASE_URL": "http://127.0.0.1:54321"}) is not None


@pytest.mark.parametrize(
    "url",
    [
        "http://example-ref.supabase.co",
        "https://example-ref.supabase.co/rest/v1",
        "ftp://x",
        "https://",
    ],
)
def test_settings_reject_unsafe_urls(url: str) -> None:
    with pytest.raises(ValueError, match="SUPABASE_URL"):
        load_auth_settings({"SUPABASE_URL": url})
