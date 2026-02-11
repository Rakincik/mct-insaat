import { Building2, Home, Layers, Paintbrush } from "lucide-react";

export const services = [
    {
        id: "celik-yapi",
        title: "Çelik Yapı Sistemleri",
        shortDescription: "Modern, dayanıklı ve hızlı kurulum avantajı sağlayan çelik yapı ve villa projeleri. Depreme karşı yüksek güvenlik ve uzun ömürlü kullanım.",
        fullDescription: "Çelik yapı sistemleri, modern inşaat teknolojisinin sunduğu en güvenli ve esnek çözümlerden biridir. Hafif çelik yapılar, betonarme yapılara göre çok daha hızlı inşa edilebilir, depreme karşı üstün dayanıklılık sağlar ve geri dönüştürülebilir malzemelerden üretildiği için çevre dostudur. MCT İnşaat olarak, hayalinizdeki villayı veya ticari yapıyı çelik konstrüksiyon güvencesiyle anahtar teslim olarak sunuyoruz.",
        icon: Building2,
        coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        ],
        features: [
            "Depreme Karşı Üstün Dayanıklılık",
            "Betonarmeye Göre %50 Daha Hızlı Kurulum",
            "Yüksek Isı ve Ses Yalıtımı",
            "Esnek Mimari Tasarım İmkanı",
            "Uzun Ömürlü ve Bakım Gerektirmez",
            "Doğa Dostu ve Geri Dönüştürülebilir",
        ],
        technicalSpecs: [
            { label: "Taşıyıcı Sistem", value: "Galvanizli Hafif Çelik" },
            { label: "Duvar Kalınlığı", value: "140mm - 200mm" },
            { label: "Yalıtım", value: "Taşyünü + EPS Mantolama" },
            { label: "Dış Cephe", value: "Betopan / Fibercement / Ahşap / Taş" },
            { label: "Garanti", value: "Statik Sistem 50 Yıl" },
        ],
        faq: [
            {
                question: "Çelik evler depreme dayanıklı mı?",
                answer: "Evet, çelik yapılar hafifliği ve esnekliği sayesinde deprem yüklerini sönümler ve betonarme yapılara göre çok daha güvenlidir.",
            },
            {
                question: "Isınma sorunu yaşanır mı?",
                answer: "Hayır, duvarlarımızda yüksek yoğunluklu taşyünü ve dış cephe mantolama sistemleri kullanıyoruz. Geleneksel evlerden daha yüksek enerji tasarrufu sağlar.",
            },
            {
                question: "Ömrü ne kadardır?",
                answer: "Galvanizli çelik paslanmaya karşı korumalıdır ve yapının taşıyıcı sistemi en az 80-100 yıl ömre sahiptir.",
            },
            {
                question: "Ruhsat süreci nasıl işler?",
                answer: "Betonarme yapılarla aynı imar mevzuatına tabidir. Projelendirme ve ruhsat işlemlerini sizin adınıza biz takip ediyoruz.",
            },
        ],
    },
    {
        id: "betonarme",
        title: "Betonarme Konut",
        shortDescription: "Geleneksel ve sağlam yapı teknolojisi ile konforlu yaşam alanları. Projelendirmeden anahtar teslime kadar tüm süreç yönetimi.",
        fullDescription: "Geleneksel yapı kültürümüzün vazgeçilmezi olan betonarme yapılar, sağlamlık ve kalıcılık arayanlar için ideal bir tercihtir. MCT İnşaat olarak, zemin etüdünden başlayarak, statik projelendirme, kaba inşaat ve ince işçiliğe kadar tüm süreçleri titizlikle yönetiyoruz. Yüksek beton kalitesi ve doğru demir donatı uygulamalarıyla, nesiller boyu güvenle oturabileceğiniz evler inşa ediyoruz.",
        icon: Home,
        coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        ],
        features: [
            "C30/C35 Sınıfı Yüksek Dayanımlı Beton",
            "Nervürlü İnşaat Çeliği",
            "Isı ve Su Yalıtımlı Temel ve Çatı",
            "Modern Dış Cephe Tasarımları",
            "1. Sınıf İç Mekan Malzemeleri",
            "Anahtar Teslim Hizmet",
        ],
        technicalSpecs: [
            { label: "Beton Sınıfı", value: "C30 / C35 Hazır Beton" },
            { label: "Demir", value: "S420 Nervürlü Çelik" },
            { label: "Temel Tipi", value: "Radye Temel" },
            { label: "Dış Duvarlar", value: "Bims / Tuğla + Mantolama" },
            { label: "Çatı", value: "Ahşap / Çelik Konstrüksiyon Kiremit" },
        ],
        faq: [
            {
                question: "İnşaat süresi ne kadar sürer?",
                answer: "Ortalama bir villa projesi (200m²), ruhsat alındıktan sonra hava koşullarına bağlı olarak 6-8 ay içinde teslim edilir.",
            },
            {
                question: "Kendi projemizi getirebilir miyiz?",
                answer: "Elbette. Kendi mimari projenizi uygulayabileceğimiz gibi, mimarlarımızla size özel proje de çizebiliriz.",
            },
            {
                question: "Maliyetler nasıl belirleniyor?",
                answer: "Maliyetler; metrekare, kullanılacak malzeme kalitesi (lüks/standart) ve zemin durumuna göre Bayındırlık birim fiyatları ve piyasa koşulları analiz edilerek belirlenir.",
            },
        ],
    },
    {
        id: "tas-kaplama",
        title: "Taş Kaplama & Dekorasyon",
        shortDescription: "Yapılarınıza değer katan doğal taş kaplama uygulamaları. Estetik görünüm ve uzun ömürlü cephe çözümleri.",
        fullDescription: "Doğal taş, yapılara hem estetik bir kimlik kazandırır hem de dış etkenlere karşı koruma sağlar. Uzman ustalarımızla, patlatma taş, kayrak taşı, küfeki ve daha birçok doğal taş çeşidini cephelerinize, bahçe duvarlarınıza ve iç mekanlarınıza uyguluyoruz. Taşın asaletiyle yapılarınızın değerini artırın.",
        icon: Layers,
        coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        ],
        features: [
            "%100 Doğal Taş Uygulamaları",
            "Uzun Ömürlü ve Bakım Gerektirmez",
            "Yüksek Isı Yalıtımına Katkı",
            "Cephe Koruyucu Özellik",
            "Geleneksel ve Modern Desenler",
            "Garantili İşçilik",
        ],
        technicalSpecs: [
            { label: "Taş Çeşitleri", value: "Traverten, Kayrak, Bazalt, Andezit" },
            { label: "Uygulama Yöntemi", value: "Mekanik Montaj / Yapıştırma" },
            { label: "Derz Dolgu", value: "Flex Derz / Derzsis" },
            { label: "Yüzey Koruma", value: "Su İtici Emprenye (Opsiyonel)" },
        ],
        faq: [
            {
                question: "Hangi taş türünü seçmeliyim?",
                answer: "Uygulama yapılacak alana (iç/dış mekan) ve iklim koşullarına göre en uygun taşı birlikte seçiyoruz. Dış cephe için dona dayanıklı taşlar öneriyoruz.",
            },
            {
                question: "Taş kaplama yalıtım sağlar mı?",
                answer: "Evet, doğal taşın kendisi kütlesel bir ısı tutucudur. Mantolama üzerine yapılan taş kaplama yalıtımı daha da güçlendirir.",
            },
            {
                question: "Dökülme yapar mı?",
                answer: "Doğru yapıştırıcı (flex) ve mekanik sabitleme teknikleri kullanıldığında, taş kaplamalar binanın ömrü kadar dayanır.",
            },
        ],
    },
    {
        id: "dekorasyon",
        title: "İç & Dış Dekorasyon",
        shortDescription: "Yaşam alanlarınızı güzelleştiren tadilat ve dekorasyon hizmetleri. Modern tasarımlar ve kaliteli işçilik.",
        fullDescription: "Evinizi veya ofisinizi yenilemek mi istiyorsunuz? Komple tadilat, boya, alçıpan, asma tavan, seramik ve parke işlerinizde profesyonel çözümler sunuyoruz. İç mimari trendlerini takip eden tasarımlarımızla, mekanlarınıza ferahlık ve modernlik katıyoruz.",
        icon: Paintbrush,
        coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        ],
        features: [
            "3D Görselleştirme ve Tasarım",
            "Boya ve Dekoratif Sıva",
            "Asma Tavan ve Işıklandırma",
            "Mutfak ve Banyo Yenileme",
            "Zemin Kaplamaları (Parke/Seramik)",
            "Mobilya ve Ahşap İşleri",
        ],
        technicalSpecs: [
            { label: "Boya", value: "Silinebilir Silikonlu / Dekoratif" },
            { label: "Tavan", value: "Alçıpan / Gergi Tavan / Metal" },
            { label: "Zemin", value: "32. Sınıf Derzli Parke / Granit" },
            { label: "Tesisat", value: "PPRC / PVC Yenileme" },
        ],
        faq: [
            {
                question: "Tadilat ne kadar sürer?",
                answer: "Yapılacak işin kapsamına göre değişir. Komple bir daire tadilatı ortalama 20-30 gün sümektedir.",
            },
            {
                question: "Ev doluyken tadilat yapılır mı?",
                answer: "Kısmi tadilatlarda evet. Ancak komple tadilatlarda eşyaların toplanması ve evi boşaltmak daha sağlıklı ve hızlı sonuç almayı sağlar.",
            },
        ],
    },
];
