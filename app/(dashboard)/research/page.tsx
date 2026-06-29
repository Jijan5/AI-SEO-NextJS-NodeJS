"use client";

import { useState } from "react";
import { Map, Search, ArrowRight, Zap, Target, BookOpen, ShoppingCart, Info, Sparkles } from "lucide-react";

export default function KeywordMapperPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasResults(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER & SEARCH ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
            <Map className="w-8 h-8 text-teal-500" /> Keyword Mapper
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Discover and categorize hundreds of long-tail keywords instantly.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <form onSubmit={handleSearch} className="relative z-10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Enter a seed keyword (e.g., 'espresso machine')" 
              className="w-full bg-slate-50 dark:bg-[#0A1628] border-2 border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium shadow-inner"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="bg-teal-500 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <><span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span> Mapping...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Map</>
            )}
          </button>
        </form>
      </div>

      {/* ── KANBAN RESULTS ── */}
      {hasResults && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-500" /> Intent Clusters Found
            </h2>
            <button className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              Create Campaign <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Informational Column */}
            <div className="bg-slate-100/50 dark:bg-[#0D1F3C]/50 rounded-2xl p-4 border border-slate-200 dark:border-white/5 flex flex-col h-[600px]">
              <div className="flex items-center gap-2 mb-4 px-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Informational</h3>
                <span className="ml-auto text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">84 Keywords</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                <KeywordCard kw="how to use an espresso machine" vol="12.5k" kd="45" selected />
                <KeywordCard kw="what is 15 bar pump espresso" vol="8.2k" kd="32" selected />
                <KeywordCard kw="espresso machine cleaning guide" vol="4.1k" kd="28" />
                <KeywordCard kw="difference between espresso and coffee" vol="22k" kd="55" />
                <KeywordCard kw="how to descale breville barista" vol="9.6k" kd="41" />
              </div>
            </div>

            {/* Commercial Column */}
            <div className="bg-slate-100/50 dark:bg-[#0D1F3C]/50 rounded-2xl p-4 border border-slate-200 dark:border-white/5 flex flex-col h-[600px]">
              <div className="flex items-center gap-2 mb-4 px-2">
                <Info className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Commercial</h3>
                <span className="ml-auto text-xs font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md">42 Keywords</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                <KeywordCard kw="best espresso machine for beginners" vol="18k" kd="62" />
                <KeywordCard kw="breville vs delonghi espresso" vol="14k" kd="58" />
                <KeywordCard kw="top 10 home espresso machines 2026" vol="9.5k" kd="48" selected />
                <KeywordCard kw="best budget espresso machine under $200" vol="25k" kd="65" />
              </div>
            </div>

            {/* Transactional Column */}
            <div className="bg-slate-100/50 dark:bg-[#0D1F3C]/50 rounded-2xl p-4 border border-slate-200 dark:border-white/5 flex flex-col h-[600px]">
              <div className="flex items-center gap-2 mb-4 px-2">
                <ShoppingCart className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Transactional</h3>
                <span className="ml-auto text-xs font-bold bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 px-2 py-1 rounded-md">15 Keywords</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                <KeywordCard kw="buy breville barista express" vol="5.4k" kd="70" />
                <KeywordCard kw="delonghi magnifica s price" vol="3.2k" kd="55" />
                <KeywordCard kw="cheap espresso machine sale" vol="12k" kd="80" />
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function KeywordCard({ kw, vol, kd, selected = false }: any) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${selected ? 'bg-teal-50 dark:bg-teal-500/10 border-teal-500' : 'bg-white dark:bg-[#0A1628] border-transparent hover:border-slate-300 dark:hover:border-white/20 shadow-sm'}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className={`font-semibold text-sm leading-snug ${selected ? 'text-teal-900 dark:text-teal-100' : 'text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors'}`}>{kw}</h4>
        <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${selected ? 'bg-teal-500 border-teal-500 text-slate-900' : 'border-slate-300 dark:border-white/20'}`}>
          {selected && <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs font-medium">
        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400"><Search className="w-3 h-3" /> {vol} Vol</span>
        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400"><Target className="w-3 h-3" /> KD: {kd}</span>
      </div>
    </div>
  );
}
