#!/bin/bash

# Fix OpenBlock Desktop Dependencies Script
# This script fixes the dependency issues that cause the app to crash

echo "🔧 Fixing OpenBlock Desktop Dependencies"
echo "========================================"

# Navigate to the root directory
cd "$(dirname "$0")"

echo ""
echo "📦 Installing dependencies for all packages..."

# Install dependencies for openblock-blocks
echo "Installing openblock-blocks dependencies..."
cd openblock-blocks
npm install
cd ..

# Install dependencies for openblock-vm
echo "Installing openblock-vm dependencies..."
cd openblock-vm
npm install
cd ..

# Install dependencies for openblock-gui
echo "Installing openblock-gui dependencies..."
cd openblock-gui
npm install
cd ..

# Install dependencies for openblock-link
echo "Installing openblock-link dependencies..."
cd openblock-link
npm install
cd ..

# Install dependencies for openblock-resource
echo "Installing openblock-resource dependencies..."
cd openblock-resource
npm install
cd ..

# Install dependencies for desktop app
echo "Installing desktop app dependencies..."
cd openblocks-desktop-version/openblock-desktop
npm install
cd ../..

echo ""
echo "🔗 Creating local package links..."

# Create local links for all packages
cd openblock-gui
npm link
echo "✅ Linked openblock-gui"

cd ../openblock-vm
npm link
echo "✅ Linked openblock-vm"

cd ../openblock-blocks
npm link
echo "✅ Linked openblock-blocks"

cd ../openblock-link
npm link
echo "✅ Linked openblock-link"

cd ../openblock-resource
npm link
echo "✅ Linked openblock-resource"

# Link all packages in the desktop app
cd ../openblocks-desktop-version/openblock-desktop
npm link openblock-gui openblock-vm openblock-blocks openblock-link openblock-resource
echo "✅ Linked all packages in desktop app"

echo ""
echo "🧹 Cleaning build artifacts..."
npm run clean

echo ""
echo "🔨 Building packages..."

# Build openblock-blocks
echo "Building openblock-blocks..."
cd ../../openblock-blocks
npm run prepublish
cd ..

# Build openblock-vm
echo "Building openblock-vm..."
cd openblock-vm
npm run build
cd ..

# Build openblock-gui
echo "Building openblock-gui..."
cd openblock-gui
npm run build
cd ..

echo ""
echo "🎯 Dependencies Fixed!"
echo "======================"
echo ""
echo "Next steps:"
echo "1. Navigate to openblocks-desktop-version/openblock-desktop"
echo "2. Run 'npm start' to start development mode"
echo ""
echo "The application should now start without crashing!"
echo ""
echo "If you still encounter issues, try:"
echo "- npm run clean (in desktop directory)"
echo "- Delete node_modules and reinstall"
echo "- Check console for specific error messages"



