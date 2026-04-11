# Deployment of Nora services

In general, you need 3 services to run Nora:
* Database (PostgreSQL)
* API
* FE

The recommended deployment option for all of these services is as a Docker container.

## Database

The database service needs to contain a database and a user that has rights to manage its structure and data. All database migrations are run by the API automatically so no manual intervention on the database level should be necessary.

API was tested with PostgreSQL 13. The Docker Compose setup (`compose.yaml` in the project root) includes PostgreSQL 13 and pgAdmin for local development.

This document does not cover the database deployment as the database service can be in whatever form you choose, as long as it is accessible to the API.
For Docker deployment, refer to https://hub.docker.com/_/postgres.

## API

### Deployment

API source code contains the Dockerfile for building the image.

Refer to configuration section for container variables and port mappings.

During current development cycle, the latest version is also available as a container at https://hub.docker.com/r/jaansusi/ekm-viisid-api.

### Configuration

Configuration is managed through environment variables.

Web service:
* PORT - defaults to 3000 (when changing this, make sure that the Dockerfile expose command matches this value)

Database connection:
* DB_HOST - defaults to 'localhost'
* DB_PORT - defaults to 5432
* DB_USERNAME - defaults to 'local_user'
* DB_PASSWORD - defaults to 'local_user_password'
* DB_DATABASE - defaults to 'kivi'

Security:
* JWT_SECRET - JWT signing secret (required, no default)
* JWT_REFRESH_SECRET - JWT refresh token secret (required, no default)
* CORS_ORIGIN - allowed CORS origin (defaults to 'http://localhost:3001')

### Updating

Stop and delete the current service, then build or pull the new image and start the new container. Starting the container initiates database update procedures (if new version introduced any) before starting the service. 

If starting the service without Docker, make sure to run the necessary database migration command before running the service.

## FE

### Deployment

The source code contains the Dockerfile for building the image.

**Important!** React configuration is not meant to be changed on the fly, it is instead compiled together with source code. This means that you have to build your own image (or request one with specific API URL from us).

Port 80 is exposed on the Docker image.

### Configuration

Modify the value of the API URL in the .env file before compilation.

### Updating

Same as with API, build the new image and start a new container based on that.

No specific considerations when running this outside of a Docker container.