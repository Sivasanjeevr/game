# OpenBlock Folder Analysis - What to Keep vs. Delete

## 🎯 Essential Folders (KEEP THESE)

### 1. openblocks-desktop-version/ ⭐ MAIN FOCUS
- **Purpose**: Your main desktop application
- **Why Keep**: This is where you'll do most of your development
- **Contains**: Electron app, main process, renderer process
- **Development**: Edit `src/main/` and `src/renderer/` for desktop features

### 2. openblock-gui/ ⭐ CORE UI
- **Purpose**: User interface components
- **Why Keep**: This is the main application interface
- **Contains**: React components, CSS, containers
- **Development**: Edit `src/components/` and `src/css/` for UI changes

### 3. openblock-vm/ ⭐ RUNTIME ENGINE
- **Purpose**: Executes projects and manages runtime
- **Why Keep**: Core functionality for running projects
- **Contains**: Engine, blocks, extensions
- **Development**: Edit `src/engine/` for runtime behavior

### 4. openblock-blocks/ ⭐ BLOCK SYSTEM
- **Purpose**: Programming blocks and code generators
- **Why Keep**: Defines available programming blocks
- **Contains**: Block definitions, generators (Python, Arduino)
- **Development**: Edit `blocks_common/` for new blocks

## 🔧 Supporting Folders (KEEP FOR FUNCTIONALITY)

### 5. openblock-link/ ⭐ HARDWARE SUPPORT
- **Purpose**: Hardware communication and firmware
- **Why Keep**: Needed for hardware projects
- **Contains**: Serial communication, device drivers
- **Development**: Edit `src/` for hardware features

### 6. openblock-resource/ ⭐ RESOURCE MANAGEMENT
- **Purpose**: Manages extensions and resources
- **Why Keep**: Handles local resources and extensions
- **Contains**: Resource server, extension management
- **Development**: Edit `src/` for resource handling

## 🗑️ Folders You Can DELETE (Optional)

### 7. openblock-blocks/gh-pages/ ❌ NOT NEEDED
- **Purpose**: GitHub Pages documentation
- **Why Delete**: Not needed for desktop app
- **Safe to Remove**: Yes, this is just web documentation

### 8. openblock-gui/gh-pages/ ❌ NOT NEEDED
- **Purpose**: GitHub Pages for web version
- **Why Delete**: You're building desktop, not web
- **Safe to Remove**: Yes, web-specific content

### 9. openblock-gui/docs/ ❌ NOT NEEDED
- **Purpose**: Documentation for web version
- **Why Delete**: Not relevant for desktop development
- **Safe to Remove**: Yes, web-specific documentation

### 10. openblock-vm/docs/ ❌ NOT NEEDED
- **Purpose**: VM documentation
- **Why Delete**: Not essential for development
- **Safe to Remove**: Yes, can be removed

### 11. openblock-blocks/tests/ ❌ NOT NEEDED
- **Purpose**: Block testing
- **Why Delete**: Not essential for basic development
- **Safe to Remove**: Yes, unless you want to run tests

### 12. openblock-gui/test/ ❌ NOT NEEDED
- **Purpose**: GUI testing
- **Why Delete**: Not essential for basic development
- **Safe to Remove**: Yes, unless you want to run tests

## 📊 Recommended Folder Structure

### For Minimal Development:
```
open-block/
├── openblocks-desktop-version/     # ⭐ MAIN - Keep
├── openblock-gui/                  # ⭐ CORE - Keep
├── openblock-vm/                   # ⭐ CORE - Keep
├── openblock-blocks/               # ⭐ CORE - Keep
├── openblock-link/                 # ⭐ SUPPORT - Keep
└── openblock-resource/             # ⭐ SUPPORT - Keep
```

### After Cleanup (Delete Optional Folders):
```bash
# Remove unnecessary folders
rm -rf openblock-blocks/gh-pages/
rm -rf openblock-gui/gh-pages/
rm -rf openblock-gui/docs/
rm -rf openblock-vm/docs/
rm -rf openblock-blocks/tests/
rm -rf openblock-gui/test/
```

## 🎯 Development Focus Areas

### Primary Development (80% of your time):
1. **openblocks-desktop-version/** - Desktop app features
2. **openblock-gui/** - User interface changes
3. **openblock-blocks/** - New programming blocks

### Secondary Development (20% of your time):
1. **openblock-vm/** - Runtime behavior
2. **openblock-link/** - Hardware features
3. **openblock-resource/** - Extension management

## 🚨 Important Notes

### Don't Delete These Even If They Seem Unused:
- `node_modules/` - Required dependencies
- `package.json` - Project configuration
- `webpack.config.js` - Build configuration
- `src/` directories - Source code
- `media/` directories - Required assets

### Safe to Delete:
- Documentation folders
- Test folders (unless you need testing)
- GitHub Pages folders
- Example projects
- Build artifacts (can be regenerated)

## 💡 Cleanup Script

```bash
#!/bin/bash
# Cleanup script to remove unnecessary folders

echo "🧹 Cleaning up unnecessary folders..."

# Remove documentation and web-specific folders
rm -rf openblock-blocks/gh-pages/
rm -rf openblock-gui/gh-pages/
rm -rf openblock-gui/docs/
rm -rf openblock-vm/docs/

# Remove test folders (optional)
rm -rf openblock-blocks/tests/
rm -rf openblock-gui/test/

# Remove build artifacts
rm -rf openblock-gui/build/
rm -rf openblock-vm/dist/
rm -rf openblock-blocks/dist/

echo "✅ Cleanup complete!"
echo "📁 Essential folders remaining for development"
```

## 🎉 Summary

**Keep these 6 main folders** for a complete custom desktop application:
1. `openblocks-desktop-version/` - Main desktop app
2. `openblock-gui/` - User interface
3. `openblock-vm/` - Runtime engine
4. `openblock-blocks/` - Programming blocks
5. `openblock-link/` - Hardware support
6. `openblock-resource/` - Resource management

**Delete optional folders** to reduce clutter and focus on development.

This gives you a clean, focused development environment for building your custom OpenBlock desktop application!




