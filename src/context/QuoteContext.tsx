"use client";

import QuoteWizard from "@/components/features/QuoteWizard";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteContextType {
    openWizard: () => void;
    closeWizard: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openWizard = () => setIsOpen(true);
    const closeWizard = () => setIsOpen(false);

    return (
        <QuoteContext.Provider value={{ openWizard, closeWizard }}>
            {children}
            <QuoteWizard isOpen={isOpen} onClose={closeWizard} />
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error("useQuote must be used within a QuoteProvider");
    }
    return context;
}
