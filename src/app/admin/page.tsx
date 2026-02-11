"use client";

import Link from "next/link";
import { FolderKanban, Layers, Settings, Image as ImageIcon } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
                <p className="text-gray-500 mt-1">Hoşgeldiniz. Web sitenizi yönetmek için aşağıdan bir işlem seçin.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Projects */}
                <Link href="/admin/projeler" className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FolderKanban size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Projeler</h3>
                    <p className="text-gray-500 text-sm">Devam eden ve tamamlanan projeleri ekleyin, düzenleyin veya silin.</p>
                </Link>

                {/* Services */}
                <Link href="/admin/hizmetler" className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Hizmetler</h3>
                    <p className="text-gray-500 text-sm">Hizmet sayfalarındaki içerikleri ve görselleri güncelleyin.</p>
                </Link>

                {/* Sliders - New */}
                <Link href="/admin/slider" className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <ImageIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Slider Yönetimi</h3>
                    <p className="text-gray-500 text-sm">Ana sayfadaki kayan görselleri ve manşetleri düzenleyin.</p>
                </Link>

                {/* Settings */}
                <Link href="/admin/ayarlar" className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                        <Settings size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Site Ayarları</h3>
                    <p className="text-gray-500 text-sm">Telefon, adres, logo ve genel site bilgilerini yönetin.</p>
                </Link>
            </div>
        </div>
    );
}
