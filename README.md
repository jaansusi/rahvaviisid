# Nora - Estonian Folk Songs API & Frontend

Eesti Kirjandusmuuseumi rahvaviiside API ja veebiliides (Estonian Literary Museum Folk Songs API and Web Interface).

## Project Structure

- **backend/**: LoopBack 4 API server (Node.js + TypeScript) with PostgreSQL database
- **frontend/**: React application with Material UI for the web interface
- **scripts/**: Utility scripts for data processing
- **compose.yaml**: Docker Compose setup for local development

## Prerequisites

- **Node.js** (>= 20.x recommended)
- **PostgreSQL** (>= 13.x)
- **Docker & Docker Compose** (for containerized setup)

## Development Setup

### Option 1: Docker Compose

The `compose.yaml` sets up PostgreSQL, pgAdmin, backend API, and frontend. The database is automatically initialized with the `kivi` database, `folk_tune` schema, and application user via init scripts.

**Start database + pgAdmin only:**
```bash
docker compose up -d
```
- PostgreSQL on port 5432
- pgAdmin on port 5050 (admin@example.com / admin)

**Start database + backend API:**
```bash
docker compose --profile backend up -d
```
- Adds backend API on port 3000

**Start database + frontend:**
```bash
docker compose --profile frontend up -d
```
- Adds frontend on port 80

**Start everything:**
```bash
docker compose --profile all up -d
```

**Stop all services:**
```bash
docker compose --profile all down
```

### Option 2: Local Development

Note: Requires an initialized database (initialization automatic if using included compose project)

#### Backend

1. Copy `.env.template` to `.env` and adjust values:
   ```bash
   cd backend
   cp .env.template .env
   ```

2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

3. Run database migrations:
   ```bash
   npm run database:migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The API is available at `http://localhost:3000` with the REST API explorer at `http://localhost:3000/explorer`.

#### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

   The frontend is available at `http://localhost:3001`.

## Docker Images

Both backend and frontend have multi-stage Dockerfiles (Node 20 base).

**Backend** — builds TypeScript, runs as `node` user on port 3000:
```bash
cd backend
npm run docker:build   # jaansusi/ekm-viisid-api
npm run docker:run
```

**Frontend** — builds React app, serves via nginx on port 80:
```bash
cd frontend
npm run docker:build   # jaansusi/ekm-viisid-fe
npm run docker:run
```

## Environment Variables

See `backend/.env.template` for all required variables:

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `local_user` | Database user |
| `DB_PASSWORD` | `local_user_password` | Database password |
| `DB_DATABASE` | `kivi` | Database name |
| `JWT_SECRET` | *(required)* | JWT signing secret |
| `JWT_REFRESH_SECRET` | *(required)* | JWT refresh token secret |
| `CORS_ORIGIN` | `http://localhost:3001` | Allowed CORS origin |

## Available Scripts

### Backend
| Script | Description |
|---|---|
| `npm start` | Build and start production server |
| `npm run build` | Build TypeScript |
| `npm run build:watch` | Build with file watching |
| `npm test` | Run unit tests (Mocha) |
| `npm run test:api` | Run API tests (Playwright) |
| `npm run lint` | Check code style |
| `npm run database:migrate` | Run database migrations (db-migrate) |
| `npm run openapi-spec` | Generate OpenAPI specification |

### Frontend
| Script | Description |
|---|---|
| `npm start` | Start dev server on port 3001 |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Database

The application uses a PostgreSQL database named `kivi` with a `folk_tune` schema. When using Docker Compose, the database is automatically initialized via `backend/scripts/init-db.sh` and `init-db.sql`, which create the database, schema, and application user.

For manual setup, see the SQL in `backend/scripts/init-db.sql`.

Migrations are managed with [db-migrate](https://db-migrate.readthedocs.io/) and configured in `backend/migrations/database.json` (reads credentials from environment variables).

## API Documentation

Visit `http://localhost:3000/explorer` for interactive API documentation (OpenAPI/Swagger).

## Deployment

See [deployment.md](deployment.md) for production deployment instructions.
