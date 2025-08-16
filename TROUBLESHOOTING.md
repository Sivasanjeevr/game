# OpenBlock Desktop Application Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. Application Crashes on Startup

**Symptoms:**
- Electron window opens but shows crash screen
- "Oops! Something went wrong" error
- Application closes immediately

**Causes:**
- Missing dependencies
- Incorrect package linking
- Build artifacts not generated
- Module resolution issues

**Solutions:**
```bash
# Run the fix script
chmod +x fix-dependencies.sh
./fix-dependencies.sh

# Or manually fix:
cd openblocks-desktop-version/openblock-desktop
npm run clean
rm -rf node_modules
npm install
npm link openblock-gui openblock-vm openblock-blocks openblock-link openblock-resource
```

### 2. Module Not Found Errors

**Symptoms:**
- Console shows "Cannot find module" errors
- Webpack build fails
- Application won't start

**Solutions:**
```bash
# Check if packages are linked
cd openblocks-desktop-version/openblock-desktop
npm ls openblock-gui openblock-vm openblock-blocks openblock-link openblock-resource

# Re-link packages if needed
npm link openblock-gui openblock-vm openblock-blocks openblock-link openblock-resource

# Verify package.json has correct dependencies
cat package.json | grep openblock
```

### 3. Build Failures

**Symptoms:**
- `npm run build` fails
- Webpack compilation errors
- Missing assets or files

**Solutions:**
```bash
# Clean and rebuild
cd openblocks-desktop-version/openblock-desktop
npm run clean

# Build dependencies first
cd ../../openblock-blocks
npm run prepublish

cd ../openblock-vm
npm run build

cd ../openblock-gui
npm run build

# Then build desktop app
cd ../openblocks-desktop-version/openblock-desktop
npm run build:dev
```

### 4. Missing Media Files

**Symptoms:**
- Icons not displaying
- Missing block images
- Broken media references

**Solutions:**
```bash
# Check if media files exist
ls -la openblock-blocks/media/
ls -la openblock-gui/static/

# Rebuild blocks package
cd openblock-blocks
npm run prepublish

# Copy media files manually if needed
cp -r media/* ../openblocks-desktop-version/openblock-desktop/static/blocks-media/
```

### 5. Development Server Issues

**Symptoms:**
- Hot reload not working
- Changes not reflecting
- Port conflicts

**Solutions:**
```bash
# Check for port conflicts
lsof -i :9080
lsof -i :3000

# Kill conflicting processes
kill -9 <PID>

# Restart development server
cd openblocks-desktop-version/openblock-desktop
npm start
```

### 6. Electron-Specific Issues

**Symptoms:**
- Main process errors
- Renderer process crashes
- IPC communication failures

**Solutions:**
```bash
# Check Electron version compatibility
cd openblocks-desktop-version/openblock-desktop
npm ls electron

# Reinstall Electron if needed
npm install electron@^15.3.1

# Clear Electron cache
rm -rf ~/.electron/
rm -rf ~/.config/OpenBlockDesktop/
```

## 🔍 Debugging Steps

### Step 1: Check Console Output
```bash
# Start with verbose logging
cd openblocks-desktop-version/openblock-desktop
DEBUG=* npm start
```

### Step 2: Verify Package Structure
```bash
# Check package structure
tree -L 2 -I node_modules

# Should show:
# open-block/
# ├── openblock-blocks/
# ├── openblock-gui/
# ├── openblock-link/
# ├── openblock-resource/
# ├── openblock-vm/
# └── openblocks-desktop-version/
```

### Step 3: Verify Dependencies
```bash
# Check each package's dependencies
cd openblock-gui
npm ls --depth=0

cd ../openblock-vm
npm ls --depth=0

cd ../openblock-blocks
npm ls --depth=0
```

### Step 4: Check Build Output
```bash
# Verify build artifacts exist
ls -la openblock-blocks/dist/
ls -la openblock-vm/dist/
ls -la openblock-gui/build/
```

## 🛠️ Advanced Troubleshooting

### Reset Everything
```bash
#!/bin/bash
# Complete reset script

echo "🧹 Complete reset of OpenBlock development environment..."

# Remove all node_modules
find . -name "node_modules" -type d -exec rm -rf {} +
find . -name "package-lock.json" -type f -delete

# Remove build artifacts
find . -name "dist" -type d -exec rm -rf {} +
find . -name "build" -type d -exec rm -rf {} +
find . -name "*.compressed.js" -type f -delete

# Clean desktop app
cd openblocks-desktop-version/openblock-desktop
npm run clean
cd ../..

# Reinstall everything
./setup-development.sh
```

### Check for Version Conflicts
```bash
# Check Node.js version
node --version  # Should be v16+

# Check npm version
npm --version

# Check for global package conflicts
npm list -g --depth=0 | grep openblock
```

### Verify File Permissions
```bash
# Check file permissions
ls -la setup-development.sh
ls -la fix-dependencies.sh

# Make scripts executable
chmod +x *.sh
```

## 📋 Common Error Messages

### "Cannot find module 'openblock-gui'"
- Package not linked properly
- Run `npm link` in openblock-gui directory
- Run `npm link openblock-gui` in desktop app directory

### "Module parse failed"
- Webpack configuration issue
- Missing babel configuration
- Check webpack.config.js files

### "ENOENT: no such file or directory"
- Missing build artifacts
- Run build commands for each package
- Check file paths in webpack config

### "Port already in use"
- Another process using the port
- Kill conflicting processes
- Change port in webpack config

## 🎯 Quick Fix Checklist

When the app crashes, try these steps in order:

1. ✅ **Run fix-dependencies.sh**
2. ✅ **Clean build artifacts**: `npm run clean`
3. ✅ **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. ✅ **Rebuild packages**: Run build commands for each package
5. ✅ **Check package linking**: Verify all packages are linked
6. ✅ **Check console errors**: Look for specific error messages
7. ✅ **Verify file structure**: Ensure all required files exist

## 🆘 Still Having Issues?

If none of the above solutions work:

1. **Check the console output** for specific error messages
2. **Verify your Node.js version** (should be 16+)
3. **Check file permissions** on all scripts
4. **Ensure you're in the correct directory** when running commands
5. **Try the complete reset script** to start fresh

## 📞 Getting Help

When asking for help, include:
- Your operating system
- Node.js version
- Exact error messages
- Steps you've already tried
- Console output

This will help others provide more targeted assistance.



