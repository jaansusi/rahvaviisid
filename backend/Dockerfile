# Check out https://hub.docker.com/_/node to select a new base image
FROM node:20-bookworm AS build

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm installˇ

# Bundle app source code
COPY --chown=node . .

# Build the application
RUN npm run build

FROM node:20-alpine AS production

USER node
RUN mkdir -p /app
COPY --chown=node --from=build /home/node/app /app

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD ["node", "."]
