docker rm -f prices_db

docker run -d --name prices_db -p 5432:5432  prices_db
