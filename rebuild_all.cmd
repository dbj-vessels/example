@REM (c) dbj@dbj.org CC BY SA 4.0
@echo off
@cls

@REM Be sure to read and understand 
@REM https://towardsdatascience.com/a-complete-guide-to-using-environment-variables-and-files-with-docker-and-compose-4549c21dc6af

@REM Of course you realise this will provoke rebuild, each time you start this scri
docker-compose down --rmi all

@REM for daemon add -d
docker-compose up -d