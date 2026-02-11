"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const phoneNumber = "905445258909"; // Kullanıcının belirttiği veya varsayılan numara
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="hidden lg:flex fixed bottom-6 right-6 lg:right-[84px] z-[160]"
        >
            <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                aria-label="WhatsApp ile iletişime geçin"
            >
                {/* Dalga Efekti */}
                <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-75 animate-ping"></span>

                {/* İkon */}
                <MessageCircle className="w-8 h-8 text-white relative z-10" />

                {/* Hover Tooltip (Opsiyonel) */}
                <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Bize Ulaşın
                </span>
            </Link>
        </motion.div>
    );
}
