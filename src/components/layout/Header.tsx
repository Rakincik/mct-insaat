"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/kurumsal", label: "Kurumsal" },
    { href: "/projeler", label: "Projeler" },
    { href: "/hizmetler", label: "Hizmetler" },
    { href: "/mct-kosesi", label: "MCT Köşesi" },
    { href: "/iletisim", label: "İletişim" },
];

export default function Header({ settings }: { settings?: any }) {
    const { openWizard } = useQuote();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fallbacks
    const phone = settings?.phone || "+90 544 525 89 09";
    const email = settings?.email || "info@mctinsaat.com";


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white shadow-lg py-4"
                : "bg-transparent py-6"
                } lg:left-[60px] lg:right-[60px]`}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    {settings?.logo ? (
                        <div className={`relative w-auto transition-all duration-500 ease-in-out ${isScrolled ? "h-20 lg:h-32" : "h-28 lg:h-56"
                            }`}>
                            <img
                                src={settings.logo}
                                alt={settings?.siteTitle || "MCT İnşaat"}
                                className="h-full w-auto object-contain drop-shadow-xl"
                            />
                        </div>
                    ) : (
                        <>
                            <div className={`transition-all duration-500 rounded-full flex items-center justify-center bg-accent ${isScrolled ? "w-16 h-16" : "w-20 h-20 lg:w-24 lg:h-24"}`}>
                                <span className={`text-white font-heading font-bold transition-all ${isScrolled ? "text-xl" : "text-2xl lg:text-3xl"}`}>MCT</span>
                            </div>
                            <div className="hidden sm:block">
                                <span
                                    className={`font-heading font-bold tracking-tight transition-all block ${isScrolled ? "text-primary text-2xl" : "text-white text-3xl lg:text-4xl"
                                        }`}
                                >
                                    ILGIN MCT
                                </span>
                                <span
                                    className={`text-xs tracking-widest uppercase transition-colors ${isScrolled ? "text-neutral-500" : "text-neutral-300"
                                        }`}
                                >
                                    İnşaat Mühendislik
                                </span>
                            </div>
                        </>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {(navLinks ?? []).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium text-sm uppercase tracking-wider transition-colors underline-animation ${isScrolled ? "text-neutral-700" : "text-white"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={openWizard}
                        className="btn btn-primary"
                    >
                        Teklif Al
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-primary" : "text-white"
                        }`}
                    aria-label="Menüyü aç/kapat"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 bg-primary transition-all duration-500 ${isMobileMenuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                    }`}
                style={{ top: "0" }}
            >
                <div className="container h-full flex flex-col justify-center">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white text-3xl font-heading font-bold hover:text-accent transition-colors"
                                style={{
                                    animation: isMobileMenuOpen
                                        ? `slideUp 0.5s ease forwards ${index * 0.1}s`
                                        : "none",
                                    opacity: isMobileMenuOpen ? 0 : 1,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>


                    <div className="mt-8">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                openWizard();
                            }}
                            className="w-full btn btn-primary py-4 text-lg mb-6 shadow-xl shadow-primary/20"
                            style={{
                                animation: isMobileMenuOpen ? "slideUp 0.5s ease forwards 0.6s" : "none",
                                opacity: isMobileMenuOpen ? 0 : 1,
                            }}
                        >
                            Teklif Al
                        </button>
                    </div>

                    <div className="mt-4">
                        <a
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-accent text-xl font-semibold"
                        >
                            {phone}
                        </a>
                        <p className="text-neutral-400 mt-2">
                            {email}
                        </p>
                    </div>
                </div>

                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 text-white hover:text-accent transition-colors"
                    aria-label="Menüyü kapat"
                >
                    <X size={32} />
                </button>
            </div>
        </header >
    );
}
