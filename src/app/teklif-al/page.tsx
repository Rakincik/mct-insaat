import { Metadata } from 'next';
import QuoteForm from '@/components/quote/QuoteForm';

export const metadata: Metadata = {
    title: 'Teklif Al | MCT İnşaat',
    description: 'Hayalinizdeki proje için hızlı ve kolay bir şekilde teklif alın.',
};

export default function TeklifAlPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            Hayalinizdeki Proje İçin Teklif Alın
                        </h1>
                        <p className="text-lg text-slate-600">
                            Aşağıdaki adımları tamamlayarak projeniz için tahmini maliyeti öğrenin ve size özel teklifimizi hazırlamamıza yardımcı olun.
                        </p>
                    </div>

                    <QuoteForm />
                </div>
            </div>
        </main>
    );
}
