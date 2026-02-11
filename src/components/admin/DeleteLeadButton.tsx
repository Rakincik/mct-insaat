"use client";

import { deleteLead } from "@/actions/lead";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteLeadButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;

        setLoading(true);
        try {
            await deleteLead(id);
            toast.success("Kayıt silindi.");
        } catch (error) {
            toast.error("Silinemedi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
        </button>
    );
}
