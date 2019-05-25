# Docker-compose

No need to have node_modules on your local host. They exist within the docker image.

Docker Image is running:
- `ubuntu 16.04`
- `node v8.9.3`


## **Skip to**:

- [About](#about): intro to / overview of docker
- [Dockerfiles](#dockerfiles): what are they, and how are we using them?
- [Scripts](#scripts): a note on what is happening when we run docker commands
- [Get Started](#get-started): installing docker
- [How to Run](#how-to-run): spinning up dev server & things to note
- [Shortcuts](#shortcuts): helpful commands available and what they do
- [Dependencies](#dependencies): updating / adding node modules in docker
- [Database](#database): psql into running docker pg database, db dumps, and more!
- [Testing](#testing): Running / updating unit tests locally in docker
- [Troubleshooting](#troubleshooting): What if something is out of sync / not working?


<a id="about"></a>

## About Docker
Docker creates three main things on your machine. These are images, containers and volumes.

Images:
  You can view all the images you have on your machine running: `docker images` or `docker image ls`
  These are essentially blueprints for creating containers. You make images with Dockerfile's. See below for more..
  You can remove images using: `docker rmi <image name or id>` If the image is in use add `--force`.

Containers:
  You can view all the containers you have running: `docker ps` add `-a` to see ALL container's, including ones not running.
  These are the running instances of images. Essentially machine environments built from their image instructions.
  You can remove containers using: `docker rm <container name or id>`. The `--force` flag may be required if container is running.

Volumes:
  You can view all the volumes you have running: `docker volumes ls` to view only un-used volumes. add `-f dangling=true`.
  Volumes are 'allocated space' for containers. Namely, when we load our node_modules into a container, they are stored in a volume.
  Un-used Volumes mean the container that used that space has been removed, but the volume still exists.
  You can remove volumes using: `docker volume rm <volume id>`

All of the above remove commands for images/containers/volumes can be run on more than one id/name at once by adding a space between them.
e.g. `docker rm 6caf36c70d1b 9b590fa894be` This would remove both containers.

See [troubleshooting](#troubleshooting) before running any commands to remove images/containers/volumes unless otherwise specified in a section below (i.e. when [adding dependencies](#dependencies))

### docker-compose command
Docker-compose allows us to create environments built out of multiple containers. In our case Node & Postgres

To run a docker-compose file we use the command `docker-compose -f <filename> up`. docker-compose automatically merges files if more than one is listed. So `docker-compose -f docker-comp-dev.yml -f docker-comp-dev-hot.yml up`  merges the two docker-comp files together and uses the resulting settings. Settings in the second file overwrite settings in the first file.


<a id="dockerfiles"></a>

## Dockerfiles

Our current workflow should not require you to build images. however if you want to restore a database from a dump or build a fresh version of the dependencies image (node_modules) for some reason, continue reading...

As mentioned before, images are essentially blueprints to create containers (running environments).
To create these images we use the `docker build` command. This in turn builds images from a set of instructions listed in a Dockerfile.

There are currently four dockerfiles:

  Dockerfile-ubuntu-got-friends: Base Ubuntu image with bash, node, and npm pre-installed. We use this image to build out the dev and prod images

  Dockerfile-dev: Copies the current local copy of package.json (also package-lock) to the base 'app' folder in the container and runs npm install to populate node_modules in the Docker container

  Dockerfile-prod: Does the above while also copying the codebase into the container. Build:prod is run, port 3000 is exposed, and npm start is run.

  Dockerfile-postgres: Base is Postgres 9.6.8. This image copies `/scripts/postgres-db/psql_dump.sql` into `/docker-entrypoint-initdb.d/`. Scripts in this folder are run when the container is first created. This allows for restoring a database from a pg_dump. More on this below...

Having removed any of these images (see above for commands) you can rebuild them using the files in your environment. The commands are as follows:

`docker build -t samanthasalley/<dependency-image-name> -f Dockerfile-dev .` This will re-build your node_modules dependencies image.

`docker build -t samanthasalley/<db-image-name> -f Dockerfile-postgres .` This will re-build your postgres image.

The `samanthasalley/ubuntu-got-friends` image you should never have to build. It is only used as a base for our other images. It will get pulled down from the cloud for you the first time you run a command requiring it.


<a id="scripts"></a>

## Scripts

Scripts are defined in docker-compose.yml
````
services:
  <script name>:
      image: samanthasalley/<image-name> (e.g. dependencies)
      // specify port to exponse e.g. 3000:80, expose container's port 80 to host's 3000)
      ports: HOST:CONTAINER
      // Specify folders to mount
      // mount a relative path on host that is mapped relatively to the container directory
      volumes:
        - HOST:CONTAINER
      // Specify command for container to run, typically npm scripts
      command:
        - npm start
````


<a id="get-started"></a>

## Getting started with Docker

1. Download and install Docker's desktop client [here](https://docs.docker.com/install)
2. Signup for a Docker Cloud account [here](https://cloud.docker.com/)
3. Make sure you have access to the dockerhub organization for push access (this step is only necessary if you need to [add dependencies](#dependencies) to package.json)
4. Remove any local instances of node_modules - this is already in the docker container. **DO NOT** run `npm install` locally.


<a id="how-to-run"></a>

## How to run

REMOVE YOUR LOCAL `node_modules` FOLDER, **DO NOT** RUN `npm install` LOCALLY
They exist within the docker image.

Webpack Dev Server w/ hot-reloading: 
  `npm run docker-dev:hot` OR `docker-compose run --rm --service-ports dev-hot`

The first time you spin up the dev server with hot-reload docker will pull the latest image(s) from DockerHub and build, which may take some time.  Subsequent runs of the server should be quicker because the images will already exist on your local machine.  

New image(s) will be pulled and rebuilt if you remove the current images from your machine, which you may need to do if, for example, someone else adds a new dependency (see [dependencies](#dependencies)) or if something happens to your local instance (see [troubleshooting](#troubleshooting)).


<a id="shortcuts"></a>

### Other Helpful Docker Shortcuts

Build Development: 
  `npm run docker-build:dev`

Remove dependencies image (node_modueles) only:
  `npm run image-remove`

Build dependencies image (node_modueles) from local package.json: 
  `npm run image-build`

* Note: you may want to do the above commands (remove image and rebuild from local package.json) if you [add a new dependency](#dependencies) and want to test it locally before pushing up to docker.

Stop all currently running containers: 
  `npm run docker-stop`

* Note: stopping all running containers is helpful if you run into a situation where your dev server seems to be cached/stuck on an older version of changes.  Because we are running 3 containers at once with dev-hot, sometimes they don't all stop by just using the typical _CMD/CTRL + C_.  This docker-stop command ensures that all running containers are stopped so that you can restart your server cleanly.

Remove all containers, images, and volumes specific to this project: 
  `npm run docker-remove-all:danger`

* **Note: see [troubleshooting](#troubleshooting) section before running this command.**


<a id="dependencies"></a>

## Updating node_modules

To update dependencies, run (from app root directory):

1. Add new dependency(ies) locally:

    - `npm run add-dep <PACKAGE-1> <PACKAGE-2> ... <PACKAGE-n>` (regular dependencies)

    - `npm run add-dep dev <PACKAGE-1> <PACKAGE-2> ... <PACKAGE-n>` (dev dependencies)
  
2. Run the following to remove your existing images and rebuild using your local package.json which was updated in the previous step

    2a. `npm run docker-remove-all:danger` OR `docker rm $(docker ps -a -q -f 'name=<container-name-partial>') --force && docker rmi $(docker images samanthasalley/<image-name-partial>* -q) --force && docker volume rm $(docker volume ls -q -f name=<volume-name-partial>) --force` (remove old images from local machine)

    2b. `npm run image-build` OR `docker build -t samanthasalley/<image-name> -f Dockerfile-dev .` (create new image with Dockerfile)

    2c. `npm run docker-dev:hot` OR `docker-compose -f docker-comp-dev.yml -f docker-comp-dev-hot.yml up` (pull down postgres and dev-hot images, while keeping the new local dependencies image build)

3. Once you are happy with your updates, make sure to push the new dependencies image up to DockerHub so everyone else can use the new / updated package(s)

    3a. Login with DockerCloud (DockerHub) account: `docker login` (username: &lt;yourdockerid&gt;, password: &lt;yourpw&gt;) 
    
    * **NOTE**: You need permissions on dockerhub to do this

    3b. Push / Update Dependencies image on DockerHub: `docker push samanthasalley/<image-name>`

    3c. Now everyone has access to new image.  They will need to update their existing dependencies image by either running `npm run update-dep` OR removing their existing image (`npm run image-remove`) and then running a docker-compose command (i.e. `npm run docker-dev:hot`).


<a id="database"></a>

## Database Containers - psql

### Overview:
The database containers created by docker-compose are as follows:

- In development, a postgres-db container is created as well as a postgres-data container. The postgres-db container has the psql client in it.

- The postgres-data container is a lightweight busybox container which essentially just holds the data from your database instance in it's volumes. This means you can start and stop the databse container, remove it, etc.. and your data will be persisted by the postgres-data container. So if you start another postgres-db instance it will re-connect to the postgres-data again. If you delete your postgres-data container you will lose your database contents.

TL:DR - postgres-db (psql), postgres-data (data persistence in volume)

<a id="psql"></a>

### psql:
To psql into your database run your development environment (`npm run docker-dev` or `npm run docekr-dev:hot`)
This will start your database containers. In a seperate terminal you can now `bash` into the running containers.

  - Direct to psql inside docker container: `docker exec -it got-friends-postgres psql gotfriends -U gotcha` this will start psql for you as the csxuser in gotfriends.

  - Command prompt in docker container (not direct psql): `docker exec -it got-friends-postgres /bin/bash` this will give you the command prompt inside the container without running psql.

  - You can also run `docker-compose -f docker-comp-postgres.yml up` This will start just the database containers for you (no app).


<a id="pg-dump"></a>

### database pg_dump
To make a dump of your database:

  1. Get the containers running (`npm run docker-dev` or `npm run docker-dev:hot`) OR `docker-compose -f docker-comp-postgres.yml up`.

  2. Now in a seperate terminal run: `docker exec got-friends-postgres ./usr/lib/postgresql/9.6/bin/pg_dump -f /postgres-db/psql_dump.sql -U gotcha gotfriends`

      - This will dump your schema and data to the file `/scripts/postgres-db/psql_dump.sql` - (This file should be kept blank/empty by default)

To restore database from this dump:

  1. Delete `samanthasalley/got-friends-postgres` image and re-build it, see [Dockerfiles](#dockerfiles). 
  
      - It will be rebuilt with the contents from `/scripts/postgres-db/psql_dump.sql`. That is why this file should be kept blank/empty by default, save restoring database with incorrect data by accident.


<a id="testing"></a>

## Updating testing snapshots
If you make updates to a component and then tests are failing due to something along the lines of `snapshots do not match`, you'll want to update your snaphots inside the docker container by running:

```
docker-compose run --rm --service-ports test-updateSnapshot
```

**Note:** Make sure to verify that you _expect_ the snapshots to be different before running this command.  If you are getting this error and you didn't update the component, check to see what the differences are between them.


<a id="troubleshooting"></a>

## Trouble-shooting

### If you're having issues with your docker images being out of date

If you're getting an error like:
```
ERROR: for 9205b4d077_<container-name> no such image: sha43gyj34823ghj2427ghjb43jg343: No such image: sha43gyj34823ghj2427ghjb4323ff44hj789783hg322

ERROR: The image for the service you're trying to recreate has been removed. If you continue, volume data could be lost.
```
This is caused by an old container still being connected to a volume, even if you have deleted said container.

Out of date images can also manifest as unavailable library resources (even when they appear to be installed).

The solution for these issues is to remove all your containers, images, and volumes associated with the current application.

Shortcut: NOTE: This will remove all of your containers, images, and volumes for this app (Only use this if you do not have containers/volumes you need)

The shortcut for this is `npm run docker-remove-all:danger`.  By running this command the following will happen sequentially:

1. `docker rm $(docker ps -a -q -f 'name=<name-partial>') --force`: force removes all containers which contain '<name-partial>' in the name
2. `docker rmi $(docker images samanthasalley/<name-partial>* -q) --force`: force removes all images which begin with 'samanthasalley/<name-partial>'
3. `docker volume rm $(docker volume ls -q -f name=<name-partial>) --force`: force removes all volumes which contain the name '<name-partial>'

If you then run `npm run docker-dev:hot` and/or `npm run docker-build:[dev|prod]` docker will pull down the latest images from DockerHub and rebuild
