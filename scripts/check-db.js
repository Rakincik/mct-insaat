const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({}, { strict: false, collection: 'projects' }));
        const projects = await Project.find({}).limit(10).lean();
        console.log('--- PROJECTS DATA ---');
        projects.forEach(p => {
            console.log(`Title: ${p.title}`);
            console.log(`CoverImage: ${p.coverImage}`);
            console.log('---');
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
