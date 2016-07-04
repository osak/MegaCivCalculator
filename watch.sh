#!/usr/bin/env bash

./node_modules/.bin/watchify -t babelify src/Main.js -o 'bash build.sh | cat' -v
