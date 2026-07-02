"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Palette, Save, Monitor, Moon, Sun, Briefcase, Zap, Key, Lock, CreditCard, CheckCircle2, Image as ImageIcon, UploadCloud, ChevronDown, Eye, EyeOff, Loader2, XCircle, LayoutTemplate, AppWindow, ShoppingCart, Webhook, Music, Camera, Users, PlayCircle } from "lucide-react";
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
  const [openHourPicker, setOpenHourPicker] = useState(false);
  const [openMinutePicker, setOpenMinutePicker] = useState(false);

  const [autopilotConfig, setAutopilotConfig] = useState({
    cmsType: 'wordpress',
    cmsEndpoint: '',
    cmsApiKey: '',
    publishingChannels: [] as {platform: string, endpointUrl: string, apiKey: string}[],
    publishSchedule: {
      type: 'auto' as 'manual' | 'auto',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      time: '09:00',
      postsPerDay: 5
    },
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
            publishingChannels: data.publishingChannels ? (typeof data.publishingChannels === 'string' ? JSON.parse(data.publishingChannels) : data.publishingChannels) : [],
            publishSchedule: (data.publishSchedule && typeof data.publishSchedule === 'string' && data.publishSchedule.startsWith('{'))
              ? JSON.parse(data.publishSchedule)
              : (data.publishSchedule && typeof data.publishSchedule === 'object' && data.publishSchedule.type)
                ? data.publishSchedule
                : { type: 'manual', days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], time: '09:00', postsPerDay: 5 },
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
          publishingChannels: autopilotConfig.publishingChannels,
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

  const toggleChannel = (platform: string) => {
    setAutopilotConfig(prev => {
      const exists = prev.publishingChannels.some(c => c.platform === platform);
      if (exists) {
        return {
          ...prev,
          publishingChannels: prev.publishingChannels.filter(c => c.platform !== platform)
        };
      } else {
        return {
          ...prev,
          publishingChannels: [...prev.publishingChannels, { platform, endpointUrl: '', apiKey: '' }]
        };
      }
    });
  };

  const hasChannel = (platform: string) => autopilotConfig.publishingChannels.some(c => c.platform === platform);
  
  const updateChannel = (platform: string, field: 'endpointUrl' | 'apiKey', value: string) => {
    setAutopilotConfig(prev => ({
      ...prev,
      publishingChannels: prev.publishingChannels.map(c => 
        c.platform === platform ? { ...c, [field]: value } : c
      )
    }));
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
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Publishing Channels</label>
              <p className="text-xs text-slate-500">Select all platforms where generated content should be distributed.</p>
            </div>
            
            {/* CMS Platforms */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Web & CMS Platforms</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'wordpress', name: 'WordPress', subtitle: 'REST API', icon: LayoutTemplate, hasImage: true },
                { id: 'webflow', name: 'Webflow', subtitle: 'CMS API', icon: AppWindow, hasImage: true },
                { id: 'shopify', name: 'Shopify', subtitle: 'Blog API', icon: ShoppingCart, hasImage: true },
                { id: 'webhook', name: 'Custom', subtitle: 'Webhook', icon: Webhook, hasImage: false },
              ].map(platform => {
                const Icon = platform.icon;
                return (
                <button 
                  key={platform.id}
                  onClick={() => toggleChannel(platform.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${hasChannel(platform.id) ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/50' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    {platform.hasImage ? (
                      <div className="relative w-6 h-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <img src={`/${platform.id}-light-mode.png`} alt={platform.name} className="absolute inset-0 w-full h-full object-contain dark:hidden" />
                        <img src={`/${platform.id}-dark-mode.png`} alt={platform.name} className="absolute inset-0 w-full h-full object-contain hidden dark:block" />
                      </div>
                    ) : (
                      <Icon className={`w-6 h-6 ${hasChannel(platform.id) ? 'text-teal-500' : 'text-slate-400 dark:text-slate-500'}`} />
                    )}
                    {hasChannel(platform.id) && <CheckCircle2 className="w-4 h-4 text-teal-500" />}
                  </div>
                  <div className="font-bold text-sm">{platform.name}</div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">{platform.subtitle}</div>
                </button>
              )})}
            </div>

            {/* Social Media Platforms */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">Social Media Streams</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'tiktok', name: 'TikTok', subtitle: 'Video & Carousel', icon: Music, hasImage: true },
                { id: 'instagram', name: 'Instagram', subtitle: 'Reels & Posts', icon: Camera, hasImage: true },
                { id: 'facebook', name: 'Facebook', subtitle: 'Pages & Groups', icon: Users, hasImage: true },
                { id: 'youtube', name: 'YouTube', subtitle: 'Shorts & Community', icon: PlayCircle, hasImage: true },
              ].map(platform => {
                const Icon = platform.icon;
                return (
                <button 
                  key={platform.id}
                  onClick={() => toggleChannel(platform.id)}
                  className={`group p-4 rounded-xl border text-left transition-all ${hasChannel(platform.id) ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/50' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    {platform.hasImage ? (
                      <div className="relative w-6 h-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <img src={`/${platform.id}-light-mode.png`} alt={platform.name} className="absolute inset-0 w-full h-full object-contain dark:hidden" />
                        <img src={`/${platform.id}-dark-mode.png`} alt={platform.name} className="absolute inset-0 w-full h-full object-contain hidden dark:block" />
                      </div>
                    ) : (
                      <Icon className={`w-6 h-6 ${hasChannel(platform.id) ? 'text-teal-500' : 'text-slate-400 dark:text-slate-500'}`} />
                    )}
                    {hasChannel(platform.id) && <CheckCircle2 className="w-4 h-4 text-teal-500" />}
                  </div>
                  <div className="font-bold text-sm">{platform.name}</div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">{platform.subtitle}</div>
                </button>
              )})}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Publishing Mode & Schedule</label>
              <p className="text-xs text-slate-500">Configure how and when your generated articles are published.</p>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex gap-3">
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, type: 'manual' }})}
                className={`flex-1 p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule.type === 'manual' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Save as Draft (Manual)</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Review Before Publishing</div>
              </button>
              <button 
                onClick={() => setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, type: 'auto' }})}
                className={`flex-1 p-4 rounded-xl border text-left transition-all ${autopilotConfig.publishSchedule.type === 'auto' ? 'bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400 shadow-sm' : 'bg-slate-50 dark:bg-navy-900/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/50 hover:bg-white dark:hover:bg-navy-800'}`}
              >
                <div className="font-bold text-sm">Full Autopilot</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mt-1">Automated Distribution</div>
              </button>
            </div>

            {/* Advanced Autopilot Settings Panel */}
            {autopilotConfig.publishSchedule.type === 'auto' && (
              <div className="mt-4 p-5 bg-slate-50 dark:bg-navy-900/40 border border-slate-200 dark:border-white/10 rounded-xl space-y-6 animate-in fade-in slide-in-from-top-2">
                
                {/* Days of Week */}
                <div>
                  <label className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 block">Publishing Days</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'mon', label: 'Mon' },
                      { id: 'tue', label: 'Tue' },
                      { id: 'wed', label: 'Wed' },
                      { id: 'thu', label: 'Thu' },
                      { id: 'fri', label: 'Fri' },
                      { id: 'sat', label: 'Sat' },
                      { id: 'sun', label: 'Sun' },
                    ].map(day => (
                      <button
                        key={day.id}
                        onClick={() => {
                          const currentDays = autopilotConfig.publishSchedule.days || [];
                          const newDays = currentDays.includes(day.id) 
                            ? currentDays.filter((d: string) => d !== day.id) 
                            : [...currentDays, day.id];
                          setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, days: newDays }});
                        }}
                        className={`w-12 h-12 rounded-lg font-bold text-sm transition-all ${autopilotConfig.publishSchedule.days?.includes(day.id) ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20' : 'bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 text-slate-500 hover:border-teal-500/50 hover:text-teal-500'}`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Time of Day */}
                  <div>
                    <label className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 block">Daily Start Time (24H)</label>
                    <div className="flex items-center justify-between w-full bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 rounded-xl py-1.5 px-3 transition-all shadow-sm relative z-40">
                      
                      {openHourPicker && <div className="fixed inset-0 z-30" onClick={() => setOpenHourPicker(false)} />}
                      {openMinutePicker && <div className="fixed inset-0 z-30" onClick={() => setOpenMinutePicker(false)} />}
                      
                      {/* Custom Hour Picker */}
                      <div className="relative z-50">
                        <button 
                          type="button"
                          onClick={() => { setOpenHourPicker(!openHourPicker); setOpenMinutePicker(false); }}
                          className={`bg-slate-100 dark:bg-navy-900/50 font-bold text-slate-900 dark:text-white text-center text-lg focus:outline-none cursor-pointer w-16 h-10 rounded-lg hover:text-teal-500 transition-colors ${openHourPicker ? 'ring-2 ring-teal-500' : ''}`}
                        >
                          {autopilotConfig.publishSchedule.time?.split(':')[0] || '09'}
                        </button>
                        
                        {openHourPicker && (
                          <div 
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-20 h-48 overflow-y-auto overscroll-contain bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 rounded-lg shadow-2xl focus:outline-none"
                            onWheel={(e) => e.stopPropagation()}
                            tabIndex={0}
                          >
                            {Array.from({length: 24}).map((_, i) => {
                              const val = i.toString().padStart(2, '0');
                              return (
                                <div 
                                  key={`h-${i}`} 
                                  onClick={() => {
                                    const mins = autopilotConfig.publishSchedule.time?.split(':')[1] || '00';
                                    setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, time: `${val}:${mins}` }});
                                    setOpenHourPicker(false);
                                  }}
                                  className="py-2 text-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white cursor-pointer transition-colors"
                                >
                                  {val}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-slate-400 font-black text-xl mb-1 relative z-50">:</div>
                      
                      {/* Custom Minute Picker */}
                      <div className="relative z-50">
                        <button 
                          type="button"
                          onClick={() => { setOpenMinutePicker(!openMinutePicker); setOpenHourPicker(false); }}
                          className={`bg-slate-100 dark:bg-navy-900/50 font-bold text-slate-900 dark:text-white text-center text-lg focus:outline-none cursor-pointer w-16 h-10 rounded-lg hover:text-teal-500 transition-colors ${openMinutePicker ? 'ring-2 ring-teal-500' : ''}`}
                        >
                          {autopilotConfig.publishSchedule.time?.split(':')[1] || '00'}
                        </button>
                        
                        {openMinutePicker && (
                          <div 
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-20 h-48 overflow-y-auto overscroll-contain bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 rounded-lg shadow-2xl focus:outline-none"
                            onWheel={(e) => e.stopPropagation()}
                            tabIndex={0}
                          >
                            {Array.from({length: 60}).map((_, i) => {
                              const val = i.toString().padStart(2, '0');
                              return (
                                <div 
                                  key={`m-${i}`} 
                                  onClick={() => {
                                    const hrs = autopilotConfig.publishSchedule.time?.split(':')[0] || '09';
                                    setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, time: `${hrs}:${val}` }});
                                    setOpenMinutePicker(false);
                                  }}
                                  className="py-2 text-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white cursor-pointer transition-colors"
                                >
                                  {val}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 relative z-50">Time</div>
                    </div>
                  </div>
                  
                  {/* Volume Slider */}
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex justify-between">
                      <span>Daily Volume</span>
                      <span className="text-teal-500 font-bold">{autopilotConfig.publishSchedule.postsPerDay} Posts / Day</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={autopilotConfig.publishSchedule.postsPerDay}
                      onChange={(e) => setAutopilotConfig({...autopilotConfig, publishSchedule: { ...autopilotConfig.publishSchedule, postsPerDay: parseInt(e.target.value) }})}
                      className="w-full h-2 rounded-lg cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all dark:bg-navy-900 bg-slate-200 mt-3"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {autopilotConfig.publishingChannels.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">Channel Configurations</label>
                <p className="text-xs text-slate-500">Provide the specific credentials or profile URLs for each selected platform.</p>
              </div>
              
              <div className="space-y-4">
                {autopilotConfig.publishingChannels.map((channel, index) => {
                  const isSocial = ['tiktok', 'instagram', 'facebook', 'youtube'].includes(channel.platform);
                  const nameMap: Record<string, string> = {
                    wordpress: 'WordPress', webflow: 'Webflow', shopify: 'Shopify', webhook: 'Custom Webhook',
                    tiktok: 'TikTok', instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube'
                  };
                  const name = nameMap[channel.platform] || channel.platform;
                  
                  return (
                    <div key={channel.platform} className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
                      <div className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-teal-500/10 text-teal-500 flex items-center justify-center text-xs">{index + 1}</span>
                        {name} Configuration
                      </div>
                      
                      {isSocial ? (
                        <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-100/50 dark:bg-white/5">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden relative">
                                <img src={`/${channel.platform}-light-mode.png`} alt={name} className="absolute inset-0 w-full h-full object-cover dark:hidden opacity-50 p-2" />
                                <img src={`/${channel.platform}-dark-mode.png`} alt={name} className="absolute inset-0 w-full h-full object-cover hidden dark:block opacity-50 p-2" />
                             </div>
                             <div>
                               <div className="text-sm font-semibold text-slate-900 dark:text-white">Not Connected</div>
                               <div className="text-xs text-slate-500">Connect your {name} account via OAuth to enable auto-publishing.</div>
                             </div>
                          </div>
                          <button 
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`OAuth redirect to ${name} would happen here.`);
                            }}
                          >
                             Connect {name}
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1 block">
                              Endpoint URL
                            </label>
                            <input 
                              type="text" 
                              value={channel.endpointUrl}
                              onChange={(e) => updateChannel(channel.platform, 'endpointUrl', e.target.value)}
                              placeholder="https://mywebsite.com/wp-json/wp/v2/posts" 
                              className="w-full bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 text-sm" 
                            />
                          </div>
                          <div className="relative">
                            <label className="text-xs font-semibold text-slate-500 mb-1 block">
                              Application Password / API Key
                            </label>
                            <input 
                              type={showKeys[channel.platform] ? "text" : "password"} 
                              value={channel.apiKey}
                              onChange={(e) => updateChannel(channel.platform, 'apiKey', e.target.value)}
                              placeholder="xxxx-xxxx-xxxx-xxxx" 
                              className="w-full bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 font-mono text-sm placeholder:font-sans" 
                            />
                            <button 
                              onClick={() => toggleKeyVisibility(channel.platform)}
                              className="absolute right-3 top-[28px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              {showKeys[channel.platform] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
