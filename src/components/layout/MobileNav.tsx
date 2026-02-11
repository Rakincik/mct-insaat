"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Plus, Layers, MessageCircle } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function MobileNav() {
    const pathname = usePathname();
    const { openWizard } = useQuote();

    const navItems = [
        {
            label: "Ana Sayfa",
            href: "/",
            icon: Home,
        },
        {
            label: "Projeler",
            href: "/projeler",
            icon: Grid,
        },
        {
            label: "Teklif Al",
            isAction: true,
            icon: Plus,
        },
        {
            label: "Hizmetler",
            href: "/hizmetler",
            icon: Layers,
        },
        {
            label: "WhatsApp",
            href: "https://wa.me/905445258909",
            icon: MessageCircle,
            isExternal: true,
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 z-[190] lg:hidden pb-safe">
            <div className="flex items-center justify-between px-2">
                {(navItems ?? []).map((item, index) => {
                    const isActive = item.href ? pathname === item.href : false;
                    const Icon = item.icon;

                    if (item.isAction) {
                        return (
                            <div key={index} className="relative -top-5">
                                <button
                                    onClick={openWizard}
                                    className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center border-4 border-neutral-50 transform transition-transform active:scale-95"
                                >
                                    <Icon size={28} />
                                </button>
                            </div>
                        );
                    }

                    if (item.isExternal) {
                        return (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center py-3 px-2 text-neutral-400 hover:text-accent transition-colors"
                            >
                                <Icon size={24} className={isActive ? "text-accent" : ""} />
                                <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-accent" : ""}`}>
                                    {item.label}
                                </span>
                            </a>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={item.href!}
                            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${isActive ? "text-accent" : "text-neutral-400 hover:text-neutral-600"
                                }`}
                        >
                            <Icon size={24} />
                            <span className="text-[10px] mt-1 font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
