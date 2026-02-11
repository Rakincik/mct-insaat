import { StepProps } from "../types";
import WizardActions from "../WizardActions";

export default function StepInterior({ data, updateData, onNext, onBack }: StepProps) {
    return (
        <div className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">İç Mekan ve Detaylar</h2>
                <p className="text-slate-500 text-sm">Evinizin iç tasarımı, kapılar ve mutfak detayları.</p>
            </div>

            {/* 12. Akıllı Ev */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Akıllı Ev Sistemi & Otomasyon</label>
                <div className="flex gap-4">
                    <button
                        onClick={() => updateData({ smartHome: "evet" })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${data.smartHome === "evet" ? "border-orange-500 bg-orange-50 text-orange-700 font-bold" : "border-slate-200"
                            }`}
                    >
                        İstiyorum
                    </button>
                    <button
                        onClick={() => updateData({ smartHome: "hayir" })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${data.smartHome === "hayir" ? "border-slate-500 bg-slate-100 text-slate-700" : "border-slate-200"
                            }`}
                    >
                        İstemiyorum
                    </button>
                </div>
            </div>

            {/* 12. Kapı Modeli */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">İç Kapı Modeli</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: "melamin", label: "Melamin Kapı", desc: "Ekonomik, çizilmeye dayanıklı" },
                        { id: "panel", label: "Panel / PVC", desc: "Standart, seri üretim" },
                        { id: "lake", label: "Lake Boyalı", desc: "Pürüzsüz yüzey, özel renk, yüksek maliyet" },
                    ].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => updateData({ interiorDoorType: item.id })}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${data.interiorDoorType === item.id
                                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 ring-offset-2"
                                : "border-slate-200 hover:border-orange-200"
                                }`}
                        >
                            <div className="font-bold text-slate-800">{item.label}</div>
                            <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                            {item.id === "lake" && <span className="inline-block mt-2 text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">Önerilen</span>}
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-slate-100" />
            <h3 className="text-xl font-bold text-slate-800">Mutfak Detayları</h3>

            {/* 13. Mutfak Dolapları */}
            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Mutfak Dolap Kapak Malzemesi</label>
                <select
                    className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white"
                    value={data.kitchenCabinet}
                    onChange={(e) => updateData({ kitchenCabinet: e.target.value })}
                >
                    <option value="">Seçiniz</option>
                    <option value="high-gloss">High Gloss / Power Gloss (Parlak, Modern, Ekonomik)</option>
                    <option value="membran">Membran Kapak (Ekonomik, desenli)</option>
                    <option value="lake">Lake (İpek mat/parlak, en kaliteli, tamir edilebilir, pahalı)</option>
                    <option value="akrilik">Akrilik Kapak (Çizilmeye dayanıklı, uzun ömürlü)</option>
                </select>
                {data.kitchenCabinet === "high-gloss" && <p className="text-xs text-green-600">Bütçe dostu modern görünüm için ideal.</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-slate-700 font-semibold block">Gövde Malzemesi</label>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input
                                type="radio"
                                name="kitchenBody"
                                checked={data.kitchenBody === "suntalam"}
                                onChange={() => updateData({ kitchenBody: "suntalam" })}
                                className="text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm">Suntalam</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input
                                type="radio"
                                name="kitchenBody"
                                checked={data.kitchenBody === "mdflam"}
                                onChange={() => updateData({ kitchenBody: "mdflam" })}
                                className="text-orange-600 focus:ring-orange-500"
                            />
                            <div>
                                <span className="text-sm block font-medium">MDF Lam</span>
                                <span className="text-xs text-slate-500">Neme dayanıklı, uzun ömürlü</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-slate-700 font-semibold block">Tezgah Seçimi</label>
                    <select
                        className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white"
                        value={data.kitchenCountertop}
                        onChange={(e) => updateData({ kitchenCountertop: e.target.value })}
                    >
                        <option value="">Seçiniz</option>
                        <option value="laminat">Laminat (Ekonomik)</option>
                        <option value="mermerit">Mermerit / Granit (Geleneksel)</option>
                        <option value="cimstone">Çimstone / Belenco (Kuvars - Dayanıklı)</option>
                        <option value="porselen">Porselen (En dayanıklı, leke tutmaz, pahalı)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-slate-700 font-semibold block">Aksesuar / Mekanizma</label>
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <input
                        type="checkbox"
                        checked={!!data.kitchenAccessories}
                        onChange={(e) => updateData({ kitchenAccessories: e.target.checked ? "frenli-ray-kiler" : "" })}
                        className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <div className="text-sm">
                        <span className="font-bold block text-orange-900">Premium Aksesuar Paketi</span>
                        <span className="text-orange-800">Çekmecelerde ve kapaklarda frenli (Blum, Hettich vb.) ray sistemleri ve kiler sistemleri.</span>
                    </div>
                </div>
            </div>

            <WizardActions
                onNext={onNext}
                onBack={onBack}
            />
        </div>
    );
}
