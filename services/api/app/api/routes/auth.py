from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest, LoginResponse, UserProfile
from app.services.auth.service import authenticate_user, get_current_user

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest) -> LoginResponse:
    result = await authenticate_user(payload)
    if result is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return result


@router.get("/me", response_model=UserProfile)
async def me() -> UserProfile:
    return await get_current_user()
