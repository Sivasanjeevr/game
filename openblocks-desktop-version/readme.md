npm run build
npx electron-builder --linux AppImage --config electron-builder.yaml | cat
chmod +x dist/*.AppImage