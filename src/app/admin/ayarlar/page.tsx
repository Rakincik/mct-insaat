import { getSettings } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
                <p className="text-gray-500 mt-1">İletişim bilgileri, sosyal medya linkleri ve ana sayfa başlıklarını yönetin.</p>
            </div>

            <SettingsForm initialData={settings} />
        </div>
    );
}
