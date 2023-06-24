@cls
@REM  quick local test

docker image rm sampleapp-noderis:dbj
docker build -t sampleapp-noderis:dbj .

@REM REDIS_HOST_NAME=localhost
@REM REDIS_PORT=6380
@REM REDIS_ACCESS_KEY=whatever

docker container stop noderis_quick
docker container rm noderis_quick

docker run -e NODERIS_PORT=6363  -p 6363:6363 --name noderis_quick sampleapp-noderis:dbj