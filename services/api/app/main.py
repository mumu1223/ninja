from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.router import api_router
from app.core.cache import close_cache
from app.core.config import get_settings
from app.core.logging import configure_logging


@asynccontextmanager
async def lifespan(_: FastAPI):
    configure_logging()
    yield
    await close_cache()


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        debug=settings.is_development,
        lifespan=lifespan,
    )
    application.include_router(api_router)
    return application


app = create_app()
