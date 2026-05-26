#!/bin/bash
set -e

VERSION="1.7.0"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FONTS_DIR="$SCRIPT_DIR/../static/fonts"

rm -rf $FONTS_DIR && mkdir -p $FONTS_DIR
wget -q -O $FONTS_DIR/LICENSE-GEIST https://cdn.jsdelivr.net/npm/geist@$VERSION/LICENSE.txt
wget -q -P $FONTS_DIR https://cdn.jsdelivr.net/npm/geist@$VERSION/dist/fonts/geist-sans/Geist-Variable.woff2
wget -q -P $FONTS_DIR https://cdn.jsdelivr.net/npm/geist@$VERSION/dist/fonts/geist-mono/GeistMono-Variable.woff2
