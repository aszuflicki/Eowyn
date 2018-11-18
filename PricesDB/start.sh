docker rm -f prices_db

docker run -d --name prices_db -v $(pwd)/init:/docker-entrypoint-initdb.d -p 5432:5432  prices_db
