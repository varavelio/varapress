#!/bin/bash
set -e

LUCIDE_VERSION="1.16.0"
SIMPLE_ICONS_VERSION="16.21.0"

rm -rf ./lucide && mkdir -p ./lucide
wget -q -P ./lucide https://raw.githubusercontent.com/lucide-icons/lucide/refs/tags/$LUCIDE_VERSION/LICENSE
wget -q -P ./lucide https://github.com/lucide-icons/lucide/releases/download/$LUCIDE_VERSION/lucide-icons-$LUCIDE_VERSION.zip
unzip -q ./lucide/lucide-icons-$LUCIDE_VERSION.zip -d ./lucide
mv ./lucide/icons/*.svg ./lucide
rm -rf ./lucide/icons
rm ./lucide/lucide-icons-$LUCIDE_VERSION.zip

rm -rf ./simple-icons && mkdir -p ./simple-icons
wget -q -P ./simple-icons https://raw.githubusercontent.com/simple-icons/simple-icons/refs/tags/$SIMPLE_ICONS_VERSION/LICENSE.md
wget -q -P ./simple-icons https://github.com/simple-icons/simple-icons/archive/refs/tags/$SIMPLE_ICONS_VERSION.zip
unzip -q ./simple-icons/$SIMPLE_ICONS_VERSION.zip -d ./simple-icons
mv ./simple-icons/simple-icons-$SIMPLE_ICONS_VERSION/icons/*.svg ./simple-icons
rm -rf ./simple-icons/simple-icons-$SIMPLE_ICONS_VERSION
rm ./simple-icons/$SIMPLE_ICONS_VERSION.zip
