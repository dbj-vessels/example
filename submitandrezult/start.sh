#!/bin/sh

# start it in the background
nohup redis-server &

# start the node app
node submitandrezult.js