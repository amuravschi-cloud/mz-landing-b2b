"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  X, 
  Plus, 
  Trash2, 
  Send, 
  MessageSquare, 
  Info, 
  Layers, 
  Scale, 
  ArrowRightLeft,
  CheckCheck,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  METAL_CALC_CATEGORIES, 
  CALC_DISCLAIMER_RU, 
  CALC_DISCLAIMER_RO,
  MetalCategoryInfo 
} from "../data/metal_calc_data";
import { COMPANY_CONTACTS } from "../data/catalog";

interface CalculatedItem {
  id: string;
  categoryName: string;
  sizeLabel: string;
  lengthOrArea: number;
  weightKg: number;
  weightTons: number;
  pieces?: number;
  unit: "meter" | "sqm";
}

interface MetalCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ru" | "ro";
}

export default function MetalCalculatorModal({ isOpen, onClose, lang }: MetalCalculatorModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>("armatura");
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(3); // default Ø12 mm
  const [calcMode, setCalcMode] = useState<"lengthToWeight" | "weightToLength" | "piecesToWeight">("lengthToWeight");
  
  // Inputs
  const [inputLength, setInputLength] = useState<string>("100");
  const [inputWeightTons, setInputWeightTons] = useState<string>("1.5");
  const [inputPieces, setInputPieces] = useState<string>("50");
  const [customPieceLength, setCustomPieceLength] = useState<string>("11.7");

  // Multi-item Specification Cart
  const [itemsList, setItemsList] = useState<CalculatedItem[]>([]);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentCategory: MetalCategoryInfo = METAL_CALC_CATEGORIES.find(c => c.id === selectedCatId) || METAL_CALC_CATEGORIES[0];
  const currentSize = currentCategory.sizes[selectedSizeIndex] || currentCategory.sizes[0];

  // Calculation Logic
  const unitWeight = currentSize.weightPerUnit; // kg per meter or kg per m2
  const standardLen = currentSize.defaultLength || 11.7;

  let computedLength = 0;
  let computedWeightKg = 0;
  let computedWeightTons = 0;
  let computedPieces = 0;

  if (calcMode === "lengthToWeight") {
    const len = parseFloat(inputLength) || 0;
    computedLength = len;
    computedWeightKg = len * unitWeight;
    computedWeightTons = computedWeightKg / 1000;
    if (standardLen > 0) {
      computedPieces = Math.round((len / standardLen) * 10) / 10;
    }
  } else if (calcMode === "weightToLength") {
    const tons = parseFloat(inputWeightTons) || 0;
    const kg = tons * 1000;
    computedWeightKg = kg;
    computedWeightTons = tons;
    if (unitWeight > 0) {
      computedLength = kg / unitWeight;
      if (standardLen > 0) {
        computedPieces = Math.round((computedLength / standardLen) * 10) / 10;
      }
    }
  } else if (calcMode === "piecesToWeight") {
    const pcs = parseFloat(inputPieces) || 0;
    const pLen = parseFloat(customPieceLength) || standardLen;
    computedPieces = pcs;
    computedLength = pcs * pLen;
    computedWeightKg = computedLength * unitWeight;
    computedWeightTons = computedWeightKg / 1000;
  }

  const handleAddItem = () => {
    const newItem: CalculatedItem = {
      id: Math.random().toString(36).substring(2, 9),
      categoryName: lang === "ru" ? currentCategory.name : currentCategory.nameRo,
      sizeLabel: lang === "ru" ? currentSize.label : currentSize.labelRo,
      lengthOrArea: Math.round(computedLength * 100) / 100,
      weightKg: Math.round(computedWeightKg * 10) / 10,
      weightTons: Math.round(computedWeightTons * 1000) / 1000,
      pieces: computedPieces > 0 ? computedPieces : undefined,
      unit: currentCategory.unit
    };

    setItemsList(prev => [...prev, newItem]);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleRemoveItem = (id: string) => {
    setItemsList(prev => prev.filter(i => i.id !== id));
  };

  const handleClearAll = () => {
    setItemsList([]);
  };

  const totalTons = itemsList.reduce((acc, item) => acc + item.weightTons, 0);

  // Generate Viber share URL with prefilled text
  const generateViberText = () => {
    let msg = lang === "ru" 
      ? `Здравствуйте! Прошу уточнить наличие и расчет по следующей спецификации:\n\n`
      : `Bună ziua! Vă rog să verificați stocul și disponibilitatea pentru:\n\n`;

    if (itemsList.length > 0) {
      itemsList.forEach((it, idx) => {
        msg += `${idx + 1}. ${it.categoryName} (${it.sizeLabel}): ${it.lengthOrArea} ${it.unit === "meter" ? (lang === "ru" ? "м" : "m") : "м²"} (~${it.weightTons} т / ${it.weightKg} кг)\n`;
      });
      msg += `\nОбщий расчетный вес: ~${Math.round(totalTons * 1000) / 1000} т.`;
    } else {
      msg += `${lang === "ru" ? currentCategory.name : currentCategory.nameRo} (${currentSize.label}): ${Math.round(computedLength)} ${currentCategory.unit === "meter" ? "м" : "м²"} (~${Math.round(computedWeightTons * 1000) / 1000} т)`;
    }

    return encodeURIComponent(msg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* MODAL HEADER */}
        <div className="bg-[#091a14] text-white px-6 py-5 border-b-2 border-emerald-600 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#064e3b] border border-emerald-500/50 flex items-center justify-center text-emerald-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {lang === "ru" ? "B2B Металлокалькулятор" : "Calculator produse metalice"}
                </h2>
                <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-2 py-0.5 rounded">
                  ГОСТ / EN
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === "ru" 
                  ? "Точный расчет теоретического веса, метража и тоннажа по ГОСТу" 
                  : "Calculul masei teoretice, lungimii și tonajului conform GOST / EN"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY (Scrollable) */}
        <div className="p-4 sm:p-7 space-y-6 overflow-y-auto flex-1 text-slate-900">
          
          {/* STEP 1: SELECT CATEGORY & SIZE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#064e3b]" />
                <span>{lang === "ru" ? "1. Вид металлопроката:" : "1. Categorie produs:"}</span>
              </label>
              <select
                value={selectedCatId}
                onChange={(e) => {
                  setSelectedCatId(e.target.value);
                  setSelectedSizeIndex(0);
                }}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
              >
                {METAL_CALC_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {lang === "ru" ? cat.name : cat.nameRo}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#064e3b]" />
                <span>{lang === "ru" ? "2. Типоразмер (сечение / толщина):" : "2. Dimensiune / Grosime:"}</span>
              </label>
              <select
                value={selectedSizeIndex}
                onChange={(e) => setSelectedSizeIndex(parseInt(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
              >
                {currentCategory.sizes.map((sz, idx) => (
                  <option key={idx} value={idx}>
                    {lang === "ru" ? sz.label : sz.labelRo} — ({sz.weightPerUnit} кг/{currentCategory.unit === "meter" ? "м" : "м²"})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* STANDARDS INFO BADGE */}
          <div className="bg-[#e6f4f0] border border-[#94d2bd] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-[#064e3b]">
            <div className="font-semibold flex items-center gap-1.5">
              <span className="font-bold">{lang === "ru" ? "Стандарт:" : "Standard:"}</span> {currentCategory.gost}
            </div>
            <div className="font-mono font-bold text-slate-800">
              {lang === "ru" ? "Теор. вес:" : "Masă teor.:"} <span className="text-[#064e3b]">{currentSize.weightPerUnit} кг / {currentCategory.unit === "meter" ? (lang === "ru" ? "пог.м" : "m.lin") : "м²"}</span>
            </div>
          </div>

          {/* STEP 2: CALCULATION DIRECTION MODE */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              {lang === "ru" ? "3. Направление расчёта:" : "3. Direcția de calcul:"}
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCalcMode("lengthToWeight")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  calcMode === "lengthToWeight"
                    ? "bg-[#064e3b] text-white border-[#064e3b] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{currentCategory.unit === "meter" ? (lang === "ru" ? "Метры → Вес" : "Metri → Masă") : (lang === "ru" ? "Площадь м² → Вес" : "Suprafață m² → Masă")}</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcMode("weightToLength")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  calcMode === "weightToLength"
                    ? "bg-[#064e3b] text-white border-[#064e3b] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{lang === "ru" ? "Тонны → Длина/Метраж" : "Tone → Metri"}</span>
              </button>

              {currentCategory.unit === "meter" && (
                <button
                  type="button"
                  onClick={() => setCalcMode("piecesToWeight")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                    calcMode === "piecesToWeight"
                      ? "bg-[#064e3b] text-white border-[#064e3b] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{lang === "ru" ? "Штуки (хлысты) → Вес" : "Bucăți (bare) → Masă"}</span>
                </button>
              )}
            </div>
          </div>

          {/* STEP 3: INPUT VALUE & LIVE RESULT DISPLAY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Input Side */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
              {calcMode === "lengthToWeight" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentCategory.unit === "meter" 
                      ? (lang === "ru" ? "Укажите длину (метры):" : "Introduceți lungimea (metri):")
                      : (lang === "ru" ? "Укажите площадь (м²):" : "Introduceți suprafața (m²):")}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={inputLength}
                      onChange={(e) => setInputLength(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-500">
                      {currentCategory.unit === "meter" ? (lang === "ru" ? "м.п." : "m") : "м²"}
                    </span>
                  </div>
                </div>
              )}

              {calcMode === "weightToLength" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "ru" ? "Укажите требуемый вес (в тоннах):" : "Introduceți masa (în tone):"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={inputWeightTons}
                      onChange={(e) => setInputWeightTons(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-500">
                      {lang === "ru" ? "тонн" : "tone"}
                    </span>
                  </div>
                </div>
              )}

              {calcMode === "piecesToWeight" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === "ru" ? "Количество штук:" : "Număr bucăți:"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={inputPieces}
                      onChange={(e) => setInputPieces(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === "ru" ? "Длина 1 хлыста (м):" : "Lungime 1 bară (m):"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={customPieceLength}
                      onChange={(e) => setCustomPieceLength(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>
                </div>
              )}

              {/* Add to Specification Cart Button */}
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full btn-bevel-green text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow transition transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === "ru" ? "Добавить позицию в сводный расчет" : "Adaugă în specificație"}</span>
              </button>

              {addedNotice && (
                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 p-2 rounded-lg text-center animate-fade-in flex items-center justify-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{lang === "ru" ? "Позиция добавлена в список ниже!" : "Adăugat cu succes în listă!"}</span>
                </div>
              )}
            </div>

            {/* Calculated Result Display Card */}
            <div className="lg:col-span-6 bg-[#081b15] text-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-600 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {lang === "ru" ? "Результат расчёта:" : "Rezultat calcul:"}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentSize.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">{lang === "ru" ? "Теоретический вес" : "Masă teoretică"}</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {Math.round(computedWeightTons * 1000) / 1000} <span className="text-sm font-sans font-bold text-white">{lang === "ru" ? "тонн" : "t"}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">
                    (~{Math.round(computedWeightKg)} {lang === "ru" ? "кг" : "kg"})
                  </div>
                </div>

                <div className="border-l border-emerald-900/80 pl-4">
                  <div className="text-[11px] text-slate-400 font-medium">{currentCategory.unit === "meter" ? (lang === "ru" ? "Общий метраж" : "Lungime totală") : (lang === "ru" ? "Общая площадь" : "Suprafață")}</div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {Math.round(computedLength * 10) / 10} <span className="text-sm font-sans font-bold text-emerald-400">{currentCategory.unit === "meter" ? (lang === "ru" ? "м" : "m") : "м²"}</span>
                  </div>
                  {computedPieces > 0 && currentCategory.unit === "meter" && (
                    <div className="text-xs text-slate-300 font-mono mt-0.5">
                      (~{computedPieces} {lang === "ru" ? "хлыстов" : "bare"} {standardLen}м)
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-900 flex items-center justify-between text-xs">
                <span className="text-slate-400">{lang === "ru" ? "Склад отгрузки:" : "Depozit:"}</span>
                <span className="text-emerald-300 font-bold">{lang === "ru" ? "Кишинёв (2 базы) / Орхей" : "Chișinău / Orhei"}</span>
              </div>
            </div>

          </div>

          {/* STEP 4: SUMMARY SPECIFICATION TABLE (If items added) */}
          {itemsList.length > 0 && (
            <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"></span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {lang === "ru" ? "Сводный расчёт спецификации" : "Specificație calculată"} ({itemsList.length})
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === "ru" ? "Очистить всё" : "Șterge tot"}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-200 max-h-48 overflow-y-auto">
                {itemsList.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <strong className="text-slate-900">{idx + 1}. {item.categoryName}</strong>
                      <div className="text-slate-600 font-mono">
                        {item.sizeLabel} — {item.lengthOrArea} {item.unit === "meter" ? (lang === "ru" ? "м" : "m") : "м²"} {item.pieces ? `(~${item.pieces} шт)` : ""}
                      </div>
                    </div>
                    
                    <div className="text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.weightTons} т <span className="text-[11px] text-slate-500 font-normal">({item.weightKg} кг)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Total */}
              <div className="pt-3 border-t-2 border-slate-300 flex items-center justify-between text-sm font-black text-slate-900">
                <span>{lang === "ru" ? "ИТОГО расчетный вес:" : "TOTAL masă estimată:"}</span>
                <span className="text-base text-[#064e3b] font-mono">
                  ~{Math.round(totalTons * 1000) / 1000} {lang === "ru" ? "тонн" : "tone"}
                </span>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS: SEND TO VIBER OR REQUEST AVAILABILITY */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`viber://chat?number=%2B37368471530&draft=${generateViberText()}`}
              className="flex-1 bg-[#7360f2] hover:bg-[#624ee0] text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === "ru" ? "Отправить расчёт дежурному в Viber" : "Trimite calculul pe Viber"}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                const elem = document.getElementById("quote-section");
                elem?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 btn-bevel-green text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>{lang === "ru" ? "Запросить наличие на складе" : "Verifică stocul în depozit"}</span>
            </button>
          </div>

          {/* MANDATORY LEGAL DISCLAIMER */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start gap-2.5 text-[11px] text-amber-900 leading-relaxed">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              {lang === "ru" ? CALC_DISCLAIMER_RU : CALC_DISCLAIMER_RO}
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
