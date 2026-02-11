import { StepProps } from "../types";
import WizardActions from "../WizardActions";

export default function StepSystems({ data, updateData, onNext, onBack }: StepProps) {
    return (
        <div className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Sistemler ve Altyapı</h2>
                <p className="text-slate-500 text-sm">Pencere, elektrik, mekanik ve diğer teknik detaylar.</p>
            </div>

            {/* 14. Pencereler */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Pencereler</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                        onClick={() => updateData({ windowType: "aluminyum" })}
                        className={`p-3 rounded-lg border-2 text-sm transition-all ${data.windowType === "aluminyum" ? "border-orange-500 bg-orange-50 text-orange-700 font-bold" : "border-slate-200"
                            }`}
                    >
                        Alüminyum Doğrama
                    </button>
                    <button
                        onClick={() => updateData({ windowType: "pvc" })}
                        className={`p-3 rounded-lg border-2 text-sm transition-all ${data.windowType === "pvc" ? "border-orange-500 bg-orange-50 text-orange-700 font-bold" : "border-slate-200"
                            }`}
                    >
                        PVC (70'lik seri, Sinerji Cam)
                    </button>
                </div>
            </div>

            {/* 15. Otomatik Panjur */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Otomatik Panjur Sistemi</label>
                <div className="flex gap-4">
                    <button
                        onClick={() => updateData({ automatedBlinds: "evet" })}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${data.automatedBlinds === "evet" ? "border-orange-500 bg-orange-50 text-orange-700 font-bold" : "border-slate-200"
                            }`}
                    >
                        Evet
                    </button>
                    <button
                        onClick={() => updateData({ automatedBlinds: "hayir" })}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${data.automatedBlinds === "hayir" ? "border-slate-500 bg-slate-100 text-slate-700" : "border-slate-200"
                            }`}
                    >
                        Hayır
                    </button>
                </div>
            </div>

            {/* 16. Kaplamalar (Basitleştirilmiş) */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Zemin Kaplamaları</label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                    Standart olarak Seramik (60x120) ve Laminat Parke (8mm) kullanılacaktır. Özel bir isteğiniz varsa aşağıda belirtebilirsiniz.
                </div>
            </div>

            {/* 17. Duşakabin */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Banyo Sistemi</label>
                <div className="grid grid-cols-3 gap-3">
                    {["dusakabin", "kuvet", "diger"].map((item) => (
                        <button
                            key={item}
                            onClick={() => updateData({ bathroomSystem: item })}
                            className={`p-3 rounded-lg border-2 text-sm capitalize transition-all ${data.bathroomSystem === item
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {item === "diger" ? "Diğer" : item}
                        </button>
                    ))}
                </div>
            </div>

            {/* 18. Elektrik Tesisatı */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Elektrik Tesisatı Detayları</label>
                <p className="text-xs text-slate-500 mb-2">Özel marka istekleri, paratoner vb. (Örn: Siemens sigorta, Vİ-KO priz)</p>
                <textarea
                    value={data.electricalDetails}
                    onChange={(e) => updateData({ electricalDetails: e.target.value })}
                    className="w-full h-24 p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 text-sm"
                    placeholder="Standart dışı isteklerinizi buraya yazabilirsiniz..."
                />
            </div>

            {/* 19. Mekanik Tesisat */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Mekanik Tesisat Detayları</label>
                <p className="text-xs text-slate-500 mb-2">Vitrifiye, batarya vb. marka tercihleri (Örn: Vitra, ECA)</p>
                <textarea
                    value={data.mechanicalDetails}
                    onChange={(e) => updateData({ mechanicalDetails: e.target.value })}
                    className="w-full h-24 p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 text-sm"
                    placeholder="Standart dışı isteklerinizi buraya yazabilirsiniz..."
                />
            </div>

            <WizardActions
                onNext={onNext}
                onBack={onBack}
            />
        </div>
    );
}
