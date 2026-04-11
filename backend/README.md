# ekm-viisid-api

Backend API for the Estonian Literary Museum folk tunes database, built with [LoopBack 4](https://loopback.io/doc/en/lb4/).

## Quick start with Docker Compose

From the project root:

```sh
docker compose up database        # start PostgreSQL
docker compose --profile backend up  # start database + API
docker compose --profile all up      # start everything (database, API, frontend)
```

pgAdmin is available at http://localhost:5050 (admin@example.com / admin).

## Local development

### Install dependencies

```sh
npm ci
```

### Configure environment

Copy `.env.template` to `.env` and fill in the values:

```sh
cp .env.template .env
```

Required environment variables:

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_USERNAME` | `local_user` | Database user |
| `DB_PASSWORD` | `local_user_password` | Database password |
| `DB_DATABASE` | `kivi` | Database name |
| `JWT_SECRET` | — | JWT signing secret (required) |
| `JWT_REFRESH_SECRET` | — | JWT refresh token secret (required) |
| `CORS_ORIGIN` | `http://localhost:3001` | Allowed CORS origin |

### Run the application

```sh
npm start
```

Open http://127.0.0.1:3000 in your browser. The API explorer is available at `/explorer`.

### Database migrations

Migrations run automatically on application startup via the `MigrationComponent`. To run them manually:

```sh
npm run database:migrate
```

See [database-migrations.md](database-migrations.md) for details.

## Build

```sh
npm run build          # incremental build
npm run clean && npm run build  # full rebuild
```

## Lint

```sh
npm run lint       # check
npm run lint:fix   # auto-fix
```

## Tests

```sh
npm test              # unit tests
npm run test:api      # API integration tests (Playwright)
```

## Docker

```sh
npm run docker:build    # build image
npm run docker:run      # run container on port 3000
```

## Other commands

- `npm run openapi-spec`: Generate OpenAPI spec into a file
