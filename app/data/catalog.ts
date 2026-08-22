export interface MetalSpec {
  label: string;
  labelRo: string;
  value: string;
  valueRo: string;
}

export interface MetalProduct {
  id: string;
  code: string;
  category: "armatura" | "pipes" | "sheets" | "shaped" | "wire";
  title: string;
  titleRo: string;
  subtitle: string;
  subtitleRo: string;
  desc: string;
  descRo: string;
  tag: string;
  image: string;
  specs: MetalSpec[];
}

export interface BaseLocation {
  id: string;
  title: string;
  titleRo: string;
  city: string;
  address: string;
  addressRo: string;
  type: string;
  typeRo: string;
  hours: string;
  hoursRo: string;
  isSaturdayOpen?: boolean;
  phone?: string;
  phoneRaw?: string;
  mapUrl: string;
  features: string[];
  featuresRo: string[];
  desc: string;
  descRo: string;
  image: string;
}

export const METAL_PRODUCTS: MetalProduct[] = [
  {
    id: "armatura",
    code: "01",
    category: "armatura",
    title: "Арматура А500С / А400",
    titleRo: "Armătură A500C / A400",
    subtitle: "Гладкая и периодическая (Ø 8 – 32 мм)",
    subtitleRo: "Armătură striată și netedă (Ø 8 – 32 mm)",
    desc: "Высокопрочная стальная арматура для монолитного строительства, фундаментов, ЖБИ изделий и несущих каркасов.",
    descRo: "Armătură din oțel de înaltă rezistență pentru fundații, structuri din beton armat și cadre portante.",
    tag: "ГОСТ 34028 / А500С / EN 10080",
    image: "/images/real/DSC00319.jpg",
    specs: [
      { label: "Марка стали", labelRo: "Marca de oțel", value: "А500С / А400 / 35ГС", valueRo: "A500C / A400 / 35GS" },
      { label: "Диаметры в наличии", labelRo: "Diametre în stoc", value: "8, 10, 12, 14, 16, 18, 20 – 32 мм", valueRo: "8, 10, 12, 14, 16, 18, 20 – 32 mm" },
      { label: "Длина прутков", labelRo: "Lungimea barelor", value: "Мерная 11.7 м / Немерная / Бухты", valueRo: "Bare 11.7 m / Nemerate / Colaci" },
      { label: "Сервис", labelRo: "Servicii", value: "Пакетная увязка, точная резка в размер", valueRo: "Pachetizare, debitare la dimensiune" }
    ]
  },
  {
    id: "pipes_prof",
    code: "02",
    category: "pipes",
    title: "Профильная труба",
    titleRo: "Țeavă profilată pătrată și dreptunghiulară",
    subtitle: "Квадратное и прямоугольное сечение (15х15 – 200х200)",
    subtitleRo: "Secțiuni pătrate și dreptunghiulare",
    desc: "Профильный прокат с точной геометрией сечения для навесов, заборов, ангаров, легких ферм и строительных лесов.",
    descRo: "Țevi profilate cu geometrie precisă pentru structuri metalice, garduri, copertine și hale industriale.",
    tag: "ГОСТ 8639-82 / 8645 / EN 10219",
    image: "/images/real/DSC00327.jpg",
    specs: [
      { label: "Сечения квадратные", labelRo: "Secțiuni pătrate", value: "15х15, 20х20, 30х30, 40х40, 50х50, 60х60, 80х80, 100х100, 120х120, 150х150 мм", valueRo: "15x15 până la 150x150 mm" },
      { label: "Прямоугольные", labelRo: "Dreptunghiulare", value: "30х20, 40х20, 50х25, 60х40, 80х40, 100х50, 120х80, 140х80 мм", valueRo: "30x20 până la 140x80 mm" },
      { label: "Толщина стенки", labelRo: "Grosimea peretelui", value: "от 1.5 мм до 6.0 мм (длина 6м / 12м)", valueRo: "de la 1.5 mm la 6.0 mm (6m / 12m)" },
      { label: "Марка стали", labelRo: "Marca de oțel", value: "Ст3сп / Ст10 / 09Г2С / S235JRH", valueRo: "St3sp / St10 / 09G2S / S235JRH" }
    ]
  },
  {
    id: "pipes_round",
    code: "03",
    category: "pipes",
    title: "Круглая стальная труба",
    titleRo: "Țeavă rotundă (VGP și sudată)",
    subtitle: "Водогазопроводная и электросварная прямошовная",
    subtitleRo: "Pentru apă, gaz și structuri portante",
    desc: "Стальные трубы различных диаметров и толщины стенки для инженерных коммуникаций, металлических конструкций и гидросистем.",
    descRo: "Țevi din oțel pentru rețele inginerești, gaz, apă și confecții metalice.",
    tag: "ГОСТ 3262-75 / 10704 / EN 10255",
    image: "/images/real/DSC00344.jpg",
    specs: [
      { label: "Диаметры наружные", labelRo: "Diametre exterioare", value: "от 15 мм до 219+ мм (1/2\" — 8\")", valueRo: "de la 15 mm la 219+ mm" },
      { label: "Толщина стенки", labelRo: "Grosimea peretelui", value: "от 2.0 мм до 8.0 мм", valueRo: "de la 2.0 mm la 8.0 mm" },
      { label: "Стандарты", labelRo: "Standarde", value: "ГОСТ 3262, ГОСТ 10704, EN 10217", valueRo: "GOST 3262, GOST 10704, EN 10217" },
      { label: "Применение", labelRo: "Domeniu de uz", value: "ВГП, опоры, несущие строительные стойки", valueRo: "Instalații, stâlpi portanți" }
    ]
  },
  {
    id: "sheets",
    code: "04",
    category: "sheets",
    title: "Листовой прокат",
    titleRo: "Tablă laminată (cald, rece, zincată, striată)",
    subtitle: "Г/К, Х/К, Оцинкованный и Рифлёный лист",
    subtitleRo: "Foi și rulouri pentru industrie și construcții",
    desc: "Гладкий, оцинкованный и рифленый листовой металл в листах и рулонах для производства, штамповки и фасадных элементов.",
    descRo: "Tablă din oțel laminată la cald, la rece, zincată și striată pentru producție și construcții.",
    tag: "ГОСТ 19903-2015 / 19904 / EN 10025",
    image: "/images/real/DSC00411.jpg",
    specs: [
      { label: "Толщина листовая", labelRo: "Grosimi disponibile", value: "от 0.5 мм до 50.0 мм", valueRo: "de la 0.5 mm la 50.0 mm" },
      { label: "Габариты раскроя", labelRo: "Dimensiuni foi", value: "1000х2000, 1250х2500, 1500х6000 мм", valueRo: "1000x2000, 1250x2500, 1500x6000 mm" },
      { label: "Вид поверхности", labelRo: "Tip suprafață", value: "Гладкий, Чечевица, Ромб, Оцинкованный", valueRo: "Netedă, Striată, Romb, Zincată" },
      { label: "Обработка", labelRo: "Debitare", value: "Гильотинная & Плазменная резка по чертежу", valueRo: "Tăiere la ghilotină și plasmă" }
    ]
  },
  {
    id: "beams",
    code: "05",
    category: "shaped",
    title: "Двутавровая балка (Н-профиль)",
    titleRo: "Grindă I / Dublu T (IPE / HEA / HEB / IPN)",
    subtitle: "Профиль 10Б1 — 30Б1 / К1 / К2 / IPE / HEA",
    subtitleRo: "Profile structurale portante pentru planșee și hale",
    desc: "Горячекатаный фасонный прокат Н-образного сечения для высоких несущих нагрузок, межэтажных перекрытий и мостовых ферм.",
    descRo: "Profile din oțel greu pentru sarcini mari, deschideri largi și structuri industriale.",
    tag: "ГОСТ 8239-89 / Euronorm 19-57",
    image: "/images/real/DSC00421.jpg",
    specs: [
      { label: "Профильные серии", labelRo: "Serii de profile", value: "Балка Б1, Б2, К1, К2, IPE 100–300, HEA/HEB", valueRo: "B1, B2, K1, K2, IPE 100–300, HEA/HEB" },
      { label: "Высота профиля", labelRo: "Înălțime profil", value: "от 100 мм до 300+ мм", valueRo: "de la 100 mm la 300+ mm" },
      { label: "Длина хлыстов", labelRo: "Lungime bare", value: "Мерные 12.0 м / Спецраскрой на месте", valueRo: "Bare 12.0 m / Tăiere la cerere" },
      { label: "Марка стали", labelRo: "Calitate oțel", value: "Ст3сп / 09Г2С / S275JR / S355J2", valueRo: "St3sp / 09G2S / S275JR / S355J2" }
    ]
  },
  {
    id: "channels",
    code: "06",
    category: "shaped",
    title: "Швеллер и Уголок стальной",
    titleRo: "Profil U / Șpeler și Cornier din oțel",
    subtitle: "П-образный и равнополочный прокат",
    subtitleRo: "Profile UPN, UNP și cornier laminat",
    desc: "Фасонные элементы для армирования стен, создания станин техники, прогонов и сопряжения балочных конструкций.",
    descRo: "Elemente structurale pentru consolidări, rame, schelete și susțineri metalice.",
    tag: "ГОСТ 8240-97 / ГОСТ 8509 / DIN 1026",
    image: "/images/real/DSC00032.jpg",
    specs: [
      { label: "Швеллер серии", labelRo: "Șpeler serii", value: "№ 5U, 6.5U, 8U, 10U, 12U, 14U — 30U (П и У)", valueRo: "Nr. 5U, 6.5U, 8U, 10U — 30U" },
      { label: "Уголок равнополочный", labelRo: "Cornier cu laturi egale", value: "25х25, 32х32, 40х40, 50х50 — 140х140 мм", valueRo: "25x25 până la 140x140 mm" },
      { label: "Толщина полки", labelRo: "Grosime flanșă", value: "от 3.0 мм до 12.0 мм", valueRo: "de la 3.0 mm la 12.0 mm" },
      { label: "Сервис", labelRo: "Prelucrare", value: "Точный рез на ленточнопильном станке", valueRo: "Tăiere precisă la fierăstrău panglică" }
    ]
  }
];

