# Check out https://hub.docker.com/_/node to select a new base image
FROM node:20-bookworm AS build

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Bundle app source code
COPY . .

# Build the application
RUN npm run build

# Drop dev dependencies for the runtime image
RUN npm prune --omit=dev

FROM node:20-alpine AS production

WORKDIR /app

COPY --chown=node --from=build /app/dist /app/dist
COPY --chown=node --from=build /app/node_modules /app/node_modules
COPY --chown=node --from=build /app/package.json /app/package.json
COPY --chown=node --from=build /app/migrations /app/migrations

USER node

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD ["node", "."]
