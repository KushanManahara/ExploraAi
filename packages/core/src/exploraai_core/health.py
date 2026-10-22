# packages/core/src/exploraai_core/health.py
# COMMON HEALTH PAYLOAD SO EVERY SERVICE REPORTS STATUS IN THE SAME SHAPE.

from typing import TypedDict

from exploraai_core._version import __version__


class HealthStatus(TypedDict):
    status: str
    service: str
    version: str


def health_status(service: str) -> HealthStatus:
    # REJECT EMPTY NAMES SO A MISCONFIGURED SERVICE IS CAUGHT EARLY.
    name = service.strip()
    if not name:
        raise ValueError("service name must not be empty")
    return {"status": "ok", "service": name, "version": __version__}
