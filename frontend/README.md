# ekm-viisid-fe

Frontend for the Estonian Literary Museum folk tunes database. React 18 + Material UI, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start with Docker Compose

From the project root:

```sh
docker compose --profile frontend up   # database + frontend
docker compose --profile all up        # database, backend, frontend
```

The frontend is served by nginx on port 80.

## Local development

### Install dependencies

```sh
npm ci
```

### Run the dev server

```sh
npm start
```

The app runs on [http://localhost:3001](http://localhost:3001) and proxies API calls to the backend on port 3000. The page reloads on edits and lint errors are shown in the console.

### Tests

```sh
npm test
```

Launches the Jest test runner in interactive watch mode.

### Production build

```sh
npm run build
```

Outputs a minified, hashed bundle to `build/`. The build is served by nginx in the Docker image (see [nginx/nginx.conf](nginx/nginx.conf)).

## Docker

```sh
npm run docker:build    # build image (jaansusi/ekm-viisid-fe)
npm run docker:run      # run container, host port 3001 → container 80
npm run docker:release  # build and push
```

The [Dockerfile](Dockerfile) is multi-stage: Node 20 Alpine builds the React bundle, then `nginx:stable-alpine` serves the static files.

### Building OCI-compliant images

Docker BuildKit (default since Docker 23) produces images in the [OCI image format](https://github.com/opencontainers/image-spec) when you ask for it explicitly. Use `docker buildx`:

```sh
# Single-arch OCI image, loaded into the local daemon
docker buildx build \
  --tag jaansusi/ekm-viisid-fe:latest \
  --output type=docker \
  .

# Multi-arch OCI image pushed to a registry
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag jaansusi/ekm-viisid-fe:latest \
  --provenance=true \
  --sbom=true \
  --push \
  .

# Export an OCI image tarball (no registry, no daemon)
docker buildx build \
  --tag jaansusi/ekm-viisid-fe:latest \
  --output type=oci,dest=ekm-viisid-fe.oci.tar \
  .
```

Notes:
- `--platform` requires the `containerd` image store or QEMU emulation (`docker run --privileged --rm tonistiigi/binfmt --install all`).
- `--provenance` and `--sbom` add SLSA provenance and an SPDX SBOM as OCI referrers — recommended for supply-chain hygiene.
- Inspect the result with `docker buildx imagetools inspect jaansusi/ekm-viisid-fe:latest`.

## Learn more

- [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started)
- [React docs](https://reactjs.org/)
