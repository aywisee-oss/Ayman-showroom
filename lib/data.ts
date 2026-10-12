// All content is extracted verbatim from Ayman Al Hussam's CV.
// Nothing is invented. English translations are faithful renderings of the Arabic CV.

export type Lang = "en" | "ar";

export interface Role {
  id: string;
  title: { en: string; ar: string };
  company: { en: string; ar: string };
  period: { en: string; ar: string };
  location: { en: string; ar: string };
  points: { en: string[]; ar: string[] };
  skills: { en: string[]; ar: string[] };
  image: string;
}

export interface SkillItem {
  name: { en: string; ar: string };
  category: "sales" | "marketing" | "operations" | "tools";
}

export const roles: Role[] = [
  {
    id: "warehouse",
    title: { en: "Warehouse Keeper", ar: "أمين مستودع" },
    company: { en: "Al Romansiah Co.", ar: "شركة الرومانسية" },
    period: { en: "May 2026 — Present", ar: "مايو 2026 — حتى الآن" },
    location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },
    image: "/assets/portrait-orange.jpg",
    points: {
      en: [
        "Monitor availability of essential materials to keep operations running.",
        "Coordinate with relevant departments to meet work needs and limit shortages.",
        "Use SAP ERP and Microsoft Excel to track inventory and prepare reports.",
        "Review balances, analyze variances, and monitor waste indicators.",
        "Contributed to reducing the waste indicator from 1.80% to 0.80% within four months, per company reports.",
        "Gaining experience in organizing operations and managing resources.",
      ],
      ar: [
        "متابعة توفر المواد الأساسية اللازمة لاستمرار العمليات التشغيلية.",
        "التنسيق مع الأقسام المعنية لتلبية احتياجات العمل والحد من النواقص.",
        "استخدام SAP ERP وMicrosoft Excel في متابعة المخزون وإعداد التقارير.",
        "مراجعة الأرصدة وتحليل الفروقات ومتابعة مؤشرات الهدر.",
        "المساهمة في خفض مؤشر الهدر من 1.80% إلى 0.80% خلال أربعة أشهر وفق تقارير العمل.",
        "اكتساب خبرة في تنظيم العمليات التشغيلية وإدارة الموارد.",
      ],
    },
    skills: {
      en: ["SAP ERP", "Microsoft Excel", "Inventory Control", "Reporting", "Waste Analysis"],
      ar: ["SAP ERP", "Microsoft Excel", "مراقبة المخزون", "إعداد التقارير", "تحليل الهدر"],
    },
  },
  {
    id: "courier",
    title: { en: "Delivery Representative & Customer Service", ar: "مندوب توصيل وخدمة عملاء" },
    company: { en: "Al Romansiah Co.", ar: "شركة الرومانسية" },
    period: { en: "April 2025 — April 2026", ar: "أبريل 2025 — أبريل 2026" },
    location: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    image: "/assets/portrait-car.jpg",
    points: {
      en: [
        "Provided direct customer service while maintaining a professional approach.",
        "Handled customer complaints and delay issues, clarifying available solutions.",
        "Communicated with customers to ensure clear order information and delivery times.",
        "Developed communication, situation management, and customer service skills.",
      ],
      ar: [
        "تقديم خدمة مباشرة للعملاء والمحافظة على أسلوب مهني في التعامل.",
        "معالجة شكاوى العملاء ومشكلات التأخير وتوضيح الحلول المتاحة.",
        "التواصل مع العملاء لضمان وضوح معلومات الطلبات ومواعيد التسليم.",
        "تطوير مهارات التواصل وإدارة المواقف وخدمة العملاء.",
      ],
    },
    skills: {
      en: ["Customer Service", "Complaint Resolution", "Communication"],
      ar: ["خدمة العملاء", "معالجة الشكاوى", "التواصل"],
    },
  },
  {
    id: "cocoonz",
    title: { en: "Digital Marketing & Branch Sales", ar: "التسويق الرقمي ومبيعات الفروع" },
    company: { en: "Top Town Medical Mattress Factory (Cocoonz)", ar: "مصنع توب تاون للمراتب الطبية (Cocoonz)" },
    period: { en: "2024 — 2025", ar: "2024 — 2025" },
    location: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    image: "/assets/hero.jpg",
    points: {
      en: [
        "Contributed to developing branch and e-store sales by improving product presentation and customer experience.",
        "Worked at the Cocoonz Al Safa branch, rotating across three branches to support sales and marketing activities.",
        "Trained staff on sales skills, handling objections, understanding needs, and presenting suitable products.",
        "Managed Google Ads campaigns and monitored their performance.",
        "Executed content marketing activities and coordinated with influencers to promote products.",
        "Improved the e-store's visibility in search engine results (SEO).",
        "Managed products and categories on the Salla platform, improving product pages and shopping experience.",
        "Used Google Maps to boost branch visibility and make it easier for customers to reach them.",
        "Helped connect digital marketing activities with in-branch sales.",
        "Followed up on customer needs and product/service feedback to improve the buying experience.",
      ],
      ar: [
        "المساهمة في تطوير المبيعات داخل الفروع والمتجر الإلكتروني من خلال تحسين عرض المنتجات وتجربة العملاء.",
        "العمل في فرع Cocoonz الصفا والتنقل بين ثلاثة فروع لدعم أنشطة البيع والتسويق.",
        "تدريب العاملين على مهارات البيع، والتعامل مع اعتراضات العملاء، وفهم احتياجاتهم وتقديم المنتجات المناسبة.",
        "إدارة الحملات الإعلانية عبر Google Ads ومتابعة أدائها.",
        "تنفيذ أنشطة التسويق بالمحتوى والتنسيق مع المؤثرين لدعم الترويج للمنتجات.",
        "تحسين ظهور المتجر الإلكتروني في نتائج محركات البحث SEO.",
        "إدارة المنتجات وتصنيفاتها عبر منصة سلة، وتحسين تنظيم صفحات المنتجات وتجربة التسوق.",
        "الاستفادة من Google Maps لتعزيز ظهور الفروع وتسهيل وصول العملاء إليها.",
        "المساهمة في الربط بين الأنشطة التسويقية الرقمية والمبيعات داخل الفروع.",
        "متابعة احتياجات العملاء والملاحظات المتعلقة بالمنتجات والخدمات لتحسين تجربة الشراء.",
      ],
    },
    skills: {
      en: ["Google Ads", "SEO", "Salla Platform", "Content Marketing", "Influencer Coordination", "Local Marketing"],
      ar: ["Google Ads", "تحسين محركات البحث", "منصة سلة", "التسويق بالمحتوى", "التنسيق مع المؤثرين", "التسويق المحلي"],
    },
  },
  {
    id: "al-fanar",
    title: { en: "Sales, Marketing & Business Development", ar: "المبيعات والتسويق وتطوير الأعمال" },
    company: { en: "Al Fanar Contracting Est.", ar: "مؤسسة الفنار للمقاولات" },
    period: { en: "4 months", ar: "أربعة أشهر" },
    location: { en: "Tabuk, Saudi Arabia", ar: "تبوك، المملكة العربية السعودية" },
    image: "/assets/portrait-stairs.jpg",
    points: {
      en: [
        "Researched potential clients and organizations needing contracting and support services.",
        "Contacted clients and presented available services suited to their needs.",
        "Prepared and presented price quotations and followed up on sales opportunities.",
        "Helped convince clients of services by clarifying benefits and solutions offered.",
        "Built professional relationships with potential clients and supported business development opportunities.",
      ],
      ar: [
        "البحث عن العملاء المحتملين والمؤسسات التي تحتاج إلى خدمات المقاولات والخدمات المساندة.",
        "التواصل مع العملاء وعرض الخدمات المتاحة بما يتناسب مع احتياجاتهم.",
        "إعداد وتقديم عروض الأسعار ومتابعة فرص البيع.",
        "المساهمة في إقناع العملاء بالخدمات وتوضيح المزايا والحلول المقدمة.",
        "بناء علاقات مهنية مع العملاء المحتملين ودعم فرص تطوير الأعمال.",
      ],
    },
    skills: {
      en: ["Lead Generation", "Quotation Preparation", "Negotiation", "B2B Sales"],
      ar: ["استقطاب العملاء", "إعداد عروض الأسعار", "التفاوض", "مبيعات B2B"],
    },
  },
  {
    id: "jawharat-ramah",
    title: { en: "Sales & Customer Service Employee", ar: "موظف مبيعات وخدمة عملاء" },
    company: { en: "Jawharat Ramah Supermarket", ar: "سوبر ماركت جوهرة رماح" },
    period: { en: "2022 — 2023", ar: "2022 — 2023" },
    location: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    image: "/assets/portrait-stairs.jpg",
    points: {
      en: [
        "Dealt directly with customers, helping them find suitable products.",
        "Delivered good customer service and contributed to improving the shopping experience.",
        "Gained experience in retail sales operations and local market needs.",
        "Developed communication, persuasion, and customer-handling skills.",
      ],
      ar: [
        "التعامل المباشر مع العملاء ومساعدتهم في الحصول على المنتجات المناسبة.",
        "تقديم خدمة عملاء جيدة والمساهمة في تحسين تجربة التسوق.",
        "اكتساب خبرة في عمليات البيع بالتجزئة والتعامل مع احتياجات السوق المحلي.",
        "تطوير مهارات التواصل والإقناع والتعامل مع مختلف العملاء.",
      ],
    },
    skills: {
      en: ["Retail Sales", "Customer Service", "Persuasion"],
      ar: ["مبيعات التجزئة", "خدمة العملاء", "الإقناع"],
    },
  },
];

