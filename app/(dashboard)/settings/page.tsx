"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Palette, Save, Monitor, Moon, Sun, Briefcase, Zap, Key, Lock, CreditCard, CheckCircle2, Image as ImageIcon, UploadCloud, ChevronDown, Eye, EyeOff, Loader2, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userTier, setUserTier] = useState<'starter' | 'pro' | 'scale'>('scale');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [researchProvider, setResearchProvider] = useState('perplexity');
  const [writerProvider, setWriterProvider] = useState('anthropic');
  const [logicProvider, setLogicProvider] = useState('openai');
  const [contextProvider, setContextProvider] = useState('gemini');

  const [autopilotConfig, setAutopilotConfig] = useState({
    cmsType: 'wordpress',
    cmsEndpoint: '',
    cmsApiKey: '',
    publishSchedule: 'draft',
    autoIndex: false,
    autoInternalLinking: true,
    maxLinksPerArticle: 3
  });

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: 'Opticrew Workspace',
  });

  useEffect(() => {
    setMounted(true);
    fetch('/api/settings/autopilot')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          if (data.name) setWorkspaceInfo(prev => ({ ...prev, name: data.name }));
          setAutopilotConfig({
            cmsType: data.cmsType || 'wordpress',
            cmsEndpoint: data.cmsEndpoint || '',
            cmsApiKey: data.cmsApiKey || '',
            publishSchedule: data.publishSchedule || 'draft',
            autoIndex: data.autoIndex || false,
            autoInternalLinking: data.autoInternalLinking !== undefined ? data.autoInternalLinking : true,
            maxLinksPerArticle: data.maxLinksPerArticle || 3
          });
        }
      })
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings/autopilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workspaceInfo.name,
          cmsType: autopilotConfig.cmsType,
          cmsEndpoint: autopilotConfig.cmsEndpoint,
          cmsApiKey: autopilotConfig.cmsApiKey,
          publishSchedule: autopilotConfig.publishSchedule,
          autoIndex: autopilotConfig.autoIndex,
          autoInternalLinking: autopilotConfig.autoInternalLinking,
          maxLinksPerArticle: autopilotConfig.maxLinksPerArticle,
        })
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (e) {
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER & MOCK TIER SWITCHER ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Configuration Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your subscription, API integrations, and white-label workspace.</p>
          
          {/* MOCK TIER SWITCHER (To be removed when backend is attached) */}
          <div className="mt-4 flex items-center gap-3 p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl inline-flex">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Dev Mode: Test Tier</span>
            <div className="relative">
              <select 
                value={userTier} 
                onChange={(e) => setUserTier(e.target.value as any)}
                className="appearance-none bg-white dark:bg-[#0D1F3C] border border-teal-500/30 text-slate-900 dark:text-white text-sm rounded-lg py-1.5 pl-3 pr-8 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                <option value="starter" className="bg-white dark:bg-[#0D1F3C]">Starter Plan ($199/mo)</option>
                <option value="pro" className="bg-white dark:bg-[#0D1F3C]">Pro Plan ($299/mo)</option>
                <option value="scale" className="bg-white dark:bg-[#0D1F3C]">Scale Plan ($499/mo)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
        <button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)] whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* ── 1. SUBSCRIPTION & USAGE ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subscription & Usage</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monitor your current tier limits and credit usage.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 dark:bg-navy-950/50 rounded-xl p-5 border border-slate-200 dark:border-white/5">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {userTier === 'starter' && 'Starter Plan'}
                {userTier === 'pro' && 'Pro Plan'}
                {userTier === 'scale' && <><Zap className="w-4 h-4 text-teal-400 fill-teal-400" /> Scale Plan</>}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {userTier === 'starter' ? '15,000 / 50,000 Credits' : userTier === 'pro' ? '85,000 / 250,000 Credits' : '150,000 / Unlimited Credits'}
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-navy-900 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${userTier === 'scale' ? 'bg-gradient-to-r from-teal-400 to-emerald-400' : 'bg-teal-500'}`} 
                style={{ width: userTier === 'starter' ? '30%' : userTier === 'pro' ? '34%' : '15%' }}
              />
            </div>
          </div>
          <button className="w-full md:w-auto px-4 py-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
            Manage Billing
          </button>
        </div>
      </div>

      {/* ── 2. AI & RESEARCH INTEGRATIONS ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Engine Integrations</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Connect your custom API keys for writing and factual research.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Factual Research Engine */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Factual Research Engine</label>
              <p className="text-xs text-slate-500">Used by the Competitor Spy and Article Engine to pull real-time facts.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setResearchProvider('perplexity')}
                className={`p-4 rounded-xl border text-left transition-all ${researchProvider === 'perplexity' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Perplexity AI</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Recommended</div>
              </button>
              <button 
                onClick={() => setResearchProvider('publish_or_perish')}
                className={`p-4 rounded-xl border text-left transition-all ${researchProvider === 'publish_or_perish' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Publish or Perish</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Academic Focus</div>
              </button>
              <button 
                onClick={() => setResearchProvider('google_scholar')}
                className={`p-4 rounded-xl border text-left transition-all ${researchProvider === 'google_scholar' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Google Scholar</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-white/5" />

          {/* Master Writer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Master Writer</label>
              <p className="text-xs text-slate-500">Powers the core article writing engine.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setWriterProvider('anthropic')}
                className={`p-4 rounded-xl border text-left transition-all ${writerProvider === 'anthropic' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Claude 3.5 Sonnet</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Highly Recommended</div>
              </button>
              <button 
                onClick={() => setWriterProvider('openai')}
                className={`p-4 rounded-xl border text-left transition-all ${writerProvider === 'openai' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">OpenAI GPT-4o</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
              <button 
                onClick={() => setWriterProvider('gemini')}
                className={`p-4 rounded-xl border text-left transition-all ${writerProvider === 'gemini' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Gemini 1.5 Pro</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-white/5" />

          {/* Fast Logic */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Fast Logic Engine</label>
              <p className="text-xs text-slate-500">Used for rapid metadata generation and link graphs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setLogicProvider('openai')}
                className={`p-4 rounded-xl border text-left transition-all ${logicProvider === 'openai' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">GPT-4o-mini</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Recommended</div>
              </button>
              <button 
                onClick={() => setLogicProvider('anthropic')}
                className={`p-4 rounded-xl border text-left transition-all ${logicProvider === 'anthropic' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Claude 3.5 Haiku</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
              <button 
                onClick={() => setLogicProvider('gemini')}
                className={`p-4 rounded-xl border text-left transition-all ${logicProvider === 'gemini' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Gemini 1.5 Flash</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-white/5" />

          {/* Context Processor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Context Processor</label>
              <p className="text-xs text-slate-500">For processing massive datasets (up to 2M tokens).</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setContextProvider('gemini')}
                className={`p-4 rounded-xl border text-left transition-all ${contextProvider === 'gemini' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Gemini 1.5 Pro</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Recommended</div>
              </button>
              <button 
                onClick={() => setContextProvider('anthropic')}
                className={`p-4 rounded-xl border text-left transition-all ${contextProvider === 'anthropic' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Claude 3.5 Sonnet</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
              <button 
                onClick={() => setContextProvider('openai')}
                className={`p-4 rounded-xl border text-left transition-all ${contextProvider === 'openai' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">OpenAI GPT-4o</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Alternative</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. AUTOPILOT PUBLISHING & INDEXING ENGINE ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-teal-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Autopilot Publishing Engine</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Configure automated deployment and indexing for your programmatic content.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">CMS Platform</label>
              <p className="text-xs text-slate-500">The platform where your generated articles will be published.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, cmsType: 'wordpress'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.cmsType === 'wordpress' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">WordPress</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">REST API</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, cmsType: 'webflow'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.cmsType === 'webflow' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Webflow</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">CMS API</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, cmsType: 'shopify'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.cmsType === 'shopify' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Shopify</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Blog API</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, cmsType: 'webhook'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.cmsType === 'webhook' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Custom</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Webhook</div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Publishing Schedule</label>
              <p className="text-xs text-slate-500">How fast should generated articles be pushed to your CMS?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: 'draft'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule === 'draft' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Save as Draft</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Manual Review</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: 'immediate'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule === 'immediate' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Immediate</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Publish Instantly</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: 'drip_5'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule === 'drip_5' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Drip Feed (5)</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">5 Posts / Day</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: 'drip_10'})}
                className={`p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule === 'drip_10' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Drip Feed (10)</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">10 Posts / Day</div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Your CMS Details</label>
              <p className="text-xs text-slate-500">Provide your website URL and API key so Autopilot can push articles automatically.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  value={autopilotConfig.cmsEndpoint}
                  onChange={(e) => setAutopilotConfig({...autopilotConfig, cmsEndpoint: e.target.value})}
                  placeholder="Website URL (e.g., https://my-seo-site.com)" 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 text-sm" 
                />
              </div>
            <div className="relative">
              <input 
                type={showKeys['cms'] ? "text" : "password"} 
                value={autopilotConfig.cmsApiKey}
                onChange={(e) => setAutopilotConfig({...autopilotConfig, cmsApiKey: e.target.value})}
                placeholder="API Key / App Password" 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 font-mono text-sm placeholder:font-sans" 
              />
              <button 
                onClick={() => toggleKeyVisibility('cms')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showKeys['cms'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            </div>
          </div>

          {/* Auto Indexing Toggle */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Automated Indexing
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">Scale Plan Only</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Automatically ping Google Search Console & IndexNow when a new programmatic page is published.</p>
            </div>
            <label className={`relative inline-flex items-center ${userTier === 'scale' ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autopilotConfig.autoIndex}
                disabled={userTier !== 'scale'}
                onChange={(e) => setAutopilotConfig({...autopilotConfig, autoIndex: e.target.checked})}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-navy-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* ── 4. AUTO INTERNAL LINKING ENGINE ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Monitor className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Auto Internal Linking Engine</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Dynamically inject contextual semantic links into new and existing articles.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Enable Semantic Internal Linking</h3>
              <p className="text-xs text-slate-500 mt-1">Analyze entity relationships and automatically inject anchor text links connecting siloed content.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autopilotConfig.autoInternalLinking}
                onChange={(e) => setAutopilotConfig({...autopilotConfig, autoInternalLinking: e.target.checked})}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-navy-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-teal-500"></div>
            </label>
          </div>

          <div className={`transition-all duration-300 ${autopilotConfig.autoInternalLinking ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">Maximum Injected Links per Article</label>
            <div className="flex items-center gap-6 mt-4 p-5 bg-slate-50 dark:bg-navy-900/40 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
              <div className="flex-1 relative pb-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={autopilotConfig.maxLinksPerArticle}
                  onChange={(e) => setAutopilotConfig({...autopilotConfig, maxLinksPerArticle: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-lg cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all dark:bg-navy-900 bg-slate-200"
                />
                <div className="absolute top-5 left-0 right-0 pointer-events-none">
                  {/* The math: (value - min) / (max - min) * 100% */}
                  <span className="absolute text-[11px] font-bold text-slate-400 -translate-x-1/2" style={{ left: '0%' }}>1</span>
                  <span className="absolute text-[11px] font-bold text-slate-400 -translate-x-1/2" style={{ left: '44.44%' }}>5</span>
                  <span className="absolute text-[11px] font-bold text-slate-400 -translate-x-1/2" style={{ left: '100%' }}>10</span>
                </div>
              </div>
              <div className="w-14 h-14 shrink-0 rounded-xl bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={autopilotConfig.maxLinksPerArticle}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-2xl font-black text-teal-500 drop-shadow-[0_0_10px_rgba(20,184,166,0.3)] block"
                  >
                    {autopilotConfig.maxLinksPerArticle}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Higher values improve SEO silos but may look unnatural if overdone. 3-5 is recommended.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
