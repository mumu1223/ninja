from app.schemas.admin import (
    AdminSiteListResponse,
    AdminSiteSummary,
    AdminSystemSettingsResponse,
    AdminUserListResponse,
    AdminUserSummary,
)


async def list_users() -> AdminUserListResponse:
    return AdminUserListResponse(
        items=[
            AdminUserSummary(
                id=1,
                email="admin@latesight.com",
                full_name="System Admin",
                role_names=["super_admin"],
            )
        ]
    )


async def list_sites() -> AdminSiteListResponse:
    return AdminSiteListResponse(
        items=[
            AdminSiteSummary(key="home", name="Latesight Home", is_active=True),
            AdminSiteSummary(key="dict", name="Latesight Dictionary", is_active=True),
        ]
    )


async def get_system_settings() -> AdminSystemSettingsResponse:
    return AdminSystemSettingsResponse(items={"dictionary_provider": "free_dictionary"})
