# Quick Start Guide - OpenBlock Custom Desktop Application

## 🚀 Get Started in 5 Minutes

### 1. Setup Development Environment
```bash
# Make the setup script executable
chmod +x setup-development.sh

# Run the automated setup
./setup-development.sh
```

### 2. Start Development
```bash
# Navigate to the desktop app
cd openblocks-desktop-version/openblock-desktop

# Start development mode
npm start
```

### 3. Make Changes
- **UI Changes**: Edit files in `openblock-gui/src/`
- **New Blocks**: Add to `openblock-blocks/blocks_common/`
- **Runtime Logic**: Modify `openblock-vm/src/`
- **Desktop Features**: Edit `openblocks-desktop-version/openblock-desktop/src/`

### 4. Build Your Application
```bash
# Build for development
npm run build:dev

# Build for distribution
npm run build:dist
```

## 📁 Key Development Directories

| Directory | Purpose | What to Edit |
|-----------|---------|---------------|
| `openblock-gui/src/components/` | UI Components | Buttons, menus, panels |
| `openblock-gui/src/containers/` | Page Containers | Main pages, layouts |
| `openblock-gui/src/css/` | Styling | Colors, fonts, layouts |
| `openblock-blocks/blocks_common/` | Common Blocks | Basic programming blocks |
| `openblock-vm/src/engine/` | Runtime Engine | Project execution logic |
| `openblocks-desktop-version/openblock-desktop/src/` | Desktop App | Window management, system integration |

## 🔧 Development Commands

### For Each Component
```bash
# openblock-gui
cd openblock-gui
npm start          # Start web dev server
npm run build      # Build web interface

# openblock-vm
cd openblock-vm
npm test           # Run tests
npm run build      # Build VM

# openblock-blocks
cd openblock-blocks
npm run build      # Build blocks
```

### For Desktop App
```bash
cd openblocks-desktop-version/openblock-desktop

npm start          # Development mode
npm run build:dev  # Build development version
npm run build:dist # Build distribution version
npm run clean      # Clean build files
```

## 🎯 What You Can Customize

### ✅ User Interface
- Colors and themes
- Layout and positioning
- Button styles and interactions
- Menu structures
- Panel arrangements

### ✅ Programming Blocks
- Add new block types
- Modify block behavior
- Change code generation
- Add new languages (Python, Arduino, etc.)

### ✅ Runtime Features
- Project execution logic
- Sprite management
- Event handling
- Extension system

### ✅ Desktop Features
- Window management
- System integration
- File handling
- Hardware communication

## 🚫 Network Calls Blocked

The following external downloads have been disabled:
- ❌ Firmware downloads from GitHub
- ❌ Tool downloads from GitHub
- ❌ External resource downloads
- ❌ Asset downloads from external repositories

All resources are now local-only for development.

## 🐛 Troubleshooting

### Common Issues
1. **Module not found**: Run `npm link` in each component directory
2. **Build fails**: Run `npm run clean` then `npm install`
3. **App won't start**: Check that all packages are linked properly

### Reset Everything
```bash
# Clean all builds and reinstall
cd openblocks-desktop-version/openblock-desktop
npm run clean
rm -rf node_modules
npm install
npm link openblock-gui openblock-vm openblock-blocks openblock-link openblock-resource
```

## 📚 Next Steps

1. **Explore the codebase** - Look at existing components
2. **Make small changes** - Modify colors, add simple features
3. **Test your changes** - Use development mode for quick iteration
4. **Build and package** - Create distributable versions
5. **Share your work** - Package and distribute your custom application

## 🎉 You're Ready!

Your development environment is now set up for:
- ✅ Local development only (no external dependencies)
- ✅ Hot reloading for fast iteration
- ✅ Complete control over all components
- ✅ Custom desktop application building

Start coding and building your custom OpenBlock desktop application!




