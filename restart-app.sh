#!/bin/bash

echo "🔄 Restarting OpenBlock Desktop Application with fixes..."
echo "=========================================================="

# Kill any existing processes
echo "Stopping existing processes..."
pkill -f "openblock-desktop" || true
pkill -f "electron" || true

# Wait a moment for processes to stop
sleep 2

# Navigate to desktop app directory
cd openblocks-desktop-version/openblock-desktop

echo ""
echo "🚀 Starting application with fixes applied..."
echo "The update checker has been disabled for development mode"
echo "External resources directory has been created"
echo ""

# Start the application
npm start



