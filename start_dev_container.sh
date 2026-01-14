#!/bin/sh
set -e

if ! docker network inspect localdev >/dev/null 2>&1; then
  echo "Creando red localdev..."
  docker network create localdev
fi

docker compose up -d
docker compose exec app /bin/bash