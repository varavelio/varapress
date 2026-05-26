#!/bin/bash

VERSION="1.7.0"

rm -rf ./geist && mkdir -p ./geist
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@$VERSION/LICENSE.txt
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@$VERSION/dist/fonts/geist-sans/Geist-Variable.woff2
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@$VERSION/dist/fonts/geist-mono/GeistMono-Variable.woff2
