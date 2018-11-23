#!/bin/bash

docker rm   api-gateway --force

docker run -p 7081:8080 --name api-gateway -d api-gateway

docker logs -t -f api-gateway
# docker exec -it gate sh