export const skills: SkillItem[] = [
  { name: { en: "Direct & Retail Sales", ar: "المبيعات المباشرة ومبيعات التجزئة" }, category: "sales" },
  { name: { en: "Branch Marketing & Sales Growth", ar: "تسويق الفروع ودعم نمو المبيعات" }, category: "sales" },
  { name: { en: "Negotiation & Objection Handling", ar: "التفاوض ومعالجة اعتراضات العملاء" }, category: "sales" },
  { name: { en: "Lead Generation & Quotations", ar: "استقطاب العملاء وإعداد عروض الأسعار" }, category: "sales" },
  { name: { en: "Customer Service & Experience", ar: "خدمة العملاء وتحسين تجربة الشراء" }, category: "sales" },
  { name: { en: "Sales Team Training & Coaching", ar: "تدريب موظفي المبيعات وتوجيههم" }, category: "sales" },
  { name: { en: "Digital Marketing & Google Ads", ar: "التسويق الرقمي وإدارة Google Ads" }, category: "marketing" },
  { name: { en: "Search Engine Optimization (SEO)", ar: "تحسين محركات البحث SEO" }, category: "marketing" },
  { name: { en: "E-commerce Management (Salla)", ar: "إدارة المتاجر الإلكترونية (سلة)" }, category: "marketing" },
  { name: { en: "Content Marketing & Influencers", ar: "التسويق بالمحتوى والتعاون مع المؤثرين" }, category: "marketing" },
  { name: { en: "Google Maps & Local Branch Marketing", ar: "Google Maps والتسويق المحلي للفروع" }, category: "marketing" },
  { name: { en: "Warehouse Operations", ar: "العمليات التشغيلية للمستودعات" }, category: "operations" },
  { name: { en: "Inventory Control", ar: "مراقبة المخزون" }, category: "operations" },
  { name: { en: "Balance Review & Variance Analysis", ar: "مراجعة الأرصدة وتحليل الفروقات" }, category: "operations" },
  { name: { en: "Branch & Operations Coordination", ar: "التنسيق بين الفروع والعمليات التشغيلية" }, category: "operations" },
  { name: { en: "SAP ERP", ar: "نظام SAP ERP" }, category: "tools" },
  { name: { en: "Microsoft Excel & Reporting", ar: "Microsoft Excel وإعداد التقارير" }, category: "tools" },
];

