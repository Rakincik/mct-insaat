"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="sidebar-left">
            {/* Top Section */}
            <div className="flex-1 flex items-end pb-8">
                <Link
                    href="/projeler"
                    className="text-vertical text-white hover:text-neutral-200 transition-colors"
                >
                    Projeler
                </Link>
            </div>

            {/* Center - Phone Icon */}
            <a
                href="tel:+905442657544"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telefon"
            >
                <Phone size={18} className="text-white" />
            </a>

            {/* Bottom Section */}
            <div className="flex-1 flex items-start pt-8">
                <Link
                    href="/hizmetler"
                    className="text-vertical text-white hover:text-neutral-200 transition-colors"
                >
                    Hizmetler
                </Link>
            </div>
        </aside>
    );
}
