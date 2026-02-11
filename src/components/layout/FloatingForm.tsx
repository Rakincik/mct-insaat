"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";

export default function FloatingForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic here

        alert("Mesajınız alındı! En kısa sürede size dönüş yapacağız.");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="sidebar-right cursor-pointer hover:bg-neutral-700 transition-colors"
                aria-label="Bilgi Formu"
            >
                <span className="text-vertical text-white text-xs tracking-widest">
                    BİLGİ FORMU
                </span>
            </button>

            {/* Slide-in Form Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[200] transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-neutral-100 transition-colors"
                    aria-label="Kapat"
                >
                    <X size={24} className="text-neutral-600" />
                </button>

                {/* Form Content */}
                <div className="h-full flex flex-col justify-center px-8 lg:px-12">
                    <div className="mb-8">
                        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-2">
                            Bilgi Talep Et
                        </h3>
                        <p className="text-neutral-500">
                            Size en kısa sürede dönüş yapacağız.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                placeholder="Adınız Soyadınız"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Telefon Numaranız"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="E-posta Adresiniz"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="form-input"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Mesajınız"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="form-input min-h-[120px] resize-none"
                                rows={4}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full justify-center"
                        >
                            <Send size={18} />
                            <span>Gönder</span>
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-200">
                        <p className="text-sm text-neutral-500 mb-2">Hızlı İletişim</p>
                        <a
                            href="tel:+905442657544"
                            className="text-lg font-semibold text-primary hover:text-accent transition-colors"
                        >
                            +90 544 265 75 44
                        </a>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[150]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
