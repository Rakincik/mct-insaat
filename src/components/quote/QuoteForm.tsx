"use client";

import { useState, useEffect } from "react";
import { INITIAL_DATA, QuoteFormData } from "./types";
import ProgressBar from "./ProgressBar";
import CostEstimator from "./CostEstimator";
import { motion, AnimatePresence } from "framer-motion";

// Step Components (will be implemented next)
import StepLandStatus from "./steps/StepLandStatus";
import StepProjectDetails from "./steps/StepProjectDetails";
import StepExterior from "./steps/StepExterior";
import StepInterior from "./steps/StepInterior";
import StepSystems from "./steps/StepSystems";
import StepFinal from "./steps/StepFinal";

export default function QuoteForm() {
    const [data, setData] = useState<QuoteFormData>(INITIAL_DATA);
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0); // For animation direction
    const TOTAL_STEPS = 6;

    const updateData = (fields: Partial<QuoteFormData>) => {
        setData((prev) => ({ ...prev, ...fields }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            setDirection(1);
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Progress Calculation
    const progress = Math.round(((currentStep - 1) / TOTAL_STEPS) * 100);

    const StepComponent = [
        StepLandStatus,
        StepProjectDetails,
        StepExterior,
        StepInterior,
        StepSystems,
        StepFinal,
    ][currentStep - 1];

    // If we don't have the component yet (during dev), show fallback
    if (!StepComponent) return <div>Step not implemented yet</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative">
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100">
                <ProgressBar progress={progress} step={currentStep} totalSteps={TOTAL_STEPS} />

                <div className="mt-8 mb-8 min-h-[400px]">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            initial={{ x: direction > 0 ? 20 : -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? -20 : 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* @ts-ignore - Temporary until components are created */}
                            <StepComponent
                                data={data}
                                updateData={updateData}
                                onNext={nextStep}
                                onBack={prevStep}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky Sidebar for Cost Estimation on Large Screens */}
            <div className="lg:w-80 lg:sticky lg:top-24 h-fit space-y-4">
                <CostEstimator data={data} />
            </div>
        </div>
    );
}
