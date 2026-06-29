"use client";

import { useState } from "react";
import { ArrowLeft, Save, Sparkles, Wand2, CheckCircle2, ChevronRight, BarChart, Type, Layout, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function EditorPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState(`
# 10 Best Espresso Machines for Home Baristas (2026 Guide)

Finding the perfect espresso machine for your home kitchen can be a daunting task. With so many options on the market—from fully automatic super-machines to manual lever presses—it's easy to get overwhelmed. 

In this comprehensive guide, we'll break down the top 10 home espresso machines for 2026, comparing their features, price points, and the quality of the crema they produce.

## 1. The Breville Barista Express

The Barista Express remains the gold standard for entry-level home baristas. It features a built-in conical burr grinder, allowing you to go from bean to espresso in under a minute. 

### Key Features:
- Integrated burr grinder with dose control
- Precise espresso extraction (PID temperature control)
- Micro-foam milk texturing wand for latte art

This machine is perfect for those who want to learn the art of espresso making without investing $2,000+ into a dual-boiler setup.
  `);

  return (
    <div className="flex flex-col xl:flex-row h-auto xl:h-[calc(100vh-120px)] min-h-[calc(100vh-120px)] -mx-4 md:-mx-8 -mb-12 bg-white dark:bg-[#0A1628] rounded-t-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── EDITOR MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Editor Topbar */}
        <div className="h-auto xl:h-16 py-4 xl:py-0 border-b border-slate-200 dark:border-white/10 flex flex-col xl:flex-row items-start xl:items-center justify-between px-6 bg-slate-50 dark:bg-white/[0.02] gap-4 xl:gap-0">
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/articles" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Q3 Coffee Reviews</span> <ChevronRight className="w-4 h-4" /> <span className="text-slate-900 dark:text-white font-bold">10 Best Espresso...</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Saved to cloud</span>
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <Save className="w-4 h-4" /> Publish to WordPress
            </button>
          </div>
        </div>

        {/* Notion-Style Editor Canvas */}
        <div className="flex-1 overflow-visible xl:overflow-y-auto overscroll-contain p-6 md:p-12 max-w-3xl mx-auto w-full scrollbar-none xl:data-lenis-prevent">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[1500px] xl:h-full xl:min-h-[800px] resize-none bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-serif placeholder:text-slate-300 dark:placeholder:text-slate-700"
            spellCheck="false"
          />
        </div>
      </div>

      {/* ── AI CO-PILOT SIDEBAR ── */}
      <div className="w-full xl:w-80 border-t xl:border-t-0 xl:border-l border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0D1F3C] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-10 shrink-0">
        
        {/* SEO Score Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-teal-500" /> SEO Score
            </h3>
            <span className="text-2xl font-black text-teal-500">85<span className="text-sm text-slate-400 font-medium">/100</span></span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
          </div>
        </div>

        {/* AI Actions */}
        <div className="p-6 space-y-6 flex-1 overflow-visible xl:overflow-y-auto overscroll-contain xl:data-lenis-prevent">
          
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">AI Co-Pilot Tools</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 hover:border-teal-500 dark:hover:border-teal-500 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 group">
                <Wand2 className="w-4 h-4 text-teal-500" /> Optimize Selection
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 group">
                <Type className="w-4 h-4 text-indigo-500" /> Expand Paragraph
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 hover:border-rose-500 dark:hover:border-rose-500 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 group">
                <Layout className="w-4 h-4 text-rose-500" /> Add H3 Subsections
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 hover:border-amber-500 dark:hover:border-amber-500 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 group">
                <ImageIcon className="w-4 h-4 text-amber-500" /> Generate Hero Image
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Keyword Density</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-300">espresso machine</span>
                <span className="font-bold text-teal-500">12 / 15</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-300">home barista</span>
                <span className="font-bold text-amber-500">2 / 5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-300">burr grinder</span>
                <span className="font-bold text-teal-500">4 / 3</span>
              </div>
            </div>
          </div>

        </div>

        {/* Generate More Content Button */}
        <div className="p-4 bg-slate-100 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/10">
          <button className="w-full bg-teal-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Continue Writing
          </button>
        </div>

      </div>

    </div>
  );
}
