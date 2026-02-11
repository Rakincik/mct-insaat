import { QuoteFormData } from "./types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CostEstimator({ data, minimal = false }: { data: QuoteFormData, minimal?: boolean }) {
    const [cost, setCost] = useState({ min: 0, max: 0 });
    const [level, setLevel] = useState(1); // 1: Economic, 2: Standard, 3: Luxury

    useEffect(() => {
        calculateCost();
    }, [data]);

    const calculateCost = () => {
        const baseArea = parseFloat(data.constructionArea) || 150; // Default 150m2 for visualization
        const baseRate = 15000; // Base cost per m2 (Example)
        let multiplier = 1.0;

        // Construction Type Factors
        if (data.constructionType === "celik") multiplier *= 1.15;
        if (data.constructionType === "tas") multiplier *= 1.30;
        if (data.constructionType === "prefabrik") multiplier *= 0.85;

        // Facade
        if (data.facadeMaterial === "tas-kaplama") multiplier *= 1.05;
        if (data.facadeMaterial === "aluminyum") multiplier *= 1.08;

        // Roof
        if (data.roofSystem === "kenet-metal") multiplier *= 1.08;

        // Interior
        if (data.interiorDoorType === "lake") multiplier *= 1.04;
        if (data.kitchenCountertop === "porselen") multiplier *= 1.05;
        if (data.kitchenCabinet === "lake") multiplier *= 1.05;

        // Systems
        if (data.heatingSystem === "yerden-isitma") multiplier *= 1.05;
        if (data.smartHome === "evet") multiplier *= 1.10;
        if (data.automatedBlinds === "evet") multiplier *= 1.03;

        const estimatedTotal = baseArea * baseRate * multiplier;

        setCost({
            min: Math.floor(estimatedTotal * 0.9),
            max: Math.floor(estimatedTotal * 1.1)
        });

        // Determine Level for Gauge
        if (multiplier < 1.0) setLevel(1);
        else if (multiplier < 1.25) setLevel(2);
        else setLevel(3);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
    };

    if (minimal) {
        return (
            <div className="text-right">
                {data.constructionArea ? (
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-slate-800">
                            {formatCurrency(cost.min)} - {formatCurrency(cost.max)}
                        </span>
                        <span className="text-[10px] text-slate-400">Tahmini Bütçe</span>
                    </div>
                ) : (
                    <span className="text-xs text-slate-400 italic">Alan giriniz</span>
                )}
            </div>
        );
    }

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20"></div>

            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Tahmini Maliyet
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Segment:</span>
                    <span className={`font-bold ${level === 3 ? 'text-yellow-400' : level === 2 ? 'text-blue-400' : 'text-green-400'}`}>
                        {level === 3 ? 'PREMIUM' : level === 2 ? 'STANDART' : 'EKONOMİK'}
                    </span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    {/* Gauge visualization */}
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500"
                        initial={{ width: "30%" }}
                        animate={{ width: `${Math.min(100, (cost.max / (300 * 25000)) * 100)}%` }} // Dynamic width based on max potential
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-400 mb-1">Yaklaşık Bütçe Aralığı</p>
                    <div className="text-2xl font-bold text-orange-500">
                        {data.constructionArea ? (
                            <>
                                {formatCurrency(cost.min)}
                                <span className="text-sm text-slate-500 mx-2">-</span>
                                {formatCurrency(cost.max)}
                            </>
                        ) : (
                            <span className="text-lg text-slate-500">Alan girildiğinde hesaplanır</span>
                        )}
                    </div>
                </div>

                <p className="text-[10px] text-slate-500 mt-2">
                    *Bu fiyatlar sadece kaba bir tahmin olup, arsa koşulları, proje detayları ve güncel piyasa koşullarına göre değişiklik gösterebilir. Kesin fiyat proje incelendikten sonra belirlenir.
                </p>
            </div>
        </div>
    );
}
