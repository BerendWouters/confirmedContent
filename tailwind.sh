#!/bin/bash

DIR=$(cd `dirname $0` &&PWD)

echo $DIR

docker run --rm --interactive --volume $DIR:/root --workdir /root node npm install -D tailwindcss
