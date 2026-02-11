const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(url, folder) {
    if (!url || !url.startsWith('/uploads')) return url;
    try {
        const absolutePath = path.join(process.cwd(), 'public', url);
        if (!fs.existsSync(absolutePath)) return url;
        const result = await cloudinary.uploader.upload(absolutePath, { folder });
        return result.secure_url;
    } catch (e) {
        return url;
    }
}

async function fix() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({}, { strict: false, collection: 'projects' }));
        const projects = await Project.find({});

        for (let p of projects) {
            const raw = p.toObject();
            const update = {};

            // 1. Image Migration & Standardization
            const currentImg = raw.coverImage || raw.mainImage || raw.image;
            if (currentImg) {
                update.coverImage = await uploadToCloudinary(currentImg, 'projects');
            }

            // 2. Field Standardization
            update.size = raw.size || raw.area || '';
            update.year = raw.year || raw.completionDate || '';
            update.title = raw.title || '';
            update.category = raw.category || 'celik-villa';
            update.location = raw.location || 'Konya';
            update.description = raw.description || '';
            update.status = raw.status || 'Tamamlandı';

            if (raw.gallery && Array.isArray(raw.gallery)) {
                update.gallery = await Promise.all(raw.gallery.map(img => uploadToCloudinary(img, 'projects')));
            }

            // UNSET old keys to keep it clean
            const toUnset = {};
            if (raw.mainImage) toUnset.mainImage = 1;
            if (raw.image) toUnset.image = 1;
            if (raw.area) toUnset.area = 1;
            if (raw.completionDate) toUnset.completionDate = 1;

            await Project.updateOne({ _id: p._id }, {
                $set: update,
                $unset: toUnset
            });
            console.log(`Standardized: ${update.title}`);
        }

        // SERVICES Fix
        const Service = mongoose.models.Service || mongoose.model('Service', new mongoose.Schema({}, { strict: false, collection: 'services' }));
        const services = await Service.find({});
        for (let s of services) {
            const raw = s.toObject();
            const currentImg = raw.coverImage || raw.image;
            const coverImage = await uploadToCloudinary(currentImg, 'services');
            await Service.updateOne({ _id: s._id }, {
                $set: { coverImage },
                $unset: { image: 1 }
            });
            console.log(`Standardized Service: ${raw.title}`);
        }

        console.log('ALL DATA STANDARDIZED AND CLEANED.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fix();
