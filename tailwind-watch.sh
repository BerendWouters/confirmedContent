#!/bin/bash

DIR=$(cd `dirname $0` &&PWD)

echo $DIR

docker run --rm -t --init --interactive --volume $DIR:/root --workdir /root node npx tailwindcss -i ./src/style.css -o ./public/style.css --watch