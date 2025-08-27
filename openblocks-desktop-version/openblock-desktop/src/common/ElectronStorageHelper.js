const fs = require('fs');
const path = require('path');
const https = require('https');

const staticAssets = path.resolve(__static, 'assets');

/**
 * Allow the storage module to load files bundled in the Electron application.
 */
class ElectronStorageHelper {
    constructor (storageInstance) {
        this.parent = storageInstance;
    }

    /**
     * Fetch an asset but don't process dependencies.
     * @param {AssetType} assetType - The type of asset to fetch.
     * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
     * @param {DataFormat} dataFormat - The file format / file extension of the asset to fetch: PNG, JPG, etc.
     * @return {Promise.<Asset>} A promise for the contents of the asset.
     */
    load (assetType, assetId, dataFormat) {
        assetId = path.basename(assetId);
        dataFormat = path.basename(dataFormat);

        return new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(staticAssets, `${assetId}.${dataFormat}`),
                (err, data) => {
                    if (err) {
                        // Fallback: fetch from Scratch asset CDN when not bundled locally
                        const tryUrls = [
                            `https://assets.scratch.mit.edu/internalapi/asset/${assetId}.${dataFormat}/get/`,
                            `https://assets.scratch.mit.edu/${assetId}.${dataFormat}`
                        ];
                        const fetchUrl = (idx = 0) => {
                            if (idx >= tryUrls.length) return reject(err);
                            const url = tryUrls[idx];
                            const req = https.get(url, res => {
                                if (res.statusCode !== 200) {
                                    res.resume();
                                    return fetchUrl(idx + 1);
                                }
                                const chunks = [];
                                res.on('data', c => chunks.push(c));
                                res.on('end', () => {
                                    try {
                                        const buf = Buffer.concat(chunks);
                                        resolve(new this.parent.Asset(assetType, assetId, dataFormat, buf));
                                    } catch (e) {
                                        reject(e);
                                    }
                                });
                            });
                            req.on('error', () => fetchUrl(idx + 1));
                        };
                        return fetchUrl(0);
                    } else {
                        resolve(new this.parent.Asset(assetType, assetId, dataFormat, data));
                    }
                }
            );
        });
    }
}

module.exports = ElectronStorageHelper;
