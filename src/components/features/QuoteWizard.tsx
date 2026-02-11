"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// New Components
import { INITIAL_DATA, QuoteFormData } from "@/components/quote/types";
import CostEstimator from "@/components/quote/CostEstimator";
import ProgressBar from "@/components/quote/ProgressBar";

// Steps
import StepLandStatus from "@/components/quote/steps/StepLandStatus";
import StepProjectDetails from "@/components/quote/steps/StepProjectDetails";
import StepExterior from "@/components/quote/steps/StepExterior";
import StepInterior from "@/components/quote/steps/StepInterior";
import StepSystems from "@/components/quote/steps/StepSystems";
import StepFinal from "@/components/quote/steps/StepFinal";

interface QuoteWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteWizard({ isOpen, onClose }: QuoteWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<QuoteFormData>(INITIAL_DATA);

    // Total steps
    const TOTAL_STEPS = 6;

    // Reset wizard when opened
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
            // Optionally reset data or keep it draft?
            // setFormData(INITIAL_DATA); 
        }
    }, [isOpen]);

    // Prevent scrolling when wizard is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const updateData = (fields: Partial<QuoteFormData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const handleNext = () => {
        if (currentStep < TOTAL_STEPS) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
            // Scroll to top of right panel if needed
            const rightPanel = document.getElementById("wizard-right-panel");
            if (rightPanel) rightPanel.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
            const rightPanel = document.getElementById("wizard-right-panel");
            if (rightPanel) rightPanel.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Calculate progress
    const progress = Math.round(((currentStep - 1) / TOTAL_STEPS) * 100);

    const StepComponent = [
        StepLandStatus,
        StepProjectDetails,
        StepExterior,
        StepInterior,
        StepSystems,
        StepFinal,
    ][currentStep - 1];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-6xl h-full sm:h-[90vh] sm:max-h-[800px] bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/80 hover:bg-neutral-100 rounded-full flex items-center justify-center transition-colors group border border-slate-200"
                        >
                            <X className="text-neutral-500 group-hover:text-red-500" />
                        </button>

                        {/* Sidebar (Left Panel) - Cost Estimator & Info */}
                        <div className="hidden sm:flex w-1/3 bg-slate-900 text-white relative flex-col border-r border-slate-800">
                            <div className="absolute inset-0 z-0 opacity-20 bg-gradient-to-br from-slate-800 to-slate-900" />

                            <div className="relative z-10 p-8 flex flex-col h-full">
                                <div className="mb-8">
                                    <h2 className="font-heading text-3xl font-bold mb-2">Proje Sihirbazı</h2>
                                    <p className="text-slate-400">Hayalinizdeki yapıyı tasarlayın, tahmini maliyetini anında görün.</p>
                                </div>

                                {/* Cost Estimator anchored in Sidebar */}
                                <div className="mt-auto mb-8 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
                                    <CostEstimator data={formData} />
                                </div>

                                <div className="text-xs text-slate-500 mt-4 text-center">
                                    © 2026 MCT İnşaat Mühendislik
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area (Right Panel) */}
                        <div className="flex-1 bg-white flex flex-col relative w-full h-full">

                            {/* Mobile Header (Visible only on mobile) */}
                            <div className="sm:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
                                <span className="font-bold font-heading">Proje Sihirbazı</span>
                                {/* Close button is absolute, fits nicely */}
                            </div>

                            <div className="p-6 border-b border-slate-100">
                                <ProgressBar progress={progress} step={currentStep} totalSteps={TOTAL_STEPS} />

                                {/* Mobile Cost Indicator */}
                                <div className="sm:hidden mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-500">Tahmini Maliyet:</span>
                                    <div className="text-primary font-bold">
                                        <CostEstimator data={formData} minimal={true} />
                                    </div>
                                </div>
                            </div>

                            {/* Scrolling Content */}
                            <div
                                id="wizard-right-panel"
                                className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative"
                            >
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentStep}
                                        custom={direction}
                                        initial={{ x: direction > 0 ? 20 : -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: direction > 0 ? -20 : 20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="min-h-full pb-20 sm:pb-0"
                                    >
                                        {/* Pass common props to all steps */}
                                        <StepComponent
                                            data={formData}
                                            updateData={updateData}
                                            onNext={handleNext}
                                            onBack={handleBack}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Mobile Cost Overlay (Simpler version if needed, or sticky bottom) */}
                            {/* Currently CostEstimator is hidden on mobile sidebar. 
                                We might want to show a mini summary on mobile bottom? 
                                For now, relying on StepComponent's "Next" button flow.
                            */}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
