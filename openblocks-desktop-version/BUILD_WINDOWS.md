# Building Windows Executables from Linux

This guide explains how to generate Windows `.exe` files from the OpenBlock Desktop application on a Linux system.

## 🎯 Why This is Needed

By default, `npm run build` only builds for your current platform (Linux → `.deb` files). To create Windows executables, you need to either:
1. Cross-compile from Linux (this guide)
2. Use a Windows machine
3. Use a CI/CD pipeline with Windows runners

## 🚀 Quick Start

### Method 1: Using the Build Script (Recommended)

```bash
# Navigate to the openblocks-desktop-version directory
cd openblocks-desktop-version

# Run the Windows build script
./build-windows.sh
```

### Method 2: Using npm Script

```bash
# Navigate to the openblock-desktop directory
cd openblock-desktop

# Run the Windows build script
npm run build:windows
```

### Method 3: Manual Build

```bash
# Navigate to the openblock-desktop directory
cd openblock-desktop

# Compile the application
npm run compile

# Build Windows executables
npx electron-builder --win --x64 --ia32 --config electron-builder-windows.yaml
```

## 📋 Prerequisites

### Required Dependencies

1. **Wine** - Windows compatibility layer
   ```bash
   sudo apt-get update
   sudo apt-get install -y wine64
   ```

2. **Mono** - .NET framework for Linux
   ```bash
   sudo apt-get install -y mono-complete
   ```

3. **Node.js and npm** - Already installed if you're running the app

### Verify Installation

```bash
# Check Wine
wine --version

# Check Mono
mono --version

# Check Node.js
node --version
npm --version
```

## 🔧 Build Configuration

The Windows build uses a special configuration file: `electron-builder-windows.yaml`

### Key Features:
- **NSIS Installer** - Professional Windows installer
- **Portable Executable** - Standalone .exe file
- **ZIP Archive** - Compressed distribution
- **Cross-architecture** - Both x64 and ia32 builds

### Build Targets:
- `nsis` - Windows installer (.msi)
- `portable` - Standalone executable (.exe)
- `zip` - Compressed archive (.zip)

## 📁 Output Files

After a successful build, you'll find these files in the `dist/` directory:

```
dist/
├── OpenBlock-Desktop_v2.6.3_win_x64.exe          # Portable x64
├── OpenBlock-Desktop_v2.6.3_win_x64.msi          # Installer x64
├── OpenBlock-Desktop_v2.6.3_win_x64.zip          # Archive x64
├── OpenBlock-Desktop_v2.6.3_win_ia32.exe         # Portable ia32
├── OpenBlock-Desktop_v2.6.3_win_ia32.msi         # Installer ia32
└── OpenBlock-Desktop_v2.6.3_win_ia32.zip         # Archive ia32
```

## 🐛 Troubleshooting

### Common Issues

1. **Wine not found**
   ```bash
   sudo apt-get install -y wine64
   ```

2. **Mono not found**
   ```bash
   sudo apt-get install -y mono-complete
   ```

3. **Build fails with dependency errors**
   ```bash
   # Clean and reinstall
   npm run clean
   npm install
   ```

4. **Insufficient disk space**
   - Windows builds require significant disk space
   - Ensure you have at least 2GB free space

5. **Permission denied**
   ```bash
   chmod +x build-windows.sh
   ```

### Build Logs

If the build fails, check:
- Terminal output for error messages
- `dist/` directory for partial builds
- System resources (memory, disk space)

## 🔄 Alternative Approaches

### Option 1: Docker Build
```bash
# Use a Windows container for building
docker run --rm -v $(pwd):/app -w /app electronuserland/builder:wine
```

### Option 2: GitHub Actions
Set up a CI/CD pipeline that builds on Windows runners automatically.

### Option 3: Virtual Machine
Use a Windows VM for native builds.

## 📱 Distribution

### For End Users
- **NSIS Installer (.msi)** - Best for most users
- **Portable (.exe)** - Good for USB drives, no installation
- **ZIP Archive** - Good for developers, manual extraction

### File Sizes
- **x64 builds** - Larger, modern Windows systems
- **ia32 builds** - Smaller, compatible with older Windows

## 🎉 Success!

Once you have your Windows executables:
1. Test them on a Windows machine
2. Distribute to your users
3. Consider code signing for production releases
4. Set up automated builds for future releases

## 📚 Additional Resources

- [Electron Builder Documentation](https://www.electron.build/)
- [Wine Documentation](https://wiki.winehq.org/)
- [Mono Documentation](https://www.mono-project.com/)
- [Cross-Platform Building Guide](https://www.electron.build/multi-platform-build)

---

**Note**: Cross-compiling Windows executables from Linux can be complex. For production releases, consider using a Windows machine or CI/CD pipeline for more reliable builds.

