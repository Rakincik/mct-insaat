"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function MobileStickyBar({ settings }: { settings?: any }) {
    const { openWizard } = useQuote();

    const phone = settings?.phone || "+90 544 525 89 09";
    const whatsapp = settings?.phone || "905445258909"; // Clean format for WA

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[40] bg-white border-t border-gray-200 lg:hidden safe-area-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-3 h-16">
                {/* Call */}
                <a
                    href={`tel:${phone}`}
                    className="flex flex-col items-center justify-center gap-1 active:bg-gray-50 transition-colors"
                >
                    <Phone size={20} className="text-gray-600" />
                    <span className="text-[10px] font-medium text-gray-600">Ara</span>
                </a>

                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 active:bg-gray-50 transition-colors border-x border-gray-100"
                >
                    <MessageCircle size={20} className="text-green-600" />
                    <span className="text-[10px] font-medium text-gray-600">WhatsApp</span>
                </a>

                {/* Quote (Primary Action) */}
                <button
                    onClick={openWizard}
                    className="flex flex-col items-center justify-center gap-1 bg-primary text-white active:bg-primary/90 transition-colors"
                >
                    <FileText size={20} />
                    <span className="text-[10px] font-medium">Teklif Al</span>
                </button>
            </div>
        </div>
    );
}
