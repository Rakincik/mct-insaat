import { StepProps } from "../types";
import WizardActions from "../WizardActions";

export default function StepLandStatus({ data, updateData, onNext }: StepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Arsa Durumu</h2>
            <p className="text-slate-600">Projenin yapılacağı arsa hakkında kısaca bilgi verir misiniz? (Konum, eğim, zemin durumu vb.)</p>

            <textarea
                value={data.landStatus}
                onChange={(e) => updateData({ landStatus: e.target.value })}
                className="w-full h-40 p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-lg"
                placeholder="Örn: 500m2 düz bir arazi, Konya Ilgın merkezde..."
                autoFocus
            />

            <WizardActions
                onNext={onNext}
                isNextDisabled={!data.landStatus.trim()}
                showBack={false}
            />
        </div>
    );
}
