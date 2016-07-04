#!/usr/bin/env bash

function run_command() {
    cmd=`shift`
    echo "[RUN] $cmd $*" 1>&2
    $cmd $*
}

while read; do
    true;
done

if [ ! -x web ]; then
    run_command mkdir web
fi
run_command ./node_modules/.bin/browserify -t babelify -d src/Main.js > web/main.js
run_command cp src/index.html web/
