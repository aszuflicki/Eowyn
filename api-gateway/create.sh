#!/bin/bash

docker rmi api-gateway --force

docker build -t api-gateway .

