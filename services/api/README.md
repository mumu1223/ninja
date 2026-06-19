# Latesight API Service

FastAPI skeleton for the unified Latesight backend described in
[docs/backend-architecture.md](/Users/chunlin/Documents/Project/chunlin/latesight/docs/backend-architecture.md:1).

## Current structure

- `app/main.py`: FastAPI app entrypoint
- `app/core/`: config, database, cache, logging
- `app/api/routes/`: health, auth, dictionary, admin route skeletons
- `app/schemas/`: request and response models
- `app/services/`: service-layer placeholders for future business logic
- `app/models/`: SQLAlchemy model skeletons aligned with the architecture doc

## Local run

```bash
cd services/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements/dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Available endpoints

- `GET /health`
- `POST /api/v1/dictionary/search`
- `GET /api/v1/dictionary/suggestions`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/sites`
- `GET /api/v1/admin/system/settings`

## Alembic

```bash
cd services/api
.venv/bin/alembic upgrade head
```
