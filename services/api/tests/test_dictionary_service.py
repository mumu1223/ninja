import asyncio

from app.services.dictionary import service


def test_suggest_words_prefers_prefix_matches() -> None:
    result = asyncio.run(service.suggest_words("res"))

    assert result.query == "res"
    assert "resilience" in result.suggestions
    assert result.suggestions[0].startswith("res")
