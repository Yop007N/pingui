#!/bin/bash

docker build -t pingui .
docker run -p 3000:3000 pingui
