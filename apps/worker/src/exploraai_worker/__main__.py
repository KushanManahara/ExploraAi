# apps/worker/src/exploraai_worker/__main__.py
# WORKER ENTRY POINT. FOR NOW IT ONLY RUNS A HEALTH CHECK AND EXITS; THE JOB LOOP ARRIVES IN M2.
# RUN WITH: python -m exploraai_worker

import json
import sys

from exploraai_core import health_status


def main() -> int:
    # PRINT ONE JSON LINE SO HOSTING HEALTH CHECKS AND HUMANS CAN READ THE SAME OUTPUT.
    print(json.dumps(health_status("worker")))
    return 0


if __name__ == "__main__":
    sys.exit(main())
