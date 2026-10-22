# packages/core/src/exploraai_core/__init__.py
# SHARED PACKAGE ENTRY POINT. EXPOSES THE VERSION AND THE COMMON HEALTH HELPER.

from exploraai_core._version import __version__
from exploraai_core.health import HealthStatus, health_status

__all__ = ["HealthStatus", "__version__", "health_status"]
