import dbConnect from './dbConnect';
import { Settings, Project, Service, BlogPost, Lead, Slide, Reel } from './models';

// Helper to map _id to id for frontend compatibility
const mapId = (item: any) => {
    if (!item) return item;
    if (Array.isArray(item)) {
        return item.map(i => {
            if (!i) return i;
            const id = i._id ? i._id.toString() : '';
            return { ...i, id, _id: id };
        });
    }
    const id = item._id ? item._id.toString() : '';
    return { ...item, id, _id: id };
};

export async function getDb() {
    await dbConnect();
    return {
        settings: await getSettings(),
        projects: await getProjects(),
        services: await getServices(),
        slides: await getSlides(),
        leads: await getLeads(),
        blogPosts: await getBlogPosts(),
        reels: await getReels()
    };
}

export async function saveDb(data: any) {
    await dbConnect();
    if (data.settings) {
        await Settings.findOneAndUpdate({}, data.settings, { upsert: true, new: true });
    }
    return true;
}

export async function getProjects() {
    await dbConnect();
    const data = await Project.find({}).sort({ createdAt: -1 }).lean();
    return mapId(data);
}

export async function getServices() {
    await dbConnect();
    const data = await Service.find({}).sort({ createdAt: 1 }).lean();
    return mapId(data);
}

export async function getSettings() {
    await dbConnect();
    let settings = await Settings.findOne({}).lean();
    if (!settings) {
        settings = await Settings.create({});
    }
    return mapId(settings);
}

export async function getSlides() {
    await dbConnect();
    const data = await Slide.find({}).sort({ order: 1 }).lean();
    return mapId(data);
}

export async function getLeads() {
    await dbConnect();
    const data = await Lead.find({}).sort({ createdAt: -1 }).lean();
    return mapId(data);
}

export async function getBlogPosts() {
    await dbConnect();
    const data = await BlogPost.find({}).sort({ publishedAt: -1 }).lean();
    return mapId(data);
}

export async function getReels() {
    await dbConnect();
    const data = await Reel.find({}).sort({ order: 1 }).lean();
    return mapId(data);
}
