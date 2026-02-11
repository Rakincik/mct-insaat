"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function LeadForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
        setFormData({ name: "", phone: "", email: "", projectType: "", message: "" });
    };

    return (
        <section className="section-full bg-primary relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
                }}
            />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Info */}
                    <div>
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                            İletişime Geçin
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
                            Hayalinizdeki Evi
                            <br />
                            <span className="text-accent">Birlikte İnşa Edelim</span>
                        </h2>
                        <p className="text-neutral-300 text-lg mb-10">
                            Projeniz hakkında bilgi almak, fiyat teklifi istemek veya herhangi
                            bir sorunuz için bizimle iletişime geçebilirsiniz.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <a
                                href="tel:+905442657544"
                                className="flex items-center gap-4 text-white hover:text-accent transition-colors group"
                            >
                                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400">Telefon</p>
                                    <p className="text-lg font-semibold">+90 544 265 75 44</p>
                                </div>
                            </a>

                            <a
                                href="mailto:iletisim@mctinsaat.com"
                                className="flex items-center gap-4 text-white hover:text-accent transition-colors group"
                            >
                                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400">E-posta</p>
                                    <p className="text-lg font-semibold">iletisim@mctinsaat.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-white">
                                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400">Adres</p>
                                    <p className="text-lg font-semibold">
                                        Camiatik Mah. Özalp Cd. 13/A Ilgın/Konya
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="bg-white p-8 lg:p-10">
                        <h3 className="font-heading text-2xl font-bold text-primary mb-6">
                            Ücretsiz Teklif Alın
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="Adınız Soyadınız *"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="form-input"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefon *"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="form-input"
                                    required
                                />
                            </div>

                            <input
                                type="email"
                                placeholder="E-posta"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="form-input"
                            />

                            <select
                                value={formData.projectType}
                                onChange={(e) =>
                                    setFormData({ ...formData, projectType: e.target.value })
                                }
                                className="form-input cursor-pointer"
                            >
                                <option value="">Proje Tipi Seçin</option>
                                <option value="celik-villa">Çelik Villa</option>
                                <option value="betonarme">Betonarme Konut</option>
                                <option value="tas-kaplama">Taş Kaplama</option>
                                <option value="dekorasyon">Dekorasyon</option>
                                <option value="diger">Diğer</option>
                            </select>

                            <textarea
                                placeholder="Projeniz hakkında kısaca bilgi verin..."
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="form-input min-h-[120px] resize-none"
                                rows={4}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-full justify-center"
                            >
                                <Send size={18} />
                                <span>Teklif İste</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
