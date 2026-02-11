import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number;
    step: number;
    totalSteps: number;
}

export default function ProgressBar({ progress, step, totalSteps }: ProgressBarProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                <span>Adım {step} / {totalSteps}</span>
                <span>%{progress} Tamamlandı</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-orange-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
