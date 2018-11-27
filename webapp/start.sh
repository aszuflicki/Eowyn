#!/bin/bash

docker rm   web-app  --force

docker run -p 7080:80 --name webapp -d webapp

docker logs -t -f webappp
# docker exec -it gate sh


