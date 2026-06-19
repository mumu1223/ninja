from fastapi import APIRouter

from app.schemas.admin import AdminUserListResponse
from app.services.admin.service import list_users

router = APIRouter()


@router.get("", response_model=AdminUserListResponse)
async def get_users() -> AdminUserListResponse:
    return await list_users()
