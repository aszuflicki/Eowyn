docker rm -f nodeapp_db

docker network create --driver bridge eowyn-net

docker run -d --name nodeapp_db --network eowyn-net -v $(pwd)/init:/docker-entrypoint-initdb.d -p 5432:5432  nodeapp_db

docker logs -f nodeapp_db
