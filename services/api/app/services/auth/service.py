from typing import Optional

from app.schemas.auth import LoginRequest, LoginResponse, UserProfile


async def authenticate_user(payload: LoginRequest) -> Optional[LoginResponse]:
    if payload.email != "admin@latesight.com" or payload.password != "change-me-123":
        return None

    user = UserProfile(
        id=1,
        email=payload.email,
        full_name="System Admin",
        roles=["super_admin"],
    )
    return LoginResponse(access_token="dev-token", user=user)


async def get_current_user() -> UserProfile:
    return UserProfile(
        id=1,
        email="admin@latesight.com",
        full_name="System Admin",
        roles=["super_admin"],
    )
