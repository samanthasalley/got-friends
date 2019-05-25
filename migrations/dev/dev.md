Use this folder to create any scripts you just want run on your local database. These scripts will not be run in production or staging.

To do this run:

`docker-compose run --rm --service-ports bash`

Once in the running container:
`db-migrate create:dev <new_migration>`.
You can run this command many times, creating as many scripts as you like in this folder.

Please read db-migrate documentation for more info.