export const skillCategories = {
  all: { en: "All", ar: "الكل" },
  sales: { en: "Sales", ar: "المبيعات" },
  marketing: { en: "Marketing & Digital", ar: "التسويق والرقمي" },
  operations: { en: "Warehouse & Operations", ar: "المستودعات والتشغيل" },
  tools: { en: "Systems & Tools", ar: "الأنظمة والأدوات" },
} as const;

export const portfolio = Array.from({ length: 19 }, (_, i) => ({
  src: `/assets/aywise-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `AYWISE — ${["Brand Intro","Abstract Background","Lifestyle Visual","Close-up Texture","Packaging Box","Packaging Bag","Brand Message","Empty Space","Product Mockup","Quote","Dark Theme","Light Theme","Minimal Grid","Soft Shadow","Typography Focus","Brand Identity","Visual Storytelling","Almost Empty","Closing Slide"][i]}`,
}));

export const dict = {
  en: {
    nav: { collection: "Collection", experience: "Experience", impact: "Impact", expertise: "Expertise", education: "Education", portfolio: "Portfolio", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Riyadh, Saudi Arabia",
      headline: "Sales & Marketing · Branch Operations · Business Development",
      intro: "A career presented like a luxury collection — explore the roles, results, and craft behind the name.",
      explore: "Explore Career",
      download: "Download CV",
      scroll: "Scroll to explore",
    },
    collection: {
      eyebrow: "Explore the Collection",
      title: "Five chapters. One career.",
      items: [
        { title: "Professional Experience", desc: "Five roles across retail, marketing, contracting, and warehouse operations." },
        { title: "Core Expertise", desc: "Sales, digital marketing, SEO, and inventory systems — curated and verified." },
        { title: "Career Achievements", desc: "The numbers that matter, straight from work reports." },
        { title: "Education", desc: "Business Administration studies and continuous development." },
        { title: "Design Portfolio", desc: "AYWISE — an original luxury brand identity, designed from scratch." },
      ],
    },
    experience: { eyebrow: "The Experience Collection", title: "Every role, crafted.", open: "View role", close: "Close", responsibilities: "Responsibilities & achievements", relatedSkills: "Related skills" },
    impact: {
      eyebrow: "The Impact",
      title: "Measured. Verified. Real.",
      sub: "Highlights drawn directly from the CV, without exaggeration.",
      metrics: [
        { value: 1.8, to: 0.8, decimals: 2, suffix: "%", label: "Waste indicator — reduced from 1.80% to 0.80%", note: "Within four months, per company reports" },
        { value: 4, suffix: "", label: "Months to achieve the reduction", note: "At Al Romansiah, Riyadh" },
        { value: 3, suffix: "", label: "Cocoonz branches supported in one rotation", note: "Sales & marketing coverage" },
        { value: 2, suffix: "", label: "Professional certificates (Coursera)", note: "Google AI Fundamentals · AI for Brainstorming & Planning" },
      ],
    },
    expertise: { eyebrow: "The Expertise Collection", title: "Skills, curated.", filterHint: "Filter by discipline" },
    education: {
      eyebrow: "Education",
      title: "The academic line.",
      items: [
        { title: "Bachelor of Business Administration", place: "University of the People", status: "In progress", period: "Currently studying" },
        { title: "General Secondary Education", place: "Al-Aqsa Secondary School, Sana'a, Yemen", status: "Completed", period: "" },
        { title: "Google AI Fundamentals", place: "Coursera", status: "Certificate", period: "" },
        { title: "AI for Brainstorming and Planning", place: "Coursera", status: "Certificate", period: "" },
      ],
    },
    portfolioSec: { eyebrow: "Design Portfolio", title: "AYWISE — brand identity work.", sub: "A selection from my original design projects: identity, packaging, typography, and art direction." },
    about: {
      eyebrow: "About the Person",
      title: "The story behind the work.",
      p1: "I started on the shop floor — serving customers face to face at Jawharat Ramah supermarket, learning how people actually make buying decisions. That grounding in retail never left me.",
      p2: "At Cocoonz, I moved between three branches, trained sales staff, ran Google Ads campaigns, managed the Salla e-store, and worked on SEO — connecting digital marketing to real in-branch sales. A short but intense chapter at Al Fanar Contracting taught me B2B prospecting and quotation work in Tabuk.",
      p3: "Today, at Al Romansiah in Riyadh, I work as a warehouse keeper — using SAP ERP and Excel to track inventory, analyze variances, and help reduce the waste indicator from 1.80% to 0.80% in four months. I'm also pursuing a Bachelor of Business Administration at University of the People.",
      languages: "Languages: Arabic (native) · English (level under assessment)",
    },
    contact: {
      eyebrow: "The Final Impression",
      title: "LET'S WORK TOGETHER",
      sub: "Open to opportunities in sales, marketing, branch operations, and warehouse operations across Saudi Arabia.",
      email: "Email",
      whatsapp: "WhatsApp",
      call: "Call",
      cv: "Download CV (Arabic)",
      links: "Professional links",
      cocoonz: "Cocoonz Store",
      alromansiah: "Al Romansiah Co.",
    },
    footer: "Ayman Al Hussam — Luxury Career Showroom. All information verified from CV.",
  },
  ar: {
    nav: { collection: "المجموعة", experience: "الخبرات", impact: "الأثر", expertise: "المهارات", education: "التعليم", portfolio: "الأعمال", about: "عن أيمن", contact: "تواصل" },
    hero: {
      eyebrow: "الرياض، المملكة العربية السعودية",
      headline: "المبيعات والتسويق · عمليات الفروع · تطوير الأعمال",
      intro: "مسيرة مهنية تُعرض كمجموعة فاخرة — استكشف الأدوار والنتائج والحرفية خلف الاسم.",
      explore: "استكشف المسيرة",
      download: "تحميل السيرة الذاتية",
      scroll: "مرر للاستكشاف",
    },
    collection: {
      eyebrow: "استكشف المجموعة",
      title: "خمسة فصول. مسيرة واحدة.",
      items: [
        { title: "الخبرات المهنية", desc: "خمسة أدوار عبر التجزئة والتسويق والمقاولات وعمليات المستودعات." },
        { title: "الخبرات الأساسية", desc: "المبيعات، التسويق الرقمي، تحسين محركات البحث، وأنظمة المخزون — مختارة وموثقة." },
        { title: "إنجازات المسيرة", desc: "الأرقام المهمة، كما وردت في تقارير العمل." },
        { title: "التعليم", desc: "دراسات إدارة الأعمال والتطوير المستمر." },
        { title: "معرض الأعمال التصميمية", desc: "AYWISE — هوية علامة فاخرة أصلية، صُممت من الصفر." },
      ],
    },
    experience: { eyebrow: "مجموعة الخبرات", title: "كل دور، بعناية.", open: "عرض الدور", close: "إغلاق", responsibilities: "المهام والإنجازات", relatedSkills: "مهارات ذات صلة" },
    impact: {
      eyebrow: "الأثر",
      title: "مقاس. موثق. حقيقي.",
      sub: "أبرز النتائج مأخوذة مباشرة من السيرة الذاتية، دون مبالغة.",
      metrics: [
        { value: 1.8, to: 0.8, decimals: 2, suffix: "%", label: "مؤشر الهدر — خُفض من 1.80% إلى 0.80%", note: "خلال أربعة أشهر وفق تقارير العمل" },
        { value: 4, suffix: "", label: "أشهر لتحقيق الخفض", note: "لدى شركة الرومانسية، الرياض" },
        { value: 3, suffix: "", label: "فروع Cocoonz غطاها عملي في التنقل الواحد", note: "تغطية للمبيعات والتسويق" },
        { value: 2, suffix: "", label: "شهادة مهنية (Coursera)", note: "Google AI Fundamentals · AI for Brainstorming & Planning" },
      ],
    },
    expertise: { eyebrow: "مجموعة المهارات", title: "مهارات، بانتقاء.", filterHint: "صفِّ حسب المجال" },
    education: {
      eyebrow: "التعليم",
      title: "المسار الأكاديمي.",
      items: [
        { title: "بكالوريوس إدارة الأعمال", place: "جامعة الشعب (University of the People)", status: "قيد الدراسة", period: "يدرس حالياً" },
        { title: "الثانوية العامة", place: "ثانوية الأقصى، صنعاء، اليمن", status: "مكتمل", period: "" },
        { title: "Google AI Fundamentals", place: "Coursera", status: "شهادة", period: "" },
        { title: "AI for Brainstorming and Planning", place: "Coursera", status: "شهادة", period: "" },
      ],
    },
    portfolioSec: { eyebrow: "معرض الأعمال", title: "AYWISE — أعمال الهوية البصرية.", sub: "مختارات من مشاريعي التصميمية الأصلية: الهوية، التغليف، الطباعة، والإخراج الفني." },
    about: {
      eyebrow: "عن الشخص",
      title: "القصة خلف العمل.",
      p1: "بدأت من أرض المتجر — أخدم العملاء وجهاً لوجه في سوبر ماركت جوهرة رماح، أتعلم كيف يتخذ الناس قرارات الشراء فعلياً. تلك الجذور في التجزئة لم تفارقني.",
      p2: "في Cocoonz تنقلت بين ثلاثة فروع، دربت موظفي المبيعات، أدرت حملات Google Ads، وديرت متجر سلة الإلكتروني، وعملت على تحسين محركات البحث — لأربط التسويق الرقمي بالمبيعات الفعلية داخل الفروع. وفي فصل قصير لكن مكثف مع مؤسسة الفنار للمقاولات تعلمت استقطاب العملاء B2B وإعداد عروض الأسعار في تبوك.",
      p3: "اليوم، في شركة الرومانسية بالرياض، أعمل أمين مستودع — أستخدم SAP ERP وExcel لمتابعة المخزون وتحليل الفروقات، وأساهم في خفض مؤشر الهدر من 1.80% إلى 0.80% خلال أربعة أشهر. وأواصل دراسة بكالوريوس إدارة الأعمال في جامعة الشعب.",
      languages: "اللغات: العربية (اللغة الأم) · الإنجليزية (المستوى قيد التقييم)",
    },
    contact: {
      eyebrow: "الانطباع الأخير",
      title: "لنعمل معاً",
      sub: "منفتح على الفرص في المبيعات والتسويق وعمليات الفروع والمستودعات في مختلف مناطق المملكة.",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      call: "اتصال",
      cv: "تحميل السيرة الذاتية (عربي)",
      links: "روابط مهنية",
      cocoonz: "متجر Cocoonz",
      alromansiah: "شركة الرومانسية",
    },
    footer: "أيمن علي الحسام — معرض المسيرة الفاخر. جميع المعلومات موثقة من السيرة الذاتية.",
  },
} as const;
