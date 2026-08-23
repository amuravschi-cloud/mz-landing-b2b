export interface MetalCalcItem {
  id: string;
  name: string;
  nameRo: string;
  category: "armatura" | "pipes_prof" | "pipes_round" | "sheets" | "beams" | "channels" | "angles" | "wire";
  gost: string;
  standardLength: number; // in meters (e.g. 11.7, 12, 6)
  unitWeight: number; // weight per meter (kg/m) or per m2 (kg/m2 for sheets)
  subSizes?: { size: string; weight: number }[];
}

export interface MetalCategoryInfo {
  id: string;
  name: string;
  nameRo: string;
  gost: string;
  unit: "meter" | "sqm";
  unitName: string;
  unitNameRo: string;
  sizes: {
    label: string;
    labelRo: string;
    weightPerUnit: number; // kg per meter or kg per m2
    defaultLength?: number;
  }[];
}

export const METAL_CALC_CATEGORIES: MetalCategoryInfo[] = [
  {
    id: "armatura",
    name: "Арматура строительная (А500С / А400 / Гладкая)",
    nameRo: "Armătură construcții (A500C / A400 / Netedă)",
    gost: "ГОСТ 34028-2016 / ГОСТ 5781-82 / EN 10080",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "Ø 6 мм", labelRo: "Ø 6 mm", weightPerUnit: 0.222, defaultLength: 6 },
      { label: "Ø 8 мм", labelRo: "Ø 8 mm", weightPerUnit: 0.395, defaultLength: 11.7 },
      { label: "Ø 10 мм", labelRo: "Ø 10 mm", weightPerUnit: 0.617, defaultLength: 11.7 },
      { label: "Ø 12 мм", labelRo: "Ø 12 mm", weightPerUnit: 0.888, defaultLength: 11.7 },
      { label: "Ø 14 мм", labelRo: "Ø 14 mm", weightPerUnit: 1.210, defaultLength: 11.7 },
      { label: "Ø 16 мм", labelRo: "Ø 16 mm", weightPerUnit: 1.580, defaultLength: 11.7 },
      { label: "Ø 18 мм", labelRo: "Ø 18 mm", weightPerUnit: 2.000, defaultLength: 11.7 },
      { label: "Ø 20 мм", labelRo: "Ø 20 mm", weightPerUnit: 2.470, defaultLength: 11.7 },
      { label: "Ø 22 мм", labelRo: "Ø 22 mm", weightPerUnit: 2.980, defaultLength: 11.7 },
      { label: "Ø 25 мм", labelRo: "Ø 25 mm", weightPerUnit: 3.850, defaultLength: 11.7 },
      { label: "Ø 28 мм", labelRo: "Ø 28 mm", weightPerUnit: 4.830, defaultLength: 11.7 },
      { label: "Ø 32 мм", labelRo: "Ø 32 mm", weightPerUnit: 6.310, defaultLength: 11.7 },
    ]
  },
  {
    id: "pipes_prof",
    name: "Труба профильная квадратная и прямоугольная",
    nameRo: "Țeavă profilată pătrată și dreptunghiulară",
    gost: "ГОСТ 8639-82 / ГОСТ 8645-68 / EN 10219",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "15х15 х 1.5 мм", labelRo: "15x15 x 1.5 mm", weightPerUnit: 0.60, defaultLength: 6 },
      { label: "20х20 х 1.5 мм", labelRo: "20x20 x 1.5 mm", weightPerUnit: 0.86, defaultLength: 6 },
      { label: "20х20 х 2.0 мм", labelRo: "20x20 x 2.0 mm", weightPerUnit: 1.12, defaultLength: 6 },
      { label: "25х25 х 1.5 мм", labelRo: "25x25 x 1.5 mm", weightPerUnit: 1.10, defaultLength: 6 },
      { label: "25х25 х 2.0 мм", labelRo: "25x25 x 2.0 mm", weightPerUnit: 1.44, defaultLength: 6 },
      { label: "30х20 х 1.5 мм", labelRo: "30x20 x 1.5 mm", weightPerUnit: 1.10, defaultLength: 6 },
      { label: "30х20 х 2.0 мм", labelRo: "30x20 x 2.0 mm", weightPerUnit: 1.44, defaultLength: 6 },
      { label: "30х30 х 2.0 мм", labelRo: "30x30 x 2.0 mm", weightPerUnit: 1.75, defaultLength: 6 },
      { label: "40х20 х 1.5 мм", labelRo: "40x20 x 1.5 mm", weightPerUnit: 1.34, defaultLength: 6 },
      { label: "40х20 х 2.0 мм", labelRo: "40x20 x 2.0 mm", weightPerUnit: 1.75, defaultLength: 6 },
      { label: "40х40 х 2.0 мм", labelRo: "40x40 x 2.0 mm", weightPerUnit: 2.38, defaultLength: 6 },
      { label: "40х40 х 3.0 мм", labelRo: "40x40 x 3.0 mm", weightPerUnit: 3.45, defaultLength: 6 },
      { label: "50х25 х 2.0 мм", labelRo: "50x25 x 2.0 mm", weightPerUnit: 2.22, defaultLength: 6 },
      { label: "50х50 х 2.0 мм", labelRo: "50x50 x 2.0 mm", weightPerUnit: 3.01, defaultLength: 6 },
      { label: "50х50 х 3.0 мм", labelRo: "50x50 x 3.0 mm", weightPerUnit: 4.39, defaultLength: 6 },
      { label: "60х40 х 2.0 мм", labelRo: "60x40 x 2.0 mm", weightPerUnit: 3.01, defaultLength: 6 },
      { label: "60х40 х 3.0 мм", labelRo: "60x40 x 3.0 mm", weightPerUnit: 4.39, defaultLength: 6 },
      { label: "60х60 х 2.0 мм", labelRo: "60x60 x 2.0 mm", weightPerUnit: 3.64, defaultLength: 6 },
      { label: "60х60 х 3.0 мм", labelRo: "60x60 x 3.0 mm", weightPerUnit: 5.34, defaultLength: 6 },
      { label: "60х60 х 4.0 мм", labelRo: "60x60 x 4.0 mm", weightPerUnit: 6.97, defaultLength: 6 },
      { label: "80х40 х 2.0 мм", labelRo: "80x40 x 2.0 mm", weightPerUnit: 3.64, defaultLength: 6 },
      { label: "80х40 х 3.0 мм", labelRo: "80x40 x 3.0 mm", weightPerUnit: 5.34, defaultLength: 6 },
      { label: "80х80 х 3.0 мм", labelRo: "80x80 x 3.0 mm", weightPerUnit: 7.22, defaultLength: 6 },
      { label: "80х80 х 4.0 мм", labelRo: "80x80 x 4.0 mm", weightPerUnit: 9.48, defaultLength: 6 },
      { label: "100х50 х 3.0 мм", labelRo: "100x50 x 3.0 mm", weightPerUnit: 6.75, defaultLength: 6 },
      { label: "100х100 х 3.0 мм", labelRo: "100x100 x 3.0 mm", weightPerUnit: 9.10, defaultLength: 12 },
      { label: "100х100 х 4.0 мм", labelRo: "100x100 x 4.0 mm", weightPerUnit: 12.00, defaultLength: 12 },
      { label: "120х120 х 4.0 мм", labelRo: "120x120 x 4.0 mm", weightPerUnit: 14.50, defaultLength: 12 },
      { label: "140х140 х 4.0 мм", labelRo: "140x140 x 4.0 mm", weightPerUnit: 17.00, defaultLength: 12 },
      { label: "150х150 х 5.0 мм", labelRo: "150x150 x 5.0 mm", weightPerUnit: 22.30, defaultLength: 12 },
    ]
  },
  {
    id: "pipes_round",
    name: "Труба стальная круглая (ВГП & Электросварная)",
    nameRo: "Țeavă rotundă din oțel (VGP și sudată)",
    gost: "ГОСТ 3262-75 / ГОСТ 10704-91 / EN 10255",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "ДУ 15 (Ø 21.3 х 2.5 мм)", labelRo: "DN 15 (Ø 21.3 x 2.5 mm)", weightPerUnit: 1.16, defaultLength: 6 },
      { label: "ДУ 20 (Ø 26.8 х 2.5 мм)", labelRo: "DN 20 (Ø 26.8 x 2.5 mm)", weightPerUnit: 1.50, defaultLength: 6 },
      { label: "ДУ 25 (Ø 33.5 х 2.8 мм)", labelRo: "DN 25 (Ø 33.5 x 2.8 mm)", weightPerUnit: 2.12, defaultLength: 6 },
      { label: "ДУ 32 (Ø 42.3 х 2.8 мм)", labelRo: "DN 32 (Ø 42.3 x 2.8 mm)", weightPerUnit: 2.73, defaultLength: 6 },
      { label: "ДУ 40 (Ø 48.0 х 3.0 мм)", labelRo: "DN 40 (Ø 48.0 x 3.0 mm)", weightPerUnit: 3.33, defaultLength: 6 },
      { label: "ДУ 50 (Ø 60.0 х 3.0 мм)", labelRo: "DN 50 (Ø 60.0 x 3.0 mm)", weightPerUnit: 4.22, defaultLength: 6 },
      { label: "Э/С Ø 76 х 3.0 мм", labelRo: "Sudată Ø 76 x 3.0 mm", weightPerUnit: 5.40, defaultLength: 6 },
      { label: "Э/С Ø 89 х 3.5 мм", labelRo: "Sudată Ø 89 x 3.5 mm", weightPerUnit: 7.38, defaultLength: 6 },
      { label: "Э/С Ø 108 х 3.5 мм", labelRo: "Sudată Ø 108 x 3.5 mm", weightPerUnit: 9.02, defaultLength: 12 },
      { label: "Э/С Ø 114 х 4.0 мм", labelRo: "Sudată Ø 114 x 4.0 mm", weightPerUnit: 10.85, defaultLength: 12 },
      { label: "Э/С Ø 133 х 4.0 мм", labelRo: "Sudată Ø 133 x 4.0 mm", weightPerUnit: 12.73, defaultLength: 12 },
      { label: "Э/С Ø 159 х 4.5 мм", labelRo: "Sudată Ø 159 x 4.5 mm", weightPerUnit: 17.15, defaultLength: 12 },
      { label: "Э/С Ø 219 х 6.0 мм", labelRo: "Sudată Ø 219 x 6.0 mm", weightPerUnit: 31.52, defaultLength: 12 },
    ]
  },
  {
    id: "sheets",
    name: "Листовой прокат (Г/К, Х/К, Оцинкованный)",
    nameRo: "Tablă laminată (cald, rece, zincată)",
    gost: "ГОСТ 19903-2015 / ГОСТ 19904-90 / EN 10025",
    unit: "sqm",
    unitName: "квадратный метр (м²)",
    unitNameRo: "metru pătrat (m²)",
    sizes: [
      { label: "Лист 0.5 мм", labelRo: "Tablă 0.5 mm", weightPerUnit: 3.93 },
      { label: "Лист 0.8 мм", labelRo: "Tablă 0.8 mm", weightPerUnit: 6.28 },
      { label: "Лист 1.0 мм", labelRo: "Tablă 1.0 mm", weightPerUnit: 7.85 },
      { label: "Лист 1.2 мм", labelRo: "Tablă 1.2 mm", weightPerUnit: 9.42 },
      { label: "Лист 1.5 мм", labelRo: "Tablă 1.5 mm", weightPerUnit: 11.78 },
      { label: "Лист 2.0 мм", labelRo: "Tablă 2.0 mm", weightPerUnit: 15.70 },
      { label: "Лист 2.5 мм", labelRo: "Tablă 2.5 mm", weightPerUnit: 19.63 },
      { label: "Лист 3.0 мм", labelRo: "Tablă 3.0 mm", weightPerUnit: 23.55 },
      { label: "Лист 4.0 мм", labelRo: "Tablă 4.0 mm", weightPerUnit: 31.40 },
      { label: "Лист 5.0 мм", labelRo: "Tablă 5.0 mm", weightPerUnit: 39.25 },
      { label: "Лист 6.0 мм", labelRo: "Tablă 6.0 mm", weightPerUnit: 47.10 },
      { label: "Лист 8.0 мм", labelRo: "Tablă 8.0 mm", weightPerUnit: 62.80 },
      { label: "Лист 10.0 мм", labelRo: "Tablă 10.0 mm", weightPerUnit: 78.50 },
      { label: "Лист 12.0 мм", labelRo: "Tablă 12.0 mm", weightPerUnit: 94.20 },
      { label: "Лист 16.0 мм", labelRo: "Tablă 16.0 mm", weightPerUnit: 125.60 },
      { label: "Лист 20.0 мм", labelRo: "Tablă 20.0 mm", weightPerUnit: 157.00 },
      { label: "Лист 25.0 мм", labelRo: "Tablă 25.0 mm", weightPerUnit: 196.25 },
      { label: "Лист 30.0 мм", labelRo: "Tablă 30.0 mm", weightPerUnit: 235.50 },
    ]
  },
  {
    id: "beams",
    name: "Двутавровая балка (IPE, HEA, ГОСТ)",
    nameRo: "Grindă I / Dublu T (IPE / HEA / GOST)",
    gost: "ГОСТ 8239-89 / ГОСТ 26020-83 / Euronorm 19-57",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "Балка 10 / IPE 100", labelRo: "Grindă 10 / IPE 100", weightPerUnit: 8.10, defaultLength: 12 },
      { label: "Балка 12 / IPE 120", labelRo: "Grindă 12 / IPE 120", weightPerUnit: 10.40, defaultLength: 12 },
      { label: "Балка 14 / IPE 140", labelRo: "Grindă 14 / IPE 140", weightPerUnit: 12.90, defaultLength: 12 },
      { label: "Балка 16 / IPE 160", labelRo: "Grindă 16 / IPE 160", weightPerUnit: 15.80, defaultLength: 12 },
      { label: "Балка 18 / IPE 180", labelRo: "Grindă 18 / IPE 180", weightPerUnit: 18.80, defaultLength: 12 },
      { label: "Балка 20Б1 / IPE 200", labelRo: "Grindă 20B1 / IPE 200", weightPerUnit: 22.40, defaultLength: 12 },
      { label: "Балка 24Б1 / IPE 240", labelRo: "Grindă 24B1 / IPE 240", weightPerUnit: 30.70, defaultLength: 12 },
      { label: "Балка 30Б1 / IPE 300", labelRo: "Grindă 30B1 / IPE 300", weightPerUnit: 42.20, defaultLength: 12 },
      { label: "Балка HEA 100", labelRo: "Grindă HEA 100", weightPerUnit: 16.70, defaultLength: 12 },
      { label: "Балка HEA 140", labelRo: "Grindă HEA 140", weightPerUnit: 24.70, defaultLength: 12 },
      { label: "Балка HEA 200", labelRo: "Grindă HEA 200", weightPerUnit: 42.30, defaultLength: 12 },
    ]
  },
  {
    id: "channels",
    name: "Швеллер стальной (П-образный и У)",
    nameRo: "Profil U / Șpeler (UPN / UNP)",
    gost: "ГОСТ 8240-97 / DIN 1026",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "Швеллер 5У / 5П", labelRo: "Șpeler 5U / 5P", weightPerUnit: 4.84, defaultLength: 11.7 },
      { label: "Швеллер 6.5У / 6.5П", labelRo: "Șpeler 6.5U / 6.5P", weightPerUnit: 5.90, defaultLength: 11.7 },
      { label: "Швеллер 8У / 8П (UPN 80)", labelRo: "Șpeler 8U / 8P (UPN 80)", weightPerUnit: 7.05, defaultLength: 11.7 },
      { label: "Швеллер 10У / 10П (UPN 100)", labelRo: "Șpeler 10U / 10P (UPN 100)", weightPerUnit: 8.59, defaultLength: 11.7 },
      { label: "Швеллер 12У / 12П (UPN 120)", labelRo: "Șpeler 12U / 12P (UPN 120)", weightPerUnit: 10.40, defaultLength: 11.7 },
      { label: "Швеллер 14У / 14П (UPN 140)", labelRo: "Șpeler 14U / 14P (UPN 140)", weightPerUnit: 12.30, defaultLength: 11.7 },
      { label: "Швеллер 16У / 16П (UPN 160)", labelRo: "Șpeler 16U / 16P (UPN 160)", weightPerUnit: 14.20, defaultLength: 11.7 },
      { label: "Швеллер 18У / 18П (UPN 180)", labelRo: "Șpeler 18U / 18P (UPN 180)", weightPerUnit: 16.30, defaultLength: 11.7 },
      { label: "Швеллер 20У / 20П (UPN 200)", labelRo: "Șpeler 20U / 20P (UPN 200)", weightPerUnit: 18.40, defaultLength: 11.7 },
      { label: "Швеллер 24У / 24П (UPN 240)", labelRo: "Șpeler 24U / 24P (UPN 240)", weightPerUnit: 24.00, defaultLength: 11.7 },
      { label: "Швеллер 30У / 30П (UPN 300)", labelRo: "Șpeler 30U / 30P (UPN 300)", weightPerUnit: 31.80, defaultLength: 11.7 },
    ]
  },
  {
    id: "angles",
    name: "Уголок стальной равнополочный",
    nameRo: "Cornier din oțel cu laturi egale",
    gost: "ГОСТ 8509-93 / EN 10056",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "25х25 х 3 мм", labelRo: "25x25 x 3 mm", weightPerUnit: 1.12, defaultLength: 6 },
      { label: "25х25 х 4 мм", labelRo: "25x25 x 4 mm", weightPerUnit: 1.46, defaultLength: 6 },
      { label: "32х32 х 3 мм", labelRo: "32x32 x 3 mm", weightPerUnit: 1.46, defaultLength: 6 },
      { label: "32х32 х 4 мм", labelRo: "32x32 x 4 mm", weightPerUnit: 1.91, defaultLength: 6 },
      { label: "40х40 х 3 мм", labelRo: "40x40 x 3 mm", weightPerUnit: 1.85, defaultLength: 6 },
      { label: "40х40 х 4 мм", labelRo: "40x40 x 4 mm", weightPerUnit: 2.42, defaultLength: 6 },
      { label: "45х45 х 4 мм", labelRo: "45x45 x 4 mm", weightPerUnit: 2.73, defaultLength: 6 },
      { label: "50х50 х 4 мм", labelRo: "50x50 x 4 mm", weightPerUnit: 3.05, defaultLength: 6 },
      { label: "50х50 х 5 мм", labelRo: "50x50 x 5 mm", weightPerUnit: 3.77, defaultLength: 6 },
      { label: "63х63 х 5 мм", labelRo: "63x63 x 5 mm", weightPerUnit: 4.81, defaultLength: 11.7 },
      { label: "75х75 х 6 мм", labelRo: "75x75 x 6 mm", weightPerUnit: 6.89, defaultLength: 11.7 },
      { label: "90х90 х 7 мм", labelRo: "90x90 x 7 mm", weightPerUnit: 9.64, defaultLength: 11.7 },
      { label: "100х100 х 8 мм", labelRo: "100x100 x 8 mm", weightPerUnit: 12.25, defaultLength: 11.7 },
    ]
  },
  {
    id: "wire",
    name: "Катанка и Круг стальной / Проволока вязальная",
    nameRo: "Sârmă laminată (catancă), oțel rotund și sârmă arsă",
    gost: "ГОСТ 30136-95 / ГОСТ 2590-2006 / ГОСТ 3282-74",
    unit: "meter",
    unitName: "погонный метр",
    unitNameRo: "metru liniar",
    sizes: [
      { label: "Катанка Ø 5.5 мм", labelRo: "Catancă Ø 5.5 mm", weightPerUnit: 0.187 },
      { label: "Катанка Ø 6.0 мм", labelRo: "Catancă Ø 6.0 mm", weightPerUnit: 0.222 },
      { label: "Катанка Ø 6.5 мм", labelRo: "Catancă Ø 6.5 mm", weightPerUnit: 0.260 },
      { label: "Катанка Ø 8.0 мм", labelRo: "Catancă Ø 8.0 mm", weightPerUnit: 0.395 },
      { label: "Круг Ø 10 мм", labelRo: "Rotund Ø 10 mm", weightPerUnit: 0.617 },
      { label: "Круг Ø 12 мм", labelRo: "Rotund Ø 12 mm", weightPerUnit: 0.888 },
      { label: "Круг Ø 14 мм", labelRo: "Rotund Ø 14 mm", weightPerUnit: 1.210 },
      { label: "Круг Ø 16 мм", labelRo: "Rotund Ø 16 mm", weightPerUnit: 1.580 },
      { label: "Круг Ø 20 мм", labelRo: "Rotund Ø 20 mm", weightPerUnit: 2.470 },
      { label: "Проволока вязальная Ø 1.2 мм", labelRo: "Sârmă de legat Ø 1.2 mm", weightPerUnit: 0.0089 },
      { label: "Проволока вязальная Ø 2.0 мм", labelRo: "Sârmă de legat Ø 2.0 mm", weightPerUnit: 0.0246 },
    ]
  }
];

export const CALC_DISCLAIMER_RU = "Внимание: Все расчеты теоретического веса носят справочный характер и произведены по номинальной плотности стали 7.85 г/см³. Фактический вес может незначительно отличаться в пределах допусков ГОСТ / EN стандартов завода-производителя. Точный вес партии и актуальное наличие на металлобазах уточняйте у менеджеров Metalica Zuev.";

export const CALC_DISCLAIMER_RO = "Atenție: Calculele masei teoretice au caracter informativ și sunt efectuate conform densității nominale a oțelului (7.85 g/cm³). Greutatea reală poate varia în limitele toleranțelor standardelor GOST / EN ale producătorului. Pentru cantitatea exactă și disponibilitatea în stoc contactați managerii Metalica Zuev.";
