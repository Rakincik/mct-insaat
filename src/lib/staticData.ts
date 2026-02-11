import { Home, Building2, Box, TreePine, Caravan, Factory, Palette, FileText, Briefcase, MessageSquare, HardHat, Handshake, Award } from "lucide-react";

import { projects } from "@/data/projects";

export const staticProjects = projects;

export const projectCategories = [
    "Tümü",
    "Çelik Villa",
    "Betonarme Konut",
    "MCT Kap-Kon Kapsül Konut",
    "Tiny House",
    "Bungalov",
    "Prefabrik Ev",
    "Endüstriyel Tesisler",
    "Proje Hizmeti",
    "Danışmanlık",
    "Müşavirlik",
    "Taahhüt",
    "Çözüm Ortaklığı",
    "MCT Tecrübeler"
];

export const staticServices = [
    {
        id: "1",
        title: "Çelik Konstrüksiyon Evler",
        description: "Ağır Çelik & Hafif Çelik yapılarla güvenli ve modern yaşam alanları.",
        shortDescription: "Ağır Çelik & Hafif Çelik yapılarla güvenli ve modern yaşam alanları üretiyoruz. Depreme dayanıklı, hızlı kurulumlu ve enerji verimliliği yüksek evler için doğru adres.",
        fullDescription: "MCT İnşaat olarak, modern mimariyi güvenli yapılarla buluşturuyoruz. Çelik konstrüksiyon evlerimiz, yüksek mühendislik hesaplamalarıyla depreme karşı maksimum güvenlik sağlarken, esnek tasarım imkanlarıyla hayalinizdeki evi gerçeğe dönüştürüyor. Hafif ve Ağır çelik sistemlerimiz, betonarme yapılara göre çok daha hızlı inşa edilir ve uzun ömürlüdür.",
        coverImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80",
        features: ["Depreme Dayanıklı", "Hızlı Kurulum (45-60 Gün)", "Yüksek Isı ve Ses Yalıtımı", "Uzun Ömürlü Galvaniz Çelik", "Esnek Mimari Tasarım"],
        technicalSpecs: [
            { label: "Çelik Kalitesi", value: "Galvanizli Çelik (ST-52 / S350GD)" },
            { label: "Duvar Sistemi", value: "Fiber Cement / Yalıtımlı Panel" },
            { label: "Yalıtım", value: "Taşyünü / Camyünü" },
            { label: "Ömür", value: "100+ Yıl" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1600596542815-2495db9a9cf6?w=800&q=80",
            "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=800&q=80"
        ],
        faq: [
            { question: "Çelik evlerin ömrü ne kadardır?", answer: "Galvanizli çelik kullanıldığından korozyona uğramaz ve betonarme yapılar gibi 100 yıla yakın kullanım ömrü sunar." },
            { question: "Depreme dayanıklı mıdır?", answer: "Evet, çelik yapılar esnek yapısı sayesinde deprem enerjisini sönümler ve kırılma yapmaz, bu nedenle son derece güvenlidir." },
            { question: "Isınma sorunu olur mu?", answer: "Hayır, duvar ve çatı panellerinde kullanılan yüksek yoğunluklu taşyünü yalıtımı sayesinde ısı ve ses izolasyonu mükemmeldir." }
        ],
        icon: Home
    },
    {
        id: "2",
        title: "Betonarme Konutlar",
        description: "Geleneksel ve sağlam betonarme konut projeleri.",
        shortDescription: "Yılların getirdiği tecrübe ile, sağlam temeller üzerine kurulu, modern mimariye sahip betonarme konut projeleri üretiyoruz.",
        fullDescription: "Geleneksel yapı kültürümüzün vazgeçilmezi olan betonarme yapılar, MCT İnşaat güvencesiyle modern standartlara ulaşıyor. Projelendirmeden anahtar teslime kadar tüm süreçleri titizlikle yönetiyoruz. Kaliteli beton ve demir kullanımı, doğru statik hesaplamalar ve usta işçilik ile aileniz için en güvenli yuvaları inşa ediyoruz.",
        coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        features: ["C30/C35 Beton Kalitesi", "Modern Mimari", "Gelişmiş Temel Sistemleri", "Anahtar Teslim Hizmet"],
        technicalSpecs: [
            { label: "Beton Sınıfı", value: "C30 / C35 Hazır Beton" },
            { label: "Demir", value: "B420C Nervürlü Çelik" },
            { label: "Temel Tipi", value: "Radye Temel / Mütemadi" },
            { label: "Dış Cephe", value: "Mantolama / Kompozit" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            "https://images.unsplash.com/photo-1593696140826-c58b5e636894?w=800&q=80",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
        ],
        faq: [
            { question: "İnşaat süresi ne kadar sürer?", answer: "Projenin büyüklüğüne göre değişmekle birlikte, ortalama bir villa projesi 6-8 ay içerisinde tamamlanmaktadır." },
            { question: "Projeyi siz mi çiziyorsunuz?", answer: "Evet, mimari ve statik proje departmanımızla ruhsat süreçlerinden uygulamaya kadar tüm hizmeti tek elden sunuyoruz." }
        ],
        icon: Building2
    },
    {
        id: "3",
        title: "MCT Kap-Kon Kapsül Konut",
        description: "Geleceğin yaşam tarzı kapsül konut projeleri.",
        shortDescription: "Minimalist, taşınabilir ve fütüristik tasarıma sahip yeni nesil kapsül konutlarımızla tanışın. Doğanın içinde modern bir yaşam.",
        fullDescription: "MCT Kap-Kon, geleneksel yaşam kalıplarını kıran, teknolojik ve modüler bir yaşam alanıdır. Fabrika ortamında üretilen bu kapsüller, istenilen yere taşınabilir ve anında kurulabilir. Akıllı ev sistemleri, enerji verimliliği ve uzay çağı tasarımıyla, hem bireysel kullanım hem de turizm işletmeleri için benzersiz bir çözümdür.",
        coverImage: "https://images.unsplash.com/photo-1512915990746-d2f621305285?w=1920&q=80",
        features: ["%100 Taşınabilir", "Modüler Yapı", "Fütüristik Tasarım", "Hızlı Üretim", "Akıllı Ev Altyapısı"],
        technicalSpecs: [
            { label: "Gövde", value: "Fiberglass / Kompozit" },
            { label: "İzolasyon", value: "Poliüretan Köpük" },
            { label: "Camlar", value: "Temperli Panoramik Cam" },
            { label: "Boyutlar", value: "20m² - 40m² Seçenekleri" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1512915990746-d2f621305285?w=800&q=80",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80"
        ],
        faq: [
            { question: "İmar izni gerekir mi?", answer: "İmarsız arazilere 'Tiny House' statüsünde veya geçici yapı olarak konumlandırılabilir, ancak bölge mevzuatına bakılmalıdır." },
            { question: "Isınma nasıl sağlanır?", answer: "Klima ve elektrikli ısıtıcılar için altyapı hazırdır, izolasyonu çok güçlüdür." }
        ],
        icon: Box
    },
    {
        id: "4",
        title: "Bungalov",
        description: "Doğa ile iç içe ahşap ve modern bungalov evler.",
        shortDescription: "Ahşabın sıcaklığını ve doğallığını modern konforla birleştiren Bungalov evlerimizle hayallerinizdeki tatil köyünü veya bağ evini kurun.",
        fullDescription: "Doğayla uyumlu, üçgen (A-Frame) veya modern mimarideki bungalovlarımız, hem yazlık hem kışlık kullanıma uygundur. Fırınlanmış ve emprenye edilmiş ithal ahşaplar kullanarak uzun ömürlü yapılar inşa ediyoruz. Turizm işletmeleri için yüksek getirili bir yatırım aracıdır.",
        coverImage: "https://images.unsplash.com/photo-1523459363576-2d3ea9275f30?w=1920&q=80",
        features: ["Doğal Ahşap Malzeme", "A-Frame Tasarım", "Loft Katlı", "Geniş Veranda", "Turizm Odaklı"],
        technicalSpecs: [
            { label: "Ahşap Tipi", value: "Sibirya Çamı / Sedir" },
            { label: "Koruma", value: "Emprenye + Su Bazlı Vernik" },
            { label: "Çatı", value: "Shingle / Metal Kiremit" },
            { label: "Yalıtım", value: "Taşyünü (Çatı ve Duvar)" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1523459363576-2d3ea9275f30?w=800&q=80",
            "https://images.unsplash.com/photo-1599809275671-b5942cabc7ad?w=800&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ],
        faq: [
            { question: "Bakımı zor mudur?", answer: "Her 2-3 yılda bir dış ahşap koruyucu vernik uygulaması ile ilk günkü gibi kalır." },
            { question: "Yanmaya karşı korumalı mı?", answer: "Kullanılan ahşaplar yangın geciktirici solüsyonlarla işlenmektedir." }
        ],
        icon: TreePine
    },
    {
        id: "5",
        title: "Tiny House",
        description: "Minimalist yaşamı sevenler için taşınabilir küçük evler.",
        shortDescription: "Özgürlüğüne düşkün olanlar için. Plakalı ve ruhsatlı, karavan statüsünde, dilediğiniz yere götürebileceğiniz mobil evler.",
        fullDescription: "Tiny House hareketinin en şık örneklerini sunuyoruz. Tekerlekli şasi üzerine inşa edilen bu evler, Karayolları trafik yönetmeliğine uygun olarak üretilir. Küçük metrekaresine rağmen akıllı mobilya çözümleriyle size tam donanımlı bir ev konforu sunar. İster Ege sahillerinde, ister Torosların zirvesinde eviniz hazır.",
        coverImage: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1920&q=80",
        features: ["O2 Tip Onay Belgeli", "Plakalı ve Ruhsatlı", "Mobil Yaşam", "Akıllı Depolama", "Off-Grid Seçenekleri"],
        technicalSpecs: [
            { label: "Şasi", value: "Galvanizli Çelik Römork" },
            { label: "Boyutlar", value: "2.55m Genişlik x 8m Uzunluk" },
            { label: "Ağırlık", value: "3500 kg altı" },
            { label: "Dış Cephe", value: "Thermowood / Alüminyum" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=80",
            "https://images.unsplash.com/photo-1628624747186-a941c725611b?w=800&q=80",
            "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80",
            "https://images.unsplash.com/photo-1531384074-629f6d4d50c7?w=800&q=80"
        ],
        faq: [
            { question: "Ruhsat almam gerekiyor mu?", answer: "Ürünlerimiz O2 belgeli ve plakalıdır, noter satışı ile devredilir, yapı ruhsatı gerektirmez." },
            { question: "Su ve elektrik nasıl sağlanır?", answer: "Dışarıdan şebeke bağlantısı veya güneş paneli ve su deposu sistemleriyle (Off-Grid) sağlanabilir." }
        ],
        icon: Caravan
    },
    {
        id: "6",
        title: "Prefabrik Ev",
        description: "Ekonomik ve pratik prefabrik konut çözümleri.",
        shortDescription: "Hafta sonu evleri veya kalıcı konut ihtiyacı için en ekonomik ve hızlı çözüm. Estetik, yalıtımlı ve uzun ömürlü prefabrik yapılar.",
        fullDescription: "Gelişen teknoloji ile prefabrik evler artık çok daha estetik ve konforlu. MCT İnşaat olarak,betopan veya fibercement kaplamalı, yüksek ısı yalıtımlı duvar panelleriyle ürettiğimiz prefabrik evler, her iklim koşuluna uygundur. Fabrikada hazırlanan modüller, arazinizde günler içinde birleştirilerek kullanıma hazır hale gelir.",
        coverImage: "https://images.unsplash.com/photo-1574515573427-023e10aa3961?w=1920&q=80",
        features: ["Ekonomik Fiyat", "Çok Hızlı Kurulum", "Sökülüp Takılabilir", "İyi Isı Yalıtımı", "Bakım Gerektirmez"],
        technicalSpecs: [
            { label: "Duvar Kalınlığı", value: "10cm / 14cm" },
            { label: "Duvar Malzemesi", value: "Betopan + EPS" },
            { label: "Çatı", value: "Boyalı Sac / Shingle" },
            { label: "Pencereler", value: "PVC Isıcam" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1574515573427-023e10aa3961?w=800&q=80",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
            "https://images.unsplash.com/photo-1516455590571-18259e0df23b?w=800&q=80",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80"
        ],
        faq: [
            { question: "Ömrü ne kadardır?", answer: "Düzenli bakımla 40-50 yıl kullanım ömrüne sahiptir." },
            { question: "Kışın ısınır mı?", answer: "Duvar panelleri içindeki yüksek yoğunluklu strafor sayesinde ısı yalıtımı oldukça iyidir." }
        ],
        icon: Home
    },
    {
        id: "7",
        title: "Ticari – Endüstriyel Tesisler",
        description: "Fabrika, depo ve ticari alan projeleri.",
        shortDescription: "Büyük ölçekli fabrika, depo, antrepo ve showroom projelerinizde çözüm ortağınız. Çelik ve prefabrik sistemlerle geniş açıklıklı yapılar.",
        fullDescription: "Sanayi yapılarında hız, dayanıklılık ve işlevsellik esastır. MCT İnşaat, 12.500 m² ve 23.500 m² gibi devasa referanslarıyla endüstriyel tesis inşasında uzmandır. Ağır çelik konstrüksiyon veya prefabrik betonarme sistemlerle, üretim süreçlerinize en uygun, geniş açıklıklı ve yüksek tavanlı tesisleri anahtar teslim kuruyoruz.",
        coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
        features: ["Geniş Kolon Açıklığı", "Vinç Yolları", "Endüstriyel Zemin", "Yüksek Güvenlik", "Proje Yönetimi"],
        technicalSpecs: [
            { label: "Yapı Sistemi", value: "Ağır Çelik / Prefabrik Beton" },
            { label: "Kaplama", value: "Sandwich Panel" },
            { label: "Zemin", value: "Endüstriyel Epoksi / Beton" },
            { label: "Yükseklik", value: "6m - 12m+" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
            "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
        ],
        faq: [
            { question: "Bu kadar büyük yapıları ne sürede teslim ediyorsunuz?", answer: "Özbekistan projemiz gibi 23.500m²'lik tesisleri proje yönetim ekibimizle rekor sürelerde teslim ettik." },
            { question: "Yurtdışı hizmetiniz var mı?", answer: "Evet, uluslararası müteahhitlik tecrübemiz mevcuttur." }
        ],
        icon: Factory
    },
    {
        id: "8",
        title: "Dekorasyon – Taş Kaplama Bayiliği",
        description: "İç ve dış mekan dekorasyon ve taş kaplama hizmetleri.",
        shortDescription: "Mekanlarınıza değer katan dokunuşlar. Doğal taş uygulamaları, dış cephe giydirme ve iç mekan tadilat hizmetleri.",
        fullDescription: "Bir yapının ruhunu detaylar belirler. MCT İnşaat olarak, iç mimari ve dış cephe dekorasyonunda estetik çözümler sunuyoruz. Özellikle taş kaplama konusundaki uzmanlığımız ve bayiliklerimizle, villalarınıza, bahçe duvarlarınıza ve iş yerlerinize doğal, prestijli bir görünüm kazandırıyoruz. Alçıpan, boya, seramik ve peyzaj işlerinizde de yanınızdayız.",
        coverImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&q=80",
        features: ["Doğal Taş Uygulama", "Kültür Taşı", "Peyzaj Düzenleme", "Anahtar Teslim Tadilat", "İç Mimari Tasarım"],
        technicalSpecs: [
            { label: "Malzeme", value: "Doğal Kayrak / Patlatma Taş" },
            { label: "Uygulama", value: "Fileli / Filesiz Montaj" },
            { label: "Yapıştırıcı", value: "Flex Dış Cephe Harcı" },
            { label: "Garanti", value: "İşçilik Garantisi" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
        ],
        faq: [
            { question: "Taş kaplama rutubeti engeller mi?", answer: "Evet, doğru uygulanan taş kaplama binayı dış etkenlerden korur ve yalıtıma katkı sağlar." },
            { question: "Tadilat işleri yapıyor musunuz?", answer: "Evinizin A'dan Z'ye tüm tadilat işlemlerini profesyonel ekiplerimizle yapıyoruz." }
        ],
        icon: Palette
    },
    {
        id: "9",
        title: "Ruhsat - Proje Hizmeti",
        description: "Tüm resmi süreçler ve proje çizim hizmetleri.",
        shortDescription: "Hayalinizdeki yapının resmiyete dökülmesi için gereken Mimari, Statik, Elektrik ve Mekanik projelerin çizimi ve ruhsat takibi.",
        fullDescription: "İnşaat süreci sadece yapmaktan ibaret değildir; doğru projelendirme işin temelidir. Mühendis ve mimarlardan oluşan teknik kadromuzla, mevzuata uygun, estetik ve güvenli projeler çiziyoruz. Belediyelerdeki ruhsat alma süreçlerini, zemin etüdünden iskan alımına kadar sizin adınıza takip ediyoruz.",
        coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
        features: ["Mimari Tasarım", "Statik Proje", "Zemin Etüdü", "3D Görselleştirme", "Resmi Kurum Takibi"],
        technicalSpecs: [
            { label: "Yazılımlar", value: "AutoCAD / IdeCad / 3dsMax" },
            { label: "Mevzuat", value: "TBDY 2018 Uyumlu" },
            { label: "Hizmet Kapsamı", value: "Tüm Türkiye" },
            { label: "Teslim", value: "Dijital + Ozalit Baskı" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            "https://images.unsplash.com/photo-1555523916-56360c406367?w=800&q=80",
            "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80"
        ],
        faq: [
            { question: "Proje çizimi ne kadar sürer?", answer: "Yapının büyüklüğüne göre değişmekle birlikte ortalama 2-4 hafta sürmektedir." },
            { question: "Sadece proje hizmeti alabilir miyim?", answer: "Evet, inşaatı kendiniz yapacaksanız sadece proje ve ruhsat hizmeti alabilirsiniz." }
        ],
        icon: FileText
    },
    {
        id: "10",
        title: "Taahhüt",
        description: "Anahtar teslim inşaat taahhüt hizmetleri.",
        shortDescription: "Söz verdiğimiz zamanda, söz verdiğimiz kalitede. Resmi ve özel taahhüt işlerinizde güvenilir çözüm ortağınız.",
        fullDescription: "MCT İnşaat, taahhüt sektöründe güvenin adıdır. Kamu ihaleleri, kooperatifler veya özel mülkiyet projelerinde, sözleşme şartlarına harfiyen uyarak, iş sağlığı ve güvenliği standartlarından ödün vermeden projeleri tamamlıyoruz. Malzeme tedariğinden işçiliğe, hakediş süreçlerinden geçici kabule kadar profesyonel yönetim.",
        coverImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
        features: ["Anahtar Teslim", "Kamu İhaleleri", "Özel Projeler", "Zamanında Teslim", "Bütçe Garantisi"],
        technicalSpecs: [
            { label: "Sözleşme", value: "Noter Onaylı / İdari Şartname" },
            { label: "Ekip", value: "Uzman Şantiye Şefleri" },
            { label: "Makine Parkı", value: "Geniş Ekipman Ağı" },
            { label: "Referans", value: "Güçlü İş Bitirmeler" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
            "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac5?w=800&q=80",
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=800&q=80",
            "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800&q=80"
        ],
        faq: [
            { question: "Taahhüt işlerinde süreç nasıl işliyor?", answer: "Sözleşme imzalandıktan sonra yer teslimi ile başlar, iş programına uygun olarak ilerler." },
            { question: "Maliyet artışlarından etkilenir miyiz?", answer: "Anahtar teslim götürü bedel sözleşmelerimizde anlaşılan fiyat sabittir." }
        ],
        icon: Briefcase
    },
    {
        id: "11",
        title: "Danışmanlık",
        description: "İnşaat ve yatırım süreçlerinde profesyonel danışmanlık.",
        shortDescription: "Gayrimenkul ve inşaat yatırımlarınızda doğru kararlar almanız için teknik ve finansal danışmanlık hizmeti sunuyoruz.",
        fullDescription: "İnşaat yatırımı ciddi bir karardır. Arsa seçiminden itibaren, en verimli proje tipinin belirlenmesi, maliyet analizleri, fizibilite raporları ve yatırım geri dönüş hesaplamaları konularında yatırımcılara yol gösteriyoruz. Paranızın ve zamanınızın boşa gitmemesi için tecrübemizi paylaşıyoruz.",
        coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80",
        features: ["Yatırım Fizibilitesi", "Arsa Ekspertizi", "Maliyet Analizi", "Hukuki Danışmanlık", "Risk Yönetimi"],
        technicalSpecs: [
            { label: "Raporlama", value: "Detaylı Fizibilite" },
            { label: "Odak", value: "Maksimum Verim" },
            { label: "Kapsam", value: "Yerel ve Ulusal" },
            { label: "Süreç", value: "Sürekli Destek" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
        ],
        faq: [
            { question: "Arsam var, ne yapabilirim?", answer: "Arsanızın imar durumuna göre en karlı proje seçeneklerini size sunuyoruz." },
            { question: "Maliyet hesabı yapıyor musunuz?", answer: "Evet, güncel piyasa verileriyle detaylı maliyet tabloları hazırlıyoruz." }
        ],
        icon: MessageSquare
    },
    {
        id: "12",
        title: "Müşavirlik",
        description: "Proje yönetimi ve teknik müşavirlik hizmetleri.",
        shortDescription: "Sizin adınıza şantiyelerinizi denetliyor, kalitenin ve standartların korunmasını sağlıyoruz. Teknik kontrolörlük hizmetleri.",
        fullDescription: "İnşaatınızın projeye uygun yapılıp yapılmadığını, kullanılan demirin, betonun kalitesini merak ediyor musunuz? Teknik müşavirlik hizmetimizle, kendi inşaatınızın başında duracak vaktiniz veya teknik bilginiz olmasa bile, uzman mühendislerimiz sizin gözünüz kulağınız olur. Hakediş kontrolleri ve fenni mesuliyet hizmetleri.",
        coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80",
        features: ["Şantiye Denetimi", "Hakediş Kontrolü", "Kalite Güvence", "Sözleşme Yönetimi", "İş Programı Takibi"],
        technicalSpecs: [
            { label: "Denetim", value: "Periyodik Raporlama" },
            { label: "Standart", value: "TS ve Eurocode" },
            { label: "Ekip", value: "Deneyimli Mühendisler" },
            { label: "Kazanım", value: "Sıfır Hata" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
            "https://images.unsplash.com/photo-1591955506264-3f7a27e63171?w=800&q=80",
            "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80"
        ],
        faq: [
            { question: "Neden müşavirlik almalıyım?", answer: "Hatalı imalatların önüne geçmek ve bütçenizi korumak için teknik denetim şarttır." },
            { question: "Raporlama yapıyor musunuz?", answer: "Evet, her denetim sonrası fotoğraflı ve detaylı teknik rapor sunuyoruz." }
        ],
        icon: HardHat
    },
    {
        id: "13",
        title: "Çözüm Ortaklığı",
        description: "Sektörel çözüm ortaklıkları ve tedarik süreçleri.",
        shortDescription: "Güçlü tedarik ağımız ve sektördeki paydaşlarımızla, projelerinizde ihtiyacınız olan her türlü malzeme ve hizmet için iş birliği yapıyoruz.",
        fullDescription: "İnşaat sektörü bir ekip işidir. MCT İnşaat olarak, sektördeki diğer firmalarla, malzeme tedarikçileriyle ve alt yüklenicilerle güçlü çözüm ortaklıkları kuruyoruz. Taşeron ekiplerin temini, toplu malzeme alımları veya proje bazlı ortaklıklar (Joint Venture) konusunda kapımız profesyonellere her zaman açıktır.",
        coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80",
        features: ["Tedarik Yönetimi", "Alt Yüklenici Ağı", "Joint Venture", "Stratejik Ortaklık", "Sektörel Güç"],
        technicalSpecs: [
            { label: "Ağ", value: "Geniş Tedarikçi Havuzu" },
            { label: "Model", value: "Kazan-Kazan" },
            { label: "Kalite", value: "Onaylı Tedarikçiler" },
            { label: "Güven", value: "Uzun Vadeli İşbirliği" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
            "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
        ],
        faq: [
            { question: "Hangi firmalarla çalışıyorsunuz?", answer: "Sektörün lider malzeme üreticileri ve güvenilir yerel ekiplerle çalışıyoruz." },
            { question: "Ortak proje geliştiriyor musunuz?", answer: "Evet, vizyonumuzun uyuştuğu yatırımcı ve firmalarla ortak projeler geliştiriyoruz." }
        ],
        icon: Handshake
    },
    {
        id: "14",
        title: "MCT Tecrübeler",
        description: "Geleceği inşa eden mühendislik serüvenimiz.",
        shortDescription: "14 yıllık yolculuğumuzda edindiğimiz bilgi birikimi, karşılaştığımız zorluklar ve ürettiğimiz çözümler. Bizim en büyük sermayemiz tecrübemizdir.",
        fullDescription: "Okul sıralarından şantiye tozuna, yerel projelerden uluslararası dev tesislere uzanan bir hikaye. MCT Tecrübeler, sadece bir hizmet değil, aynı zamanda yaptığımız her işe kattığımız 'Know-How'dır. Karşılaştığımız her zorlu zemin, her karmaşık detay bizi daha da güçlendirdi. Şimdi bu tecrübeyi sizin projelerinize aktarıyoruz.",
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
        features: ["14 Yıllık Tecrübe", "Uluslararası Projeler", "Zorlu Saha Deneyimi", "Kriz Yönetimi", "İnovatif Çözümler"],
        technicalSpecs: [
            { label: "Yıl", value: "2010'dan beri" },
            { label: "Proje", value: "Yüzlerce Tamamlanan İş" },
            { label: "Lokasyon", value: "Türkiye ve Türki Cumhuriyetler" },
            { label: "Uzmanlık", value: "Mühendislik ve Yönetim" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
        ],
        faq: [
            { question: "En büyük projeniz hangisidir?", answer: "Özbekistan'daki 36 Milyon Dolarlık Sulama Sistemleri Fabrikası projesi en büyük referanslarımızdandır." },
            { question: "MCT ne anlama geliyor?", answer: "Kurucumuz Mehmet Cihat Tapu'nun baş harflerini taşımaktadır." }
        ],
        icon: Award
    }
];
