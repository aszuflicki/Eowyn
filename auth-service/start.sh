docker rm -f auth_service

docker run -d --name auth_service --network eowyn-net -p 7002:7002  auth_service
