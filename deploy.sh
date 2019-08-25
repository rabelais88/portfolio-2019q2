docker build -t portfolio-www:latest -f build-www.Dockerfile .
docker build -t portfolio-admin:latest -f build-admin.Dockerfile .
docker build -t portfolio-api:latest -f build-api.Dockerfile .
docker image prune -f