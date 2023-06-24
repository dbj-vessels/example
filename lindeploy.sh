# (c) dbj@dbj.org CC BY SA 4.0
#
# Be sure to read and understand 
# https://towardsdatascience.com/a-complete-guide-to-using-environment-variables-and-files-with-docker-and-compose-4549c21dc6af
#
clear

# Of course you realise this will provoke rebuild all each time you start this script
# docker-compose down --rmi all

# for daemon add -d
docker-compose up
