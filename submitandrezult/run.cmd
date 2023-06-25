@cls
@REM  quick local test

docker image rm sampleapp-submitandrezult:dbj
docker build -t sampleapp-submitandrezult:dbj .

docker container stop submitandrezult_quick
docker container rm submitandrezult_quick

docker run -e SUBMITANDREASULT_PORT=7373  -p 7373:7373 --name submitandrezult_quick sampleapp-submitandrezult:dbj