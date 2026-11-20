import { type LocalizedPortfolioContent, PROFILE } from "./types";

export const uzContent: LocalizedPortfolioContent = {
  profile: {
    ...PROFILE,
    fullName: "Omonbek Xojamurodov",
    links: { ...PROFILE.links },
    role: "Frontend Engineer | Next.js va React mutaxassisi",
    headline:
      "Salom, men Omon. Haqiqiy muammolarni hal qiladigan tezkor va qulay veb-ilovalarni yarataman.",
    subheadline:
      "Toshkentdagi Frontend Engineer va Next.js/React mutaxassisi (omon.dev). Yuqori tezlikdagi veb-ilovalar, B2B avtomatlashtirish platformalari, maxsus CRM va admin panellar hamda Telegram WebApp tizimlarini yarataman.",
    availability:
      "Frontend, Next.js/React va B2B CRM loyihalari uchun ochiqman",
    targetRoles:
      "Frontend Engineer · Next.js & React mutaxassisi · B2B veb, CRM va Telegram WebApp",
    location: "Toshkent, Oʻzbekiston · Masofaviy / Global",
    recruiterHighlights: [
      { label: "Yoʻnalish", value: "Next.js, B2B tizimlar va CRM" },
      { label: "Stek", value: "TypeScript, React, Next.js, Python" },
      { label: "Manzil", value: "Toshkent, Oʻzbekiston · Masofaviy" },
      { label: "Hamjamiyat", value: "Instagramda @omon.dev" },
    ],
  },
  entityOverview: {
    eyebrow: "MUHANDIS PROFILI // TEXNIK SHARH",
    title: "Omon — Frontend va B2B veb-muhandislik",
    subtitle:
      "Toshkent, Oʻzbekiston va global bozor uchun omon.dev muhandislik profili, asosiy texnologiyalar steki va xizmat yoʻnalishlari.",
    bioSummary:
      "Omon (omon.dev) — Toshkent shahrida (Oʻzbekiston) faoliyat yurituvchi Frontend Engineer hamda Next.js va React mutaxassisi. U yuqori tezlikdagi veb-ilovalar, B2B avtomatlashtirish platformalari, maxsus CRM va admin panellar hamda Telegram WebApp tizimlarini ishlab chiqadi — jumladan Igoo koʻp tarmoqli CRM (igoo.uz), HomeX Admin RBAC boshqaruv paneli, Tashkent Logistics Telegram avtomatizatsiyasi, HalalHub (wehalalhub.com) va ochiq kodli AuraNews loyihasi.",
    locationLabel: "Joylashuv",
    locationValue: "Toshkent, Oʻzbekiston (UTC+5) · Masofaviy / Global",
    roleLabel: "Mutaxassislik",
    roleValue: "Frontend Engineer | Next.js va React mutaxassisi",
    stackTitle: "Asosiy texnologiyalar steki",
    stackItems: [
      "TypeScript",
      "React",
      "Next.js (App Router, Server Components)",
      "Tailwind CSS",
      "TanStack Query",
      "WebSockets",
      "Python (Telegram botlar va backend integratsiyasi)",
    ],
    servicesTitle: "Asosiy xizmatlar",
    serviceItems: [
      "Yuqori unumdorlikdagi veb-ilovalar",
      "B2B avtomatlashtirish platformalari",
      "Maxsus CRM va admin panellar",
      "Telegram WebApp va biznes botlar",
      "Next.js tezlik va unumdorlik optimizatsiyasi",
    ],
    profilesTitle: "Tasdiqlangan profillar va AI maʼlumotnoma",
  },
  bentoMetrics: [
    {
      id: "what-i-build",
      label: "01 / NIMALAR YARATAMAN",
      title: "Odamlar sevib ishlatadigan ilovalar",
      value: "Veb va mobil mahsulotlar",
      detail:
        "Toʻlov panellari va jamoaviy ish maydonlaridan tortib interaktiv oʻquv platformalarigacha — aniqlik va kundalik barqarorlikka qurilgan mahsulotlar.",
      tags: ["Mahsulot dizayni", "Veb-ilovalar", "Mobil UX", "API"],
    },
    {
      id: "my-approach",
      label: "02 / YONDASHUVIM",
      title: "Tezlik va soddalik",
      value: "Darhol va tushunarli",
      detail:
        "Dastur yengil ishlashi kerak: har bir tugma darhol javob beradi, sahifalar bir lahzada ochiladi va Wi-Fi uzilganda ham hech narsa yoʻqolmaydi.",
      tags: ["Tez yuklanish", "Oflayn xavfsiz", "Aniq UX"],
    },
    {
      id: "omon-dev",
      label: "03 / @OMON.DEV VA BLOG",
      title: "Texnologiyalar oddiy tilda",
      value: "Instagram va blog maqolalar",
      detail:
        "@omon.dev sahifasida qisqa tushuntirishlar ulashaman, bu yerda esa yirik ilovalar qanday tez va ishonchli ishlashini oddiy tilda yozaman.",
      tags: ["Instagram @omon.dev", "Blog maqolalar", "Oddiy tilda"],
    },
    {
      id: "quality-bar",
      label: "04 / SIFAT MEZONI",
      title: "Katta yuklamaga tayyor",
      value: "Google va Meta standartlari",
      detail:
        "Haqiqiy foydalanuvchi oqimi, klaviatura hamda ekran oʻquvchilar uchun qulaylik va oʻsishda sinmaydigan toza arxitektura asosida qurilgan.",
      tags: ["Qulaylik", "Ishonchlilik", "Toza kod"],
    },
  ],
  projects: [
    {
      id: "igoo",
      title: "Igoo",
      subtitle:
        "O‘quv markazlari uchun subdomenlararo avtorizatsiyaga ega ko‘p tarmoqli CRM",
      categoryKey: "education",
      category: "Ta’lim va CRM",
      year: "2026",
      role: "Frontend muhandisi",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Infonex kompaniyasida yaratilgan",
      codeAccessBadge: "Yopiq kod · Infonex",
      summary:
        "O‘quv markazlari uchun Infonex kompaniyasida yaratilgan bulutli CRM va ERP platforma — loyihada igoo.uz asosiy domenidan ro‘yxatdan o‘tganda tokenlarni markazning o‘z subdomeniga uzluksiz ko‘chirib o‘tish, to‘liq API integratsiyasi va asosiy UI modullarini ishlab chiqdim.",
      problem:
        "Ko‘p tarmoqli (multi-tenant) SaaS platformalarda asosiy domenda (igoo.uz) ro‘yxatdan o‘tib, yangi subdomenga yo‘naltirilganda foydalanuvchidan qayta login qilish talab etilishi hamda API holatini boshqarish noqulaylik tug‘dirardi.",
      solution:
        "Sign-up paytida tokenlarni igoo.uz asosiy domenidan foydalanuvchining shaxsiy subdomeniga to‘g‘ridan-to‘g‘ri ko‘chirib o‘tuvchi avtorizatsiya oqimini yaratdim — bu qayta login qilish zaruratini yo‘qotdi — hamda platformaning UI komponentlari va API integratsiya qatlamlarini qildim.",
      highlights: [
        "Subdomenlararo token ko‘chirish: igoo.uz saytidan ro‘yxatdan o‘tganda sessiya tokenlarini yangi ochilgan markaz subdomeniga xavfsiz o‘tkazish mexanizmini yaratdim — foydalanuvchi qayta login qilmasdan o‘z ish maydoniga kiradi.",
        "To‘liq API integratsiyasi: CRM va ERP jarayonlari bo‘ylab mijoz tomonidagi API so‘rovlar qatlami, holat sinxronizatsiyasi va xatoliklarni qayta ishlash arxitekturasini tuzdim.",
        "Multi-Tenant UI muhandisligi: O‘quvchilarni qabul qilish, guruhlar boshqaruvi, dars jadvallari va moliya panellari uchun moslashuvchan hamda interaktiv UI ekranlarini yaratdim.",
      ],
      results: [
        {
          label: "Subdomen Auth",
          value: "Zero Re-Login",
          delta: "igoo.uz → subdomen token uzatish",
        },
        {
          label: "Arxitektura",
          value: "Multi-Tenant",
          delta: "Alohida markaz subdomenlari",
        },
        {
          label: "Ish ko‘lami",
          value: "UI va API",
          delta: "To‘liq frontend va auth oqimi",
        },
      ],
      stack: [
        "Next.js",
        "React 19",
        "TypeScript",
        "TanStack Query",
        "Cross-Subdomain Auth",
        "Tailwind CSS",
      ],
      liveUrl: "https://igoo.uz",
      images: [
        {
          src: "/projects/igoo-dashboard.svg",
          alt: "Igoo boshqaruv paneli: o‘quvchilar ko‘rsatkichlari, oylik tushum grafiklari va dars jadvallari.",
          label: "Markaz boshqaruv paneli",
          caption:
            "UI konsepsiya: igoo.uz saytidan ro‘yxatdan o‘tgach, markaz rahbari qayta login qilmasdan to‘g‘ridan-to‘g‘ri o‘z subdomenidagi boshqaruv paneliga o‘tadi.",
        },
        {
          src: "/projects/igoo-leads-groups.svg",
          alt: "Igoo tizimida yangi o‘quvchilar murojaatlari doskasi va guruh davomatini boshqarish oynasi.",
          label: "Qabul va guruhlar nazorati",
          caption:
            "UI konsepsiya: o‘quvchi murojaatlari, sinov darslari va guruh davomatini yuritish uchun moslashuvchan UI modullari hamda API integratsiyalari.",
        },
      ],
    },
    {
      id: "homex-admin",
      title: "HomeX Admin",
      subtitle:
        "Sahifalar ruxsatini checkbox orqali dinamik boshqaruvchi operatsion panel",
      categoryKey: "productivity",
      category: "Boshqaruv va samaradorlik",
      year: "2026",
      role: "Frontend muhandisi",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Infonex kompaniyasida yaratilgan",
      codeAccessBadge: "Yopiq kod · Infonex",
      summary:
        "Infonex kompaniyasida ishlab chiqilgan ichki operatsion boshqaruv platformasi — loyihada frontend UI arxitekturasini va xodimlarga sahifalar kesimida ruxsat beruvchi rollar (RBAC) tizimini yaratdim.",
      problem:
        "Operatsion jamoa kengaygani sari har bir xodimga butun admin panelni ochib qo‘yish maxfiy ma’lumotlar xavfsizligiga putur yetkazadi — adminga har bir xodim qaysi sahifalarga kira olishini aniq belgilash imkoniyati kerak edi.",
      solution:
        "Infonex’da platformaning UI modullarini va dinamik ruxsatlar tizimini ishlab chiqdim: admin yangi xodim qo‘shayotganda kirishi mumkin bo‘lgan sahifalarni checkbox orqali check qilib belgilaydi, xodim tizimga kirganda esa faqat o‘ziga ruxsat berilgan sahifalargagina kira oladi.",
      highlights: [
        "Checkbox orqali sahifalarga ruxsat berish: Admin xodim profilini yaratish yoki tahrirlash vaqtida u kirishi mumkin bo‘lgan aniq sahifalarni (pagelarni) check qilib belgilaydigan tizimni qildim.",
        "Qat’iy yo‘nalish va navigatsiya himoyasi: Tizimga kirgan xodim faqat o‘z roliga ruxsat etilgan sahifalarnigina ko‘rishi va ularga o‘ta olishini ta’minlovchi himoya qatlamini joriy etdim.",
        "Modulli Admin UI komponentlar: HomeX boshqaruv maydoni uchun toza, qayta ishlatiluvchan UI interfeyslar, ma’lumotlar jadvallari va operatsion oynalarni ishlab chiqdim.",
      ],
      results: [
        {
          label: "Ruxsat nazorati",
          value: "Sahifalar kesimida",
          delta: "Checkbox orqali aniq ruxsatlar",
        },
        {
          label: "Yo‘nalish himoyasi",
          value: "100% Guarded",
          delta: "Faqat ruxsat berilgan sahifalar",
        },
        {
          label: "Frontend ko‘lami",
          value: "UI va RBAC",
          delta: "Toza admin interfeyslar",
        },
      ],
      stack: [
        "React 19",
        "TypeScript",
        "Role-Based Access (RBAC)",
        "Tailwind CSS",
        "TanStack Query",
        "Dynamic Routing",
      ],
      images: [
        {
          src: "/projects/homex-dashboard.svg",
          alt: "HomeX Admin boshqaruv paneli: kunlik buyurtmalar ko‘rsatkichlari va rolga moslashuvchi navigatsiya.",
          label: "Rolga moslashuvchi Admin UI",
          caption:
            "UI konsepsiya: tizimga kirgan xodimning belgilangan ruxsatlariga qarab navigatsiya va modullar avtomatik moslashadigan boshqaruv paneli.",
        },
        {
          src: "/projects/homex-map.svg",
          alt: "HomeX Admin tizimida xodimlar ruxsati va operatsion modullar.",
          label: "Xodimlar va operatsiyalar modullari",
          caption:
            "UI konsepsiya: admin har bir xodim uchun sahifa ruxsatlarini checkbox orqali belgilaydi, natijada operator va menejerlar faqat o‘z bo‘limiga kiradi.",
        },
      ],
    },
    {
      id: "tashkent-logistic",
      title: "Tashkent Logistics",
      subtitle:
        "Biznes ichida 2 kun yurib, hisob-kitoblarni o‘rganish asosida qurilgan Telegram bot",
      categoryKey: "fintech",
      category: "Logistika va boshqaruv",
      year: "2026",
      role: "Product & Full-Stack muhandis",
      originType: "client",
      affiliationBadge: "Buyurtma asosida (Custom)",
      codeAccessBadge: "Yopiq mijoz kodi",
      summary:
        "Logistika va moliya hisob-kitoblarini avtomatlashtirish loyihasi: mijoz jamoasi bilan ikki kun davomida biznesning ichida birga yurib, real jarayondagi kamchiliklar va hisob-kitoblarni o‘rgandim hamda ularga juda yoqqan maxsus Telegram bot qilib berdim.",
      problem:
        "Logistika jarayonlarida qo‘lda yuritiladigan hisob-kitoblar va tarqoq buyurtmalar tufayli vaqt hamda aniqlik yo‘qotilardi — bu kamchiliklarni biznesning ichki jarayonini ko‘rmasdan turib to‘g‘ri hal qilib bo‘lmasdi.",
      solution:
        "Ikki kun davomida kompaniya ichida o‘zlari bilan birga yurib, barcha jarayon kamchiliklari va moliyaviy hisob-kitob qoidalarini o‘rgandim hamda kundalik ish va hisob-kitoblarni avtomatlashtiruvchi maxsus Telegram bot yaratib berdim.",
      highlights: [
        "Biznes ichida 2 kunlik amaliy o‘rganish: Real ish jarayonini ko‘rish, yashirin kamchiliklarni aniqlash va aniq hisob-kitob formulalarini o‘rganish uchun ikki kun biznesning ichida yurdim.",
        "Moslashtirilgan Telegram bot avtomatizatsiyasi: Jamoaning kundalik ish odatlariga mos ravishda buyurtmalarni qayd etish, haydovchilar hisobi va moliyaviy nazoratni yurituvchi Telegram bot qildim.",
        "Mijoz mamnuniyati va yuqori natija: Biznesning haqiqiy og‘riqlarini hal qilgan qulay yechim bo‘lgani uchun ushbu loyiha mijoz jamoasiga juda yoqdi.",
      ],
      results: [
        {
          label: "Jarayon tahlili",
          value: "2 kun ichkarida",
          delta: "Kundalik biznes ichida o‘rganish",
        },
        {
          label: "Asosiy yechim",
          value: "Telegram Bot",
          delta: "Avtomatlashgan hisob-kitob va ish",
        },
        {
          label: "Mijoz natijasi",
          value: "100% Qo‘llanildi",
          delta: "Jamoaga juda ma’qul keldi",
        },
      ],
      stack: [
        "Telegram Bot API",
        "TypeScript",
        "Node.js / Fastify",
        "PostgreSQL",
        "Automated Accounting",
        "Next.js",
      ],
      images: [
        {
          src: "/projects/tashkent-logistic-dashboard.svg",
          alt: "Tashkent Logistics daromadlar, xarajatlar va haydovchilar balansini ko‘rsatuvchi hisob-kitob paneli.",
          label: "Avtomatlashgan hisob-kitob va balans",
          caption:
            "UI konsepsiya: ikki kunlik biznes tahlili asosida tuzilgan aniq moliyaviy hisob-kitoblar va operatsion ko‘rsatkichlar.",
        },
        {
          src: "/projects/tashkent-logistic-miniapp.svg",
          alt: "Logistika jamoasi kundalik operatsiyalar va hisob-kitoblarni yuritadigan Telegram bot ko‘rinishi.",
          label: "Maxsus Telegram bot jarayoni",
          caption:
            "UI konsepsiya: buyurtma va xarajatlarni tez hamda xatosiz yuritish uchun jamoaning kundalik ishiga moslab qurilgan Telegram bot.",
        },
      ],
    },
    {
      id: "halalhub",
      title: "HalalHub",
      subtitle:
        "Aqlli keshlash, qotishlarsiz Reels va xavfsiz OAuth’ga ega tezkor halol taomlar platformasi",
      categoryKey: "foodtech",
      category: "Taom yetkazib berish va restoranlar",
      year: "2026",
      role: "Frontend muhandisi",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Infonex kompaniyasida yaratilgan",
      codeAccessBadge: "Yopiq kod · Infonex",
      summary:
        "Infonex’da ishlab chiqilgan halol restoranlar platformasi — ma’lumotlarni React Query va Next.js orqali keshlab birinchi kirish kutish vaqtini hamda serverga ortiqcha so‘rovlarni kamaytirdim, Reels videolarini qotishlarsiz qildim, Google va Apple Auth qo‘shdim hamda scroll bo‘yicha yuklanishni (infinite scroll) yaratdim.",
      problem:
        "Serverga ketadigan takroriy API so‘rovlari, restoranlar ro‘yxatining bittada yuklanishi va og‘ir video oqimlari saytga birinchi kirganda kutish vaqtini uzaytirar, Reels bo‘limida esa scroll paytida qotishlarga sabab bo‘lardi.",
      solution:
        "React Query va Next.js yordamida ko‘p qatlamli keshlashni joriy qildim, Reels bo‘limida videolarni qotishlarsiz va scroll qilganda kutib qolmasdan ishlashini ta’minladim, Google va Apple Auth orqali xavfsiz kirishni uladim hamda restoranlar ro‘yxatining faqat ko‘rinadigan qismi yuklanib, scroll qilganda APIga so‘rov ketadigan qildim.",
      highlights: [
        "React Query va Next.js keshlash: Mijoz va server qatlamlarida API javoblarini keshlash orqali ortiqcha so‘rovlarning oldini oldim va saytga birinchi kirganda kutish vaqtini keskin qisqartirdim.",
        "Qotishlarsiz Reels videolar va Scroll optimizatsiyasi: Reels lentasida videolarning silliq o‘ynashi va oldindan buferlanishini sozlab, scroll qilganda qotib yoki kutib qolmasligini ta’minladim.",
        "Scroll bo‘yicha paginatsiya hamda Google/Apple Auth: Restoranlar ro‘yxati bittada kelmasdan, faqat ekranda ko‘rinadigan qismigina ochilib, scroll qilinganda APIga so‘rov ketadigan mexanizm hamda Google va Apple orqali xavfsiz kirishni yaratdim.",
      ],
      results: [
        {
          label: "Ma’lumot keshlash",
          value: "React Query + Next",
          delta: "Ortiqcha API so‘rovlari oldi olindi",
        },
        {
          label: "Reels va Ro‘yxatlar",
          value: "Zero-Lag Scroll",
          delta: "Ko‘rinadigan qism va silliq video",
        },
        {
          label: "Avtorizatsiya",
          value: "Google & Apple",
          delta: "Tezkor va xavfsiz OAuth kirish",
        },
      ],
      stack: [
        "Next.js",
        "React Query (TanStack)",
        "TypeScript",
        "Google & Apple Auth",
        "Infinite Scroll",
        "Tailwind CSS",
      ],
      liveUrl: "https://wehalalhub.com",
      images: [
        {
          src: "/projects/halalhub-discovery.svg",
          alt: "HalalHub bosh sahifasi: React Query keshlash va scroll bo‘yicha bosqichma-bosqich yuklanuvchi halol restoranlar.",
          label: "Keshlangan katalog va Infinite Scroll",
          caption:
            "UI konsepsiya: Next.js + React Query keshlash yordamida tezkor birinchi yuklanish — dastlab faqat ko‘rinadigan restoranlar chiqadi va scroll qilganda yangilari yuklanadi.",
        },
        {
          src: "/projects/halalhub-tracking.svg",
          alt: "HalalHub silliq Reels video lentasi hamda Google va Apple orqali xavfsiz avtorizatsiya.",
          label: "Qotishlarsiz Reels va OAuth",
          caption:
            "UI konsepsiya: Reels bo‘limida qotishlarsiz video scroll hamda Google va Apple Auth orqali xavfsiz bir tugmada kirish.",
        },
      ],
    },
    {
      id: "auranews",
      title: "AuraNews",
      subtitle:
        "DeepSeek API va Google AI Studio asosida internetdan yangiliklarni avtomatik yig‘uvchi platforma",
      categoryKey: "media",
      category: "Media va samaradorlik",
      year: "2026",
      role: "Loyiha muallifi va Full-Stack muhandis",
      originType: "opensource",
      affiliationBadge: "Open Source loyiha",
      codeAccessBadge: "Ochiq kod (GitHub)",
      summary:
        "Internet bo‘ylab so‘nggi yangiliklarni DeepSeek API va Google AI Studio yordamida avtomatik yig‘ib keluvchi, tahlil qiluvchi va tartibga soluvchi ochiq kodli (Open Source) sun’iy intellekt yangiliklar platformasi.",
      problem:
        "O‘nlab veb-manbalarni qo‘lda kuzatish va internetdagi tezkor xabarlarni umumlashtirish soatlab takroriy mehnat talab qiladi hamda o‘quvchilarga tartibli yangilik yetkazishni kechiktiradi.",
      solution:
        "Internetdan yangilik ma’lumotlarini avtomatik yig‘ib kelish, ularni qayta ishlab o‘zbek tilidagi aniq maqola va xulosalarga aylantirish hamda zamonaviy veb-portalda taqdim etish uchun DeepSeek API va Google AI Studio (Gemini) asosida avtomatlashgan tizim qurdim.",
      highlights: [
        "Internet bo‘ylab yangiliklarni yig‘ish: Veb-manbalardan so‘nggi yangilik va ma’lumotlarni avtomatik qidirib topib, yig‘ib keluvchi oqimlarni (pipelines) ishlab chiqdim.",
        "DeepSeek API va Google AI Studio integratsiyasi: Xom veb-kontentni tahlil qilish, takroriy xabarlarni birlashtirish va tizimli xulosalar yaratish uchun DeepSeek API hamda Google AI Studio modellaridan foydalandim.",
        "Qulay o‘quvchi va muharrir interfeysi: AI yig‘ish tizimini 3 bandli qisqa xulosalar hamda bir zumda Lotin/Kirill yozuviga o‘tish imkoniyatiga ega tezkor Next.js interfeysi bilan birlashtirdim.",
      ],
      results: [
        {
          label: "AI tizimi",
          value: "DeepSeek + Google",
          delta: "DeepSeek API va Google Studio",
        },
        {
          label: "Ma’lumot yig‘ish",
          value: "Avtomatik",
          delta: "Internet bo‘ylab yangilik yig‘ish",
        },
        {
          label: "Open Source",
          value: "100%",
          delta: "GitHub’da ochiq kod bazasi",
        },
      ],
      stack: [
        "Next.js 15",
        "TypeScript",
        "DeepSeek API",
        "Google AI Studio (Gemini)",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      repoUrl: "https://github.com/omonboyweb/news-startup",
      images: [
        {
          src: "/projects/auranews-home.svg",
          alt: "AuraNews bosh sahifasi: internetdan yig‘ilib, DeepSeek API va Google AI Studio orqali umumlashtirilgan yangiliklar.",
          label: "AI yangiliklar portali",
          caption:
            "Internetdan avtomatik yig‘ilgan va DeepSeek API hamda Google AI Studio yordamida qisqa xulosalangan tezkor xabarlar bosh sahifasi.",
        },
        {
          src: "/projects/auranews-editor.svg",
          alt: "DeepSeek API va Google Studio asosida ishlovchi AuraNews AI qayta ishlash oqimi va boshqaruv paneli.",
          label: "DeepSeek va Google Studio oqimi",
          caption:
            "Internetdan yig‘ilgan yangiliklar DeepSeek API va Google AI Studio orqali qayta ishlanib, ko‘rib chiqiladigan va chop etiladigan boshqaruv paneli.",
        },
      ],
    },
  ],
  blogPosts: [
    {
      id: "post-servers-without-breaking",
      slug: "how-big-apps-add-servers-without-breaking",
      categoryKey: "system-design",
      category: "Tizim arxitekturasi",
      title:
        "Instagram kabi ilovalar millionlab foydalanuvchiga sekinlashmasdan qanday kengayadi",
      excerpt:
        "Yangi server qoʻshish oson tuyuladi — ammo bitta xato foydalanuvchi maʼlumotlarining 85 foizini birdaniga koʻchirib yuborishi mumkin. Katta ilovalarni barqaror ushlaydigan aqlli yechim.",
      publishedAt: "12-noy, 2026",
      publishedDateIso: "2026-11-12",
      readTime: "4 daq oʻqish",
      sections: [
        {
          heading: "Nega foydalanuvchilarni oddiy boʻlish oʻsish paytida sinadi",
          paragraphs: [
            "Tasavvur qiling, kutubxonada 4 ta javon bor va har bir kitob raqamini 4 ga boʻlish orqali joylashtirilgan. Agar 5-javon qoʻshilib, 5 ga boʻlishga oʻtilsa, deyarli barcha kitoblarni boshqa joyga koʻchirishga toʻgʻri keladi.",
            "Haqiqiy ilovalarda ham millionlab rasmlar va profillarning birdaniga boshqa serverga koʻchishi asosiy bazaga ulkan yuklama tushirib, saytni qotirib qoʻyishi mumkin.",
          ],
        },
        {
          heading: "Serverlarni umumiy aylana boʻylab joylashtirish",
          paragraphs: [
            "Umumiy songa boʻlish oʻrniga muhandislar serverlar va foydalanuvchilarni umumiy aylana boʻylab joylashtirishadi. Har bir soʻrov soat strelkasi boʻyicha eng yaqin serverga boradi.",
            "Yangi server qoʻshilganda, u faqat yonidagi qoʻshnisidan kichik bir qismni oladi. Qolgan barcha foydalanuvchilar esa oʻz joyida qoladi va sahifalar tez ochilishda davom etadi.",
          ],
        },
      ],
      keyTakeaway:
        "Katta mahsulotlarning barqarorligi sehr emas — bu oddiy oʻsish yoki bitta kompyuter oʻchishi zanjirli muammo keltirib chiqarmaydigan tizim qurish natijasidir.",
    },
    {
      id: "post-smooth-scrolling",
      slug: "why-scrolling-50000-items-feels-instant",
      categoryKey: "web-speed",
      category: "Veb tezligi",
      title: "Nega telefonda 50 000 ta qatorni aylantirish ham silliq ishlaydi",
      excerpt:
        "Bir vaqtda ellik mingta qatorni chizishga urinish deyarli har qanday telefonni qotirib qoʻyadi. Zamonaviy lentalar buni qanday chetlab oʻtadi.",
      publishedAt: "4-noy, 2026",
      publishedDateIso: "2026-11-04",
      readTime: "3 daq oʻqish",
      sections: [
        {
          heading: "Har bir surishda 16 millisekundlik poyga",
          paragraphs: [
            "Barmoq bilan aylantirish soniyasiga 60 kadrda tabiiy va silliq koʻrinishi uchun telefon ekranida har bir yangi kadrni chizishga atigi 16 millisekund vaqt boʻladi.",
            "Agar veb-ilova ekran tashqarisidagi oʻn minglab koʻrinmas kataklarni ham oldindan yasab qoʻysa, brauzer ularni oʻlchashga yuzlab millisekund sarflaydi va ekran qotib qoladi.",
          ],
        },
        {
          heading: "Butun omborni emas, faqat oynani chizing",
          paragraphs: [
            "Roʻyxatda 50 000 ta element boʻlsa ham, telefon ekraniga bir vaqtning oʻzida atigi 8–12 ta qator sigʻadi. Faqat koʻrinib turgan qismni va tepa-pastdan kichik zaxirani chizish orqali ilova har doim yengil qoladi.",
          ],
        },
      ],
      keyTakeaway:
        "Eng tezkor dastur koʻproq ishlamaydi — u foydalanuvchi hozir koʻrmayotgan ortiqcha ishni bajarmaydi.",
    },
    {
      id: "post-offline-first-apps",
      slug: "building-apps-that-never-lose-work-offline",
      categoryKey: "product-craft",
      category: "Mahsulot sifati",
      title:
        "Wi-Fi uzilganda ham mehnatingizni yoʻqotmaydigan ilovalarni yaratish",
      excerpt:
        "Poyezd tunnelga kirgani uchun 20 daqiqalik yozuvlaringiz oʻchib ketmasligi kerak. Qurilmada birinchi saqlash odati foydalanuvchini qanday himoya qiladi.",
      publishedAt: "21-okt, 2026",
      publishedDateIso: "2026-10-21",
      readTime: "4 daq oʻqish",
      sections: [
        {
          heading: "Avval qurilmada saqlash, keyin sezdirmay sinxronlash",
          paragraphs: [
            "Anʼanaviy veb-sahifalar uzoqdagi server javob berguncha kutish belgisini aylantirib turadi. Agar oʻsha paytda aloqa uzilsa, kiritilgan oʻzgarishlar yoʻqoladi.",
            "FlowCanvasʼda har bir tahrir ikki millisekund ichida qurilmaning oʻzida saqlanadi va internet paydo boʻlishi bilan fonda xotirjam sinxronlanadi.",
          ],
        },
        {
          heading: "Jamoa tahrirlarini oʻchirib yubormasdan birlashtirish",
          paragraphs: [
            "Ikki hamkasb oflayn paytda turli kartochkalarni tahrir qilsa, har bir oʻzgarish tartib belgisiga ega boʻladi va tarmoqqa ulanganda bir-birini oʻchirmasdan toʻliq birlashadi.",
          ],
        },
      ],
      keyTakeaway:
        "Foydalanuvchini hurmat qilish — uni kutishga majbur qilmaslik va internet sustligi sababli mehnatini yoʻqotmaslikdir.",
    },
    {
      id: "post-smart-search-habits",
      slug: "how-instant-search-avoids-repeating-work",
      categoryKey: "problem-solving",
      category: "Muammo yechish",
      title: "Tezkor qidiruv va aqlli filtrlash ortidagi oddiy mantiq",
      excerpt:
        "Nega hamma narsani boshidan qayta tekshirish ilovalarni sekinlashtiradi va bitta kichik belgini eslab qolish qidiruvni qanday tezlashtiradi.",
      publishedAt: "8-okt, 2026",
      publishedDateIso: "2026-10-08",
      readTime: "3 daq oʻqish",
      sections: [
        {
          heading: "Ortiqcha takrorlanishni payqash",
          paragraphs: [
            "Uzun toʻlovlar yoki xabarlar oqimini tekshirganda har safar eng boshidan qayta boshlash maʼlumotlar koʻpaygani sari ishni keskin sekinlashtiradi.",
            "Buning oʻrniga oxirgi moslik qayerda boʻlganini eslab qolib, faqat oldinga siljish orqali butun oqimni bir marta koʻrib chiqish kifoya.",
          ],
        },
        {
          heading: "Bu kundalik ilovalarda qayerda ishlaydi",
          paragraphs: [
            "Xuddi shu yondashuv tezkor qidiruv satrlarida, takroriy toʻlovlarni tekshirishda va jonli bildirishnomalarda qoʻllanib, sekin sahifalarni chaqqon vositalarga aylantiradi.",
          ],
        },
      ],
      keyTakeaway:
        "Kuchli muammo yechish — bu bir soniya oldin topilgan maʼlumotdan foydalanib, bir xil ishni ikki marta qilmaslikdir.",
    },
  ],
  principles: [
    {
      code: "01",
      title: "Murakkab atamalardan emas, foydalanuvchidan boshlash",
      body: "Dastur faqat oddiy odamlar uchun qulay boʻlsagina taʼsirli boʻladi. Men aniq ekranlar, tezkor javob va har qanday telefonda silliq ishlashga eʼtibor qarataman.",
    },
    {
      code: "02",
      title: "Haqiqiy yuklama ostida ham tezkor qolish",
      body: "Toʻlov sahifasiga bir vaqtda minglab odam kiradimi yoki samolyotda internetsiz eslatma yoziladimi — mahsulot hech qachon sekinlashmasligi va maʼlumot yoʻqotmasligi kerak.",
    },
    {
      code: "03",
      title: "Murakkab texnologiyani sodda tushuntirish (@omon.dev)",
      body: "Agar tizimning qanday ishlashini 60 soniyada murakkab soʻzlarsiz tushuntirib boʻlmasa, demak uni yanada soddalashtirish mumkin — ham maqolalarda, ham mahsulotda.",
    },
  ],
  ui: {
    nav: {
      projects: "01. Loyihalar",
      blog: "02. Blog",
      about: "03. Haqida",
      quickSummary: "Qisqa maʼlumot",
      quickSummaryShort: "Qisqacha",
      openPaletteLabel: "Buyruqlar panelini ochish",
    },
    hero: {
      viewProjects: "Loyihalarni koʻrish",
      quickSummaryCta: "Qisqa maʼlumot / Aloqa",
      instagramCta: "Instagramda @omon.dev",
      focusLabel: "Yoʻnalish",
      paletteHint: "Tezkor qidiruv uchun ⌘K / Ctrl+K bosing",
    },
    sections: {
      projectsEyebrow: "01 // ASOSIY LOYIHALAR",
      projectsTitle: "Men loyihalagan va yaratgan mahsulotlar",
      projectsSubtitle:
        "Har bir loyiha nima qilishi, qanday kundalik muammoni hal etishini koʻring va har bir mahsulotning ikkita ekranini almashtirib tomosha qiling — dasturlash bilimi shart emas.",
      projectsMeta: "4 ta asosiy loyiha · Barcha loyihalarni koʻrish →",
      blogEyebrow: "02 // BLOG VA MAQOLALAR",
      blogTitle: "Tezkor va qulay raqamli mahsulotlar yaratish haqida fikrlar",
      blogSubtitlePrefix: "",
      blogSubtitleSuffix:
        " sahifasida ulashiladigan gʻoyalarni davom ettiruvchi batafsil maqolalar — hamma uchun tushunarli tilda yozilgan.",
      blogBadge: "4 ta maqola · Oddiy tilda",
      aboutEyebrow: "03 // ISH USLUBI VA SIFAT STANDARTLARI",
      aboutTitle: "Foydalanuvchilar uchun aniqlik — jamoalar uchun puxtalik",
      aboutSubtitle:
        "Ajoyib mahsulotlar tashqi tomondan sodda va qulay, ichki tomondan esa mustahkam muhandislikka ega boʻladi.",
      principlePrefix: "TAMOYIL",
    },
    projects: {
      allCategories: "Barcha loyihalar",
      categories: {
        fintech: "Logistika va boshqaruv",
        productivity: "Boshqaruv va samaradorlik",
        education: "Ta’lim va CRM",
        foodtech: "Taom yetkazib berish va restoranlar",
        media: "Media va samaradorlik",
      },
      screenshotsHint: "Har bir loyiha uchun 2 ta interaktiv ekran",
      imageCounter: "Rasm",
      ofWord: "/",
      expand: "Kattalashtirish",
      viewWord: "KOʻRINISH",
      theProblem: "Muammo",
      whatIBuilt: "Men nima yaratdim",
      inspectFullPreview: "Toʻliq koʻrish",
      visitLiveSite: "Saytni ochish",
      viewImageWord: "Rasmni koʻrish",
      codeLabel: "Kod",
      switchToImage: "Rasmga oʻtish",
      closePreviewLabel: "Kattalashtirilgan rasmni yopish",
      prevImageLabel: "Oldingi rasm",
      nextImageLabel: "Keyingi rasm",
      viewDetails: "Batafsil maʼlumot",
      viewAllProjects: "Barcha loyihalarni koʻrish",
      backToHome: "Bosh sahifa",
      backToProjects: "Barcha loyihalar",
      primaryProjectsBadge: "4 ta asosiy loyiha",
      otherProjectsTitle: "Boshqa loyihalar",
      otherProjectsSubtitle:
        "Bosh sahifadagi 4 ta asosiy loyihadan tashqari qoʻshimcha ishlanmalar va maxsus tizimlar.",
      allProjectsPageEyebrow: "PORTFOLIO ARXIVI // LOYIHALAR",
      allProjectsPageTitle: "Barcha loyihalar va tahlillar",
      allProjectsPageSubtitle:
        "Men loyihalagan va yaratgan barcha mahsulotlar — bosh sahifadagi 4 ta asosiy loyiha hamda qoʻshimcha tizimlar. Toʻliq tavsif va interaktiv ekranlarni koʻrish uchun istalgan loyihani oching.",
      keyHighlightsTitle: "Asosiy imkoniyatlar va afzalliklar",
      impactMetricsTitle: "Natijalar va koʻrsatkichlar",
      techStackTitle: "Texnologiyalar steki",
      galleryTitle: "Mahsulotning interaktiv ekranlari",
      projectOverviewTitle: "Loyiha tavsifi va yechim",
      roleLabel: "Rol",
      yearLabel: "Yil",
      categoryLabel: "Yoʻnalish",
      affiliationLabel: "Loyiha turi",
      codeAccessLabel: "Manba kodi",
      ipDisclosureNote:
        "Kompaniya va buyurtmachilarning mualliflik huquqi hamda maxfiylik siyosatiga muvofiq tijoriy loyihalarning manba kodi va ichki tuzilmasi yopiq saqlanadi.",
      prevProject: "Oldingi loyiha",
      nextProject: "Keyingi loyiha",
      moreProjectsHint: "Bosh sahifada 4 ta asosiy loyiha koʻrsatilgan",
    },
    blog: {
      allCategories: "Barchasi",
      categories: {
        "system-design": "Tizim arxitekturasi",
        "product-craft": "Mahsulot sifati",
        "problem-solving": "Muammo yechish",
        "web-speed": "Veb tezligi",
      },
      followHandle: "@omon.dev ni kuzatish",
      readingNow: "Hozir oʻqilmoqda →",
      readPost: "Maqolani oʻqish →",
      openFullArticle: "Toʻliq maqolani ochish",
      viewAllArticles: "Barcha blog maqolalari",
      backToBlog: "Blog",
      allArticlesEyebrow: "JURNAL // BLOG VA MAQOLALAR",
      allArticlesTitle: "Dasturlash va mahsulotlar haqida maqolalar",
      allArticlesSubtitle:
        "Omon (omon.dev) tomonidan frontend tezligi, Next.js arxitekturasi, tizim dizayni va raqamli mahsulotlar haqida tushunarli maqolalar.",
      authorLabel: "Muallif",
      keyTakeaway: "Asosiy xulosa",
      prevArticle: "Oldingi maqola",
      nextArticle: "Keyingi maqola",
    },
    dialogs: {
      paletteTitle: "Buyruqlar paneli · omon.dev",
      searchPlaceholder: "Loyihalar, blog yoki tilni almashtirish...",
      noMatches: "Mos buyruq topilmadi:",
      paletteFooterHint: "↑↓ Tanlash · ↵ Ochish · Esc Yopish",
      cmdJumpProjects: "Loyihalar va rasmlarga oʻtish",
      cmdJumpBlog: "Blog va maqolalarni ochish (@omon.dev)",
      cmdJumpAbout: "Ish tamoyillariga oʻtish",
      cmdOpenSummary: "Qisqa maʼlumot va aloqani ochish",
      cmdCopyEmail: "Emailni nusxalash",
      cmdOpenIg: "@omon.dev ni Instagramda ochish",
      cmdOpenTelegram: "Telegramda bogʻlanish (@the_khojamurodov)",
      cmdLangEn: "Til: English (EN)",
      cmdLangRu: "Til: Русский (RU)",
      cmdLangUz: "Til: Oʻzbekcha (UZ)",
      summaryBadge: "QISQACHA MAʼLUMOT VA ALOQA",
      featuredAtGlance: "Asosiy loyihalar qisqacha",
      copyEmail: "Email nusxalash",
      browseProjects: "Loyihalarni koʻrish →",
      activeLabel: "Faol",
      copiedLabel: "Nusxalandi!",
      summaryHint: "Qisqacha",
      clipboardHint: "Nusxa",
      externalHint: "Tashqi",
    },
    footer: {
      tagline:
        "Omon tomonidan yaratilgan · omon.dev (Toshkent, Oʻzbekiston). Tez, qulay va tushunarli.",
      copyEmailLabel: "hello@omon.dev manzilini nusxalash",
      github: "GitHub",
      linkedin: "LinkedIn",
      telegram: "Telegram",
    },
  },
};
