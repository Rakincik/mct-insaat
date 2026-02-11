import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getServices } from "@/lib/db";
import { staticServices } from "@/lib/staticData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HizmetlerPage() {
    // Fetch from MongoDB, fallback to static data if empty
    let services = await getServices();
    if (!services || services.length === 0) {
        services = staticServices;
    }

    return (
        <>
            <PageHeader
                title="Hizmetlerimiz"
                description="İnşaat sektöründeki 14 yıllık tecrübemizle sunduğumuz profesyonel çözümler."
                images={[
                    "https://images.unsplash.com/photo-1581094794329-cd56b5095bb4?w=1920&q=80",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
                    "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1920&q=80"
                ]}
            />

            <section className="section bg-white">
                <div className="container">
                    <div className="flex flex-col gap-20">
                        {services.map((service: any, index: number) => {
                            const safeFeatures = Array.isArray(service.features) ? service.features : [];
                            return (
                                <div
                                    key={service.id || service._id}
                                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                        }`}
                                >
                                    <div className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                                        <div className="relative group overflow-hidden rounded-sm shadow-xl bg-neutral-100">
                                            <div className="aspect-[4/3]">
                                                <img
                                                    src={service.coverImage || "/placeholder-service.jpg"}
                                                    alt={service.title || "Hizmet"}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />

                                            {/* Icon Badge */}
                                            {service.icon ? (
                                                <div className="absolute top-6 left-6 w-16 h-16 bg-white flex items-center justify-center shadow-lg">
                                                    <service.icon className="text-accent" size={32} />
                                                </div>
                                            ) : (
                                                <div className="absolute top-6 left-6 w-16 h-16 bg-white flex items-center justify-center shadow-lg">
                                                    <Check className="text-accent" size={32} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={index % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
                                        <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                                            {service.title}
                                        </h2>
                                        <div className="h-1 w-20 bg-accent mb-6" />
                                        <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                                            {service.shortDescription || "Hizmet detayları yakında eklenecektir."}
                                        </p>

                                        {safeFeatures.length > 0 && (
                                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                                {safeFeatures.slice(0, 4).map((feature: any, i: number) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                            <Check size={14} className="text-accent" />
                                                        </div>
                                                        <span className="text-neutral-700 font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-4">
                                            <Link
                                                href={`/hizmetler/${service.id || service._id}`}
                                                className="btn btn-primary"
                                            >
                                                <span>Detayları İncele</span>
                                                <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {services.length === 0 && (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-neutral-400">Hizmetlerimiz yakında güncellenecektir.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

