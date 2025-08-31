# OpenBlock Desktop – Windows Build Guide

## Prerequisites
- Git installed (used by fetch:static)
- Node.js 20.x LTS
- PowerShell on Windows

## Build the Windows .exe
Run these commands from the repository root.

1) Go to the desktop app
```powershell
cd openblocks-desktop-version/openblock-desktop
```

2) Install dependencies
```powershell
npm install --no-audit --no-fund
```

3) Fetch external resources (extensions, drivers, tools, assets)
```powershell
npm run fetch:all
```

4) Compile the app (renderer + main)
```powershell
npm run compile
```

5) Package for Windows (creates installer and portable .exe in dist/)

Option A – use the project script (Windows-only build)
```powershell
npm run build:windows
```

Option B – invoke electron-builder directly (pins builder version)
```powershell
npx --yes electron-builder@26.0.12 --win --x64 --ia32 --config electron-builder-windows.yaml
```

Artifacts will appear in `openblocks-desktop-version/openblock-desktop/dist/`.

## Why use the explicit electron-builder command instead of `npm run build`?
- `npm run build` here triggers a generic flow (`build:dev`/`build:dist`) using the default builder config and may target other platforms or expect publishing/signing.
- The Windows path above uses `electron-builder-windows.yaml`, tailored to Windows (NSIS installer and portable). The explicit `npx --yes electron-builder@26.0.12` also pins a known-good builder version, avoiding schema or tooling mismatches.

## Troubleshooting
- If packaging fails with a message like “dependency path is undefined … packageName=exports-loader … parentModule=openblock-blocks”:
  - Ensure `exports-loader` and `imports-loader` are in `devDependencies` of `openblock-blocks/package.json`.
  - Run in the repo root:
    ```powershell
    cd openblock-blocks
    npm install --no-audit --no-fund
    cd ../openblocks-desktop-version/openblock-desktop
    npm install --no-audit --no-fund
    npm run compile
    npx --yes electron-builder@26.0.12 --win --x64 --ia32 --config electron-builder-windows.yaml
    ```
  - This keeps webpack loaders as dev-time only and lets electron-builder package cleanly.
