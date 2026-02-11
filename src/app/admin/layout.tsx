"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Layers, Settings, Home, Mail, Image as ImageIcon, Video, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Login sayfası için sadece children'ı render et (sidebar olmadan)
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans admin-mode">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
                <Link href="/admin" className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="MCT Logo" className="h-8 w-auto object-contain" />
                    <span className="font-bold text-xl text-primary tracking-tight">Admin</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2">
                        <img src="/logo.jpg" alt="MCT Logo" className="h-8 w-auto object-contain" />
                        <span className="font-bold text-xl text-primary tracking-tight">Admin</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden p-1 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link
                        href="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <LayoutDashboard size={20} />
                        Genel Bakış
                    </Link>
                    <Link
                        href="/admin/teklifler"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <Mail size={20} />
                        Gelen Teklifler
                    </Link>
                    <Link
                        href="/admin/projeler"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <FolderKanban size={20} />
                        Projeler
                    </Link>
                    <Link
                        href="/admin/hizmetler"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <Layers size={20} />
                        Hizmetler
                    </Link>
                    <Link
                        href="/admin/slider"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <ImageIcon size={20} />
                        Slider
                    </Link>
                    <Link
                        href="/admin/reels"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <Video size={20} />
                        Reels / Videolar
                    </Link>
                    <Link
                        href="/admin/mct-kosesi"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <FileText size={20} />
                        MCT Köşesi
                    </Link>
                    <Link
                        href="/admin/ayarlar"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors font-medium"
                    >
                        <Settings size={20} />
                        Site Ayarları
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors font-medium mb-2">
                        <Home size={20} />
                        Siteye Dön
                    </Link>
                </div>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div >
    );
}
