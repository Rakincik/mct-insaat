export interface Project {
    id: string;
    title: string;
    category: string;
    type: string;
    location: string;
    year: string;
    size: string;
    status: string;
    client?: string;
    coverImage: string;
    gallery: string[];
    description: string;
    features: string[];
    virtualTourUrl?: string; // NEW FIELD
}

export const projects: Project[] = [
    {
        id: "195m2-celik-villa",
        title: "195m² Çelik Villa",
        category: "celik-villa",
        type: "Çelik Villa",
        location: "Ilgın, Konya",
        year: "2023",
        size: "195 m²",
        status: "Tamamlandı",
        coverImage: "/project-assets/195m2-celik-villa/20230525_114034.jpg",
        gallery: [
            "/project-assets/195m2-celik-villa/20230525_114034.jpg",
            "/project-assets/195m2-celik-villa/20230517_095000.jpg",
            "/project-assets/195m2-celik-villa/20230523_102313.jpg",
            "/project-assets/195m2-celik-villa/20230525_113959.jpg",
            "/project-assets/195m2-celik-villa/20230601_145009.jpg",
            "/project-assets/195m2-celik-villa/dji_0058.jpg",
            "/project-assets/195m2-celik-villa/dji_0067.jpg"
        ],
        description: "Modern mimari anlayışıyla tasarlanan 195m² çelik villa projesi, estetik ve konforu bir arada sunuyor. Geniş cam cepheleri ve ferah iç mekanlarıyla yaşam kalitesini artıran bu proje, çelik yapının sağladığı dayanıklılık ile güven veriyor.",
        features: ["Yerden Isıtma", "Çelik Konstrüksiyon", "Geniş Veranda", "Modern Tasarım"],
    },
    {
        id: "240m2-celik-villa",
        title: "240m² Lüks Çelik Villa",
        category: "celik-villa",
        type: "Çelik Villa",
        location: "Konya",
        year: "2023",
        size: "240 m²",
        status: "Tamamlandı",
        coverImage: "/project-assets/240m2-celik-villa/img-20230717-wa0002.jpg",
        gallery: [
            "/project-assets/240m2-celik-villa/img-20230717-wa0002.jpg",
            "/project-assets/240m2-celik-villa/img-20230717-wa0000.jpg",
            "/project-assets/240m2-celik-villa/img-20230717-wa0001.jpg",
            "/project-assets/240m2-celik-villa/img-20230717-wa0003.jpg"
        ],
        description: "240m² kullanım alanına sahip bu özel çelik villa, geniş aileler için ideal bir yaşam alanı sunuyor. Modern detaylar ve fonksiyonel plan çözümleriyle dikkat çeken proje, bölgenin en prestijli yapılarından biri.",
        features: ["Geniş Salon", "Ebeveyn Banyosu", "Veranda", "Akıllı Ev Altyapısı"],
    },
    {
        id: "ahmet-duran",
        title: "Ahmet Duran Konutu",
        category: "betonarme",
        type: "Betonarme Konut",
        location: "Konya",
        year: "2022",
        size: "200 m²",
        status: "Tamamlandı",
        client: "Ahmet Duran",
        coverImage: "/project-assets/ahmet-duran/20221213_124208.jpg",
        gallery: [
            "/project-assets/ahmet-duran/20221213_124208.jpg",
            "/project-assets/ahmet-duran/20221208_153655.jpg",
            "/project-assets/ahmet-duran/20221208_153803.jpg",
            "/project-assets/ahmet-duran/20221213_123551.jpg",
            "/project-assets/ahmet-duran/20221213_123610.jpg",
            "/project-assets/ahmet-duran/20221213_125202.jpg"
        ],
        description: "Ahmet Duran adına inşa edilen bu betonarme konut projesi, geleneksel ile moderni harmanlayan mimarisiyle öne çıkıyor. Sağlam yapısal özellikleri ve kaliteli işçiliği ile uzun ömürlü bir yuva sunuyor.",
        features: ["Betonarme Karkas", "Isı Yalıtımı", "Kaliteli Malzeme", "Kapalı Garaj"],
    },
    {
        id: "ahmet-guven-savas",
        title: "Ahmet Güven Savaş Villası",
        category: "celik-villa",
        type: "Özel Tasarım Villa",
        location: "Konya",
        year: "2022",
        size: "220 m²",
        status: "Tamamlandı",
        client: "Ahmet Güven Savaş",
        coverImage: "/project-assets/ahmet-guven-savas/20220415_114302.jpg",
        gallery: [
            "/project-assets/ahmet-guven-savas/20220415_114302.jpg",
            "/project-assets/ahmet-guven-savas/20220328_152011.jpg",
            "/project-assets/ahmet-guven-savas/20220413_095952.jpg",
            "/project-assets/ahmet-guven-savas/20220512_134101.jpg",
            "/project-assets/ahmet-guven-savas/20220530_100422.jpg"
        ],
        description: "Özel tasarım detaylarıyla bezenmiş bu villa projesi, Ahmet Güven Savaş için hayata geçirildi. Geniş bahçesi ve ferah iç mekanları ile konforlu bir yaşamın kapılarını aralıyor.",
        features: ["Peyzaj Düzenlemesi", "Özel Aydınlatma", "Geniş Mutfak", "Şömine"],
    },
    {
        id: "ahmet-sevim-doras",
        title: "Ahmet Sevim Doras Yapısı",
        category: "betonarme",
        type: "Müstakil Konut",
        location: "Konya",
        year: "2023",
        size: "180 m²",
        status: "Tamamlandı",
        client: "Ahmet Sevim Doras",
        coverImage: "/project-assets/ahmet-sevim-doras/dji_0304.jpg",
        gallery: [
            "/project-assets/ahmet-sevim-doras/dji_0304.jpg",
            "/project-assets/ahmet-sevim-doras/dji_0233.jpg",
            "/project-assets/ahmet-sevim-doras/dji_0294.jpg",
            "/project-assets/ahmet-sevim-doras/dji_0302.jpg",
            "/project-assets/ahmet-sevim-doras/dji_0308.jpg"
        ],
        description: "Ahmet Sevim Doras projesi, modern yaşam standartlarına uygun olarak tasarlanmış müstakil bir konut projesidir. Çevre ile uyumlu mimarisi ve kullanışlı planıyla dikkat çekmektedir.",
        features: ["Modern Cephe", "Bahçe Kullanımı", "Ferah Odalar", "Güvenlik Sistemi"],
    },
    {
        id: "argithani-saglik-ocagi",
        title: "Argıthanı Sağlık Ocağı",
        category: "kamu",
        type: "Kamu Binası / Sağlık",
        location: "Argıthanı, Konya",
        year: "2022",
        size: "400 m²",
        status: "Tamamlandı",
        coverImage: "/project-assets/argithani-saglik-ocagi/20220929_105649.jpg",
        gallery: [
            "/project-assets/argithani-saglik-ocagi/20220929_105649.jpg",
            "/project-assets/argithani-saglik-ocagi/20220929_105632.jpg",
            "/project-assets/argithani-saglik-ocagi/20220929_105703.jpg",
            "/project-assets/argithani-saglik-ocagi/20221001_144319.jpg",
            "/project-assets/argithani-saglik-ocagi/20221001_165645.jpg",
            "/project-assets/argithani-saglik-ocagi/20221001_194608.jpg"
        ],
        description: "Bölge halkının sağlık ihtiyaçlarını karşılamak üzere inşa edilen Argıthanı Sağlık Ocağı, modern sağlık standartlarına uygun, hijyenik ve dayanıklı malzemelerle tamamlanmıştır.",
        features: ["Engelli Erişimi", "Hijyenik Zemin", "Bekleme Salonu", "Acil Müdahale Odası"],
    },
    {
        id: "asir-eken",
        title: "Aşır Eken Konutu",
        category: "betonarme",
        type: "Konut Projesi",
        location: "Konya",
        year: "2021",
        size: "160 m²",
        status: "Tamamlandı",
        client: "Aşır Eken",
        coverImage: "/project-assets/asir-eken/20210909_153133.jpg",
        gallery: [
            "/project-assets/asir-eken/20210909_153133.jpg",
            "/project-assets/asir-eken/20210909_153136.jpg",
            "/project-assets/asir-eken/20210909_153221.jpg",
            "/project-assets/asir-eken/20210909_153246.jpg",
            "/project-assets/asir-eken/20210802_135312.jpg"
        ],
        description: "Aşır Eken için projelendirilen bu konut, kullanışlı ve kompakt yapısıyla aile sıcaklığını yansıtıyor. Bölgenin mimari dokusuna uygun, estetik ve sağlam bir yapı.",
        features: ["Isı Yalıtımı", "Kullanışlı Plan", "Müstakil Giriş", "Bahçe"],
    },
];
