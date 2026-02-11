"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";
import { QuoteFormData } from "@/components/quote/types";

export default function LeadDetails({ lead }: { lead: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const details = lead.quoteDetails as QuoteFormData;

    if (!details) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs flex items-center gap-1 text-accent hover:underline font-medium"
            >
                <Eye size={14} />
                Detayları Gör
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">Teklif Detayları</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            {/* Summary Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Arsa Durumu" value={details.landStatus} />
                                <DetailItem label="Proje Durumu" value={details.hasProject} />
                                <DetailItem label="Yapı Tipi" value={details.buildingType} />
                                <DetailItem label="İnşaat Alanı" value={details.constructionArea ? `${details.constructionArea} m²` : "-"} />
                                <DetailItem label="İnşaat Tipi" value={details.constructionType} />
                                <DetailItem label="Cephe 3D" value={details.facade3D} />
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-l-4 border-accent pl-2">Seçimler ve Özellikler</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                    <DetailRow label="Dış Cephe Malzemesi" value={details.facadeMaterial} />
                                    <DetailRow label="Çatı Sistemi" value={details.roofSystem} />
                                    <DetailRow label="Oluk Sistemi" value={details.gutterSystem} />
                                    <DetailRow label="Çelik Kapı" value={details.steelDoorType} />
                                    <DetailRow label="Yalıtım (Tavan)" value={details.ceilingIsolation} />
                                    <DetailRow label="Isıtma Sistemi" value={details.heatingSystem} />
                                    <DetailRow label="Akıllı Ev" value={details.smartHome} />
                                    <DetailRow label="İç Kapılar" value={details.interiorDoorType} />
                                    <DetailRow label="Mutfak Dolabı" value={details.kitchenCabinet} />
                                    <DetailRow label="Mutfak Tezgahı" value={details.kitchenCountertop} />
                                    <DetailRow label="Pencereler" value={details.windowType} />
                                    <DetailRow label="Panjur" value={details.automatedBlinds} />
                                    <DetailRow label="Zemin (Seramik)" value={details.flooringCeramic} />
                                    <DetailRow label="Zemin (Laminat)" value={details.flooringLaminate} />
                                    <DetailRow label="Banyo/Duş" value={details.bathroomSystem} />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-800 mb-2 text-sm">Teknik Detaylar</h4>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-semibold">Elektrik:</span> {details.electricalDetails || "-"}</p>
                                    <p><span className="font-semibold">Mekanik:</span> {details.mechanicalDetails || "-"}</p>
                                    <p><span className="font-semibold">Altyapı:</span> {details.infrastructure || "-"}</p>
                                    <p><span className="font-semibold">Peyzaj:</span> {details.landscape || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function DetailItem({ label, value }: { label: string, value: any }) {
    if (!value) return null;
    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</span>
            <span className="block font-semibold text-gray-800 capitalize">{value.toString().replace(/-/g, " ")}</span>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: any }) {
    if (!value) return null;
    return (
        <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">{label}:</span>
            <span className="font-medium text-gray-800 capitalize">{value.toString().replace(/-/g, " ")}</span>
        </div>
    );
}
