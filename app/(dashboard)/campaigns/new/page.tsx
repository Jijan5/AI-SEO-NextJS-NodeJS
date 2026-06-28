"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Target, Type, Rocket, CheckCircle2, Languages, Megaphone } from "lucide-react";

export default function NewCampaignPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(s => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── HEADER ── */}
      <div className="mb-8">
        <Link href="/campaigns" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Campaigns
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create New Campaign</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your keyword targets and AI content strategy.</p>
      </div>

      {/* ── PROGRESS WIZARD ── */}
      <div className="mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-white/10 -translate-y-1/2 rounded-full hidden sm:block"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 rounded-full transition-all duration-500 hidden sm:block"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        <div className="relative flex justify-between gap-4 sm:gap-0 flex-col sm:flex-row">
          <StepIndicator currentStep={step} stepNum={1} icon={<Target className="w-5 h-5" />} title="Target Details" desc="Keywords & Audience" />
          <StepIndicator currentStep={step} stepNum={2} icon={<Type className="w-5 h-5" />} title="Content Strategy" desc="Tone & Structure" />
          <StepIndicator currentStep={step} stepNum={3} icon={<Rocket className="w-5 h-5" />} title="Review & Launch" desc="Confirm Settings" />
        </div>
      </div>

      {/* ── FORM CONTAINER ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-10 shadow-xl min-h-[400px] flex flex-col">
        
        <div className="flex-1">
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10'}`}
          >
            Back
          </button>
          
          <button 
            onClick={step === totalSteps ? () => alert('Campaign Launched!') : nextStep}
            className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-8 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]"
          >
            {step === totalSteps ? (
              <>Launch Campaign <Rocket className="w-4 h-4" /></>
            ) : (
              'Next Step'
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

// ── SUB-COMPONENTS ──

function StepIndicator({ currentStep, stepNum, icon, title, desc }: any) {
  const isCompleted = currentStep > stepNum;
  const isActive = currentStep === stepNum;
  
  return (
    <div className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2 relative z-10 bg-white dark:bg-[#0A1628] sm:px-4 py-2">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
        isCompleted ? 'bg-teal-500 border-teal-500 text-slate-900' : 
        isActive ? 'bg-white dark:bg-[#0D1F3C] border-teal-500 text-teal-500' : 
        'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
      }`}>
        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : icon}
      </div>
      <div className="text-left sm:text-center">
        <div className={`font-bold text-sm ${isActive || isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{title}</div>
        <div className="text-xs text-slate-400 hidden sm:block">{desc}</div>
      </div>
    </div>
  );
}

function StepOne() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">Campaign Name</label>
        <input type="text" placeholder="e.g., Q3 Coffee Reviews" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-900 dark:text-white flex justify-between">
          Target Keywords
          <span className="text-xs text-slate-500 font-normal">Comma separated</span>
        </label>
        <textarea rows={4} placeholder="best espresso machine, cold brew makers, coffee bean reviews..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none"></textarea>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">Target Website (CMS)</label>
        <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all appearance-none">
          <option>Select an integration...</option>
          <option>caffeine.com (WordPress)</option>
          <option>brewguides.io (Webflow)</option>
        </select>
      </div>
    </div>
  );
}

function StepTwo() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-900 dark:text-white">Tone of Voice</label>
          <div className="grid grid-cols-2 gap-3">
            <SelectionBox icon={<Megaphone className="w-5 h-5" />} title="Authoritative" desc="Expert & professional" active />
            <SelectionBox icon={<Type className="w-5 h-5" />} title="Conversational" desc="Friendly & engaging" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-900 dark:text-white">Language</label>
          <div className="grid grid-cols-2 gap-3">
            <SelectionBox icon={<Languages className="w-5 h-5" />} title="English (US)" desc="Default output" active />
            <SelectionBox icon={<Languages className="w-5 h-5" />} title="Spanish" desc="ES localization" />
          </div>
        </div>
      </div>

      <div className="space-y-1 pt-4">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">Custom Instructions (Optional)</label>
        <textarea rows={3} placeholder="Add any specific brand guidelines, competitor sites to avoid, or formatting preferences..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none"></textarea>
      </div>
    </div>
  );
}

function StepThree() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-200 dark:border-white/10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Campaign Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400">Campaign Name</span>
            <span className="font-semibold text-slate-900 dark:text-white">Q3 Coffee Reviews</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400">Estimated Articles</span>
            <span className="font-semibold text-slate-900 dark:text-white">~45 generated posts</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400">Target Website</span>
            <span className="font-semibold text-slate-900 dark:text-white">caffeine.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Estimated Cost</span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">450 AI Credits</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-700 dark:text-teal-400 text-sm">
        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
        <p>Your settings look perfect. Once launched, the AI engine will immediately begin mapping keywords and generating content to your selected CMS.</p>
      </div>
    </div>
  );
}

function SelectionBox({ icon, title, desc, active = false }: any) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${active ? 'border-teal-500 bg-teal-500/5' : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}>
      <div className={`mb-2 ${active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {icon}
      </div>
      <div className={`font-bold text-sm ${active ? 'text-teal-700 dark:text-teal-400' : 'text-slate-900 dark:text-white'}`}>{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
  );
}
