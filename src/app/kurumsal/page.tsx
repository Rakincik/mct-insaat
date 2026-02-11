import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle2, Target, Lightbulb, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Kurumsal | MCT İnşaat",
    description: "MCT İnşaat hakkında detaylı bilgi, vizyonumuz, misyonumuz ve değerlerimiz.",
};

export default function KurumsalPage() {
    return (
        <>
            <PageHeader
                title="Hakkımızda"
                description="14 yıllık tecrübe ile geleceği güvenle inşa ediyoruz."
                images={[
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
                ]}
            />

            {/* Hikayemiz Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80"
                                    alt="MCT İnşaat Ekibi"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-accent p-8 text-white hidden md:block">
                                <div className="text-4xl font-bold font-heading mb-1">14</div>
                                <div className="text-sm uppercase tracking-wider">Yıllık Tecrübe</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                                Biz Kimiz?
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                                ILGIN MCT İnşaat Mühendislik
                            </h2>
                            <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                                MCT İnşaat Mühendislik; tüm faaliyetlerinde, Türkiye’nin kalkınmasını, dünya uygarlığının gelişmesini;
                                müşterilerinin, çalışanlarının, ortaklarının memnuniyetini ve şirket değerlerini en ön planda gözetir.
                            </p>
                            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                                Sektördeki gelişen teknolojileri takip ederek evrensel standartlarda kaliteli ve daha sağlıklı yaşam
                                alanları için projeler üretiyoruz. Projelere özgü özel çözümler geliştirerek, sağlam, ergonomik,
                                yenilikçi ve yaratıcı sonuçlara ulaşıyoruz.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Güven ve Dürüstlük",
                                    "Sosyal Sorumluluk",
                                    "Tecrübeli ve Uzman Ekip",
                                    "Müşteri Memnuniyeti",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                                        <span className="text-primary font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Biyografi Section */}
            <section className="section bg-neutral-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
                            Kurucumuz
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                            MCT’nin Doğuşu – Mehmet Cihat Tapu
                        </h2>
                        <div className="prose prose-lg text-neutral-600">
                            <p>
                                1989 yılında Konya’nın Ilgın ilçesinde doğdu. 2008 yılında SDÜ İnşaat Mühendisliğini kazandı.
                                Üniversite yıllarında çeşitli topluluklarda kurucu ve yönetici olarak aktif görevler aldı.
                                Mezuniyetinden sonra saha mühendisi olarak başladığı kariyerinde, hastane inşaatlarından
                                kentsel dönüşüm projelerine kadar pek çok alanda tecrübe edindi.
                            </p>
                            <p>
                                Türkiye'nin 4. Büyük Et Entegre Tesisi şantiyesinde Şantiye Şefi olarak görev alarak büyük ölçekli
                                endüstriyel yapıların yönetiminde uzmanlaştı. 2017 yılında, üniversite yıllarında hayalini kurduğu
                                MCT İnşaat Mühendislik firmasını hayata geçirdi.
                            </p>
                            <p>
                                2019 yılında İş Sağlığı ve Güvenliği alanında Yüksek Lisansını tamamlayan Tapu, 2021 yılında
                                Özbekistan'da 36 Milyon Dolarlık Sulama Sistemleri Fabrikası projesini Proje Müdürü olarak yöneterek
                                uluslararası tecrübe kazandı. Bugün MCT İnşaat, çelik villalardan endüstriyel tesislere kadar
                                geniş bir yelpazede güvenli ve yenilikçi yapılar üretmeye devam etmektedir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vizyon & Misyon Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Misyon */}
                        <div className="bg-neutral-50 p-8 border-b-4 border-accent shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-sm mb-6">
                                <Target size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-4">
                                Misyonumuz
                            </h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Başladığı her projeyi bitirme azmi gösteren, açık, saydam, bilgi işleyerek karar veren,
                                yenilikçi bir firmadır. Çevre koruma bilinciyle davranarak örnek projeler ile bu bilinci
                                yayarak inşaat sektöründe önder bir yapı firması olmaktır.
                            </p>
                        </div>

                        {/* Vizyon */}
                        <div className="bg-neutral-50 p-8 border-b-4 border-primary shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-accent text-white flex items-center justify-center rounded-sm mb-6">
                                <Lightbulb size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-4">
                                Vizyonumuz
                            </h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Üstlendiği her işte güvenilirdir; sözünü tutar, işini iyi yapar. Dünya ve ülke çapında öncü,
                                girişimcilik ruhu taşıyan projeler ile ülkemizin önemli mihenk taşı mimari ve mühendislik
                                yapılarını inşa etmektir.
                            </p>
                        </div>

                        {/* Değerler */}
                        <div className="bg-neutral-50 p-8 border-b-4 border-neutral-800 shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-neutral-800 text-white flex items-center justify-center rounded-sm mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-4">
                                Değerlerimiz
                            </h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Evrensel standartlarda kaliteli yaşam alanları üretmek, takım çalışmasını teşvik etmek,
                                hizmet kalitesini sürekli artırmak. Güven, dürüstlük ve sosyal sorumluluk prensiplerine
                                daima sahip çıkmak.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                        Hayallerinizi Ertelemeyin
                    </h2>
                    <p className="text-neutral-300 text-lg max-w-2xl mx-auto mb-10">
                        Siz hayal edin, biz gerçekleştirelim. Projelerimiz hakkında detaylı bilgi
                        almak için hemen iletişime geçin.
                    </p>
                    <Link href="/iletisim" className="btn btn-secondary">
                        Bizimle İletişime Geçin
                    </Link>
                </div>
            </section>
        </>
    );
}
