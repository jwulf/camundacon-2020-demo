#!/bin/bash
(docker rmi $(docker images -a -q))
docker build --no-cache -t server .