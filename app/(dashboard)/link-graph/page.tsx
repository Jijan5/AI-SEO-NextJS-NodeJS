"use client";

import { Share2, Zap, Link as LinkIcon, AlertCircle, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function LinkGraphPage() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setIsOptimized(true);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
            <Share2 className="w-8 h-8 text-indigo-500" /> Internal Linker Engine
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Automatically analyze 500+ articles and build a perfect SEO silo structure.</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={isOptimizing || isOptimized}
          className="bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-600 transition-colors shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-70 disabled:shadow-none flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isOptimizing ? (
            <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Building Graph...</>
          ) : isOptimized ? (
            <><CheckCircle2 className="w-5 h-5" /> Silo Optimized</>
          ) : (
            <><Zap className="w-5 h-5" /> Auto-Interlink Everything</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── GRAPH VISUALIZATION ── */}
        <div className="lg:col-span-2 bg-slate-900 dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-3xl h-[600px] relative overflow-hidden shadow-2xl flex items-center justify-center">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          {isOptimizing && (
            <div className="absolute inset-0 bg-indigo-500/10 z-10 flex flex-col items-center justify-center backdrop-blur-[2px]">
              <Share2 className="w-16 h-16 text-indigo-400 animate-bounce mb-4" />
              <div className="text-white font-bold tracking-widest uppercase text-sm animate-pulse">Running Semantic Analysis...</div>
            </div>
          )}

          {/* Simulated Nodes */}
          <div className={`relative w-full h-full max-w-2xl max-h-[500px] transition-all duration-1000 ${isOptimized ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`}>
            
            {/* Center Node (Pillar) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-colors ${isOptimized ? 'bg-indigo-500' : 'bg-slate-800 border-2 border-indigo-500/50'}`}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <span className="absolute top-full mt-3 text-xs font-bold text-white whitespace-nowrap bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Pillar: Best Espresso Machines</span>
            </div>

            {/* Orbiting Node 1 */}
            <div className="absolute top-[15%] left-[20%] z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <span className="absolute top-full mt-2 text-[10px] font-bold text-slate-300 whitespace-nowrap">How to grind beans</span>
            </div>
            {/* SVG Line 1 */}
            <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
              <line x1="25%" y1="20%" x2="50%" y2="50%" stroke={isOptimized ? "#6366f1" : "#334155"} strokeWidth="2" className={isOptimized ? "animate-pulse" : ""} />
            </svg>

            {/* Orbiting Node 2 */}
            <div className="absolute top-[20%] right-[20%] z-20 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <span className="absolute top-full mt-2 text-[10px] font-bold text-slate-300 whitespace-nowrap">Breville Review</span>
            </div>
            {/* SVG Line 2 */}
            <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
              <line x1="75%" y1="25%" x2="50%" y2="50%" stroke={isOptimized ? "#6366f1" : "#334155"} strokeWidth="2" className={isOptimized ? "animate-pulse" : ""} />
            </svg>

            {/* Orbiting Node 3 */}
            <div className="absolute bottom-[20%] left-[30%] z-20 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                <FileText className="w-3 h-3 text-slate-400" />
              </div>
              <span className="absolute top-full mt-2 text-[10px] font-bold text-slate-300 whitespace-nowrap">Descale Machine</span>
            </div>
            {/* SVG Line 3 */}
            <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
              <line x1="32%" y1="78%" x2="50%" y2="50%" stroke={isOptimized ? "#6366f1" : "#334155"} strokeWidth="2" className={isOptimized ? "animate-pulse" : ""} />
            </svg>

             {/* Orbiting Node 4 */}
             <div className="absolute bottom-[25%] right-[25%] z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <span className="absolute top-full mt-2 text-[10px] font-bold text-slate-300 whitespace-nowrap">Tamping Guide</span>
            </div>
            {/* SVG Line 4 */}
            <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
              <line x1="72%" y1="72%" x2="50%" y2="50%" stroke={isOptimized ? "#6366f1" : "#334155"} strokeWidth="2" className={isOptimized ? "animate-pulse" : ""} />
            </svg>

          </div>
        </div>

        {/* ── STATS & OPPORTUNITIES ── */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Silo Health Score</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100 dark:text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className={`text-indigo-500 transition-all duration-1000 ${isOptimized ? 'stroke-[95]' : 'stroke-[45]'}`} strokeDasharray={isOptimized ? "95, 100" : "45, 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <span className="absolute text-xl font-black text-slate-900 dark:text-white">{isOptimized ? '95' : '45'}</span>
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{isOptimized ? 'Perfectly Linked' : 'Orphan Pages Detected'}</div>
                <div className="text-sm text-slate-500 mt-1">{isOptimized ? 'All articles are properly siloed.' : '45% of your articles have no incoming internal links.'}</div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Total Articles</span>
                <span className="font-bold text-slate-900 dark:text-white">124</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Internal Links</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{isOptimized ? '1,482' : '312'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Orphan Pages</span>
                <span className="font-bold text-rose-500">{isOptimized ? '0' : '68'}</span>
              </div>
            </div>
          </div>

          {!isOptimized && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" /> Optimization Needed
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-500 mb-4">
                You have significant SEO leakage. Click the Auto-Interlink button to let AI rewrite your articles to cross-link them semantically.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
