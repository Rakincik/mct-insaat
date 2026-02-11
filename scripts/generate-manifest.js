const fs = require('fs');
const path = require('path');

function generateManifest() {
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    const manifestPath = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json');

    const manifest = {};

    if (fs.existsSync(projectsDir)) {
        const folders = fs.readdirSync(projectsDir);
        folders.forEach(folder => {
            const folderPath = path.join(projectsDir, folder);
            if (fs.lstatSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath);
                const images = files
                    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
                    .filter(file => !/cover/i.test(file))
                    .map(file => `/projects/${folder}/${file}`);

                manifest[folder] = images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
            }
        });
        console.log(`[Manifest] Generated for ${Object.keys(manifest).length} projects.`);
    } else {
        console.warn(`[Manifest] Projects directory not found: ${projectsDir}`);
    }

    // Ensure directory exists
    const dataDir = path.dirname(manifestPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`[Manifest] Saved to ${manifestPath}`);
}

generateManifest();
