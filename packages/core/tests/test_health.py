# packages/core/tests/test_health.py
# BASIC TEST FOR THE SHARED HEALTH HELPER.

import pytest

from exploraai_core import __version__, health_status


def test_health_status_reports_ok_for_named_service() -> None:
    assert health_status("api") == {"status": "ok", "service": "api", "version": __version__}


def test_health_status_rejects_empty_service_name() -> None:
    with pytest.raises(ValueError):
        health_status("   ")
