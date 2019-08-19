docker build -t portfolio-www:latest -f www-build.Dockerfile .
docker build -t portfolio-admin:latest -f admin-build.Dockerfile .
docker build -t portfolio-api:latest -f api-build.Dockerfile .