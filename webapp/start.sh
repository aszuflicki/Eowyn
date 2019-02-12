#!/bin/bash

docker rm   webapp  --force

docker run -p 5000:80 --name webapp -d webapp

docker logs -t -f webapp


