#!/bin/bash

set -euv -o pipefail

# Clean old docker images
docker system prune -f || true

# (re)build the Docker image to pull down any Verus updates from GitHub
cd /home/playground/rust-playground/compiler/verus/ && docker build -t verus .

# Restart to get new server binary
if [[ -z "${previous_binary_hash}" ]] || ! md5sum -c <(echo "${previous_binary_hash}") --status; then
    sudo service playground stop || true
    sudo service playground start
fi
