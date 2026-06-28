"use client";

import { useState, useEffect } from "react";
import { User, Key, Palette, Save, Webhook, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile, API keys, and workspace preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* ── PROFILE SECTION ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Update your account details and password.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Email Address</label>
            <input type="email" defaultValue="john@apexmarketing.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
        </div>
      </div>

      {/* ── CMS INTEGRATIONS ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Webhook className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">CMS Integrations</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Connect your target websites to auto-publish articles.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* WordPress Block */}
          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-5 bg-slate-50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold font-serif">W</div>
              <h3 className="font-bold text-slate-900 dark:text-white">WordPress Connection</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Site URL</label>
                <input type="url" placeholder="https://yoursite.com" className="w-full bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Application Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="password" placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Webflow Block */}
          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-5 bg-slate-50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold font-sans">w</div>
              <h3 className="font-bold text-slate-900 dark:text-white">Webflow Connection</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Site ID</label>
                <input type="text" placeholder="64b9..." className="w-full bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">API Token</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="password" placeholder="Bearer token..." className="w-full bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" />
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-3 gap-4">
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
