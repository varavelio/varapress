#!/bin/bash

# Create the root's .bashrc
cat << 'EOF' >> /root/.bashrc

# Define command aliases
alias ll='ls -alh'
alias c='clear'
alias n='npm'
alias task='npm run'
alias t='npm run'

# Set the user file-creation mode mask to 000
umask 000

EOF

# Configure file permissions for the /workspaces directory
chmod -R 777 /workspaces

# Configure git
git config core.fileMode false

# Install project dependencies
npm install
