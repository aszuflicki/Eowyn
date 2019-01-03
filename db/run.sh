docker rm -f nodeapp_db

docker run  \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -e MONGO_INITDB_DATABASE=abcd \
  -p 27018:27017 \
  --name nodeapp_db \
  mongo:3.6 