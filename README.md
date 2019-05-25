# docker-node-react-sass-boilerplate

## Variables to overwrite when starting a new project

### Application
* <app-name> {got-friends}: the docker app name
* <favicon-url>: used in webpack configs for favicon ico filepath

### Database
* <db-password> {gotme}: database password
* <db-username> {gotcha}: database username
* <db-name> {gotfriends}: database name

### Docker
* <docker-org-name> {samanthasalley}: the DockerHub org / username where images live
* <container-name>: dev, dev-hot, or postgres-db container (will need to look at specific context)
* <specific-container-name>: the name of the docker container for the specified thing (i.e. dependencies / database / etc)
* <image-name>: dependency or database image name (will need to look at specific context)
* <specific-image-name>: the name of the docker image for the specified thing (i.e. dependencies / database / etc)
* got-friends: the specific starter of the container/image/volume name in order to remove all at once for this project

### AWS
* <aws-ecr>: aws ecr id for this project (where build docker images will be stored for production)
* <aws-region>: short, url region code for aws urls
* <eb-bucket>: aws elastic beanstalk bucket for this application
* <aws-app-name>: aws application name (may be different from docker app-name, but ideally keep these consistent)

## Frontend

### Technologies

This boilerplate uses the following frameworks/libs/configurations for main frontend application (this is not an exhaustive list, but includes the main ones):
* react-router: For navigation routing
* react-redux: For state management
* react-ga: For google analytics
  * LocationListener: custom component which wraps around whole application and handles invoking react-ga functionality
* redux-form: For form/field management
* sass: For nested styling and variables, functions, and mixins
* css-modules: For scoped component styling
* prop-types: For better prop validation

## Backend

### Technologies

This boilerplate uses the following frameworks/libs/configurations for main backend application (this is not an exhaustive list, but includes the main ones):
* Node
* Express
* Postgres

## Testing

This boilerplate includes infrastructure for testing with Jest and Enzyme

## Getting Started

Refer to docs/GettingStarted.md