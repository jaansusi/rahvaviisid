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
npm run docker:build    # build image (jaansusi/ekm-viisid-api)
npm run docker:run      # run container on port 3000
npm run docker:release  # build and push to Docker Hub
npm run docker:release:certustec  # build and push to registry.cluster.certustec.ee
```

The [Dockerfile](Dockerfile) is multi-stage: Node 20 Bookworm builds the TypeScript output, then `node:20-alpine` runs the app as the unprivileged `node` user on port 3000.

### Building OCI-compliant images

Docker BuildKit (default since Docker 23) produces images in the [OCI image format](https://github.com/opencontainers/image-spec) when you ask for it explicitly. Use `docker buildx`:

```sh
# Single-arch OCI image, loaded into the local daemon
docker buildx build \
  --tag jaansusi/ekm-viisid-api:latest \
  --output type=docker \
  .

# Multi-arch OCI image pushed to a registry
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag jaansusi/ekm-viisid-api:latest \
  --provenance=true \
  --sbom=true \
  --push \
  .

# Export an OCI image tarball (no registry, no daemon)
docker buildx build \
  --tag jaansusi/ekm-viisid-api:latest \
  --output type=oci,dest=ekm-viisid-api.oci.tar \
  .
```

Notes:
- `--platform` requires the `containerd` image store or QEMU emulation (`docker run --privileged --rm tonistiigi/binfmt --install all`).
- `--provenance` and `--sbom` add SLSA provenance and an SPDX SBOM as OCI referrers — recommended for supply-chain hygiene.
- Inspect the result with `docker buildx imagetools inspect jaansusi/ekm-viisid-api:latest`.

## Other commands

- `npm run openapi-spec`: Generate OpenAPI spec into a file
