#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular E2E Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

testacular start $BASE_DIR/../config/testacular-e2e.conf.js $*