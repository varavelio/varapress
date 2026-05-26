#!/bin/bash
set -e

LUCIDE_VERSION="1.16.0"
SIMPLE_ICONS_VERSION="16.21.0"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICONS_DIR="$SCRIPT_DIR/../static/icons"
TMP_DIR="$(mktemp -d)"

wget -q -O $TMP_DIR/LICENSE-SIMPLE-ICONS https://raw.githubusercontent.com/simple-icons/simple-icons/refs/tags/$SIMPLE_ICONS_VERSION/LICENSE.md
wget -q -O $TMP_DIR/simple-icons.zip https://github.com/simple-icons/simple-icons/archive/refs/tags/$SIMPLE_ICONS_VERSION.zip
unzip -q $TMP_DIR/simple-icons.zip -d $TMP_DIR/simple-icons

wget -q -O $TMP_DIR/LICENSE-LUCIDE https://raw.githubusercontent.com/lucide-icons/lucide/refs/tags/$LUCIDE_VERSION/LICENSE
wget -q -O $TMP_DIR/lucide.zip https://github.com/lucide-icons/lucide/releases/download/$LUCIDE_VERSION/lucide-icons-$LUCIDE_VERSION.zip
unzip -q $TMP_DIR/lucide.zip -d $TMP_DIR/lucide

# Clean up directory and move licenses
rm -rf $ICONS_DIR && mkdir -p $ICONS_DIR
mv $TMP_DIR/LICENSE-SIMPLE-ICONS $ICONS_DIR/LICENSE-SIMPLE-ICONS
mv $TMP_DIR/LICENSE-LUCIDE $ICONS_DIR/LICENSE-LUCIDE

# Move simple icons and lucide icons in order of priority (most important last)
mv -f $TMP_DIR/simple-icons/simple-icons-$SIMPLE_ICONS_VERSION/icons/*.svg $ICONS_DIR
mv -f $TMP_DIR/lucide/icons/*.svg $ICONS_DIR

# Download Varavel logo
rm -rf $ICONS_DIR/varavel.svg
wget -q -O $ICONS_DIR/varavel.svg https://raw.githubusercontent.com/varavelio/brand/refs/tags/v1.0.2/dist/logo-black.svg

# Clean up temporary directory
rm -rf $TMP_DIR
