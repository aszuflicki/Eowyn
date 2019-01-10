#!/bin/bash

docker rmi nodeapp --force

docker build -t nodeapp  .

