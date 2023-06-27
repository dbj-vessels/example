@cls
@REM  quick local test

docker container stop cluster_quick
docker container rm cluster_quick

docker image rm sampleapp-cluster:dbj
docker build -t sampleapp-cluster:dbj .

@REM docker run -e cluster_PORT=6363  -p 6363:6363 --name cluster_quick sampleapp-cluster:dbj

docker run -itd -e CLUSTER_SLEEP=5000 --name cluster_quick sampleapp-cluster:dbj