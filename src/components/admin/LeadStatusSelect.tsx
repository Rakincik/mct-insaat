"use client";

import { updateLeadStatus } from "@/actions/lead";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Clock, X } from "lucide-react";

export default function LeadStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const getStatusColor = (s: string) => {
        switch (s) {
            case "new": return "bg-blue-100 text-blue-700 border-blue-200";
            case "contacted": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "closed": return "bg-green-100 text-green-700 border-green-200";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusLabel = (s: string) => {
        switch (s) {
            case "new": return "Yeni";
            case "contacted": return "Görüşüldü";
            case "closed": return "Tamamlandı";
            default: return s;
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        try {
            await updateLeadStatus(id, newStatus);
            toast.success("Durum güncellendi");
        } catch (error) {
            toast.error("Hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative inline-block ${loading ? 'opacity-50' : ''}`}>
            <select
                value={status}
                onChange={handleChange}
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border outline-none cursor-pointer ${getStatusColor(status)}`}
            >
                <option value="new">Yeni</option>
                <option value="contacted">Görüşüldü</option>
                <option value="closed">Tamamlandı</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
