@REM (c) dbj@dbj.org CC BY SA 4.0
@echo off

@REM Be sure to read and understand 
@REM https://towardsdatascience.com/a-complete-guide-to-using-environment-variables-and-files-with-docker-and-compose-4549c21dc6af

docker-compose down --rmi all

@REM docker-compose up -d
docker-compose up