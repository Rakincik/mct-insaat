"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";

const quickLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/kurumsal", label: "Kurumsal" },
    { href: "/projeler", label: "Projeler" },
    { href: "/hizmetler", label: "Hizmetler" },
    { href: "/mct-kosesi", label: "MCT Köşesi" },
    { href: "/iletisim", label: "İletişim" },
];

const services = [
    { href: "/hizmetler/celik-yapi", label: "Çelik Yapı" },
    { href: "/hizmetler/betonarme", label: "Betonarme Konut" },
    { href: "/hizmetler/tas-kaplama", label: "Taş Kaplama" },
    { href: "/hizmetler/dekorasyon", label: "Dekorasyon" },
];

export default function Footer({ settings }: { settings?: any }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const phone = settings?.phone || "+90 544 525 89 09";
    const email = settings?.email || "info@mctinsaat.com";
    const address = settings?.address || "Ilgın, Konya";

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="container py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            {settings?.logo ? (
                                <div className="relative h-24 w-auto mb-2">
                                    <Image
                                        src={settings.logo}
                                        alt="MCT İnşaat"
                                        width={200}
                                        height={100}
                                        className="object-contain h-full w-auto"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                                    <span className="text-white font-heading font-bold text-xl">MCT</span>
                                </div>
                            )}
                            <div>
                                <span className="font-heading text-xl font-bold tracking-tight block">
                                    ILGIN MCT
                                </span>
                                <span className="text-xs tracking-widest uppercase text-neutral-400">
                                    İnşaat Mühendislik
                                </span>
                            </div>
                        </Link>
                        <p className="text-neutral-400 mb-6">
                            14 yıllık tecrübemizle güvenli, kaliteli, konforlu ve ekonomik
                            binalar inşa ediyoruz.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6">Hızlı Erişim</h4>
                        <ul className="space-y-3">
                            {(quickLinks ?? []).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6">Hizmetlerimiz</h4>
                        <ul className="space-y-3">
                            {(services ?? []).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-3 text-neutral-400 hover:text-accent transition-colors"
                                >
                                    <Phone size={18} className="text-accent" />
                                    <span>{phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-3 text-neutral-400 hover:text-accent transition-colors"
                                >
                                    <Mail size={18} className="text-accent" />
                                    <span>{email}</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-neutral-400">
                                    <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                                    <span>{address}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-500 text-sm">
                        © {currentYear} ILGIN MCT İnşaat Mühendislik. Tüm hakları saklıdır.
                    </p>

                    {/* Developer Credit */}
                    {settings?.developerLogo && (
                        <a
                            href={settings.developerUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
                        >
                            <span className="text-xs">Developed by</span>
                            <img src={settings.developerLogo} alt="Developer" className="h-6 w-auto object-contain" />
                        </a>
                    )}

                    {/* Scroll to Top */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-neutral-500 hover:text-accent transition-colors text-sm"
                    >
                        <span>Yukarı Çık</span>
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer >
    );
}
