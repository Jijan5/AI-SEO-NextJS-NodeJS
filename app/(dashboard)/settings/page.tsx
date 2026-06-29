"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Palette, Save, Monitor, Moon, Sun, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Tenant Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your agency workspace branding and appearance.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      {/* ── WORKSPACE INFO ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Information</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your white-label agency details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Agency Name</label>
            <input type="text" defaultValue="Apex Marketing" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Custom Domain</label>
            <div className="flex">
              <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 border-r-0 rounded-l-xl py-2.5 px-4 text-slate-500 text-sm flex items-center">https://</span>
              <input type="text" defaultValue="app.apexmarketing.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-r-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Requires CNAME record pointing to cname.opticrew.io</p>
          </div>
        </div>
      </div>

      {/* ── APPEARANCE SECTION ── */}
      {mounted && (
        <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Appearance</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Customize the look and feel of your workspace.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-teal-500 bg-teal-500/5 text-teal-600' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
            >
              <Sun className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm">Light Mode</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-teal-500 bg-teal-500/5 text-teal-400' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
            >
              <Moon className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm">Dark Mode</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-teal-500 bg-teal-500/5 text-teal-500' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
            >
              <Monitor className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm">System Default</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
