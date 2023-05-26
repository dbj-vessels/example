@REM (c) dbj@dbj.org CC BY SA 4.0
@echo off

@REM Be sure to read and understand 
@REM https://towardsdatascience.com/a-complete-guide-to-using-environment-variables-and-files-with-docker-and-compose-4549c21dc6af

set BACKEND_PORT=3000
set BACKEND_HOSTNAME=backend

set FRONTEND_PORT=8282
set FRONTEND_HOSTNAME=frontend

docker-compose down --rmi all

docker-compose up -d