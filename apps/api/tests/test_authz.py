# apps/api/tests/test_authz.py
# OWNERSHIP CHECK: ONLY THE OWNER GETS THROUGH; EVERYONE ELSE SEES "NOT FOUND".

from uuid import uuid4

import pytest
from fastapi import HTTPException

from exploraai_api.auth import AuthenticatedUser
from exploraai_api.authz import ensure_owner

USER = AuthenticatedUser(user_id=uuid4(), email=None)


def test_owner_passes() -> None:
    ensure_owner(USER.user_id, USER)
    ensure_owner(str(USER.user_id), USER)


@pytest.mark.parametrize("owner", [uuid4(), str(uuid4()), None, "not-a-uuid", ""])
def test_everyone_else_gets_not_found(owner: object) -> None:
    with pytest.raises(HTTPException) as caught:
        ensure_owner(owner, USER)  # type: ignore[arg-type]
    assert caught.value.status_code == 404
