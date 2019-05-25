# got-friends

This app is running on:
- <node-version>

## How to get started

1. Download and install Docker's desktop client: https://docs.docker.com/install
2. Signup for a Docker Cloud account: https://cloud.docker.com/
3. Make sure you are added to the DockerHub organization for push access (this step is only necessary if you need to add dependencies to package.json)
4. Remove any local instances of node_modules - this is already in the docker container. Do not run `npm install` locally.

## How to build and run

Webpack Dev Server with hot-reload (no need to run build script)

`npm run docker-dev:hot`

Other scripts available:

`npm run docker-build:dev`

`npm run docker-dev`

### Updating package.json

Since this app is using Docker for dependencies, we cannot just npm install for dependency additions/updates. 

For more details, refer to docs/Docker.md

## Configuration

Config files are contained in the config directory

These files cascade from: default -> (development|production) -> hostname-(development|production) -> etc
So if you have the following files in the config directory of your project:
````
default.json
development.json
myhostname-development.json (myhostname can be acquired by typing 'echo $HOSTNAME' in your terminal and selecting the part up to the first dot)
production.json
````
... and you ran in `development` mode, files would be processed in this order:
````
default.json
development.json
myhostname-development.json
````
... with any key:values in the later files overwriting key:values in earlier files.

Check out the [node-config docs](https://github.com/lorenwest/node-config/wiki/Configuration-Files) for more info

## Deployment

Refer to docs/Deployment.md

## Database 

### Migrations

Refer to docs/DBMigrations.md

### Dev Database Access

To access your local dev database, you'll want to log into the database container and invoke the psql command
1. `docker exec -it <database-container-name> /bin/bash` (This will put you at the command line inside the database container where postgres is installed)
2. `psql <dbname> -U <dbusername>` (Then enter the password and this will log you into the database.  You can now explore!)