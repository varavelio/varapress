#!/bin/bash
set -e

VERSION="3.15.12"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ALPINE_DIR="$SCRIPT_DIR/../static/libs/alpinejs"

rm -rf $ALPINE_DIR && mkdir -p $ALPINE_DIR
wget -q -O $ALPINE_DIR/LICENSE https://raw.githubusercontent.com/alpinejs/alpine/refs/tags/v$VERSION/LICENSE.md
wget -q -O $ALPINE_DIR/alpine.min.js https://cdn.jsdelivr.net/npm/alpinejs@3.15.12/dist/cdn.min.js
