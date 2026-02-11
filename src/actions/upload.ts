"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, message: "Dosya bulunamadı." };
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert buffer to base64 for Cloudinary
        const base64Data = buffer.toString("base64");
        const fileUri = `data:${file.type};base64,${base64Data}`;

        const folder = formData.get("folder") as string || "mct-insaat";

        // Determine resource type (video or image)
        const resourceType = file.type.startsWith("video/") ? "video" : "auto";

        const uploadResponse = await cloudinary.uploader.upload(fileUri, {
            folder: folder,
            resource_type: resourceType,
        });

        return {
            success: true,
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return { success: false, message: "Dosya yüklenirken bir hata oluştu." };
    }
}
