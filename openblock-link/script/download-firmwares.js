const downloadRelease = require('download-github-release');
const path = require('path');
const fs = require('fs');

// DISABLED FOR LOCAL DEVELOPMENT - External downloads blocked
// const user = 'openblockcc';
// const repo = 'openblock-firmwares';
// const outputdir = path.resolve('./firmwares');
// const leaveZipped = false;

// const filterRelease = release => release.prerelease === false;
// const filterAsset = () => true;

// if (!fs.existsSync(outputdir)) {
//     fs.mkdirSync(outputdir, {recursive: true});
// }

// downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped)
//     .then(() => {
//         console.log('Firmwares download complete');
//     })
//     .catch(err => {
//         console.error(err.message);
//     });

// LOCAL DEVELOPMENT MODE - No external downloads
console.log('Firmware downloads disabled for local development');
console.log('Use local firmware files or modify this script to enable downloads');

// Create empty firmwares directory for local development
const outputdir = path.resolve('./firmwares');
if (!fs.existsSync(outputdir)) {
    fs.mkdirSync(outputdir, {recursive: true});
    console.log('Created empty firmwares directory for local development');
}
