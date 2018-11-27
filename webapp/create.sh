#!/bin/bash

docker rmi webapp --force

docker build -t webapp  .

