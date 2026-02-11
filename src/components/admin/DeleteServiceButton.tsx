"use client";

import { Trash2 } from "lucide-react";
import { deleteService } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteServiceButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Bu hizmeti silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
            try {
                const result = await deleteService(id);
                if (result.success) {
                    toast.success(result.message);
                    router.refresh();
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("Silme işlemi başarısız.");
            }
        }
    };

    return (
        <button onClick={handleDelete} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <Trash2 size={18} />
        </button>
    );
}
