# apps/api/tests/test_health.py
# BASIC TEST: THE HEALTH ENDPOINT RESPONDS WITH THE SHARED STATUS PAYLOAD.

from fastapi.testclient import TestClient

from exploraai_api.main import create_app
from exploraai_core import __version__


def test_health_endpoint_returns_ok() -> None:
    client = TestClient(create_app())
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "api", "version": __version__}
