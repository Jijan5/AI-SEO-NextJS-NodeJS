"use client";

import { Coins, Zap, ArrowRight, Activity, CalendarDays } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER & BALANCE ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">AI Credits</h1>
          <p className="text-slate-500 dark:text-slate-400">Monitor your API usage and purchase top-ups for mass generation.</p>
        </div>
      </div>

      {/* ── DASHBOARD WIDGETS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-navy-900 to-[#0A1628] rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 text-white">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Coins className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-xs mb-4">
              <Zap className="w-4 h-4" /> Current Balance
            </div>
            <div className="text-6xl font-black tracking-tight mb-2">4,950</div>
            <div className="text-slate-400 font-medium">out of 5,000 monthly credits</div>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-teal-400">99% Remaining</span>
                <span className="text-slate-400">Resets in 12 Days</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full w-[99%] shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Top-Up Card */}
        <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Need More Power?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Instantly add credits to your account for massive campaigns.</p>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-slate-200 dark:border-white/10 hover:border-teal-500 dark:hover:border-teal-500 transition-colors group">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-slate-400 group-hover:text-teal-500" />
                  <span className="font-bold text-slate-900 dark:text-white">+ 5,000</span>
                </div>
                <span className="font-bold text-teal-600 dark:text-teal-400">$49</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-slate-200 dark:border-white/10 hover:border-amber-500 dark:hover:border-amber-500 transition-colors group">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                  <span className="font-bold text-slate-900 dark:text-white">+ 25,000</span>
                </div>
                <span className="font-bold text-amber-600 dark:text-amber-400">$199</span>
              </button>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-teal-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
            Checkout via PayPal
          </button>
        </div>
      </div>

      {/* ── USAGE LOG ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-500" /> Recent Usage Log
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Campaign / Action</th>
                <th className="px-4 py-3 text-right">Credits Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm text-slate-600 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-400" /> Today, 10:42 AM
                </td>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Q3 Coffee Reviews (50 Articles)</td>
                <td className="px-4 py-3 text-right font-bold text-red-500">- 50</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-400" /> Oct 12, 2:15 PM
                </td>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">B2B SaaS 2026 (Manual Edit)</td>
                <td className="px-4 py-3 text-right font-bold text-red-500">- 1</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-400" /> Oct 10, 9:00 AM
                </td>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Monthly Plan Renewal</td>
                <td className="px-4 py-3 text-right font-bold text-teal-500">+ 5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
