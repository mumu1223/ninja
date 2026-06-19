from fastapi import APIRouter

from app.api.routes import admin_sites, admin_system, admin_users, auth, dictionary, health

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
api_router.include_router(dictionary.router, prefix="/api/v1/dictionary", tags=["dictionary"])
api_router.include_router(admin_users.router, prefix="/api/v1/admin/users", tags=["admin"])
api_router.include_router(admin_sites.router, prefix="/api/v1/admin/sites", tags=["admin"])
api_router.include_router(admin_system.router, prefix="/api/v1/admin/system", tags=["admin"])
