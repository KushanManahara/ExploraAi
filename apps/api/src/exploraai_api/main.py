# apps/api/src/exploraai_api/main.py
# APPLICATION FACTORY AND HEALTH ENDPOINT. RUN LOCALLY WITH: uvicorn exploraai_api.main:app

from fastapi import FastAPI

from exploraai_core import HealthStatus, __version__, health_status


def create_app() -> FastAPI:
    app = FastAPI(title="ExploraAi API", version=__version__)

    @app.get("/health")
    def health() -> HealthStatus:
        # LIVENESS ONLY. DEPENDENCY CHECKS (DATABASE, QUEUE) ARE ADDED WHEN THOSE EXIST IN M1/M2.
        return health_status("api")

    return app


app = create_app()
