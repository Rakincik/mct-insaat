"use client";

import PageHeader from "@/components/layout/PageHeader";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import Accordion from "@/components/ui/Accordion";

export default function IletisimPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mesajınız gönderildi.");
    };

    return (
        <>
            <PageHeader
                title="İletişim"
                description="Sorularınız, projeleriniz ve teklif talepleriniz için bize ulaşın."
                backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            />

            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sol Taraf - İletişim Bilgileri */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-primary mb-6">
                                    İletişim Bilgileri
                                </h3>
                                <p className="text-neutral-600 mb-8">
                                    Aşağıdaki iletişim kanallarından bize ulaşabilir veya ofisimizi ziyaret edebilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Adres</h4>
                                        <p className="text-neutral-600">
                                            Camiatik Mah. Özalp Cd. 13/A <br />
                                            Ilgın / Konya
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Telefon</h4>
                                        <a href="tel:+905442657544" className="text-neutral-600 hover:text-accent transition-colors">
                                            +90 544 265 75 44
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">E-posta</h4>
                                        <a href="mailto:iletisim@mctinsaat.com" className="text-neutral-600 hover:text-accent transition-colors">
                                            iletisim@mctinsaat.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Çalışma Saatleri</h4>
                                        <p className="text-neutral-600">
                                            Pazartesi - Cumartesi: 09:00 - 18:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sağ Taraf - Form ve Harita */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Harita */}
                            <div className="w-full h-[300px] lg:h-[400px] bg-neutral-100 rounded-sm overflow-hidden shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199.69755102553755!2d31.9168252277636!3d38.28014491740924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d025916056d6a1%3A0xc3b469bd976da7e9!2sIlg%C4%B1n%2C%20Konya!5e0!3m2!1str!2str!4v1705820000000!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            {/* Form */}
                            <div className="bg-neutral-50 p-8 lg:p-10 border border-neutral-100">
                                <h3 className="font-heading text-2xl font-bold text-primary mb-8">
                                    Bize Ulaşın
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">Adınız Soyadınız</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                placeholder="Adınız Soyadınız"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">E-posta Adresiniz</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                required
                                                placeholder="ornek@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Konu</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            required
                                            placeholder="Mesajınızın konusu"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Mesajınız</label>
                                        <textarea
                                            className="form-input min-h-[150px] resize-none"
                                            required
                                            placeholder="Mesajınızı buraya yazabilirsiniz..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full md:w-auto px-10">
                                        <Send size={18} />
                                        <span>Gönder</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* General FAQ Section */}
            <section className="section bg-neutral-50 border-t border-neutral-200">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                            Merak Ettikleriniz
                        </span>
                        <h2 className="font-heading text-3xl font-bold text-primary">
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <Accordion items={generalFAQ} />
                </div>
            </section>
        </>
    );
}

const generalFAQ = [
    {
        question: "Keşif ücretli mi?",
        answer: "Hayır, Konya ve çevresindeki projeleriniz için keşif ve ön projelendirme hizmetimiz tamamen ücretsizdir.",
    },
    {
        question: "Hangi bölgelere hizmet veriyorsunuz?",
        answer: "Merkezimiz Ilgın/Konya olmak üzere, Konya'nın tüm ilçelerine ve çevre illere (Afyon, Karaman, Aksaray) anahtar teslim inşaat hizmeti veriyoruz.",
    },
    {
        question: "Ödeme koşulları nasıl?",
        answer: "Sözleşme aşamasında belirlenen plan dahilinde; nakit, taksitli veya hak ediş usulü esnek ödeme seçenekleri sunuyoruz.",
    },
    {
        question: "Garanti süresi ne kadar?",
        answer: "Yaptığımız tüm yapılar yasal yönetmeliklere uygun olarak firmamızın garantisi altındadır. İşçilik ve malzeme hatalarına karşı 2 yıl, taşıyıcı sistem için yasal süreler geçerlidir.",
    },
];
