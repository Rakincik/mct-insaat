const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(process.cwd(), 'public', 'uploads', 'projects');
const MANIFEST_PATH = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json');

function normalizeName(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w.-]/g, '');
}

function processDirectory(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const oldPath = path.join(directory, file);
        const stats = fs.statSync(oldPath);

        if (stats.isDirectory()) {
            // Recurse first
            processDirectory(oldPath);
            // Rename directory if needed
            const newName = normalizeName(file);
            if (newName !== file) {
                const newPath = path.join(directory, newName);
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed directory: ${file} -> ${newName}`);
            }
        } else {
            // Rename file
            const newName = normalizeName(file);
            if (newName !== file) {
                const newPath = path.join(directory, newName);
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed file: ${file} -> ${newName}`);
            }
        }
    });
}

function updateManifest() {
    if (!fs.existsSync(MANIFEST_PATH)) {
        console.log("No manifest file found.");
        return;
    }

    try {
        const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
        const newManifest = {};

        Object.keys(manifest).forEach(key => {
            const newKey = normalizeName(key);
            newManifest[newKey] = manifest[key].map(imgPath => {
                // imgPath is like "/uploads/projects/folder/Image.JPG" or "/projects/folder/Image.JPG"
                let cleanPath = imgPath.replace(/^\/projects\//, '/uploads/projects/');
                if (!cleanPath.startsWith('/uploads/projects/')) {
                    // If it was just filename or something, try to construct it, but best to rely on relative scan
                }

                // Actual scanning logic needs to rebuild paths from file system, this function was just renaming keys and values? 
                // Wait, processDirectory renames files physically. updateManifest reads manifest and updates keys/values?
                // The current logic in updateManifest just lowercases keys and values. It doesn't re-scan disk to build manifest.
                // We should probably rely on manual update or make this script scan disk and BUILD manifest.
                // For now, let's just replace /projects/ with /uploads/projects/ in the values.

                const parts = cleanPath.split('/');
                const normalizedParts = parts.map(p => normalizeName(p));
                return normalizedParts.join('/');
            });
        });

        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifest, null, 2));
        console.log("Manifest updated successfully.");
    } catch (error) {
        console.error("Error updating manifest:", error);
    }
}

console.log("Starting image normalization...");
processDirectory(PROJECTS_DIR);
updateManifest();
console.log("Done.");
