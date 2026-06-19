from fastapi import APIRouter

from app.schemas.admin import AdminSystemSettingsResponse
from app.services.admin.service import get_system_settings

router = APIRouter()


@router.get("/settings", response_model=AdminSystemSettingsResponse)
async def settings() -> AdminSystemSettingsResponse:
    return await get_system_settings()
