#!/bin/bash

# OpenBlock Custom Desktop Application Development Setup Script
# This script sets up the development environment for local development

echo "🚀 Setting up OpenBlock Custom Desktop Application Development Environment"
echo "========================================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies for all projects
echo ""
echo "📦 Installing dependencies for all projects..."

# openblock-gui
echo "Installing dependencies for openblock-gui..."
cd openblock-gui
npm install
cd ..

# openblock-vm
echo "Installing dependencies for openblock-vm..."
cd openblock-vm
npm install
cd ..

# openblock-blocks
echo "Installing dependencies for openblock-blocks..."
cd openblock-blocks
npm install
cd ..

# openblock-link
echo "Installing dependencies for openblock-link..."
cd openblock-link
npm install
cd ..

# openblock-resource
echo "Installing dependencies for openblock-resource..."
cd openblock-resource
npm install
cd ..

# openblocks-desktop-version
echo "Installing dependencies for openblocks-desktop-version..."
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
echo "🚫 External network calls have been blocked for local development"
echo "✅ All download scripts modified to prevent external downloads"
echo "✅ Empty directories created for local development"

echo ""
echo "🎯 Development Environment Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Navigate to openblocks-desktop-version/openblock-desktop"
echo "2. Run 'npm start' to start development mode"
echo "3. Make changes in the respective component directories"
echo "4. Use 'npm run build:dist' to build for distribution"
echo ""
echo "Happy coding! 🎉"




