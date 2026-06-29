"use client";

import { useState } from "react";
import { Crosshair, Search, ShieldAlert, TrendingUp, Link as LinkIcon, BarChart3, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CompetitorSpyPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasResults(true);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
          <Crosshair className="w-8 h-8 text-rose-500" /> Competitor Spy
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Extract high-ranking keywords from any competitor URL and instantly build a campaign to outrank them.</p>
      </div>

      {/* ── SCANNER INPUT ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
        
        <form onSubmit={handleScan} className="relative z-10">
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Target URL</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="url" 
                placeholder="https://competitor.com/blog/best-espresso-machines" 
                className="w-full bg-slate-50 dark:bg-[#0A1628] border-2 border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isScanning}
              className="bg-rose-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-rose-600 transition-colors shadow-[0_0_30px_rgba(244,63,94,0.3)] disabled:opacity-70 flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isScanning ? (
                <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Extracting...</>
              ) : (
                <><Search className="w-5 h-5" /> Analyze URL</>
              )}
            </button>
          </div>
        </form>

        {isScanning && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-4">
              <ShieldAlert className="w-5 h-5 animate-pulse" /> Bypassing Cloudflare...
            </div>
            <div className="w-full max-w-md mx-auto h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 w-1/2 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        )}
      </div>

      {/* ── RESULTS ── */}
      {hasResults && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">12,400</div>
                <div className="text-sm font-medium text-slate-500">Est. Monthly Traffic</div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">48</div>
                <div className="text-sm font-medium text-slate-500">Ranking Keywords</div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">2,450</div>
                <div className="text-sm font-medium text-slate-500">Word Count (Thin Content)</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Extracted Keywords</h2>
                <p className="text-sm text-slate-500">Select keywords to automatically generate 3,000+ word "Skyscraper" articles.</p>
              </div>
              <button className="bg-teal-500 text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)] flex items-center gap-2">
                Launch Skyscraper <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded text-teal-500 focus:ring-teal-500" defaultChecked /></th>
                    <th className="px-6 py-4">Keyword</th>
                    <th className="px-6 py-4">Volume</th>
                    <th className="px-6 py-4">Current Pos.</th>
                    <th className="px-6 py-4">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm text-slate-600 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] bg-teal-50/50 dark:bg-teal-500/5">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded text-teal-500 focus:ring-teal-500" defaultChecked /></td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">best espresso machine for home</td>
                    <td className="px-6 py-4 font-medium">18,000</td>
                    <td className="px-6 py-4"><span className="text-rose-500 font-bold">#2</span></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 uppercase">Medium</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded text-teal-500 focus:ring-teal-500" /></td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">breville barista express review</td>
                    <td className="px-6 py-4 font-medium">9,200</td>
                    <td className="px-6 py-4"><span className="text-slate-500 font-bold">#5</span></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 uppercase">Easy</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] bg-teal-50/50 dark:bg-teal-500/5">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded text-teal-500 focus:ring-teal-500" defaultChecked /></td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">home espresso setup under 500</td>
                    <td className="px-6 py-4 font-medium">4,100</td>
                    <td className="px-6 py-4"><span className="text-slate-500 font-bold">#8</span></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 uppercase">Easy</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
