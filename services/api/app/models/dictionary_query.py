from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class DictionaryQuery(Base):
    __tablename__ = "dictionary_queries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    word: Mapped[str] = mapped_column(String(128), index=True, nullable=False)
    normalized_word: Mapped[str] = mapped_column(String(128), index=True, nullable=False)
    provider: Mapped[str] = mapped_column(String(64), nullable=False)
    source: Mapped[str] = mapped_column(String(64), default="public_api")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
