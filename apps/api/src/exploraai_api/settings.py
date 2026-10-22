# apps/api/src/exploraai_api/settings.py
# API SETTINGS READ FROM THE ENVIRONMENT. NO SECRETS ARE NEEDED TO VERIFY SIGN-IN TOKENS:
# THE SIGNING KEYS ARE PUBLIC (JWKS) AND THE PROJECT URL IS NOT SECRET.

import os
from dataclasses import dataclass
from urllib.parse import urlsplit


@dataclass(frozen=True, slots=True)
class AuthSettings:
    supabase_url: str

    @property
    def issuer(self) -> str:
        # SUPABASE AUTH PUTS THIS EXACT VALUE IN THE "iss" CLAIM.
        return f"{self.supabase_url}/auth/v1"

    @property
    def jwks_url(self) -> str:
        return f"{self.issuer}/.well-known/jwks.json"


def load_auth_settings(env: dict[str, str] | None = None) -> AuthSettings | None:
    """RETURN AUTH SETTINGS, OR NONE WHEN SUPABASE_URL IS UNSET (PROTECTED ROUTES FAIL CLOSED)."""
    source = os.environ if env is None else env
    raw = source.get("SUPABASE_URL", "").strip().rstrip("/")
    if not raw:
        return None
    parts = urlsplit(raw)
    # ONLY HTTPS, EXCEPT PLAIN HTTP ON LOCALHOST FOR THE LOCAL SUPABASE STACK.
    local = parts.hostname in {"localhost", "127.0.0.1"}
    if parts.scheme != "https" and not (local and parts.scheme == "http"):
        raise ValueError("SUPABASE_URL must use https (http is allowed only for localhost)")
    if not parts.hostname or parts.path or parts.query or parts.fragment:
        raise ValueError("SUPABASE_URL must be a bare origin, e.g. https://<ref>.supabase.co")
    return AuthSettings(supabase_url=raw)
