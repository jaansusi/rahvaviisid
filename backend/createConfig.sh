#!/bin/bash

echo \{\"createDB\":\{\"driver\":\"pg\",\"host\":\"$DB_HOST\",\"port\":\"$DB_PORT\",\"user\":\"$DB_USERNAME\",\"password\":\"$DB_PASSWORD\"\},\"migrate\":\"driver\": \"pg\",\"host\": \"$DB_HOST\",\"port\": \"$DB_PORT\",\"user\": \"$DB_USERNAME\",\"password\": \"$DB_PASSWORD\",\"database\": \"$DB_DATABASE\"\} > migrations/database.json