# Latesight Backend Architecture

## Goal

Build a unified Python backend for all current and future tool sites under Latesight.
The backend should support:

- Public tool APIs
- A future admin system
- User and role management
- Caching
- Audit and operational logging
- Third-party API integration
- AI integration such as DeepSeek

This document defines the backend stack, service boundaries, directory layout, and the first implementation targets.

## Final Stack

### Backend

- Language: Python 3.12+
- Web framework: FastAPI
- Validation / schema: Pydantic
- ORM: SQLAlchemy 2.x
- Database migration: Alembic

### Data Layer

- Primary database: PostgreSQL
- Cache: Valkey

### Infrastructure

- Reverse proxy: Nginx
- Container runtime: Docker Compose

### Frontend

- Public sites: Next.js + TypeScript
- Future admin frontend: Next.js + TypeScript

## Why This Stack

### PostgreSQL

Use PostgreSQL as the single source of truth for:

- users
- roles and permissions
- site configuration
- tool metadata
- query history
- audit logs
- operational logs

PostgreSQL is preferred because:

- it handles relational data cleanly
- it supports transactions well
- it supports `jsonb` for flexible payload storage
- it has native full-text search if needed later

### Valkey

Use Valkey for:

- dictionary lookup cache
- short-lived response cache
- rate-limit counters
- session / token-side cache if later needed
- queue backend if future async jobs require it

Valkey is chosen over introducing a heavier cache layer because the initial workloads are straightforward and latency-sensitive.

## High-Level Architecture

```txt
Browser
  -> Next.js site
    -> Python FastAPI backend
      -> PostgreSQL
      -> Valkey
      -> Third-party providers
      -> DeepSeek API
```

### Responsibility Split

#### Next.js apps

- render public pages
- handle page-level UX
- call backend APIs
- do not own core business logic

#### Python backend

- own all business logic
- define API contracts
- talk to database and cache
- integrate third-party services
- normalize and structure dictionary output
- support future admin and auth APIs

## Monorepo Layout

```txt
apps/
  home/                 # public home site
  dict/                 # dictionary tool frontend
  admin/                # future admin frontend

packages/
  ui/                   # shared frontend UI
  config/               # shared frontend config

services/
  api/                  # Python backend

infra/
  nginx/                # reverse proxy config
```

## Backend Directory Layout

```txt
services/api/
  README.md
  requirements/
    base.txt
    dev.txt
  alembic.ini
  .env.example
  app/
    main.py
    core/
      config.py
      database.py
      cache.py
      security.py
      logging.py
    api/
      deps/
      routes/
        health.py
        auth.py
        dictionary.py
        admin_users.py
        admin_sites.py
        admin_system.py
    models/
      user.py
      role.py
      site.py
      dictionary_cache.py
      api_log.py
      system_setting.py
    schemas/
      auth.py
      dictionary.py
      admin.py
      common.py
    services/
      auth/
      dictionary/
        providers/
          free_dictionary.py
          merriam_webster.py
        deepseek.py
        normalize.py
        cache.py
      admin/
    repositories/
    tasks/
  alembic/
    versions/
  tests/
```

## First Public Tool: Dictionary

The dictionary tool should not rely on DeepSeek as the primary factual source.

Recommended flow:

1. Receive query from frontend
2. Check Valkey cache
3. Check durable DB cache if needed
4. Query dictionary provider
5. Normalize provider response
6. Optionally send normalized provider result to DeepSeek for:
   - Chinese summary
   - structured learning notes
   - concise usage guidance
7. Return unified JSON response
8. Store cache

## Dictionary API Contract

### Endpoint

`POST /api/v1/dictionary/search`

### Request

```json
{
  "word": "resilience"
}
```

### Response

```json
{
  "word": "resilience",
  "phonetic": "/rɪˈzɪliəns/",
  "audio_url": "",
  "meanings": [
    {
      "part_of_speech": "noun",
      "definitions": [
        {
          "en": "the ability to recover quickly",
          "zh": "迅速恢复的能力",
          "example": "Children often show remarkable resilience."
        }
      ]
    }
  ],
  "origin": "",
  "synonyms": [],
  "antonyms": [],
  "learning_tip": ""
}
```

## Initial API Surface

### Public

- `GET /health`
- `POST /api/v1/dictionary/search`
- `GET /api/v1/dictionary/suggestions`

### Auth

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Future Admin

- `GET /api/v1/admin/users`
- `GET /api/v1/admin/sites`
- `GET /api/v1/admin/system/settings`

## Cache Strategy

### Valkey Cache

Use Valkey for hot query caching.

Suggested key format:

- `dict:word:{normalized_word}`

Suggested TTL:

- 1 day to 7 days for stable dictionary output

### Database Cache

Use PostgreSQL for persistent cached query history when needed for:

- analytics
- debugging
- warming popular queries
- later admin reporting

## Database Design Direction

### Core tables

- `users`
- `roles`
- `user_roles`
- `sites`
- `dictionary_cache`
- `dictionary_queries`
- `api_logs`
- `system_settings`

### Notes

- keep public dictionary response schema stable
- use `jsonb` for provider raw payload snapshots where helpful
- do not over-model provider-specific fields too early

## Permission Model

Start with RBAC.

Suggested roles:

- `super_admin`
- `admin`
- `editor`
- `viewer`

## Environment Variables

Backend should expect at least:

```txt
APP_ENV=
APP_HOST=
APP_PORT=

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

VALKEY_HOST=
VALKEY_PORT=
VALKEY_PASSWORD=

DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=

DICTIONARY_PROVIDER=
MERRIAM_WEBSTER_API_KEY=
```

## Docker Compose Direction

The stack should evolve toward:

```txt
proxy
home
dict
admin
api
postgres
valkey
```

## Implementation Order

1. Create FastAPI skeleton under `services/api`
2. Add environment config, DB session, and Valkey client
3. Add health route
4. Add dictionary route and response schema
5. Add provider adapter layer
6. Add DeepSeek normalization layer
7. Add cache layer
8. Add auth foundation
9. Add admin APIs

## Boundaries To Keep

- Do not place core business logic in Next.js route handlers
- Do not make DeepSeek the primary dictionary fact source
- Do not split backend logic across multiple languages unless there is a strong offline-processing reason
- Keep all future tool sites on the same backend platform unless there is a proven scaling need
