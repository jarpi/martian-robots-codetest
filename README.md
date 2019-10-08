[![Build Status](https://travis-ci.com/jarpi/martian-robots-codetest.svg?token=qdMk6K1Jr4EkQHxx749Z&branch=master)](https://travis-ci.com/jarpi/martian-robots-codetest)

# Fancy Mars robot controller
  - Based on input commands get the last position of one or several spaceships

# How to run?
``` npm install && npm start ```

# How to dev?
  ``` npm install && npm tdd ```

# How to run unit tests?
  ``` npm test ```

# REST API
 - Shoot straight with curl
``` curl -XPOST -H "Content-Type: application/json" -d '{"instructions":"5 3\n1 1 E\nRFRFRFRF"}' http://127.0.0.1:30010/execute-robot-instructions ```

  - Grab the postman tests and environment files from src/api/test/postman

# Trello
  - You can follow the development [in this board ](https://trello.com/b/ZTYXWWRF/martian-robots)

# Docker image
  - Travis CI in place that builds and pushes the docker image to dockerhub registry
  [Docker image](https://hub.docker.com/r/jarpi/martian-robots-codetest)
  ``` docker pull jarpi/martian-robots-codetest && docker run -p 8080:8080 jarpi/martian-robots-codetest ```
