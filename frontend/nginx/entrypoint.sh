#!/bin/sh
set -e

: "${API_URL:=http://localhost:3000}"

export API_URL
envsubst '${API_URL}' < /config.js.template > /usr/share/nginx/html/config.js
