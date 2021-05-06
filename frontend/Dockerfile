# build image
FROM node:15-alpine as build

# set working directory
WORKDIR /app

COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL https://viisidapi.xmt.ee
RUN npm install
RUN npm run build

# nginx image
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
