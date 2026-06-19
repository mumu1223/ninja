from typing import Optional

from redis.asyncio import Redis

from app.core.config import get_settings

_cache_client: Optional[Redis] = None


def get_cache() -> Redis:
    global _cache_client
    if _cache_client is None:
        settings = get_settings()
        _cache_client = Redis(
            host=settings.valkey_host,
            port=settings.valkey_port,
            password=settings.valkey_password or None,
            decode_responses=True,
        )
    return _cache_client


async def close_cache() -> None:
    global _cache_client
    if _cache_client is not None:
        await _cache_client.aclose()
        _cache_client = None
