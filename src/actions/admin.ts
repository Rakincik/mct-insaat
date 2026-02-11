"use server";

import dbConnect from "@/lib/dbConnect";
import { Project, Service, Settings, Slide, Reel, BlogPost } from "@/lib/models";
import { revalidatePath } from "next/cache";

// --- Projects ---

export async function addProject(projectData: any) {
    await dbConnect();
    await Project.create(projectData);
    revalidatePath("/projeler");
    revalidatePath("/admin/projeler");
    return { success: true, message: "Proje başarıyla eklendi." };
}

export async function updateProject(id: string, projectData: any) {
    await dbConnect();
    const updated = await Project.findByIdAndUpdate(id, projectData, { new: true });
    if (!updated) return { success: false, message: "Proje bulunamadı." };

    revalidatePath("/projeler");
    revalidatePath(`/projeler/${id}`);
    revalidatePath("/admin/projeler");
    return { success: true, message: "Proje güncellendi." };
}

export async function deleteProject(id: string) {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath("/projeler");
    revalidatePath("/admin/projeler");
    return { success: true, message: "Proje silindi." };
}

// --- Services ---

export async function addService(serviceData: any) {
    await dbConnect();

    // Generate slug if not provided
    if (!serviceData.slug) {
        serviceData.slug = serviceData.title
            .toLowerCase()
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    await Service.create(serviceData);
    revalidatePath("/hizmetler");
    revalidatePath("/admin/hizmetler");
    return { success: true, message: "Hizmet başarıyla eklendi." };
}

export async function updateService(id: string, serviceData: any) {
    await dbConnect();
    const updated = await Service.findByIdAndUpdate(id, serviceData, { new: true });
    if (!updated) return { success: false, message: "Hizmet bulunamadı." };

    revalidatePath("/hizmetler");
    revalidatePath(`/hizmetler/${serviceData.slug}`);
    revalidatePath("/admin/hizmetler");
    return { success: true, message: "Hizmet güncellendi." };
}

export async function deleteService(id: string) {
    await dbConnect();
    await Service.findByIdAndDelete(id);
    revalidatePath("/hizmetler");
    revalidatePath("/admin/hizmetler");
    return { success: true, message: "Hizmet silindi." };
}

// --- Settings ---

export async function updateSettings(settingsData: any) {
    await dbConnect();
    await Settings.findOneAndUpdate({}, settingsData, { upsert: true, new: true });
    revalidatePath("/");
    revalidatePath("/iletisim");
    return { success: true, message: "Ayarlar güncellendi." };
}

// --- Sliders ---

export async function addSlide(slideData: any) {
    await dbConnect();
    await Slide.create(slideData);
    revalidatePath("/");
    revalidatePath("/admin/slider");
    return { success: true, message: "Slider eklendi." };
}

export async function updateSlide(id: string, data: any) {
    await dbConnect();
    const updated = await Slide.findByIdAndUpdate(id, data, { new: true });
    if (updated) {
        revalidatePath("/");
        revalidatePath("/admin/slider");
        return { success: true, message: "Slider güncellendi." };
    }
    return { success: false, message: "Slider bulunamadı." };
}

export async function deleteSlide(id: string) {
    await dbConnect();
    await Slide.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/slider");
    return { success: true, message: "Slider silindi." };
}

// --- Reels ---

export async function addReel(data: any) {
    await dbConnect();
    await Reel.create(data);
    revalidatePath("/");
    revalidatePath("/admin/reels");
    return { success: true, message: "Reel eklendi." };
}

export async function updateReel(id: string, data: any) {
    await dbConnect();
    const updated = await Reel.findByIdAndUpdate(id, data, { new: true });
    if (updated) {
        revalidatePath("/");
        revalidatePath("/admin/reels");
        return { success: true, message: "Reel güncellendi." };
    }
    return { success: false, message: "Reel bulunamadı." };
}

export async function deleteReel(id: string) {
    await dbConnect();
    await Reel.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/reels");
    return { success: true, message: "Reel silindi." };
}

// --- BlogPost (MCT Köşesi) ---

export async function addBlogPost(data: any) {
    await dbConnect();

    // Ensure slug if not provided
    if (!data.slug) {
        data.slug = data.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substr(2, 5);
    }

    await BlogPost.create(data);
    revalidatePath("/mct-kosesi");
    revalidatePath("/admin/mct-kosesi");
    return { success: true, message: "Yazı eklendi." };
}

export async function updateBlogPost(id: string, data: any) {
    await dbConnect();
    const updated = await BlogPost.findByIdAndUpdate(id, data, { new: true });
    if (updated) {
        revalidatePath("/mct-kosesi");
        revalidatePath(`/mct-kosesi/${updated.slug}`);
        revalidatePath("/admin/mct-kosesi");
        return { success: true, message: "Yazı güncellendi." };
    }
    return { success: false, message: "Yazı bulunamadı." };
}

export async function deleteBlogPost(id: string) {
    await dbConnect();
    await BlogPost.findByIdAndDelete(id);
    revalidatePath("/mct-kosesi");
    revalidatePath("/admin/mct-kosesi");
    return { success: true, message: "Yazı silindi." };
}
