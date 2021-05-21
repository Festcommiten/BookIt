#!/bin/bash

# Build image
docker build -t bookit_frontend:dev .

# Start container
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    bookit_frontend:dev
