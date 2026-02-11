import { StepProps } from "../types";
import WizardActions from "../WizardActions";
import { useState } from "react";

export default function StepFinal({ data, updateData, onBack }: StepProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Bir hata oluştu");

            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Teklifiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-10 h-[60vh] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Talebiniz Alındı!</h2>
                <p className="text-lg text-slate-600 max-w-md">
                    Talebiniz <strong>Ilgın MCT İnşaat Mühendislik Şirket Müdürü – Yüksek İnşaat Mühendisi Mehmet Cihat Tapu</strong> tarafından inceleniyor.
                </p>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-900 font-medium">
                    Yaklaşık maliyet ve detaylı teklif için sizi en kısa sürede arayacağız.
                </div>
                <button className="text-slate-500 underline hover:text-orange-600 pt-4">Ana Sayfaya Dön</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Son Adım & İletişim</h2>
                <p className="text-slate-500 text-sm">Size ulaşabilmemiz için iletişim bilgilerinizi giriniz.</p>
            </div>

            {/* 20. Altyapı */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Altyapı Durumu</label>
                <div className="flex gap-4">
                    {["Belediye Kanalizasyon", "Foseptik", "Diğer"].map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => updateData({ infrastructure: opt })}
                            className={`flex-1 p-3 rounded-lg border-2 text-sm transition-all ${data.infrastructure === opt ? "border-orange-500 bg-orange-50 text-orange-700 font-bold" : "border-slate-200"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* 21. Peyzaj */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
                <label className="text-slate-700 font-semibold block">Peyzaj (Çevre Düzenlemesi)</label>
                <select
                    className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white"
                    value={data.landscape}
                    onChange={(e) => updateData({ landscape: e.target.value })}
                >
                    <option value="">Seçiniz</option>
                    <option value="duvar-var">Bahçe Duvarı Olacak</option>
                    <option value="duvar-yok">Bahçe Duvarı Olmayacak</option>
                    <option value="peyzaj-projesi">Peyzaj Projesi Var</option>
                    <option value="diger">Diğer</option>
                </select>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800">İletişim Bilgileri</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Ad Soyad</label>
                        <input
                            required
                            type="text"
                            value={data.contactName}
                            onChange={(e) => updateData({ contactName: e.target.value })}
                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0"
                            placeholder="Adınız Soyadınız"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Telefon Numarası</label>
                        <input
                            required
                            type="tel"
                            value={data.contactPhone}
                            onChange={(e) => updateData({ contactPhone: e.target.value })}
                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0"
                            placeholder="05XX XXX XX XX"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">E-Posta (Opsiyonel)</label>
                    <input
                        type="email"
                        value={data.contactEmail}
                        onChange={(e) => updateData({ contactEmail: e.target.value })}
                        className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0"
                        placeholder="ornek@email.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Ek Notlar</label>
                    <textarea
                        value={data.contactNote}
                        onChange={(e) => updateData({ contactNote: e.target.value })}
                        className="w-full h-20 p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0"
                        placeholder="Eklemek istediklerinizi buraya yazabilirsiniz..."
                    />
                </div>
            </div>

            <WizardActions
                onBack={onBack}
                isSubmit={true}
                nextLabel={isSubmitting ? 'Gönderiliyor...' : 'Teklif İste / Gönder'}
                isNextDisabled={isSubmitting || !data.contactName || !data.contactPhone}
            />
        </form>
    );
}
