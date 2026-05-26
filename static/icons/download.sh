#!/bin/bash
set -e

VERSION="1.16.0"

rm -rf ./lucide && mkdir -p ./lucide
wget -q -P ./lucide https://raw.githubusercontent.com/lucide-icons/lucide/refs/tags/$VERSION/LICENSE
wget -q -P ./lucide https://github.com/lucide-icons/lucide/releases/download/$VERSION/lucide-icons-$VERSION.zip
unzip -q ./lucide/lucide-icons-$VERSION.zip -d ./lucide
rm ./lucide/lucide-icons-$VERSION.zip
