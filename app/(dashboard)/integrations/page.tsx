"use client";

import { Webhook, Key, CheckCircle2, Lock, Plus } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">CMS Integrations</h1>
        <p className="text-slate-500 dark:text-slate-400">Connect your target websites to auto-publish articles.</p>
      </div>

      <div className="space-y-6">
        
        {/* WordPress Connection - ACTIVE */}
        <div className="bg-white dark:bg-[#0D1F3C] border-2 border-teal-500 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-teal-500 text-slate-900 font-bold text-xs rounded-bl-xl shadow-md flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0073AA] flex items-center justify-center text-white font-bold font-serif text-3xl shadow-lg">W</div>
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">WordPress</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Via WP REST API & App Passwords</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-white/[0.02] p-6 rounded-xl border border-slate-200 dark:border-white/10">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Site URL</label>
              <div className="font-medium text-slate-900 dark:text-white bg-white dark:bg-[#0A1628] px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10">
                https://caffeine.com
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Application Password</label>
              <div className="font-medium text-slate-900 dark:text-white bg-white dark:bg-[#0A1628] px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span>•••• •••• •••• 9A2F</span>
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors">Disconnect</button>
          </div>
        </div>

        {/* Webflow Connection - SETUP */}
        <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#146EF5] flex items-center justify-center text-white font-bold font-sans text-3xl shadow-lg">w</div>
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Webflow CMS</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Via Webflow Data API</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Site ID</label>
              <input type="text" placeholder="e.g. 64b9..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">API Token</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" placeholder="Bearer token..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors shadow-[0_0_20px_rgba(20,110,245,0.3)]">
              Connect Webflow
            </button>
          </div>
        </div>

        {/* Shopify - COMING SOON */}
        <div className="bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold font-sans text-3xl">S</div>
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                Shopify <span className="text-[10px] uppercase bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full tracking-wider font-bold">Coming Soon</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Via Shopify Admin API</p>
            </div>
          </div>
          <Lock className="w-6 h-6 text-slate-400" />
        </div>

      </div>

    </div>
  );
}
