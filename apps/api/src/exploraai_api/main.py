# apps/api/src/exploraai_api/main.py
# APPLICATION FACTORY, HEALTH ENDPOINT AND THE FIRST PROTECTED ENDPOINT.
# RUN LOCALLY WITH: uvicorn exploraai_api.main:app

import logging

from fastapi import FastAPI
from pydantic import BaseModel

from exploraai_api.auth import CurrentUser, TokenVerifier
from exploraai_api.settings import load_auth_settings
from exploraai_core import HealthStatus, __version__, health_status

logger = logging.getLogger(__name__)


class MeResponse(BaseModel):
    user_id: str
    email: str | None


def create_app(token_verifier: TokenVerifier | None = None) -> FastAPI:
    app = FastAPI(title="ExploraAi API", version=__version__)

    if token_verifier is None:
        settings = load_auth_settings()
        if settings is None:
            # HEALTH STILL WORKS; EVERY PROTECTED ROUTE ANSWERS 503 UNTIL SUPABASE_URL IS SET.
            logger.warning("SUPABASE_URL is not set; protected routes will refuse requests")
        else:
            token_verifier = TokenVerifier(settings)
    app.state.token_verifier = token_verifier

    @app.get("/health")
    def health() -> HealthStatus:
        # LIVENESS ONLY. DEPENDENCY CHECKS (DATABASE, QUEUE) ARE ADDED WITH THOSE FEATURES.
        return health_status("api")

    @app.get("/me")
    def me(user: CurrentUser) -> MeResponse:
        # CONFIRMS SIGN-IN END TO END: THE WEB APP SENDS THE SUPABASE ACCESS TOKEN,
        # AND THE API RETURNS WHO IT BELONGS TO.
        return MeResponse(user_id=str(user.user_id), email=user.email)

    return app


app = create_app()
