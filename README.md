# GOT Friends

A Node/React application built on top of the Game of Thrones API (An API of Ice and Fire) which pulls and manipulates various regional and character data to display in visualizations rendered with React-Vis visualization library.

## To Run

This repository is containerized using Docker. Make sure you have Docker installed / configured.

Clone this repository `git clone https://github.com/samanthasalley/got-friends.git`

Build the dependencies image `npm run docker-build:image`

Start the containerized fullstack application `npm run docker-dev:hot`

React application served at: `localhost:8080`

Server endpoint: `localhost:3000`