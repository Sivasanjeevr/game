#!/bin/bash

echo "Cleaning up OpenBlock Desktop dependencies..."

# Remove extraneous packages
echo "Removing extraneous packages..."
npm uninstall bindings file-uri-to-path nan

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Remove node_modules and reinstall
echo "Removing node_modules..."
rm -rf node_modules
rm -f package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Install app dependencies for Electron
echo "Installing Electron app dependencies..."
npm run postinstall

echo "Cleanup completed!"
echo "You can now run 'npm start' to start the application."

