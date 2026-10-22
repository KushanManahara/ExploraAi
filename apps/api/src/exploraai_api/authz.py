# apps/api/src/exploraai_api/authz.py
# PER-USER AUTHORIZATION RULES FOR EVERY PROTECTED RESOURCE (PAPERS, CHATS, COMPARISONS, ...).
#
# RULES (DEFENCE IN DEPTH, PLAN §4):
#   1. EVERY DATABASE QUERY FROM THE API FILTERS BY THE VERIFIED USER ID (user.user_id),
#      NEVER BY AN ID TAKEN FROM THE REQUEST BODY OR URL ALONE.
#   2. AFTER LOADING A ROW, ensure_owner() CHECKS IT BELONGS TO THE CALLER.
#   3. A ROW OWNED BY SOMEONE ELSE IS REPORTED AS "NOT FOUND" (404), NOT "FORBIDDEN" (403),
#      SO IDS CAN'T BE PROBED TO LEARN WHAT EXISTS.
#   4. DATABASE ROW-LEVEL SECURITY STILL APPLIES UNDERNEATH FOR ANY USER-SCOPED CONNECTION.

from uuid import UUID

from fastapi import HTTPException, status

from exploraai_api.auth import AuthenticatedUser


def not_found() -> HTTPException:
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")


def ensure_owner(owner_id: UUID | str | None, user: AuthenticatedUser) -> None:
    """RAISE 404 UNLESS THE RESOURCE EXISTS AND BELONGS TO THE SIGNED-IN USER."""
    if owner_id is None:
        raise not_found()
    try:
        owner = owner_id if isinstance(owner_id, UUID) else UUID(str(owner_id))
    except ValueError as exc:
        raise not_found() from exc
    if owner != user.user_id:
        raise not_found()
