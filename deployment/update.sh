#!/bin/bash

set -euv -o pipefail

# Clean old docker images
docker system prune -f || true

# (re)build the Docker image to pull down any Verus updates from GitHub
cd /home/playground/verus-playground/compiler/verus/ && docker build -t verus .

# Restart to get new Verus binary
sudo service playground stop || true
sudo service playground start
