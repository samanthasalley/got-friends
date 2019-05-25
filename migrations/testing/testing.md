Use this folder to create any scripts you just want run on your testing database.
These scripts will be run in testing on your local machine as well as by travis during build time for production.

To do this run:

`docker-compose run --rm --service-ports bash`

Once in the running container:
`db-migrate create:testing <new_migration>`.
You can run this command many times, creating as many scripts as you like in this folder.

Please read db-migrate documentation for more info.