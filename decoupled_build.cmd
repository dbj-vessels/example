@echo off

@REM Be sure to read and understand https://www.webmound.com/nodejs-environment-variables/

set BACKEND_PORT=3000
set BACKEND_HOSTNAME=backend

set FRONTEND_PORT=8282
set FRONTEND_HOSTNAME=frontend

docker-compose up