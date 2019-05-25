#!/bin/bash
# start-dev-app.sh - this file waits for the ./postgres-db/wait-for-postgres.sh 
#   to successfully resolve (on successful db init and seed), then starts app
# NOTE: if permission denied error is thrown, in terminal run: chmod 744 ./scripts/start-dev-app.sh
# NOTE: used for running locally as well as for running the test suite (docker-comp-dev[-hot] & docker-comp-test)

# wait for database to be ready
# $1 is HOST from docker-compose
(./scripts/postgres-db/wait-for-postgres.sh -h "$1" -p 5432)
postgres_running=$?
sleep 2

# postgres is ready, let's start the app
echo -e '\033[00;95m postgres ready... starting app \033[0m'
(npm run "$2")