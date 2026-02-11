export interface QuoteFormData {
    // Step 1: Arsa
    landStatus: string;

    // Step 2: Proje
    hasProject: string; // "var" | "yok"
    projectServiceRequest: boolean;
    buildingType: string; // "tek-katli", "cok-katli", "ikiz", "diger"
    constructionArea: string; // m2 input
    constructionType: string; // "celik", "betonarme", "tas", "prefabrik", "ticari", "diger"

    // Step 3 (Conditional for Steel)
    foundationType?: string; // Steel specific

    // Step 5 Facade
    facade3D?: string; // "var" | "yok"
    facadeMaterial: string;

    // Step 6 Roof
    roofSystem: string;

    // Step 7 Gutter
    gutterSystem: string;

    // Step 8 Steel Door
    steelDoorType: string;

    // Step 9 Concrete Facade Isolation
    concreteIsolation?: string;

    // Step 10 Ceiling Isolation
    ceilingIsolation: string;

    // Step 11 Heating
    heatingSystem: string;

    // Step 12 Smart Home & Doors
    smartHome: string;
    interiorDoorType: string; // "melamin", "panel", "lake"

    // Step 13 Kitchen
    kitchenCabinet: string; // "high-gloss", "membran", "lake", "akrilik"
    kitchenBody: string; // "suntalam", "mdflam"
    kitchenCountertop: string; // "laminat", "mermerit", "cimstone", "porselen"
    kitchenAccessories: string;

    // Step 14 Windows
    windowType: string;

    // Step 15 Blinds
    automatedBlinds: string; // "evet", "hayir"

    // Step 16 Flooring
    flooringCeramic: string;
    flooringLaminate: string;

    // Step 17 Shower
    bathroomSystem: string;

    // Step 18 Electrical
    electricalDetails: string;

    // Step 19 Mechanical
    mechanicalDetails: string;

    // Step 20 Infrastructure
    infrastructure: string;

    // Step 21 Landscape
    landscape: string;

    // Contact
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    contactNote: string;
}

export const INITIAL_DATA: QuoteFormData = {
    landStatus: "",
    hasProject: "",
    projectServiceRequest: false,
    buildingType: "",
    constructionArea: "",
    constructionType: "",
    facadeMaterial: "",
    roofSystem: "",
    gutterSystem: "",
    steelDoorType: "",
    ceilingIsolation: "",
    heatingSystem: "",
    smartHome: "",
    interiorDoorType: "",
    kitchenCabinet: "",
    kitchenBody: "",
    kitchenCountertop: "",
    kitchenAccessories: "",
    windowType: "",
    automatedBlinds: "",
    flooringCeramic: "",
    flooringLaminate: "",
    bathroomSystem: "",
    electricalDetails: "",
    mechanicalDetails: "",
    infrastructure: "",
    landscape: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactNote: ""
};

export type StepProps = {
    data: QuoteFormData;
    updateData: (fields: Partial<QuoteFormData>) => void;
    onNext: () => void;
    onBack: () => void;
};
