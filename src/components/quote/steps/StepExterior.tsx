import { StepProps } from "../types";
import WizardActions from "../WizardActions";

export default function StepExterior({ data, updateData, onNext, onBack }: StepProps) {
    return (
        <div className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Dış Cephe ve Yalıtım</h2>
                <p className="text-slate-500 text-sm">Yapının dış görünümü ve enerji verimliliği ile ilgili tercihleriniz.</p>
            </div>

            {/* 5. 3D Modelleme */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Dış cephede 3D modelleme var mı?</label>
                <div className="grid grid-cols-2 gap-4">
                    {["var", "yok"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => updateData({ facade3D: opt })}
                            className={`p-3 rounded-lg border-2 text-sm uppercase transition-all ${data.facade3D === opt
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* 5. Dış Cephe Kaplama */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Dış Cephe Kaplama</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: "mantolama", label: "Mantolama Sıva Boya" },
                        { id: "ahsap", label: "Ahşap Kaplama" },
                        { id: "tas-kaplama", label: "Taş Kaplama" },
                        { id: "aluminyum", label: "Alüminyum Kompozit" },
                        { id: "diger", label: "Diğer" }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => updateData({ facadeMaterial: item.id })}
                            className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${data.facadeMaterial === item.id
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 6. Çatı Sistemi */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Çatı Sistemi</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        { id: "beton-kiremit", label: "Beton Kiremit" },
                        { id: "kenet-metal", label: "Kenet Metal Kaplama" },
                        { id: "diger", label: "Diğer" }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => updateData({ roofSystem: item.id })}
                            className={`p-3 rounded-lg border-2 text-sm transition-all ${data.roofSystem === item.id
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 7. Oluk Sistemi */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Oluk Sistemi</label>
                <select
                    className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white"
                    value={data.gutterSystem}
                    onChange={(e) => updateData({ gutterSystem: e.target.value })}
                >
                    <option value="">Seçiniz</option>
                    <option value="gizli">Gizli Oluk Sistemi</option>
                    <option value="cinko">Çinko Yatay ve Düşey Oluk</option>
                    <option value="diger">Diğer</option>
                </select>
            </div>

            {/* 9. Betonarme İzolasyon (Conditional) */}
            {data.constructionType === "betonarme" && (
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                    <label className="text-slate-700 font-semibold block">Betonarme Dış Cephe Yalıtımı</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => updateData({ concreteIsolation: "10cm-tasyunu" })}
                            className={`p-3 rounded-lg border-2 text-sm ${data.concreteIsolation === "10cm-tasyunu" ? "border-orange-500 bg-white" : "border-slate-200"}`}
                        >
                            10 cm Taşyünü
                        </button>
                        <button
                            onClick={() => updateData({ concreteIsolation: "10cm-eps" })}
                            className={`p-3 rounded-lg border-2 text-sm ${data.concreteIsolation === "10cm-eps" ? "border-orange-500 bg-white" : "border-slate-200"}`}
                        >
                            10 cm EPS
                        </button>
                    </div>
                </div>
            )}

            {/* 10. Tavan Yalıtımı */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Tavan Yalıtımı</label>
                <select
                    className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white"
                    value={data.ceilingIsolation}
                    onChange={(e) => updateData({ ceilingIsolation: e.target.value })}
                >
                    <option value="">Seçiniz</option>
                    <option value="10cm-camyunu">10 cm Camyünü</option>
                    <option value="10cm-tasyunu">10 cm Taşyünü</option>
                    <option value="5cm-poliuretan">5 cm Sıkma Poliüretan Köpük</option>
                    <option value="diger">Diğer</option>
                </select>
            </div>

            {/* 11. Isınma Sistemi */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Isınma Sistemi</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: "yerden-isitma", label: "Yerden Isıtma" },
                        { id: "kalorifer", label: "Kalorifer Sistemi" },
                        { id: "sobali", label: "Hiçbiri (Sobalı)" },
                        { id: "diger", label: "Diğer" }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => updateData({ heatingSystem: item.id })}
                            className={`p-3 rounded-lg border-2 text-sm transition-all ${data.heatingSystem === item.id
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <WizardActions
                onNext={onNext}
                onBack={onBack}
            />
        </div>
    );
}
