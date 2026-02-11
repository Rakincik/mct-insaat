import PageHeader from "@/components/layout/PageHeader";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import { Metadata } from "next";
import { getServices } from "@/lib/db";
import { staticServices } from "@/lib/staticData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper to get services with fallback
async function getServicesData() {
    let services = await getServices();
    if (!services || services.length === 0) {
        services = staticServices;
    }
    return services;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const services = await getServicesData();
    const service = services.find((s: any) => s.id === params.slug || s.slug === params.slug);
    if (!service) return { title: "Hizmet Bulunamadı" };

    return {
        title: service.title + " | MCT İnşaat",
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const allServices = await getServicesData();
    const service = allServices.find((s: any) => (s.id === params.slug || s.slug === params.slug || (s as any)._id === params.slug));

    if (!service) {
        notFound();
    }

    const safeSpecs = Array.isArray(service.technicalSpecs) ? service.technicalSpecs : [];
    const safeGallery = Array.isArray(service.gallery) ? service.gallery : [];
    const safeFaq = Array.isArray(service.faq) ? service.faq : [];
    const safeFeatures = Array.isArray(service.features) ? service.features : [];

    return (
        <>
            <PageHeader
                title={service.title}
                description={service.shortDescription}
                backgroundImage={service.coverImage}
                parentPage={{ label: "Hizmetlerimiz", href: "/hizmetler" }}
            />

            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                                    Hizmet Hakkında
                                </h2>
                                <p className="text-neutral-600 text-lg leading-relaxed">
                                    {service.fullDescription || service.shortDescription || "Hizmet açıklaması yakında eklenecektir."}
                                </p>
                            </div>

                            {/* Technical Specs Table */}
                            {safeSpecs.length > 0 && (
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-primary mb-6">
                                        Teknik Özellikler
                                    </h3>
                                    <div className="bg-neutral-50 rounded-sm overflow-hidden border border-neutral-200">
                                        <table className="w-full">
                                            <tbody className="divide-y divide-neutral-200">
                                                {safeSpecs.map((spec: any, index: number) => (
                                                    <tr key={index} className="hover:bg-white transition-colors">
                                                        <td className="p-4 font-semibold text-primary w-1/3">
                                                            {spec.label}
                                                        </td>
                                                        <td className="p-4 text-neutral-600">
                                                            {spec.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Gallery Grid (Simple) */}
                            {safeGallery.length > 0 && (
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-primary mb-6">
                                        Uygulama Örnekleri
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {safeGallery.slice(0, 4).map((img: any, index: number) => (
                                            <div key={index} className="aspect-video rounded-sm overflow-hidden shadow-sm group bg-neutral-100">
                                                <img
                                                    src={img || "/placeholder-service.jpg"}
                                                    alt={`${service.title} Uygulama ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQ Section */}
                            {safeFaq.length > 0 && (
                                <div id="sss">
                                    <div className="flex items-center gap-3 mb-6">
                                        <HelpCircle className="text-accent" size={28} />
                                        <h3 className="font-heading text-xl font-bold text-primary">
                                            Sıkça Sorulan Sorular
                                        </h3>
                                    </div>
                                    <Accordion items={safeFaq} />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Features List */}
                            {safeFeatures.length > 0 && (
                                <div className="bg-white p-6 border border-neutral-200 shadow-sm rounded-sm">
                                    <h3 className="font-heading text-xl font-bold text-primary mb-6 pb-4 border-b border-neutral-100">
                                        Neden Bu Hizmet?
                                    </h3>
                                    <ul className="space-y-4">
                                        {safeFeatures.map((feature: any, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} />
                                                <span className="text-neutral-600 text-sm font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Other Services Menu */}
                            <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-200">
                                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                                    Diğer Hizmetlerimiz
                                </h3>
                                <div className="space-y-2">
                                    {allServices.filter((s: any) => (s.id !== service.id && s._id !== service._id)).map((s: any) => (
                                        <Link
                                            key={s.id || s._id}
                                            href={`/hizmetler/${s.id || s._id}`}
                                            className="flex items-center justify-between p-3 bg-white border border-neutral-200 text-neutral-600 hover:text-accent hover:border-accent transition-colors rounded-sm group"
                                        >
                                            <span className="text-sm font-medium">{s.title}</span>
                                            <ChevronRight size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-primary p-8 text-white text-center rounded-sm">
                                <h3 className="font-heading text-xl font-bold mb-4">
                                    Bu Hizmet İçin Teklif Alın
                                </h3>
                                <p className="text-neutral-300 text-sm mb-6">
                                    Projeniz için ücretsiz keşif ve detaylı fiyat teklifi almak ister misiniz?
                                </p>
                                <Link href="/iletisim" className="btn btn-secondary w-full justify-center">
                                    İletişime Geçin
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
