"use client";

import React, { useState } from "react";
import { 
  Table, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Layers, 
  ExternalLink,
  Scale
} from "lucide-react";
import { 
  METAL_CALC_CATEGORIES, 
  CALC_DISCLAIMER_RU, 
  CALC_DISCLAIMER_RO 
} from "../data/metal_calc_data";

interface WeightReferenceTableProps {
  lang: "ru" | "ro";
  onOpenCalc: () => void;
}

export default function WeightReferenceTable({ lang, onOpenCalc }: WeightReferenceTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string>("armatura");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = METAL_CALC_CATEGORIES.find(c => c.id === selectedCatId) || METAL_CALC_CATEGORIES[0];

  const filteredSizes = activeCategory.sizes.filter(sz => {
    const q = searchQuery.toLowerCase();
    const label = (lang === "ru" ? sz.label : sz.labelRo).toLowerCase();
    return label.includes(q);
  });

  return (
    <section className="bg-slate-100 border-b border-slate-300 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ACCORDION TOGGLE HEADER */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border-2 border-slate-300 hover:border-[#064e3b] rounded-2xl p-5 sm:p-6 cursor-pointer shadow-sm transition flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-bold shrink-0 shadow">
              <Scale className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#064e3b] bg-[#e6f4f0] px-2 py-0.5 rounded">
                  {lang === "ru" ? "Инженерный справочник" : "Ghid ingineresc"}
                </span>
                <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">
                  ГОСТ / EN 10080 / EN 10219
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
                {lang === "ru" 
                  ? "Справочник теоретического веса металлопроката (Таблицы ГОСТ / EN)" 
                  : "Tabelul maselor teoretice pentru produse metalurgice (GOST / EN)"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-[#064e3b] hidden md:inline">
              {isOpen ? (lang === "ru" ? "Свернуть таблицы" : "Restrânge") : (lang === "ru" ? "Открыть справочник" : "Deschide tabelul")}
            </span>
            <div className="p-2 rounded-full bg-slate-100 text-slate-700">
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* EXPANDABLE BODY */}
        {isOpen && (
          <div className="mt-4 bg-white border-2 border-slate-300 rounded-3xl p-5 sm:p-8 shadow-xl space-y-6 animate-fade-in">
            
            {/* TOP CONTROLS: CATEGORY TABS & SEARCH */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {METAL_CALC_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setSearchQuery("");
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedCatId === cat.id
                        ? "bg-[#064e3b] text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {lang === "ru" ? cat.name.split("(")[0] : cat.nameRo.split("(")[0]}
                  </button>
                ))}
              </div>

              {/* Search & Calc trigger */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={lang === "ru" ? "Поиск размера (напр.: 12, 40х20)..." : "Căutare dimensiune..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <button
                  onClick={onOpenCalc}
                  className="btn-bevel-green text-white font-bold text-xs px-4 py-2 rounded-xl whitespace-nowrap shadow transition"
                >
                  {lang === "ru" ? "Калькулятор онлайн →" : "Calculator →"}
                </button>
              </div>
            </div>

            {/* CATEGORY INFO STRIP */}
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#064e3b]">
              <div>
                <strong className="font-black text-slate-900">{lang === "ru" ? activeCategory.name : activeCategory.nameRo}</strong>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {lang === "ru" ? "Действующий стандарт:" : "Standard aplicabil:"} <span className="font-mono font-bold text-slate-800">{activeCategory.gost}</span>
                </div>
              </div>
              <div className="font-mono text-[11px] font-bold text-slate-700">
                {lang === "ru" ? "Плотность стали:" : "Densitate oțel:"} 7.85 г/см³
              </div>
            </div>

            {/* WEIGHT REFERENCE TABLE */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0f172a] text-white font-bold uppercase text-[11px] tracking-wider">
                    <th className="p-3.5 pl-4">{lang === "ru" ? "Типоразмер / Сечение" : "Dimensiune / Secțiune"}</th>
                    <th className="p-3.5">{lang === "ru" ? "Теоретический вес" : "Masă teoretică"}</th>
                    <th className="p-3.5">{lang === "ru" ? "Метров в 1 тонне (прим.)" : "Metri per 1 tonă"}</th>
                    <th className="p-3.5">{lang === "ru" ? "Стандартная длина" : "Lungime standard"}</th>
                    <th className="p-3.5 pr-4 text-right">{lang === "ru" ? "Действие" : "Acțiune"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {filteredSizes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500 font-sans text-xs">
                        {lang === "ru" ? "По вашему запросу размеры не найдены." : "Niciun rezultat găsit."}
                      </td>
                    </tr>
                  ) : (
                    filteredSizes.map((sz, idx) => {
                      const weight = sz.weightPerUnit;
                      const metersPerTon = weight > 0 ? Math.round((1000 / weight) * 10) / 10 : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 pl-4 font-bold text-slate-900 font-sans">
                            {lang === "ru" ? sz.label : sz.labelRo}
                          </td>
                          <td className="p-3.5 text-[#064e3b] font-bold">
                            {weight} кг / {activeCategory.unit === "meter" ? (lang === "ru" ? "м.п." : "m.lin") : "м²"}
                          </td>
                          <td className="p-3.5 text-slate-700">
                            {activeCategory.unit === "meter" ? `~${metersPerTon} м` : `~${metersPerTon} м²`}
                          </td>
                          <td className="p-3.5 text-slate-600 font-sans">
                            {sz.defaultLength ? `${sz.defaultLength} м (мерная)` : "Листы / Бухты"}
                          </td>
                          <td className="p-3.5 pr-4 text-right">
                            <button
                              onClick={onOpenCalc}
                              className="text-[11px] font-sans font-bold text-[#064e3b] hover:text-emerald-700 underline"
                            >
                              {lang === "ru" ? "Рассчитать вес →" : "Calculează →"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* MANDATORY DISCLAIMER */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed font-sans">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                {lang === "ru" ? CALC_DISCLAIMER_RU : CALC_DISCLAIMER_RO}
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
