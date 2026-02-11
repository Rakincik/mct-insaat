const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({}, { strict: false, collection: 'projects' }));
        const projects = await Project.find({}).limit(3).lean();
        console.log('--- ACTUAL MONGO RAW DATA ---');
        projects.forEach(p => {
            console.log(`Project: ${p.title}`);
            console.log('Keys found:', Object.keys(p));
            console.log('coverImage field value:', p.coverImage);
            console.log('mainImage field value:', p.mainImage);
            console.log('Full Object:', JSON.stringify(p, null, 2));
            console.log('---');
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
