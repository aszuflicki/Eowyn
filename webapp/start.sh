#!/bin/bash

docker rm   webapp  --force

docker run -p 8080:80 --name webapp -d webapp

docker logs -t -f webapp


