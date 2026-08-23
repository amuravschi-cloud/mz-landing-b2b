"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Phone, 
  Send, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Scissors, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight,
  ExternalLink,
  PhoneCall,
  Menu,
  X,
  Warehouse,
  Check,
  Sparkles,
  ChevronDown,
  Scale,
  Building2,
  PackageCheck,
  ArrowUp,
  Calculator,
  UploadCloud,
  FileSpreadsheet,
  Paperclip
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { METAL_PRODUCTS, BASES_LIST, COMPANY_CONTACTS } from "./data/catalog";
import { getAssetPath } from "./utils";
import MetalCalculatorModal from "./components/MetalCalculatorModal";
import WeightReferenceTable from "./components/WeightReferenceTable";

export default function HomePage() {
  const [lang, setLang] = useState<"ru" | "ro">("ru");
  const [selectedBaseIndex, setSelectedBaseIndex] = useState<number>(0);
  const [activeCatalogTab, setActiveCatalogTab] = useState<string>("all");
  
  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [modalItemTitle, setModalItemTitle] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top button listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formNote, setFormNote] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Parallax Scroll Control (Smooth cinematic depth for base photo)
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  const handleOpenQuote = (title?: string) => {
    setModalItemTitle(title || (lang === "ru" ? "Запрос расчёта наличия и цен" : "Solicită ofertă de preț"));
    setIsQuoteModalOpen(true);
    setFormSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setFormSuccess(false);
      setFormName("");
      setFormPhone("");
      setFormNote("");
      setUploadedFile(null);
    }, 2800);
  };

  const activeBase = BASES_LIST[selectedBaseIndex];

  const filteredProducts = activeCatalogTab === "all"
    ? METAL_PRODUCTS
    : METAL_PRODUCTS.filter(p => p.category === activeCatalogTab);

  return (
    <div className="relative min-h-screen bg-[#f4f7f6] text-slate-900 overflow-x-hidden font-sans pb-20 sm:pb-0">
      
      {/* 1. TOP STATUS & SCHEDULE BAR */}
      <div className="bg-[#0b1713] text-slate-200 text-xs py-2 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-emerald-300 font-bold border border-emerald-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {lang === "ru" ? "3 металлобазы + Логистический Хаб" : "3 depozite + Hub logistic"}
            </span>

            <span className="text-slate-300">
              {lang === "ru" ? "Кишинёв: Пн–Пт 08:00–17:00" : "Chișinău: Lu–Vi 08:00–17:00"}
            </span>

            <span className="text-slate-300 border-l border-slate-700 pl-3">
              {lang === "ru" ? (
                <>Орхей: Пн–Пт 08:00–17:00 <span className="text-amber-400 font-semibold">(Суббота: 08:00–14:00)</span></>
              ) : (
                <>Orhei: Lu–Vi 08:00–17:00 <span className="text-amber-400 font-semibold">(Sâmbătă: 08:00–14:00)</span></>
              )}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setIsCalcModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold transition"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === "ru" ? "Калькулятор веса" : "Calculator"}</span>
            </button>

            <a href={COMPANY_CONTACTS.viberLink} className="hover:text-purple-300 flex items-center gap-1 transition">
              <span className="w-2 h-2 rounded-full bg-[#7360f2]"></span> Viber
            </a>

            {/* Language Switch */}
            <div className="flex items-center bg-black/50 rounded-lg border border-slate-700 p-0.5 ml-2">
              <button
                onClick={() => setLang("ru")}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                  lang === "ru" ? "bg-emerald-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLang("ro")}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                  lang === "ro" ? "bg-emerald-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                RO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center shrink-0">
            <div className="relative h-12 sm:h-14 w-44 sm:w-56 flex items-center transition hover:opacity-90">
              <Image
                src={getAssetPath("/images/logo/MZ_Logo_Dark_Green.png")}
                alt="Metalica Zuev Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-700 whitespace-nowrap">
            <a href="#catalog" className="hover:text-[#064e3b] transition py-1">
              {lang === "ru" ? "Сортамент" : "Produse"}
            </a>
            <button 
              onClick={() => setIsCalcModalOpen(true)}
              className="text-[#064e3b] hover:text-emerald-700 font-bold transition flex items-center gap-1.5 py-1"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === "ru" ? "Калькулятор" : "Calculator"}</span>
            </button>
            <a href="#company" className="hover:text-[#064e3b] transition py-1">
              {lang === "ru" ? "О компании" : "Despre noi"}
            </a>
            <a href="#service" className="hover:text-[#064e3b] transition py-1">
              {lang === "ru" ? "Сервис и резка" : "Servicii"}
            </a>
            <a href="#bases" className="hover:text-[#064e3b] transition py-1">
              {lang === "ru" ? "Металлобазы" : "Depozite"}
            </a>
            <a href="#quote-section" className="hover:text-[#064e3b] transition py-1">
              {lang === "ru" ? "Загрузить смету" : "Trimite deviz"}
            </a>
          </nav>

          {/* Phone & CTA */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <a
              href={`tel:${COMPANY_CONTACTS.phoneRaw}`}
              className="hidden lg:flex flex-col items-end text-right px-1 py-1 rounded hover:bg-slate-100 transition whitespace-nowrap"
            >
              <span className="text-[11px] text-[#064e3b] font-bold tracking-wide uppercase">
                {lang === "ru" ? "Отдел продаж" : "Departament vânzări"}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-mono whitespace-nowrap">
                {COMPANY_CONTACTS.phoneDisplay}
              </span>
            </a>

            <button
              onClick={() => setIsCalcModalOpen(true)}
              className="hidden md:flex bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition items-center gap-1.5 border border-slate-300"
            >
              <Calculator className="w-4 h-4 text-[#064e3b]" />
              <span>{lang === "ru" ? "Калькулятор" : "Calculator"}</span>
            </button>

            <button
              onClick={() => handleOpenQuote()}
              className="btn-bevel-green text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition transform active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>{lang === "ru" ? "Запросить расчёт" : "Cere Ofertă"}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-xl"
            >
              <a
                href="#catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 py-2 border-b border-slate-100"
              >
                {lang === "ru" ? "Сортамент металлопроката (450+ позиций)" : "Sortiment produse metalice"}
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalcModalOpen(true);
                }}
                className="w-full text-left text-sm font-bold text-[#064e3b] py-2 border-b border-slate-100 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>{lang === "ru" ? "B2B Металлокалькулятор (ГОСТ)" : "Calculator produse metalice"}</span>
              </button>
              <a
                href="#company"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 py-2 border-b border-slate-100"
              >
                {lang === "ru" ? "О компании Metalica Zuev" : "Despre Metalica Zuev"}
              </a>
              <a
                href="#service"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 py-2 border-b border-slate-100"
              >
                {lang === "ru" ? "Комплектация, резка, доставка" : "Servicii debitare și livrare"}
              </a>
              <a
                href="#bases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 py-2 border-b border-slate-100"
              >
                {lang === "ru" ? "3 Металлобазы и Логистический Хаб" : "Depozite Chișinău, Orhei, Sîngera"}
              </a>
              <a
                href="#quote-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 py-2"
              >
                {lang === "ru" ? "Загрузить смету на просчет" : "Trimite devizul"}
              </a>
              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_CONTACTS.phoneRaw}`}
                  className="w-full btn-bevel-green text-white font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 text-sm shadow"
                >
                  <Phone className="w-4 h-4" /> {COMPANY_CONTACTS.phoneDisplay}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION WITH DEEP CINEMATIC PARALLAX & REAL BASE SCALE PHOTO */}
      <section 
        ref={heroRef}
        className="relative min-h-[640px] lg:min-h-[780px] flex items-center bg-[#071813] text-white overflow-hidden border-b-4 border-[#064e3b]"
      >
        {/* PARALLAX REAL PHOTO OF THE METAL BASE (Smooth viewport lingering) */}
        <motion.div 
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src={getAssetPath("/images/real/hero_img_0065.jpg")}
            alt="Реальная металлобаза Metalica Zuev с козловым краном"
            fill
            className="object-cover object-center brightness-95 saturate-105"
            priority
          />
          {/* Enhanced gradient backdrop keeping photo vibrant and readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 sm:from-black/75 sm:via-black/45 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f4f7f6] via-[#f4f7f6]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {lang === "ru" 
                    ? "Более 30 лет на рынке Молдовы · Прямой импорт с заводов" 
                    : "Peste 30 de ani pe piața Moldovei · Import direct"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white drop-shadow-lg">
                {lang === "ru" ? (
                  <>
                    Металл для <br />
                    <span className="text-emerald-400 italic font-serif font-normal">больших планов.</span>
                  </>
                ) : (
                  <>
                    Metal pentru <br />
                    <span className="text-emerald-400 italic font-serif font-normal">planuri mari.</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-xl text-slate-100 max-w-2xl font-medium leading-relaxed drop-shadow">
                {lang === "ru"
                  ? "450+ позиций сертифицированного металлопроката в наличии. 3 открытые металлобазы и логистический хаб в Молдове. Комплектация заказов любой сложности, резка в размер и оперативная доставка."
                  : "Peste 450 de poziții în stoc permanent. 3 depozite metalice și hub logistic. Verificăm stocul, debităm la dimensiune și livrăm în toată Moldova."}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg pt-2 sm:pt-3 border-t border-white/30 text-white">
                <div>
                  <div className="text-xl sm:text-3xl font-black text-emerald-400 font-mono">30+</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-medium">{lang === "ru" ? "лет опыта" : "ani experiență"}</div>
                </div>
                <div className="border-l border-white/30 pl-3 sm:pl-4">
                  <div className="text-xl sm:text-3xl font-black text-emerald-400 font-mono">450+</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-medium">{lang === "ru" ? "позиций на складах" : "poziții în stoc"}</div>
                </div>
                <div className="border-l border-white/30 pl-3 sm:pl-4">
                  <div className="text-xl sm:text-3xl font-black text-emerald-400 font-mono">3 + 1</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-medium">{lang === "ru" ? "базы и хаб" : "depozite și hub"}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => handleOpenQuote()}
                  className="btn-bevel-green text-white font-black text-xs sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                  <span>{lang === "ru" ? "Запросить расчет наличия и цен" : "Solicită o ofertă"}</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setIsCalcModalOpen(true)}
                  className="bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-500/60 font-bold text-xs sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition backdrop-blur-md shadow-md"
                >
                  <Calculator className="w-4 h-4 text-emerald-300" />
                  <span>{lang === "ru" ? "Калькулятор веса" : "Calculator"}</span>
                </button>

                <a
                  href={`tel:${COMPANY_CONTACTS.phoneRaw}`}
                  className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/30 font-bold text-xs sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono">{COMPANY_CONTACTS.phoneDisplay}</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={COMPANY_CONTACTS.viberLink}
                    className="bg-[#7360f2] hover:bg-[#624ee0] text-white p-3.5 sm:p-4 rounded-xl flex items-center justify-center shadow-lg transition"
                    title="Viber"
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Express Card - Desktop Only (on mobile the base photo is completely visible, actions available in hero buttons & sticky bar) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4 bg-white/95 backdrop-blur-xl border border-slate-200 p-7 rounded-3xl shadow-2xl space-y-4 text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">
                    {lang === "ru" ? "Прямой расчет сметы" : "Calcul rapid deviz"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono font-bold">
                  {lang === "ru" ? "Ответ за 15 мин" : "15 minute"}
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">
                  {lang === "ru" ? "Отправьте список металла" : "Trimiteți lista de materiale"}
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  {lang === "ru"
                    ? "Укажите нужные позиции — дежурный менеджер проверит наличие на всех складах и сформирует расчет."
                    : "Lăsați numărul de telefon — managerul vă va contacta direct pentru ofertă."}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-2.5 pt-0.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ru" ? "Ваш телефон (+373 ...)" : "Telefonul dvs."}
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder={lang === "ru" ? "Что требуется? (напр.: 5 т арматуры 12 мм, профильная труба)" : "De exemplu: armătură 12 mm, 2 tone"}
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-bevel-green text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{lang === "ru" ? "Получить наличие и цены" : "Trimite solicitarea →"}</span>
                </button>
              </form>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#064e3b]" />
                <span>{lang === "ru" ? "Кишинёв: до 17:00 | Орхей (Сб): до 14:00" : "Program normal de lucru"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE B2B PRODUCT CATALOG */}
      <section id="catalog" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#064e3b] text-xs font-black uppercase tracking-wider bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#94d2bd]">
                <Layers className="w-4 h-4" />
                {lang === "ru" ? "Полный сортамент металла со склада" : "Sortiment complet de produse"}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {lang === "ru" ? (
                  <>Металлопрокат для вашего проекта, <br className="hidden sm:inline" /><span className="text-[#064e3b] font-serif italic font-normal">от одного поставщика.</span></>
                ) : (
                  <>Produse metalurgice pentru proiectul tău, <br className="hidden sm:inline" /><span className="text-[#064e3b] font-serif italic font-normal">de la un singur furnizor.</span></>
                )}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                {lang === "ru"
                  ? "450+ типоразмеров в постоянном наличии на металлобазах в Кишинёве и Орхее. Полный сортамент сертифицирован по ГОСТ и EN стандартам."
                  : "Spune-ne produsele și cantitățile necesare. Managerul va verifica stocul și va calcula comanda."}
              </p>
            </div>

            {/* Category Dropdown & Calc button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setIsCalcModalOpen(true)}
                className="bg-[#064e3b] hover:bg-[#047857] text-white text-sm font-bold rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Calculator className="w-4 h-4 text-emerald-300" />
                <span>{lang === "ru" ? "Калькулятор веса онлайн" : "Calculator masă"}</span>
              </button>

              <select
                value={activeCatalogTab}
                onChange={(e) => setActiveCatalogTab(e.target.value)}
                className="bg-white border-2 border-slate-300 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#064e3b] cursor-pointer shadow-sm"
              >
                <option value="all">{lang === "ru" ? "Все категории (450+ позиций)" : "Toate categoriile"}</option>
                <option value="armatura">{lang === "ru" ? "Арматура строительная" : "Armătură"}</option>
                <option value="pipes">{lang === "ru" ? "Трубы (профильные и круглые)" : "Țevi (profilate și rotunde)"}</option>
                <option value="sheets">{lang === "ru" ? "Листовой прокат (г/к, х/к, оцинк)" : "Tablă laminată și foi"}</option>
                <option value="shaped">{lang === "ru" ? "Фасонный прокат (Балка, Швеллер, Уголок)" : "Grinzi, Șpeler, Cornier"}</option>
              </select>
            </div>
          </div>

          {/* Heavy Metal Specification Plates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="metal-plate rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300"
              >
                {/* Plate Riveted Header */}
                <div className="bg-[#0f172a] text-white p-5 border-b-4 border-[#064e3b] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-mono font-bold tracking-wider uppercase">
                      {prod.code} · {prod.tag}
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight mt-0.5">
                      {lang === "ru" ? prod.title : prod.titleRo}
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                </div>

                {/* Body with Specs */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                  
                  <div>
                    <div className="text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-1">
                      {lang === "ru" ? prod.subtitle : prod.subtitleRo}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "ru" ? prod.desc : prod.descRo}
                    </p>
                  </div>

                  {/* Steel Specification Table */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                    {prod.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-start gap-2 border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                        <span className="text-slate-500 font-medium">{lang === "ru" ? sp.label : sp.labelRo}:</span>
                        <strong className="text-slate-900 font-mono text-right">{lang === "ru" ? sp.value : sp.valueRo}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleOpenQuote(`${lang === "ru" ? prod.title : prod.titleRo}`)}
                      className="flex-1 bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-4 h-4 text-emerald-200" />
                      <span>{lang === "ru" ? "Запросить цену" : "Ofertă"}</span>
                    </button>
                    
                    <button
                      onClick={() => setIsCalcModalOpen(true)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold p-3.5 rounded-xl border border-slate-300 transition"
                      title={lang === "ru" ? "Рассчитать вес по ГОСТу" : "Calculator masă"}
                    >
                      <Calculator className="w-4 h-4 text-[#064e3b]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Custom Spec Request Banner */}
          <div className="bg-[#0b1713] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-900">
            <div className="space-y-1 text-center sm:text-left max-w-2xl">
              <h4 className="text-xl font-bold text-white">
                {lang === "ru" ? "Нужна комплексная поставка по всей спецификации проекта?" : "Căutați alte dimensiuni sau profile specifice?"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {lang === "ru" 
                  ? "Соберём весь заказ (арматура, балки, трубы, лист, швеллер) на одной машине с доставкой на ваш объект." 
                  : "Avem peste 450 de poziții în depozitele din Chișinău și Orhei. Contactați managerul direct."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCalcModalOpen(true)}
                className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>{lang === "ru" ? "Калькулятор веса" : "Calculator"}</span>
              </button>
              <button
                onClick={() => handleOpenQuote()}
                className="btn-bevel-green text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-xl transition shrink-0 flex items-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === "ru" ? "Запросить общий расчет" : "Solicită ofertă completă"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4.75 WEIGHT REFERENCE TABLE (ENGINEERING HANDBOOK) */}
      <WeightReferenceTable lang={lang} onOpenCalc={() => setIsCalcModalOpen(true)} />

      {/* 4.5 ABOUT COMPANY SECTION (30+ YEARS EXPERIENCE, DIRECT IMPORT) */}
      <section id="company" className="py-16 sm:py-24 bg-[#0a1b15] text-white border-b border-emerald-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === "ru" ? "О компании Metalica Zuev" : "Despre Metalica Zuev"}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {lang === "ru" ? (
                  <>Более 30 лет фундаментальной <br /><span className="text-emerald-400 font-serif italic font-normal">надёжности в Молдове.</span></>
                ) : (
                  <>Peste 30 de ani de fiabilitate <br /><span className="text-emerald-400 font-serif italic font-normal">în Republica Moldova.</span></>
                )}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {lang === "ru" ? (
                  <>
                    <strong className="text-white font-bold">Metalica Zuev SRL</strong> — крупнейший поставщик чёрного металлопроката в Республике Молдова с 1989 года. Мы обеспечиваем металлом ключевые строительные холдинги, заводы, инфраструктурные проекты и частных застройщиков.
                  </>
                ) : (
                  <>
                    <strong className="text-white font-bold">Metalica Zuev SRL</strong> este cel mai mare furnizor de produse metalurgice din Republica Moldova din anul 1989. Asigurăm aprovizionarea continuă a marilor șantiere și companii de producție.
                  </>
                )}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {lang === "ru"
                  ? "Прямое сотрудничество с ведущими металлургическими комбинатами гарантирует честную толщину стенок, точный химический состав стали, строгое соответствие ГОСТ / EN стандартам и рекордный ассортимент из 450+ позиций в постоянном наличии на 3 складах."
                  : "Parteneriatele directe cu combinatele metalurgice garantează grosimea reală a metalului, certificate de calitate la fiecare lot și un sortiment de peste 450 de poziții în stoc."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">1989</div>
                  <div className="text-xs text-slate-300 font-medium">{lang === "ru" ? "Год основания" : "Anul fondării"}</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">450+</div>
                  <div className="text-xs text-slate-300 font-medium">{lang === "ru" ? "Позиций металла" : "Poziții în stoc"}</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 col-span-2 sm:col-span-1">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">3 + 1</div>
                  <div className="text-xs text-slate-300 font-medium">{lang === "ru" ? "Базы + Лог. Хаб" : "Depozite + Hub"}</div>
                </div>
              </div>
            </div>

            {/* Photo showing entire base without obstruction */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              <div className="relative h-64 sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-700/80 shadow-2xl">
                <Image
                  src={getAssetPath("/images/real/DSC00421.jpg")}
                  alt="Склад металлопроката Metalica Zuev"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold text-emerald-400 uppercase text-[11px]">Metalica Zuev SRL</span>
                <span className="text-slate-300 text-[11px]">{lang === "ru" ? "Склад сортового и фасонного проката" : "Depozit deschis"}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="service" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#064e3b] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#94d2bd] inline-block">
              {lang === "ru" ? "Комплексный сервис металлобазы" : "Furnizare completă"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {lang === "ru" ? (
                <>Комплектуем. Режем. <span className="text-[#064e3b] italic font-serif font-normal">Доставляем.</span></>
              ) : (
                <>Completăm. Debităm. <span className="text-[#064e3b] italic font-serif font-normal">Livrăm.</span></>
              )}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {lang === "ru"
                ? "Мы берем на себя полную подготовку металла к монтажу и доставку, чтобы ваша строительная площадка работала без задержек."
                : "Pregătim comanda conform specificației, debităm metalul și livrăm direct pe șantier."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-base shadow-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "ru" ? "Комплектация по ведомости" : "Completare comandă"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "ru"
                  ? "Соберём сборную партию из различных категорий (арматура + труба + лист + швеллер) на одной машине с точностью до килограмма."
                  : "Pregătim comanda completă conform specificației sau listei de materiale dintr-un singur loc."}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-base shadow-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "ru" ? "Высокоточная резка в размер" : "Debitare profesională"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "ru"
                  ? "Газовая, лентопильная и гильотинная резка по вашим чертежам. Готовые хлысты и заготовки сразу под монтаж."
                  : "Debităm metalul la dimensiunile cerute de proiect direct la depozit înainte de încărcare."}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-base shadow-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "ru" ? "Козловые краны 15т" : "Încărcare rapidă"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "ru"
                  ? "Все металлобазы оборудованы козловыми и мостовыми кранами для быстрой погрузки тяжелых длинномеров без очередей."
                  : "Toate depozitele sunt utilate cu macarale grele pentru încărcare fără cozi și întârzieri."}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-base shadow-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "ru" ? "Доставка по всей Молдове" : "Livrare în Moldova"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "ru"
                  ? "Собственный автопарк длинномеров (12м) и манипуляторов. Оперативная доставка в Кишинёв, Орхей, Бельцы и любые районы."
                  : "Livrăm în Chișinău și în orice localitate din Republica Moldova cu camioane proprii."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BASES & WAREHOUSES SECTION */}
      <section id="bases" className="py-16 sm:py-24 bg-[#081712] text-white border-b-4 border-[#064e3b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800 inline-block">
              {lang === "ru" ? "Сеть складов в Молдове" : "Depozitele noastre"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {lang === "ru" ? (
                <>Металл на складах, <span className="text-emerald-400 italic font-serif font-normal">ближе к вашей стройплощадке.</span></>
              ) : (
                <>Metal în stoc, <span className="text-emerald-400 italic font-serif font-normal">mai aproape de șantier.</span></>
              )}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {lang === "ru"
                ? "3 открытые металлобазы и логистический хаб с удобными заездами для тяжелого длинномерного транспорта."
                : "3 depozite metalice deschise și un hub logistic cu acces direct pentru transport greu."}
            </p>
          </div>

          {/* Bases Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BASES_LIST.map((base, idx) => {
              const isSelected = selectedBaseIndex === idx;
              return (
                <div
                  key={base.id}
                  onClick={() => setSelectedBaseIndex(idx)}
                  className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected 
                      ? "bg-[#0f2d23] border-emerald-400 ring-2 ring-emerald-500/40 shadow-xl" 
                      : "bg-[#0b1b15] border-emerald-900/60 hover:border-emerald-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider">
                        {base.city}
                      </span>
                      {base.isSaturdayOpen && (
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                          {lang === "ru" ? "Сб: 08:00–14:00" : "Sâ: 08:00–14:00"}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {lang === "ru" ? base.title : base.titleRo}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{lang === "ru" ? base.address : base.addressRo}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1">
                      {lang === "ru" ? base.hours : base.hoursRo}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/60">
                    <a
                      href={base.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition"
                    >
                      <span>{lang === "ru" ? "Открыть карту и маршрут" : "Deschide harta"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Base Detailed Showcase */}
          <div className="bg-[#0b1f18] border border-emerald-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                  <Warehouse className="w-3.5 h-3.5" />
                  <span>{lang === "ru" ? activeBase.type : activeBase.typeRo}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {lang === "ru" ? activeBase.title : activeBase.titleRo}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {lang === "ru" ? activeBase.desc : activeBase.descRo}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    {lang === "ru" ? "Оснащение площадки:" : "Dotări și capacități:"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(lang === "ru" ? activeBase.features : activeBase.featuresRo).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a
                    href={activeBase.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-bevel-green text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{lang === "ru" ? "Маршрут в Google Maps" : "Navigare Google Maps"}</span>
                  </a>

                  <a
                    href={`tel:${activeBase.phoneRaw || COMPANY_CONTACTS.phoneRaw}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition border border-white/20"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono">{activeBase.phone || COMPANY_CONTACTS.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* REAL PHOTO OF THIS EXACT BASE */}
              <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-emerald-700 shadow-2xl">
                <Image
                  src={getAssetPath(activeBase.image)}
                  alt={activeBase.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
                  <span>{lang === "ru" ? activeBase.address : activeBase.addressRo}</span>
                  <span className="text-emerald-400">{activeBase.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEAD CAPTURE SPECIFICATION UPLOAD FORM WITH FILE ATTACHMENT */}
      <section id="quote-section" className="py-16 sm:py-24 bg-[#f1f5f9] text-slate-900 border-b border-slate-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4f0] text-[#064e3b] text-xs font-black uppercase tracking-wider border border-[#94d2bd]">
                <FileText className="w-3.5 h-3.5" />
                {lang === "ru" ? "Прямой расчет сметы" : "Calcul rapid al devizului"}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {lang === "ru" ? "Отправьте смету или список — мы перезвоним" : "Trimiteți devizul sau lista — vă contactăm rapid."}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {lang === "ru"
                  ? "Прикрепите файл сметы (Excel, PDF) или укажите нужные позиции. Менеджер свяжется для подтверждения наличия на складе."
                  : "Atașați fișierul devizului (Excel, PDF) sau lista de materiale. Managerul vă va confirma stocul."}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl mx-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ru" ? "Ваше имя / Компания" : "Numele tău"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === "ru" ? "Как к вам обращаться" : "Cum să ne adresăm"}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ru" ? "Телефон (для связи в Viber)" : "Telefon (Viber)"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="+373 __ ___ ___"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ru" ? "Что вам требуется (список позиций)" : "De ce ai nevoie (opțional)"}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === "ru" ? "Например: 5 тонн арматуры 12 мм, 200 м профильной трубы 40х20..." : "De exemplu: armătură de 12 mm, 2 tone"}
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              {/* FILE ATTACHMENT / DROPZONE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ru" ? "Прикрепить файл сметы / чертеж / фото списка (опционально):" : "Atașează deviz / schiță / poză listă (opțional):"}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                  className="hidden"
                />
                
                {uploadedFile ? (
                  <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold">
                      <FileSpreadsheet className="w-5 h-5 text-[#064e3b]" />
                      <span className="truncate max-w-[240px]">{uploadedFile.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({Math.round(uploadedFile.size / 1024)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="text-rose-600 hover:text-rose-800 p-1 font-bold"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#064e3b] bg-slate-50 hover:bg-slate-100/80 rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 text-xs text-slate-600"
                  >
                    <UploadCloud className="w-6 h-6 text-[#064e3b]" />
                    <span className="font-bold text-slate-800">
                      {lang === "ru" ? "Нажмите для выбора файла (Excel, PDF, JPG, DWG)" : "Click pentru a atașa fișier (Excel, PDF, JPG)"}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {lang === "ru" ? "или сделайте фото чертежа / спецификации на смартфон" : "sau faceți o poză a schiței de pe telefon"}
                    </span>
                  </div>
                )}
              </div>

              {/* Direct Viber quick send alternative */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={COMPANY_CONTACTS.viberLink}
                  className="flex-1 bg-[#7360f2]/15 hover:bg-[#7360f2]/25 text-[#7360f2] border border-[#7360f2]/40 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === "ru" ? "Скинуть смету сразу в Viber" : "Trimite pe Viber"}</span>
                </a>
              </div>

              <button
                type="submit"
                className="w-full btn-bevel-green text-white font-black text-base py-4 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{lang === "ru" ? "Запросить расчёт наличия и цен →" : "Solicită ofertă de preț →"}</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                {lang === "ru" ? "После отправки менеджер подготовит расчет и свяжется с вами." : "După trimitere managerul vă va contacta pentru detalii."}
              </p>

              {formSuccess && (
                <div className="p-4 bg-emerald-100 border border-emerald-500 text-emerald-900 rounded-xl text-center text-sm font-bold animate-fade-in">
                  {lang === "ru" ? "✓ Заявка успешно отправлена! Менеджер свяжется с вами." : "✓ Solicitarea a fost trimisă cu succes!"}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER WITH FULL VISIBILITY & LARGE HORIZONTAL LOGO */}
      <footer className="bg-[#0b1713] text-slate-300 text-xs pt-12 pb-28 sm:pb-12 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-900/60">
            
            {/* Full Horizontal Logo in Footer */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative h-12 w-48 sm:w-56 flex items-center">
                <Image
                  src={getAssetPath("/images/logo/MZ_Logo_Dark_Green.png")}
                  alt="Metalica Zuev Logo"
                  fill
                  className="object-contain object-center md:object-left"
                />
              </div>
              <p className="text-[11px] text-slate-400 text-center md:text-left max-w-sm">
                {lang === "ru" 
                  ? "Крупнейший поставщик сертифицированного чёрного металлопроката в Молдове с 1989 года." 
                  : "Cel mai mare furnizor de produse metalurgice din Republica Moldova din 1989."}
              </p>
            </div>

            {/* Direct Contacts in Footer */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
              <div className="space-y-1">
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  {lang === "ru" ? "Отдел продаж (Кишинёв & Молдова)" : "Vânzări"}
                </div>
                <a 
                  href={`tel:${COMPANY_CONTACTS.phoneRaw}`} 
                  className="font-mono text-base sm:text-lg font-black text-white hover:text-emerald-400 transition"
                >
                  {COMPANY_CONTACTS.phoneDisplay}
                </a>
              </div>

              <div className="space-y-1 sm:border-l sm:border-emerald-900/60 sm:pl-6">
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  {lang === "ru" ? "Металлобаза Орхей" : "Depozit Orhei"}
                </div>
                <a 
                  href="tel:+37323580008" 
                  className="font-mono text-base sm:text-lg font-black text-white hover:text-emerald-400 transition"
                >
                  0235 80 008
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 1989–{new Date().getFullYear()} Metalica Zuev SRL. {lang === "ru" ? "Все права защищены." : "Toate drepturile rezervate."}
            </div>
            <div>
              {lang === "ru" ? "Кишинёв (ул. Индустриальная 48, ул. Транснистрия 3A) · Орхей (ул. Унирий 49D) · Сынжера" : "Chișinău · Orhei · Sîngera"}
            </div>
          </div>
        </div>
      </footer>

      {/* 9. MOBILE STICKY CALL / ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#081b15]/95 border-t border-emerald-800 p-2.5 sm:hidden shadow-2xl flex items-center justify-around gap-2 backdrop-blur-lg">
        <a
          href={`tel:${COMPANY_CONTACTS.phoneRaw}`}
          className="flex-1 btn-bevel-green text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{lang === "ru" ? "Позвонить" : "Sună"}</span>
        </a>
        <button
          onClick={() => setIsCalcModalOpen(true)}
          className="bg-emerald-900 border border-emerald-700 text-emerald-300 p-2.5 rounded-xl flex items-center justify-center shadow"
          title="Калькулятор"
        >
          <Calculator className="w-4 h-4" />
        </button>
        <a
          href={COMPANY_CONTACTS.viberLink}
          className="bg-[#7360f2] text-white p-2.5 px-4 rounded-xl flex items-center justify-center shadow gap-1 text-xs font-bold"
          title="Viber"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Viber</span>
        </a>
        <button
          onClick={() => handleOpenQuote()}
          className="flex-1 bg-white border border-slate-300 text-slate-900 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"
        >
          <FileText className="w-4 h-4 text-[#064e3b]" />
          <span>{lang === "ru" ? "Расчёт" : "Ofertă"}</span>
        </button>
      </div>

      {/* 10. SCROLL TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 bg-[#064e3b] hover:bg-[#047857] text-white p-3 sm:p-3.5 rounded-full shadow-2xl border-2 border-emerald-400 flex items-center justify-center transition"
            title={lang === "ru" ? "Наверх" : "Sus"}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 11. MODAL: QUOTE REQUEST WITH ATTACHMENT */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 space-y-5"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#064e3b] uppercase tracking-wider bg-[#e6f4f0] px-2.5 py-0.5 rounded">
                  {lang === "ru" ? "Запрос расчёта наличия и цен" : "Cerere ofertă de preț"}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {modalItemTitle}
                </h3>
                <p className="text-xs text-slate-600">
                  {lang === "ru"
                    ? "Укажите контактный телефон. Менеджер свяжется для подтверждения наличия на складе."
                    : "Lăsați un număr de contact pentru verificarea stocului și oferta de preț."}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "ru" ? "Ваше имя" : "Nume"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ru" ? "Иван / Представитель компании" : "Numele dvs."}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "ru" ? "Телефон (для связи)" : "Telefon (Viber / WhatsApp)"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+373 __ ___ ___"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "ru" ? "Требуемый объем / комментарий" : "Detalii cantitate"}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={lang === "ru" ? "Пример: 3 тонны арматуры 12 мм, порезка..." : "Cantitate necesară..."}
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                {/* Upload attachment in modal */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "ru" ? "Прикрепить смету / фото списка:" : "Atașează deviz / poză:"}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
                    className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#e6f4f0] file:text-[#064e3b] hover:file:bg-[#d0ece3] cursor-pointer w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-bevel-green text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition"
                >
                  {lang === "ru" ? "Отправить заявку на расчёт" : "Trimite solicitarea"}
                </button>

                {formSuccess && (
                  <div className="p-3 bg-emerald-100 border border-emerald-500 text-emerald-900 text-xs font-bold rounded-lg text-center animate-fade-in">
                    {lang === "ru" ? "✓ Запрос отправлен! Менеджер ответит в течение 15 минут." : "✓ Solicitare trimisă cu succes!"}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 12. MODAL: B2B METAL CALCULATOR */}
      <MetalCalculatorModal
        isOpen={isCalcModalOpen}
        onClose={() => setIsCalcModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}
