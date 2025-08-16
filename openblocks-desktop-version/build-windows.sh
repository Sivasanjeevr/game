#!/bin/bash

# Build Windows Executable from Linux
# This script modifies the build configuration to generate Windows .exe files

echo "🔨 Building Windows Executable from Linux..."
echo "=============================================="

# Navigate to the desktop app directory
cd openblock-desktop

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the openblock-desktop directory."
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "🖥️  Current platform: $(uname -s)"

# Create a temporary electron-builder config for Windows builds
echo "⚙️  Creating Windows-specific build configuration..."

cat > electron-builder-windows.yaml << 'EOF'
directories:
  buildResources: buildResources
  output: dist
extraFiles: ['LICENSE', 'LICENSE.ScratchFoundation', 'TRADEMARK', "tools", "external-resources", 'firmwares', "drivers"]

appId: openblock.cc.openblock-desktop
productName: "OpenBlockDesktop"
publish:
  - provider: github
artifactName: "OpenBlock-Desktop_v${version}_${os}_${arch}.${ext}"

fileAssociations:
  ext: ob
  name: OpenBlock project file
  role: Editor
  icon: buildResources/OpenBlockDesktop.ico

compression: maximum

win:
  icon: buildResources/OpenBlockDesktop.ico
  target:
    - nsis
    - portable
nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  include: buildResources/installer.nsh
  buildUniversalInstaller: false

# Force Windows builds only
platforms:
  - win32
EOF

echo "✅ Windows configuration created"

# Check if required dependencies are installed
echo "🔍 Checking dependencies..."

# Check for wine (needed for Windows builds on Linux)
if ! command -v wine &> /dev/null; then
    echo "⚠️  Wine not found. Installing wine..."
    sudo apt-get update
    sudo apt-get install -y wine64
else
    echo "✅ Wine is installed"
fi

# Check for mono (needed for Windows builds)
if ! command -v mono &> /dev/null; then
    echo "⚠️  Mono not found. Installing mono..."
    sudo apt-get install -y mono-complete
else
    echo "✅ Mono is installed"
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Compile the application
echo "🔨 Compiling application..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

echo "✅ Compilation successful"

# Create external resources directory if it doesn't exist
if [ ! -d "external-resources" ]; then
    echo "📁 Creating external-resources directory..."
    mkdir -p external-resources
fi

# Build Windows executable using electron-builder directly
echo "🚀 Building Windows executable..."

# Set environment variables for cross-platform build
export ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true
export ELECTRON_BUILDER_CACHE=/tmp/electron-builder-cache

# Run electron-builder for Windows
npx electron-builder --config electron-builder-windows.yaml --win --x64 --ia32

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Windows build successful!"
    echo "📁 Check the 'dist' directory for your Windows executables:"
    ls -la dist/
    
    # Show specific Windows files
    echo ""
    echo "📋 Windows build outputs:"
    find dist/ -name "*.exe" -o -name "*.msi" -o -name "*.zip" | head -10
    
    echo ""
    echo "💡 You can now distribute these files to Windows users!"
else
    echo "❌ Windows build failed!"
    echo "💡 Common issues and solutions:"
    echo "   1. Make sure Wine is properly installed: sudo apt-get install wine64"
    echo "   2. Make sure Mono is installed: sudo apt-get install mono-complete"
    echo "   3. Check if you have enough disk space"
    echo "   4. Try running: wine --version"
    exit 1
fi

# Clean up temporary config
echo "🧹 Cleaning up temporary files..."
rm -f electron-builder-windows.yaml

echo ""
echo "✅ Windows build process completed!"
echo "📁 Your Windows executables are in the 'dist' directory"
