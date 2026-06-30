"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Palette, Save, Monitor, Moon, Sun, Briefcase, Zap, Key, Lock, CreditCard, CheckCircle2, Image as ImageIcon, UploadCloud, ChevronDown, Eye, EyeOff, Loader2, XCircle } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userTier, setUserTier] = useState<'starter' | 'pro' | 'agency'>('agency');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [researchProvider, setResearchProvider] = useState('perplexity');
  const [writerProvider, setWriterProvider] = useState('anthropic');
  const [logicProvider, setLogicProvider] = useState('openai');
  const [contextProvider, setContextProvider] = useState('gemini');
  
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    writer: "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx",
    logic: "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx",
  });
  const [testStatus, setTestStatus] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({});

  const [themeEngine, setThemeEngine] = useState({
    primary: '#14B8A6',
    dark_bg: '#0D1F3C',
    dark_panel: '#1e293b',
    light_bg: '#f8fafc',
    light_panel: '#ffffff',
  });

  const resetTheme = () => {
    setThemeEngine({
      primary: '#14B8A6',
      dark_bg: '#0D1F3C',
      dark_panel: '#1e293b',
      light_bg: '#f8fafc',
      light_panel: '#ffffff',
    });
  };

  const [isSaving, setIsSaving] = useState(false);
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: 'Apex Marketing',
    domain: 'app.apexmarketing.com'
  });

  useEffect(() => {
    setMounted(true);
    // Fetch theme and workspace settings
    fetch('/api/settings/theme')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          if (data.name) setWorkspaceInfo(prev => ({ ...prev, name: data.name }));
          if (data.domain) setWorkspaceInfo(prev => ({ ...prev, domain: data.domain }));
          setThemeEngine(prev => ({
            primary: data.primaryColor || prev.primary,
            dark_bg: data.darkBg || prev.dark_bg,
            dark_panel: data.darkPanel || prev.dark_panel,
            light_bg: data.lightBg || prev.light_bg,
            light_panel: data.lightPanel || prev.light_panel,
          }));
        }
      })
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workspaceInfo.name,
          domain: workspaceInfo.domain,
          primaryColor: themeEngine.primary,
          darkBg: themeEngine.dark_bg,
          darkPanel: themeEngine.dark_panel,
          lightBg: themeEngine.light_bg,
          lightPanel: themeEngine.light_panel,
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

  const handleTestConnection = (keyId: string) => {
    setTestStatus(prev => ({ ...prev, [keyId]: 'loading' }));
    
    setTimeout(() => {
      const val = apiKeys[keyId] || '';
      // Mock validation: success if length > 10
      if (val.length > 10) {
        setTestStatus(prev => ({ ...prev, [keyId]: 'success' }));
      } else {
        setTestStatus(prev => ({ ...prev, [keyId]: 'error' }));
      }
      
      // Auto reset after 3 seconds
      setTimeout(() => {
        setTestStatus(prev => ({ ...prev, [keyId]: 'idle' }));
      }, 3000);
    }, 1500);
  };

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
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
                <option value="starter" className="bg-white dark:bg-[#0D1F3C]">Starter Plan</option>
                <option value="pro" className="bg-white dark:bg-[#0D1F3C]">Pro Plan</option>
                <option value="agency" className="bg-white dark:bg-[#0D1F3C]">Agency LTD ($4999)</option>
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
                {userTier === 'agency' && <><Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Agency LTD Tier</>}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {userTier === 'starter' ? '15,000 / 50,000 Credits' : userTier === 'pro' ? '85,000 / 250,000 Credits' : '45,000 / Unlimited Credits'}
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-navy-900 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${userTier === 'agency' ? 'bg-gradient-to-r from-teal-400 to-amber-400' : 'bg-teal-500'}`} 
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

        <div className="space-y-5">
          {/* Factual Research Engine */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Factual Research Engine</label>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">Recommended</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-1/3">
                <select 
                  value={researchProvider}
                  onChange={(e) => setResearchProvider(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-sm cursor-pointer"
                >
                  <option value="perplexity" className="bg-slate-50 dark:bg-[#0D1F3C]">Perplexity AI API</option>
                  <option value="publish_or_perish" className="bg-slate-50 dark:bg-[#0D1F3C]">Publish or Perish API</option>
                  <option value="google_scholar" className="bg-slate-50 dark:bg-[#0D1F3C]">Google Scholar API</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <input 
                    type={showKeys['research'] ? "text" : "password"} 
                    value={apiKeys['research'] || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, research: e.target.value })}
                    placeholder={researchProvider === 'perplexity' ? "pplx-xxxxxxxxxxxxxxxxxxxxxxxx" : "Enter API Key..."} 
                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all font-mono text-sm placeholder:font-sans ${testStatus['research'] === 'success' ? 'border-teal-500/50 focus:border-teal-500/50 focus:ring-teal-500/50' : testStatus['research'] === 'error' ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-teal-500/50 focus:ring-teal-500/50'}`} 
                  />
                  <button onClick={() => toggleKeyVisibility('research')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                    {showKeys['research'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  onClick={() => handleTestConnection('research')}
                  disabled={testStatus['research'] === 'loading'}
                  className="px-4 py-2 min-w-[80px] flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testStatus['research'] === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Test"}
                </button>
              </div>
            </div>
            {testStatus['research'] === 'success' && (
              <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><CheckCircle2 className="w-3.5 h-3.5" /> The KEY is match.</p>
            )}
            {testStatus['research'] === 'error' && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><XCircle className="w-3.5 h-3.5" /> The KEY do not match (must be &gt; 10 characters).</p>
            )}
            <p className="text-xs text-slate-400">Used by the Competitor Spy and Article Engine to pull real-time journal citations and facts.</p>
          </div>

          <hr className="border-slate-200 dark:border-white/5" />

          {/* Master Writer */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Master Writer</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-1/3">
                <select 
                  value={writerProvider}
                  onChange={(e) => setWriterProvider(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-sm cursor-pointer"
                >
                  <option value="anthropic" className="bg-slate-50 dark:bg-[#0D1F3C]">Anthropic API (Recommended)</option>
                  <option value="openai" className="bg-slate-50 dark:bg-[#0D1F3C]">OpenAI API</option>
                  <option value="gemini" className="bg-slate-50 dark:bg-[#0D1F3C]">Google Gemini API</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <input 
                    type={showKeys['writer'] ? "text" : "password"} 
                    value={apiKeys['writer'] || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, writer: e.target.value })}
                    placeholder={writerProvider === 'anthropic' ? "sk-ant-..." : writerProvider === 'openai' ? "sk-proj-..." : "AIzaSy..."} 
                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all font-mono text-sm placeholder:font-sans ${testStatus['writer'] === 'success' ? 'border-teal-500/50 focus:border-teal-500/50 focus:ring-teal-500/50' : testStatus['writer'] === 'error' ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-teal-500/50 focus:ring-teal-500/50'}`} 
                  />
                  <button onClick={() => toggleKeyVisibility('writer')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                    {showKeys['writer'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  onClick={() => handleTestConnection('writer')}
                  disabled={testStatus['writer'] === 'loading'}
                  className="px-4 py-2 min-w-[80px] flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testStatus['writer'] === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Test"}
                </button>
              </div>
            </div>
            {testStatus['writer'] === 'success' && (
              <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><CheckCircle2 className="w-3.5 h-3.5" /> The KEY is match.</p>
            )}
            {testStatus['writer'] === 'error' && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><XCircle className="w-3.5 h-3.5" /> The KEY do not match (must be &gt; 10 characters).</p>
            )}
            <p className="text-xs text-slate-400">Powers the core article writing engine (Claude 3.5 Sonnet highly recommended for human-like text).</p>
          </div>

          {/* Fast Logic */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Fast Logic Engine</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-1/3">
                <select 
                  value={logicProvider}
                  onChange={(e) => setLogicProvider(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-sm cursor-pointer"
                >
                  <option value="openai" className="bg-slate-50 dark:bg-[#0D1F3C]">OpenAI API (Recommended)</option>
                  <option value="anthropic" className="bg-slate-50 dark:bg-[#0D1F3C]">Anthropic API</option>
                  <option value="gemini" className="bg-slate-50 dark:bg-[#0D1F3C]">Google Gemini API</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <input 
                    type={showKeys['logic'] ? "text" : "password"} 
                    value={apiKeys['logic'] || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, logic: e.target.value })}
                    placeholder={logicProvider === 'openai' ? "sk-proj-..." : logicProvider === 'anthropic' ? "sk-ant-..." : "AIzaSy..."} 
                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all font-mono text-sm placeholder:font-sans ${testStatus['logic'] === 'success' ? 'border-teal-500/50 focus:border-teal-500/50 focus:ring-teal-500/50' : testStatus['logic'] === 'error' ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-teal-500/50 focus:ring-teal-500/50'}`} 
                  />
                  <button onClick={() => toggleKeyVisibility('logic')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                    {showKeys['logic'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  onClick={() => handleTestConnection('logic')}
                  disabled={testStatus['logic'] === 'loading'}
                  className="px-4 py-2 min-w-[80px] flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testStatus['logic'] === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Test"}
                </button>
              </div>
            </div>
            {testStatus['logic'] === 'success' && (
              <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><CheckCircle2 className="w-3.5 h-3.5" /> The KEY is match.</p>
            )}
            {testStatus['logic'] === 'error' && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><XCircle className="w-3.5 h-3.5" /> The KEY do not match (must be &gt; 10 characters).</p>
            )}
            <p className="text-xs text-slate-400">Used for rapid metadata generation, link graphs, and the Chat Widget (GPT-4o-mini recommended).</p>
          </div>

          {/* Context Processor */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Context Processor</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-1/3">
                <select 
                  value={contextProvider}
                  onChange={(e) => setContextProvider(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-sm cursor-pointer"
                >
                  <option value="gemini" className="bg-slate-50 dark:bg-[#0D1F3C]">Google Gemini API (Recommended)</option>
                  <option value="anthropic" className="bg-slate-50 dark:bg-[#0D1F3C]">Anthropic API</option>
                  <option value="openai" className="bg-slate-50 dark:bg-[#0D1F3C]">OpenAI API</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <input 
                    type={showKeys['context'] ? "text" : "password"} 
                    value={apiKeys['context'] || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, context: e.target.value })}
                    placeholder={contextProvider === 'gemini' ? "AIzaSy..." : contextProvider === 'anthropic' ? "sk-ant-..." : "sk-proj-..."}
                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl py-2.5 pl-4 pr-10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all font-mono text-sm placeholder:font-sans ${testStatus['context'] === 'success' ? 'border-teal-500/50 focus:border-teal-500/50 focus:ring-teal-500/50' : testStatus['context'] === 'error' ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-teal-500/50 focus:ring-teal-500/50'}`} 
                  />
                  <button onClick={() => toggleKeyVisibility('context')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                    {showKeys['context'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  onClick={() => handleTestConnection('context')}
                  disabled={testStatus['context'] === 'loading'}
                  className="px-4 py-2 min-w-[80px] flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testStatus['context'] === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Test"}
                </button>
              </div>
            </div>
            {testStatus['context'] === 'success' && (
              <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><CheckCircle2 className="w-3.5 h-3.5" /> The KEY is match.</p>
            )}
            {testStatus['context'] === 'error' && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"><XCircle className="w-3.5 h-3.5" /> The KEY do not match (must be &gt; 10 characters).</p>
            )}
            <p className="text-xs text-slate-400">Used for processing massive datasets of up to 2 million tokens (Gemini 1.5 Pro highly recommended).</p>
          </div>
        </div>
      </div>

      {/* ── 3. WHITE-LABEL BRANDING (TIER GATED) ── */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        
        {/* The Premium Gate Overlay */}
        {userTier !== 'agency' && (
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-navy-950/60 backdrop-blur-[8px] flex flex-col items-center justify-center p-6 text-center border border-slate-200 dark:border-white/10 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Agency Branding Locked</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
              Custom domains, custom logos, and white-label theme overrides are exclusively available on the Agency LTD tier.
            </p>
            <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Zap className="w-5 h-5 fill-current" />
              Upgrade to Agency LTD ($4,999)
            </button>
          </div>
        )}

        {/* The Actual Content (Blurred if gated) */}
        <div className={`bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 ${userTier !== 'agency' ? 'opacity-40 pointer-events-none select-none' : ''}`}>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-8">
              {/* Workspace Info Sub-section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Information</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your white-label agency details.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Agency Name</label>
                    <input 
                      type="text" 
                      value={workspaceInfo.name}
                      onChange={(e) => setWorkspaceInfo({...workspaceInfo, name: e.target.value})}
                      placeholder="Apex Marketing" 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Custom Domain</label>
                    <div className="flex">
                      <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 border-r-0 rounded-l-xl py-2.5 px-4 text-slate-500 text-sm flex items-center">https://</span>
                      <input 
                        type="text" 
                        value={workspaceInfo.domain}
                        onChange={(e) => setWorkspaceInfo({...workspaceInfo, domain: e.target.value})}
                        placeholder="app.apexmarketing.com" 
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-r-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Requires CNAME record pointing to cname.opticrew.io</p>
                  </div>
                </div>
              </div>

              {/* Logo & Theme Engine Sub-section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Theme Engine (Advanced)</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive UI customization.</p>
                    </div>
                  </div>
                  <button 
                    onClick={resetTheme}
                    className="text-xs bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg font-bold border border-red-500/20 transition-all"
                  >
                    Reset Defaults
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Branding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-slate-50 dark:bg-navy-900/40 rounded-xl border border-slate-200 dark:border-white/5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 dark:text-white">Dashboard Logo</label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-teal-500/50 transition-colors cursor-pointer bg-white dark:bg-white/5">
                        <UploadCloud className="w-6 h-6 text-slate-400" />
                        <span className="text-xs text-slate-500">Upload SVG or PNG</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 dark:text-white">Primary Brand Color (Accents)</label>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl border-2 border-white/10 shadow-inner shrink-0 overflow-hidden cursor-pointer" style={{ backgroundColor: themeEngine.primary }}>
                          <input type="color" value={themeEngine.primary} onChange={(e) => setThemeEngine({...themeEngine, primary: e.target.value})} className="absolute inset-[-10px] w-20 h-20 cursor-pointer opacity-0" />
                        </div>
                        <input 
                          type="text" 
                          value={themeEngine.primary} 
                          onChange={(e) => setThemeEngine({...themeEngine, primary: e.target.value})}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 font-mono text-sm uppercase" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dark Mode Configurator */}
                  <div className="p-5 bg-slate-900 rounded-xl border border-white/10 shadow-inner">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Moon className="w-4 h-4 text-teal-400" /> Dark Mode Overrides</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300">Background Color</label>
                        <div className="flex items-center gap-2">
                          <div className="relative w-9 h-9 rounded-lg border border-white/20 shadow-inner shrink-0 overflow-hidden cursor-pointer" style={{ backgroundColor: themeEngine.dark_bg }}>
                            <input type="color" value={themeEngine.dark_bg} onChange={(e) => setThemeEngine({...themeEngine, dark_bg: e.target.value})} className="absolute inset-[-10px] w-16 h-16 cursor-pointer opacity-0" />
                          </div>
                          <input 
                            type="text" 
                            value={themeEngine.dark_bg} 
                            onChange={(e) => setThemeEngine({...themeEngine, dark_bg: e.target.value})}
                            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-teal-500/50 font-mono text-sm uppercase" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300">Panel/Card Color</label>
                        <div className="flex items-center gap-2">
                          <div className="relative w-9 h-9 rounded-lg border border-white/20 shadow-inner shrink-0 overflow-hidden cursor-pointer" style={{ backgroundColor: themeEngine.dark_panel }}>
                            <input type="color" value={themeEngine.dark_panel} onChange={(e) => setThemeEngine({...themeEngine, dark_panel: e.target.value})} className="absolute inset-[-10px] w-16 h-16 cursor-pointer opacity-0" />
                          </div>
                          <input 
                            type="text" 
                            value={themeEngine.dark_panel} 
                            onChange={(e) => setThemeEngine({...themeEngine, dark_panel: e.target.value})}
                            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-teal-500/50 font-mono text-sm uppercase" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Light Mode Configurator */}
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Sun className="w-4 h-4 text-amber-500" /> Light Mode Overrides</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Background Color</label>
                        <div className="flex items-center gap-2">
                          <div className="relative w-9 h-9 rounded-lg border border-slate-300 shadow-inner shrink-0 overflow-hidden cursor-pointer" style={{ backgroundColor: themeEngine.light_bg }}>
                            <input type="color" value={themeEngine.light_bg} onChange={(e) => setThemeEngine({...themeEngine, light_bg: e.target.value})} className="absolute inset-[-10px] w-16 h-16 cursor-pointer opacity-0" />
                          </div>
                          <input 
                            type="text" 
                            value={themeEngine.light_bg} 
                            onChange={(e) => setThemeEngine({...themeEngine, light_bg: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:border-teal-500/50 font-mono text-sm uppercase" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Panel/Card Color</label>
                        <div className="flex items-center gap-2">
                          <div className="relative w-9 h-9 rounded-lg border border-slate-300 shadow-inner shrink-0 overflow-hidden cursor-pointer" style={{ backgroundColor: themeEngine.light_panel }}>
                            <input type="color" value={themeEngine.light_panel} onChange={(e) => setThemeEngine({...themeEngine, light_panel: e.target.value})} className="absolute inset-[-10px] w-16 h-16 cursor-pointer opacity-0" />
                          </div>
                          <input 
                            type="text" 
                            value={themeEngine.light_panel} 
                            onChange={(e) => setThemeEngine({...themeEngine, light_panel: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:border-teal-500/50 font-mono text-sm uppercase" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Mode Sub-section */}
              {mounted && (
                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-3">Default Theme Mode</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-teal-500 bg-teal-500/5 text-teal-600' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
                    >
                      <Sun className="w-5 h-5 mb-1" />
                      <span className="font-semibold text-xs">Light</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-teal-500 bg-teal-500/5 text-teal-400' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
                    >
                      <Moon className="w-5 h-5 mb-1" />
                      <span className="font-semibold text-xs">Dark</span>
                    </button>
                    <button 
                      onClick={() => setTheme('system')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-teal-500 bg-teal-500/5 text-teal-500' : 'border-slate-200 dark:border-white/10 hover:border-teal-500/30 text-slate-500 dark:text-slate-400'}`}
                    >
                      <Monitor className="w-5 h-5 mb-1" />
                      <span className="font-semibold text-xs">System</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
