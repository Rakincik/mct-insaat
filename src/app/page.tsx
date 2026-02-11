import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import LeadForm from "@/components/sections/LeadForm";
import FadeIn from "@/components/animations/FadeIn";

import StructuredData from "@/components/seo/StructuredData";
import Reels from "@/components/home/Reels";
import { getSettings, getSlides, getProjects, getReels, getServices } from "@/lib/db";

export default async function Home() {
    const settings = await getSettings();
    const slides = await getSlides();
    const reels = await getReels();
    const services = await getServices();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        "name": "MCT İnşaat",
        "image": "https://mctinsaat.com/logo.png",
        "@id": "https://mctinsaat.com",
        "url": "https://mctinsaat.com",
        "telephone": settings?.phone || "+905442657544",
        "email": settings?.email || "iletisim@mctinsaat.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": settings?.address || "Camiatik Mah. Özalp Cd. 13/A",
            "addressLocality": "Ilgın",
            "addressRegion": "Konya",
            "postalCode": "42660",
            "addressCountry": "TR"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            settings?.instagram || "https://instagram.com/mctinsaat",
            "https://facebook.com/mctinsaat"
        ]
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            <Hero settings={settings} dbSlides={slides} />
            <FadeIn direction="up" delay={0.2} className="w-full">
                <About />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="w-full">
                <Projects projects={await getProjects()} />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="w-full">
                <Reels reels={reels} />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="w-full">
                <Services services={services} />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="w-full">
                <Features />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="w-full">
                <LeadForm />
            </FadeIn>
        </>
    );
}
