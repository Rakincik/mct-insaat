import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Project } from '@/lib/models';
import { projects } from '@/data/projects';

export async function POST() {
    try {
        await dbConnect();

        // Check if projects already exist
        const existingCount = await Project.countDocuments();

        if (existingCount > 0) {
            return NextResponse.json({
                success: true,
                message: `Veritabanında zaten ${existingCount} proje mevcut. Seed işlemi atlandı.`,
                count: existingCount
            });
        }

        // Seed projects from static data
        const seededProjects = [];
        for (const project of projects) {
            const newProject = await Project.create({
                title: project.title,
                category: project.category,
                type: project.type,
                location: project.location,
                size: project.size,
                year: project.year,
                status: project.status,
                description: project.description,
                coverImage: project.coverImage,
                gallery: project.gallery,
                client: project.client,
                isFeatured: false
            });
            seededProjects.push(newProject);
        }

        return NextResponse.json({
            success: true,
            message: `${seededProjects.length} proje başarıyla eklendi.`,
            count: seededProjects.length
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Projeleri seed etmek için POST isteği gönderin.',
        endpoint: '/api/seed-projects',
        method: 'POST'
    });
}
