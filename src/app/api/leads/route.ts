
import { NextResponse } from "next/server";
import { Lead } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Destructure known contact fields from the detailed form data
        // The frontend sends the whole QuoteFormData object
        const {
            contactName,
            contactPhone,
            contactEmail,
            contactNote,
            ...otherDetails
        } = body;

        // Create new Lead
        const newLead = await Lead.create({
            name: contactName || "İsimsiz",
            phone: contactPhone || "",
            email: contactEmail || "",
            message: contactNote || "",
            service: "Teklif Al Sihirbazı",
            quoteDetails: body // Store the full object just in case we need to reconstruct it
        });

        return NextResponse.json({ success: true, data: newLead }, { status: 201 });
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json(
            { success: false, error: "Teklif oluşturulurken bir hata oluştu." },
            { status: 500 }
        );
    }
}
