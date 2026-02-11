import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/db";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Toaster } from "sonner";
import { QuoteProvider } from "@/context/QuoteContext";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import SplashScreen from "@/components/layout/SplashScreen";

// Force dynamic rendering for all pages to avoid build-time database access


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

export const metadata: Metadata = {
    title: "MCT İnşaat | Güven İnşaa Ediyoruz",
    description:
        "ILGIN MCT İnşaat Mühendislik - 12 yıllık tecrübe ile güvenli, kaliteli, konforlu ve ekonomik binalar inşa ediyoruz. Çelik villa, betonarme konut ve taş kaplama hizmetleri.",
    keywords: "MCT İnşaat, Konya, çelik villa, betonarme konut, taş kaplama, inşaat, müteahhit",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();

    return (
        <html lang="tr">
            <body className={`${inter.variable} ${montserrat.variable}`}>
                <GoogleAnalytics />
                <Toaster position="top-right" richColors closeButton />
                <QuoteProvider>
                    <RootLayoutClient settings={settings}>
                        <SplashScreen />
                        {children}
                    </RootLayoutClient>
                </QuoteProvider>
            </body>
        </html>
    );
}
