# DB Migrations

db-migrate documentation: [https://db-migrate.readthedocs.io/en/latest/](https://db-migrate.readthedocs.io/en/latest/)

## environment variables - Development

Whilst in development there is a .env file in the root directory. This contains two environment variables for db-migrate.
The first one DATABASE_MIGRATIONS is a number. This is the number of 'up' migrations to run. So if it is set to 1 it will only try run one 'up' migration at a time. If set to 0 it will run all migrations available in the migrations folder, that have not been run before.
The second variable is DATABASE_SCOPES. This is a comma seperated string of all sub-directory scopes you wish to run against the database.
See: [Scoping](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#scoping)

## environment variables - Production

For production, these variables (DATABASE_MIGRATIONS, DATABASE_SCOPES) are injected from the scripts that build the image.
They are inserted as build_args in both staging and production. These can be found in `/scripts/deploy.sh` and `/scripts/staging.sh`

## creating new scripts

To add new scripts to migrations folder we need to bash into a running dev/dev-hot container. `docker-compose run --rm --service-ports bash`
OR (`npm run docker-dev` or `npm run docker-dev:hot`) then use `docker exec -it <dev/dev:hot-container-name> /bin/bash`

Once in the running container you can run db-migrate commands, such as `db-migrate create <new_migration>` or for new scopes use the colon to create a new scope folder. e.g. `db-migrate create:<new_scope> <new_migration>`. This will create the new files for you, that you can then edit as needed.
Please read db-migrate documentation for more info.

## running migrations manually (up or down)

This will require you to get all containers running using `npm run docker-dev` OR `npm run docker-dev:hot`
Then in a new terminal you will bash into the dev or dev:hot container: `docker exec -it <dev/dev:hot-container-name> /bin/bash`
You are then able to run db-migrate commands as per the [instructions](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#commands).
The one thing you will need to do is provide the hostname for the database. This is done by providing an environment variable in the command ( `-e <hostname>`). The hostname is the container name that postgres is running in (i.e. postgres-db OR postgres-db-test). These can be found in the docker-comp-???.yml you are running.
e.g. `db-migrate down -e postgres-db`