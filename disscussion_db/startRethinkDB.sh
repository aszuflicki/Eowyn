#!/bin/bash

docker rm -f rethinkdb

docker run --name rethinkdb --network eowyn-net -p 28015:28015 -d rethinkdb

