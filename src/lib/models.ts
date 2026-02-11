import mongoose, { Schema, model, models } from 'mongoose';

// Settings Schema
const SettingsSchema = new Schema({
    siteTitle: { type: String, default: 'MCT İnşaat' },
    phone: { type: String, default: '+90 544 525 89 09' },
    email: { type: String, default: 'info@mctinsaat.com' },
    address: { type: String, default: 'Ilgın, Konya' },
    instagram: { type: String, default: '' },
    heroTitle: { type: String, default: 'Hayallerinizi Güvenle İnşa Ediyoruz' },
    heroDescription: { type: String, default: 'Modern mimari, depreme dayanıklı çelik ve betonarme yapılar.' },
    logo: { type: String, default: '/logo.jpg' },
    developerName: { type: String, default: '' },
    developerUrl: { type: String, default: '' },
    developerLogo: { type: String, default: '' },
}, { timestamps: true });

// Service Schema
const ServiceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    iconName: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    features: [{ type: String }],
}, { timestamps: true });

// Project Schema
const ProjectSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String },
    location: { type: String, required: true },
    size: { type: String },
    year: { type: String },
    status: { type: String, enum: ['Tamamlandı', 'Devam Ediyor', 'Planlanıyor'], default: 'Tamamlandı' },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    client: { type: String },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

// BlogPost Schema
const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    videoUrl: { type: String },
    author: { type: String, default: 'MCT Admin' },
    category: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 dk' },
    seoTitle: { type: String },
    seoDescription: { type: String },
    keywords: { type: String },
}, { timestamps: true });

// Lead (Form) Schema
const LeadSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    service: { type: String, default: 'Web Formu' },
    message: { type: String },
    status: { type: String, enum: ['Yeni', 'İletişime Geçildi', 'Tamamlandı', 'İptal'], default: 'Yeni' },
    quoteDetails: { type: Schema.Types.Mixed },
}, { timestamps: true });

// Slide Schema
const SlideSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Reel Schema
const ReelSchema = new Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Registering Models
export const Settings = models.Settings || model('Settings', SettingsSchema);
export const Service = models.Service || model('Service', ServiceSchema);
export const Project = models.Project || model('Project', ProjectSchema);
export const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);
export const Lead = models.Lead || model('Lead', LeadSchema);
export const Slide = models.Slide || model('Slide', SlideSchema);
export const Reel = models.Reel || model('Reel', ReelSchema);
