from pydantic import BaseModel


class AdminUserSummary(BaseModel):
    id: int
    email: str
    full_name: str
    role_names: list[str]


class AdminUserListResponse(BaseModel):
    items: list[AdminUserSummary]


class AdminSiteSummary(BaseModel):
    key: str
    name: str
    is_active: bool


class AdminSiteListResponse(BaseModel):
    items: list[AdminSiteSummary]


class AdminSystemSettingsResponse(BaseModel):
    items: dict[str, str]
