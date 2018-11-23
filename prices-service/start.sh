docker rm -f prices_service

docker run -d --name prices_service --network eowyn-net -p 7001:7001  prices_service
