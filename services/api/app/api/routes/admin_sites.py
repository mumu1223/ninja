from fastapi import APIRouter

from app.schemas.admin import AdminSiteListResponse
from app.services.admin.service import list_sites

router = APIRouter()


@router.get("", response_model=AdminSiteListResponse)
async def get_sites() -> AdminSiteListResponse:
    return await list_sites()
