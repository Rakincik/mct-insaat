"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";

interface WizardActionsProps {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    isNextDisabled?: boolean;
    showBack?: boolean;
    isSubmit?: boolean;
}

export default function WizardActions({
    onBack,
    onNext,
    nextLabel = "Devam Et",
    isNextDisabled = false,
    showBack = true,
    isSubmit = false
}: WizardActionsProps) {
    return (
        <>
            {/* Desktop Layout (Standard) */}
            <div className="hidden sm:flex justify-between pt-6 border-t border-slate-100 mt-8">
                {showBack && onBack ? (
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Geri
                    </button>
                ) : <div />}

                <button
                    type={isSubmit ? "submit" : "button"}
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className={`${isSubmit ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"} text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                    {nextLabel}
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* Mobile Layout (Sticky Bottom) */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-[60] flex gap-3 safe-area-bottom">
                {showBack && onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="p-3 rounded-xl border border-slate-200 text-slate-600 active:bg-slate-50"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                <button
                    type={isSubmit ? "submit" : "button"}
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className={`flex-1 ${isSubmit ? "bg-green-600 shadow-green-600/20" : "bg-orange-600 shadow-orange-600/20"} text-white px-4 py-3 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg`}
                >
                    {nextLabel}
                    <ArrowRight size={18} />
                </button>
            </div>

            {/* Spacer for mobile to prevent content being hidden behind sticky bar */}
            <div className="h-24 sm:hidden" />
        </>
    );
}
