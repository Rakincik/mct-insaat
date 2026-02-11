"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import FloatingForm from "@/components/layout/FloatingForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import CustomCursor from "@/components/ui/CustomCursor";

interface RootLayoutClientProps {
    children: React.ReactNode;
    settings: any;
}

export default function RootLayoutClient({ children, settings }: RootLayoutClientProps) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Sidebar />
            <FloatingForm />
            <MobileStickyBar settings={settings} />
            <div className="lg:ml-[60px] lg:mr-[60px] pb-24 lg:pb-0">
                <Header settings={settings} />
                <main>{children}</main>
                <WhatsAppButton />
                <div className="hidden lg:block">
                    <CustomCursor />
                </div>
                <Footer settings={settings} />
            </div>
        </>
    );
}
