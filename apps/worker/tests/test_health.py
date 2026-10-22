# apps/worker/tests/test_health.py
# BASIC TEST: THE WORKER HEALTH CHECK PRINTS THE SHARED STATUS PAYLOAD AND EXITS 0.

import json

import pytest

from exploraai_core import __version__
from exploraai_worker.__main__ import main


def test_worker_health_check_prints_ok(capsys: pytest.CaptureFixture[str]) -> None:
    assert main() == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload == {"status": "ok", "service": "worker", "version": __version__}
