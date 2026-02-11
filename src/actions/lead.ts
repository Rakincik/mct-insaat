"use server";

import dbConnect from "@/lib/dbConnect";
import { Lead } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function submitLead(formData: any) {
    try {
        await dbConnect();

        const leadData = {
            name: formData.name,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            status: 'Yeni'
        };

        await Lead.create(leadData);

        revalidatePath("/admin/teklifler");
        return { success: true, message: "Teklifiniz iletildi. En kısa sürede döneceğiz." };
    } catch (error) {
        console.error("Lead submission error:", error);
        return { success: false, message: "Bir hata oluştu, lütfen tekrar deneyin." };
    }
}

export async function updateLeadStatus(id: string, status: string) {
    try {
        await dbConnect();
        await Lead.findByIdAndUpdate(id, { status });
        revalidatePath("/admin/teklifler");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function deleteLead(id: string) {
    try {
        await dbConnect();
        await Lead.findByIdAndDelete(id);
        revalidatePath("/admin/teklifler");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
