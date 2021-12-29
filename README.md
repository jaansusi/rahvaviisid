## Nora

### Development

#### API setup:

1) Install the PostgreSQL server
2) install Node.js
3) npm install
4) modify DB connection values in `backend/migrations/database.json`
5) modify values for the dev:start in package.json
6) npm run dev:start

#### FE setup:

1) install Node.js
2) npm install
3) npm start

### Release

To build and push the docker image to DockerHub:
`npm run docker:release`
Run in both backend and frontend folders.