export const BASES_LIST: BaseLocation[] = [
  {
    id: "base1",
    title: "Металлобаза №1 (Кишинёв)",
    titleRo: "Depozit Metalic №1 (Chișinău)",
    city: "Chișinău",
    address: "str. Industrială, 48",
    addressRo: "str. Industrială, 48",
    type: "Открытая металлобаза · Склад металла",
    typeRo: "Depozit deschis · Stoc complet de metal",
    hours: "Пн–Пт: 08:00 – 17:00",
    hoursRo: "Lu–Vi: 08:00 – 17:00",
    mapUrl: "https://maps.google.com/?q=Industriala%2048%20Chisinau%20Moldova",
    features: [
      "Козловые краны 15т для длинномеров",
      "Склад сортового и фасонного проката",
      "Гильотинная и лентопильная резка",
      "Точный весовой контроль"
    ],
    featuresRo: [
      "Macarale capră 15t pentru încărcare rapidă",
      "Stoc complet de profile și laminate",
      "Tăiere la ghilotină și fierăstrău",
      "Cântar auto de precizie"
    ],
    desc: "Главный открытый складской комплекс компании с широчайшим ассортиментом чёрного металлопроката и оперативной крановой погрузкой.",
    descRo: "Complexul central de depozitare cu stoc permanent de produse metalice grele și debitare.",
    image: "/images/real/DSC00319.jpg"
  },
  {
    id: "base2",
    title: "Металлобаза №2 (Кишинёв)",
    titleRo: "Depozit Metalic №2 (Chișinău)",
    city: "Chișinău",
    address: "str. Transnistria, 3A (заезд с str. Vadul lui Vodă, 142)",
    addressRo: "str. Transnistria, 3A (acces din str. Vadul lui Vodă, 142)",
    type: "Открытая металлобаза · Склад металла",
    typeRo: "Depozit deschis · Acces tiruri",
    hours: "Пн–Пт: 08:00 – 17:00",
    hoursRo: "Lu–Vi: 08:00 – 17:00",
    mapUrl: "https://maps.google.com/?q=Vadul%20lui%20Voda%20142%20Chisinau%20Moldova",
    features: [
      "Открытый склад металлопроката",
      "Лентопильная резка",
      "Удобный подъезд длинномеров",
      "Погрузка крановым оборудованием"
    ],
    featuresRo: [
      "Depozit de produse metalice",
      "Debitare la fierăstrău",
      "Acces comod pentru camioane lungi",
      "Încărcare mecanizată"
    ],
    desc: "Открытая металлобаза с удобным заездом с улицы Вадул-луй-Водэ (142), оборудованная под отгрузку тяжелых длинномеров.",
    descRo: "Depozit cu acces direct din Vadul lui Vodă 142, specializat pe deservirea transportului de mare tonaj.",
    image: "/images/real/DSC00332-1.jpg"
  },
  {
    id: "base3",
    title: "Региональная Металлобаза №3 (Орхей)",
    titleRo: "Depozit Regional №3 (Orhei)",
    city: "Orhei",
    address: "str. Unirii, 49D",
    addressRo: "str. Unirii, 49D",
    type: "Региональная металлобаза (Север Молдовы)",
    typeRo: "Depozit regional (Nordul Moldovei)",
    hours: "Пн–Пт: 08:00 – 17:00 | Сб: 08:00 – 14:00",
    hoursRo: "Lu–Vi: 08:00 – 17:00 | Sâ: 08:00 – 14:00",
    isSaturdayOpen: true,
    phone: "0235 80 008",
    phoneRaw: "+37323580008",
    mapUrl: "https://maps.google.com/?q=Unirii%2049D%20Orhei%20Moldova",
    features: [
      "Прямой телефон базы: 0235 80 008",
      "Отгрузка по субботам с 08:00 до 14:00",
      "Быстрая доставка по Северу Молдовы",
      "Крановая погрузка и выезд на трассу"
    ],
    featuresRo: [
      "Telefon direct: 0235 80 008",
      "Deschis sâmbăta: 08:00 – 14:00",
      "Livrare rapidă în raioanele de nord",
      "Încărcare cu macara"
    ],
    desc: "Обеспечивает поставками строительные объекты Оргеева, Бельц и северных районов Молдовы. Прямой телефон металлобазы в Орхее: 0235 80 008.",
    descRo: "Deservește șantierele din Orhei, Bălți și zona de nord. Telefon direct: 0235 80 008. Deschis sâmbăta până la 14:00.",
    image: "/images/real/DSC00317.jpg"
  },
  {
    id: "base4",
    title: "Логистический Хаб (Сынжера)",
    titleRo: "Hub Logistic (Sîngera)",
    city: "Sîngera",
    address: "str. Industrială, 3",
    addressRo: "str. Industrială, 3",
    type: "Логистический распределительный центр",
    typeRo: "Hub logistic și distribuție",
    hours: "Пн–Пт: 08:00 – 17:00",
    hoursRo: "Lu–Vi: 08:00 – 17:00",
    mapUrl: "https://maps.google.com/?q=Industriala%203%20Singera%20Moldova",
    features: [
      "Площадка тяжелого фасонного проката",
      "Склады балок и швеллеров",
      "Парк длинномерных фур",
      "Спецкомплектация крупных проектов"
    ],
    featuresRo: [
      "Platformă pentru profile grele",
      "Depozit de grinzi și șpelere",
      "Parc de camioane 12m",
      "Completare proiecte mari de infrastructură"
    ],
    desc: "Узловой логистический центр распределения прямых заводских поставок и тяжелого фасонного проката по всей стране.",
    descRo: "Centru nodal de recepție a vagoanelor și distribuție a metalului pe întreg teritoriul țării.",
    image: "/images/real/DSC00421.jpg"
  }
];

export const COMPANY_CONTACTS = {
  phoneDisplay: "+373 68 47-15-30",
  phoneRaw: "+37368471530",
  viberLink: "viber://chat?number=%2B37368471530",
  whatsappLink: "https://wa.me/37368471530?text=Здравствуйте,%20хочу%20запросить%20наличие%20и%20коммерческое%20предложение%20по%20металлопрокату",
  telegramLink: "https://t.me/metalicazuev",
  hoursMain: "Пн–Пт: 08:00 – 17:00",
  hoursMainRo: "Lu–Vi: 08:00 – 17:00",
  hoursOrhei: "Орхей: Пн–Пт 08:00–17:00, Сб 08:00–14:00",
  hoursOrheiRo: "Orhei: Lu–Vi 08:00–17:00, Sâ 08:00–14:00",
};
