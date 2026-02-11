import { StepProps } from "../types";
import WizardActions from "../WizardActions";

export default function StepProjectDetails({ data, updateData, onNext, onBack }: StepProps) {
    const handleNext = () => {
        // Basic validation
        if (!data.hasProject) return;
        if (data.hasProject === "var" && (!data.constructionType || !data.constructionArea)) return;
        onNext();
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-800">Proje Detayları</h2>

            {/* 1. Proje Var mı? */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Projeniz var mı?</label>
                <div className="grid grid-cols-2 gap-4">
                    {["var", "yok"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => updateData({ hasProject: opt })}
                            className={`p-4 rounded-xl border-2 transition-all font-medium text-lg uppercase ${data.hasProject === opt
                                ? "border-orange-500 bg-orange-50 text-orange-700"
                                : "border-slate-200 hover:border-orange-200 text-slate-600"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conditional: Proje Yoksa */}
            {data.hasProject === "yok" && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800">
                    <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Proje hizmeti almak ister misiniz?
                    </p>
                    <div className="mt-3 flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.projectServiceRequest}
                                onChange={(e) => updateData({ projectServiceRequest: e.target.checked })}
                                className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded border-gray-300"
                            />
                            <span className="font-medium">Evet, proje hizmeti de istiyorum.</span>
                        </label>
                    </div>
                </div>
            )}

            {/* Shared Questions (Even if 'Yok', we might want to know what they want to build to give rough estimate) */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                    <label className="text-slate-700 font-semibold block">Yapı Tipi</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { id: "tek-katli", label: "Tek Katlı Müstakil" },
                            { id: "cok-katli", label: "Çok Katlı Müstakil" },
                            { id: "ikiz", label: "İkiz / Toplu" },
                            { id: "diger", label: "Diğer" }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => updateData({ buildingType: type.id })}
                                className={`p-3 rounded-lg border-2 text-sm transition-all ${data.buildingType === type.id
                                    ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-slate-700 font-semibold block">Toplam İnşaat Alanı (m2)</label>
                    <input
                        type="number"
                        value={data.constructionArea}
                        onChange={(e) => updateData({ constructionArea: e.target.value })}
                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 text-xl"
                        placeholder="Örn: 200"
                    />
                    {parseInt(data.constructionArea) >= 200 && (
                        <p className="text-sm text-amber-600 font-medium">
                            * 200 m2 ve üzeri yapılar yapı denetime tabidir.
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="text-slate-700 font-semibold block">Yapı Sistemi</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { id: "celik", label: "Çelik Villa/Konut" },
                            { id: "betonarme", label: "Betonarme" },
                            { id: "tas", label: "Taş Ev / Bağ Evi" },
                            { id: "prefabrik", label: "Prefabrik" },
                            { id: "ticari", label: "Ticari / Endüstriyel" },
                            { id: "diger", label: "Diğer" }
                        ].map((sys) => (
                            <button
                                key={sys.id}
                                onClick={() => updateData({ constructionType: sys.id })}
                                className={`p-3 rounded-lg border-2 text-sm transition-all ${data.constructionType === sys.id
                                    ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    }`}
                            >
                                {sys.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <WizardActions
                onNext={handleNext}
                onBack={onBack}
                isNextDisabled={!data.hasProject || !data.constructionArea || !data.constructionType}
            />
        </div>
    );
}
