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

const ProjectSchema = new mongoose.Schema({
    title: String,
    category: String,
    type: String,
    location: String,
    size: String,
    year: String,
    status: String,
    description: String,
    coverImage: String,
    gallery: [String],
    client: String
}, { timestamps: true, collection: 'projects' });

const ServiceSchema = new mongoose.Schema({
    title: String,
    coverImage: String,
    gallery: [String]
}, { timestamps: true, collection: 'services' });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function uploadToCloudinary(localPath, folder = 'mct-insaat') {
    if (!localPath || !localPath.startsWith('/uploads')) return localPath;
    try {
        const absolutePath = path.join(process.cwd(), 'public', localPath);
        if (!fs.existsSync(absolutePath)) {
            console.warn(`File not found: ${absolutePath}`);
            return localPath;
        }
        console.log(`Uploading ${localPath}...`);
        const result = await cloudinary.uploader.upload(absolutePath, { folder });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${localPath}:`, error);
        return localPath;
    }
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB.');

        // Projects
        const projects = await Project.find({});
        for (const p of projects) {
            p.coverImage = await uploadToCloudinary(p.coverImage, 'projects');
            if (p.gallery && p.gallery.length > 0) {
                p.gallery = await Promise.all(p.gallery.map(img => uploadToCloudinary(img, 'projects')));
            }
            await p.save();
            console.log(`Updated project: ${p.title}`);
        }

        // Services
        const services = await Service.find({});
        for (const s of services) {
            s.coverImage = await uploadToCloudinary(s.coverImage, 'services');
            if (s.gallery && s.gallery.length > 0) {
                s.gallery = await Promise.all(s.gallery.map(img => uploadToCloudinary(img, 'services')));
            }
            await s.save();
            console.log(`Updated service: ${s.title}`);
        }

        console.log('Migration SUCCESS.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
