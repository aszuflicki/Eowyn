#!/bin/bash

docker rm -f rethinkdb

docker run --name rethinkdb -p 28015:28015 -d rethinkdb

