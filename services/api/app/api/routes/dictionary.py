from fastapi import APIRouter, Query

from app.schemas.dictionary import (
    DictionarySearchRequest,
    DictionarySearchResponse,
    DictionarySuggestionResponse,
)
from app.services.dictionary.service import search_dictionary, suggest_words

router = APIRouter()


@router.post("/search", response_model=DictionarySearchResponse)
async def search(payload: DictionarySearchRequest) -> DictionarySearchResponse:
    return await search_dictionary(payload.word)


@router.get("/suggestions", response_model=DictionarySuggestionResponse)
async def suggestions(q: str = Query(..., min_length=1, max_length=64)) -> DictionarySuggestionResponse:
    return await suggest_words(q)
