"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Hero3D, ViewState } from "@/components/Hero3D";
import { ArrowRight, Bot, Zap, Globe, Layers, CheckCircle2, User, Building2, X, Eye, EyeOff, Menu } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Home() {
  const router = useRouter();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const [authMode, setAuthMode] = useState<'none' | 'login' | 'signup' | 'onboarding'>('none');
  const [signupTab, setSignupTab] = useState<'individual' | 'team'>('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { setTheme } = useTheme();

  let viewState: ViewState = 'scroll';
  if (authMode === 'login') viewState = 'login';
  else if (authMode === 'signup') viewState = signupTab === 'individual' ? 'signup-individual' : 'signup-team';
  else if (authMode === 'onboarding') viewState = 'onboarding';

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporarily forcing onboarding for testing purposes
    setAuthMode('onboarding');
  };

  const handleThemeSelect = (theme: 'dark' | 'light') => {
    setTheme(theme);
    // localStorage.setItem('opticrew_theme_selected', 'true'); // Disabled for testing
    router.push('/overview');
  };

  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Global Fixed 3D Background */}
      <Hero3D viewState={viewState} scrollYProgress={scrollYProgress} onThemeSelect={handleThemeSelect} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 py-4 px-6 flex justify-between items-center z-[100] bg-transparent">
        <div className="flex items-center gap-2">
          <Image 
            src="/opticrew-io-bg-remove.png" 
            alt="Opticrew.io" 
            width={220} 
            height={55} 
            className="w-auto h-12 md:h-14" 
          />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
          <button onClick={() => setAuthMode('login')} className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
            Login
          </button>
          <button onClick={() => setAuthMode('signup')} className="text-sm font-bold px-4 py-2 rounded-lg bg-teal-500 text-navy-950 hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.3)]">
            Start Free Trial
          </button>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            key="mobile-menu-container"
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
              className="absolute top-20 right-4 w-64 bg-transparent backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4"
            >
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-white py-2 border-b border-white/5">Features</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-white py-2 border-b border-white/5">Pricing</a>
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => { setIsMobileMenuOpen(false); setAuthMode('login'); }} className="text-base font-bold text-white py-3 rounded-xl bg-white/5 w-full text-center hover:bg-white/10 transition-colors">Login</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setAuthMode('signup'); }} className="text-base font-bold text-navy-950 py-3 rounded-xl bg-teal-500 w-full text-center shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:bg-teal-400 transition-colors">Start Free Trial</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* LANDING PAGE CONTENT */}
      <div className={`transition-opacity duration-700 ${authMode !== 'none' ? 'opacity-0 pointer-events-none h-screen overflow-hidden' : 'opacity-100'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-4">
        


        {/* Hero Content */}
        <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs md:text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Opticrew Engine 2.0 is Live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            AI-Powered Programmatic SEO on <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-mint-300">Autopilot</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl px-4"
          >
            Generate, publish, and rank hundreds of highly-optimized articles using a crew of AI agents. Build your programmatic SEO empire today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto px-4"
          >
            <button className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-teal-500 text-navy-950 font-bold text-base md:text-lg hover:bg-teal-400 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)]">
              Build Your First Campaign
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-base md:text-lg hover:bg-white/10 transition-all backdrop-blur-md">
              Book a Demo
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hidden sm:flex"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" ref={targetRef} className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div style={{ opacity, scale, y }} className="flex flex-col gap-20 md:gap-24">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">The Core Engine Workflow</h2>
            <p className="text-slate-400 text-base md:text-lg">A systematic approach to massive organic traffic growth.</p>
          </div>

          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                <Globe className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">1. AI Keyword Mapper</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Enter a seed keyword and let our AI break it down into hundreds of low-competition, long-tail keywords. We classify intents dynamically to target informational and commercial traffic.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {["Search Volume Analysis via DataForSEO", "Intent Classification via Claude 3.5", "Competitor Difficulty Scoring"].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-slate-300 text-sm md:text-base">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5 md:mt-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[280px] sm:h-[350px] md:h-[400px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 md:p-8 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               {/* Abstract visualization of Keyword Mapper */}
               <div className="relative w-full max-w-sm scale-90 md:scale-100">
                  <div className="flex flex-col gap-3">
                    <div className="bg-navy-900/80 border border-white/10 p-3 md:p-4 rounded-xl backdrop-blur-sm flex items-center gap-3 md:gap-4 transform -translate-x-2 md:-translate-x-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm md:text-base">I</div>
                      <div className="flex-1"><div className="h-1.5 md:h-2 w-20 md:w-24 bg-white/20 rounded"></div></div>
                      <div className="text-[10px] md:text-xs text-slate-500">Vol: 12k</div>
                    </div>
                    <div className="bg-navy-900/80 border border-white/10 p-3 md:p-4 rounded-xl backdrop-blur-sm flex items-center gap-3 md:gap-4 transform translate-x-2 md:translate-x-4 shadow-[0_0_30px_rgba(45,212,191,0.15)] border-teal-500/30">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm md:text-base">C</div>
                      <div className="flex-1"><div className="h-1.5 md:h-2 w-28 md:w-32 bg-teal-500/50 rounded"></div></div>
                      <div className="text-[10px] md:text-xs text-teal-400 font-medium">Vol: 45k</div>
                    </div>
                    <div className="bg-navy-900/80 border border-white/10 p-3 md:p-4 rounded-xl backdrop-blur-sm flex items-center gap-3 md:gap-4 transform -translate-x-1 md:-translate-x-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm md:text-base">T</div>
                      <div className="flex-1"><div className="h-1.5 md:h-2 w-12 md:w-16 bg-white/20 rounded"></div></div>
                      <div className="text-[10px] md:text-xs text-slate-500">Vol: 8k</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="h-[280px] sm:h-[350px] md:h-[400px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 md:p-8 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               {/* Abstract visualization of Generation */}
               <div className="relative w-full max-w-sm flex flex-col items-center gap-4 md:gap-6 scale-90 md:scale-100">
                 <Bot className="w-12 h-12 md:w-16 md:h-16 text-slate-300 animate-pulse" />
                 <div className="w-full space-y-2 md:space-y-3">
                   <div className="h-1.5 md:h-2 bg-white/10 rounded overflow-hidden">
                     <motion.div className="h-full bg-gradient-to-r from-teal-500 to-mint-300" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }} />
                   </div>
                   <div className="flex justify-between text-[10px] md:text-xs text-slate-500 font-mono">
                     <span>Generating 100 articles...</span>
                     <span>42/100</span>
                   </div>
                 </div>
               </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">2. AI Content Autopilot</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Mass produce publish-ready articles instantly. To prevent hallucinations, the engine performs real-time web searches using Tavily before drafting with GPT-4o and Gemini.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {["Real-time facts injection", "Strict Markdown & H2/H3 formatting", "Natural Keyword Placement"].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-slate-300 text-sm md:text-base">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5 md:mt-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">3. One-Click CMS Publisher</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Connect your WordPress or Webflow site and publish hundreds of drafts immediately or schedule them over time. Featured images are automatically sourced.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {["WordPress REST API & Webflow Integration", "Unsplash API for automatic images", "Cron job scheduling for drip publishing"].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-3 text-slate-300 text-sm md:text-base">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5 md:mt-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[280px] sm:h-[350px] md:h-[400px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 md:p-8 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="relative w-full max-w-sm scale-90 md:scale-100">
                  <div className="bg-navy-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-navy-900 px-3 py-2 md:px-4 md:py-3 border-b border-white/5 flex items-center gap-2">
                      <div className="flex gap-1 md:gap-1.5">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="mx-auto bg-navy-950 px-3 py-1 md:px-4 md:py-1 rounded-md text-[10px] md:text-xs text-slate-400 font-mono flex items-center gap-2">
                        <Layers className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        cms.wordpress.com
                      </div>
                    </div>
                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                          <div className="h-1.5 md:h-2 w-24 md:w-32 bg-white/20 rounded"></div>
                          <div className="h-1.5 md:h-2 w-16 md:w-24 bg-white/10 rounded"></div>
                        </div>
                        <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-teal-500/20 text-teal-400 text-[8px] md:text-[10px] font-bold">PUBLISHED</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                          <div className="h-1.5 md:h-2 w-20 md:w-28 bg-white/20 rounded"></div>
                          <div className="h-1.5 md:h-2 w-14 md:w-20 bg-white/10 rounded"></div>
                        </div>
                        <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-teal-500/20 text-teal-400 text-[8px] md:text-[10px] font-bold">PUBLISHED</div>
                      </div>
                      <div className="flex items-center justify-between opacity-50">
                        <div className="space-y-1.5">
                          <div className="h-1.5 md:h-2 w-28 md:w-36 bg-white/20 rounded"></div>
                          <div className="h-1.5 md:h-2 w-16 md:w-24 bg-white/10 rounded"></div>
                        </div>
                        <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-yellow-500/20 text-yellow-400 text-[8px] md:text-[10px] font-bold">SCHEDULED</div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
        </motion.div>
      </section>

      {/* Agency White-Label Callout */}
      <section className="relative py-24 border-y border-white/5 bg-navy-900/50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
            <Layers className="w-4 h-4 text-teal-400" />
            Built for Agencies
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">Sell SEO Services Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-mint-300">Your Brand</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get the full white-label experience. Custom domains, your logo, your colors. Charge your clients whatever you want, while we handle the AI generation.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Simple, transparent pricing</h2>
          <p className="text-slate-400 text-lg">No hidden API costs. Everything included.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col hover:bg-white/[0.07] transition-colors">
            <h3 className="text-xl font-medium text-slate-300">Starter</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $199
              <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm">Perfect for single projects and small businesses.</p>
            <ul className="mt-8 space-y-4 flex-1">
              {["50 Articles per month", "All AI features included", "WordPress & Webflow Integration", "Standard Support"].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">Get Started</button>
          </div>

          {/* Founder LTD (Highlighted) */}
          <div className="rounded-3xl bg-gradient-to-b from-teal-500/20 to-navy-900/50 border border-teal-500/30 p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(45,212,191,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-navy-950 font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase">Most Popular</div>
            <h3 className="text-xl font-medium text-teal-400">Founder LTD</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $4,999
              <span className="ml-1 text-xl font-medium text-slate-500">/once</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm">For agencies wanting a fully white-labeled software business.</p>
            <ul className="mt-8 space-y-4 flex-1">
              {["500 Articles per month (AI Credits)", "Full White-Label Customization", "Custom Domain (CNAME)", "Sub-account Management", "Priority Support & Setup"].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full py-3 rounded-xl bg-teal-500 text-navy-950 font-bold hover:bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all">Claim Lifetime Deal</button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col hover:bg-white/[0.07] transition-colors">
            <h3 className="text-xl font-medium text-slate-300">Pro</h3>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $299
              <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm">For growing brands and content teams.</p>
            <ul className="mt-8 space-y-4 flex-1">
              {["150 Articles per month", "All AI features included", "WordPress & Webflow Integration", "Advanced Scheduling"].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">Get Started</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-70">
            <Image 
              src="/opticrew-io-bg-remove.png" 
              alt="Opticrew.io" 
              width={200} 
              height={50} 
              className="w-auto h-10" 
            />
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Opticrew.io. All rights reserved.
          </div>
        </div>
      </footer>
      </div> {/* End Landing Content */}

      {/* ════════════════════════════════════════════════════════════
          AUTH OVERLAYS
          ════════════════════════════════════════════════════════════ */}
      
      {authMode !== 'none' && (
        <div className="fixed top-0 left-0 p-6 z-[60]">
          <button onClick={() => setAuthMode('none')} className="text-slate-400 hover:text-white transition-colors">
            <Image src="/opticrew-io-bg-remove.png" alt="Opticrew.io" width={180} height={45} className="w-auto h-8 md:h-10" />
          </button>
        </div>
      )}

      {/* LOGIN OVERLAY */}
      {authMode === 'login' && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in zoom-in-95 duration-500" data-lenis-prevent="true">
          <div className="min-h-full flex items-center justify-center p-4 py-24">
            <div className="w-full max-w-md mx-auto relative">
              <button onClick={() => setAuthMode('none')} className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <X className="w-5 h-5" /> Close
              </button>
            <div className="bg-navy-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome back</h1>
                <p className="text-slate-400">Log in to manage your SEO campaigns</p>
              </div>
              <form className="space-y-4" onSubmit={handleAuthSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs text-teal-400 hover:text-teal-300">Forgot?</a>
                  </div>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Repeat Password</label>
                  <div className="relative">
                    <input type={showRepeatPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all pr-12" />
                    <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                      {showRepeatPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button className="w-full py-3 mt-4 rounded-xl bg-teal-500 text-navy-950 font-bold hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  Log In
                </button>
              </form>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs text-slate-500 uppercase">Or</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              <button className="w-full mt-6 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>
            <p className="text-center text-sm text-slate-400 mt-8">
              Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-teal-400 hover:text-teal-300 font-medium transition-colors">Sign up</button>
            </p>
          </div>
          </div>
        </div>
      )}

      {/* SIGNUP OVERLAY */}
      {authMode === 'signup' && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in zoom-in-95 duration-500" data-lenis-prevent="true">
          <div className="min-h-full flex items-center justify-center p-4 py-24">
            <div className="w-full max-w-lg mx-auto relative">
              <button onClick={() => setAuthMode('none')} className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <X className="w-5 h-5" /> Close
              </button>
            <div className="bg-navy-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create an account</h1>
                <p className="text-slate-400">Join the AI-powered SEO revolution.</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/10 relative z-10">
                <button onClick={() => setSignupTab('individual')} className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${signupTab === 'individual' ? 'bg-white/10 text-white shadow-lg border border-white/5' : 'text-slate-400 hover:text-slate-300'}`}>
                  <User className="w-4 h-4" /> Individual
                </button>
                <button onClick={() => setSignupTab('team')} className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${signupTab === 'team' ? 'bg-white/10 text-white shadow-lg border border-white/5' : 'text-slate-400 hover:text-slate-300'}`}>
                  <Building2 className="w-4 h-4" /> Team / Company
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleAuthSubmit}>
                
                {/* ── Dynamic Fields based on Tab ── */}
                {signupTab === 'team' ? (
                  <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                        Company Name <span className="text-teal-500">*</span>
                      </label>
                      <input type="text" placeholder="Acme Corp" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                        Company Website URL <span className="text-slate-500 text-[10px]">(Optional)</span>
                      </label>
                      <input type="url" placeholder="https://acme.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                          Primary Use Case <span className="text-slate-500 text-[10px]">(Optional)</span>
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option value="agency">Agency / White-label</option>
                          <option value="inhouse">In-house SEO</option>
                          <option value="affiliate">Affiliate Network</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                          Expected Volume <span className="text-slate-500 text-[10px]">(Optional)</span>
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option value="100">0 - 100 articles/mo</option>
                          <option value="500">100 - 1,000 articles/mo</option>
                          <option value="1000+">1,000+ articles/mo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 animate-in slide-in-from-top-2 fade-in duration-300">
                    <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                      Target Website URL <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input type="url" placeholder="https://yourwebsite.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                  </div>
                )}

                {/* ── Standard Fields ── */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                    Full Name <span className="text-teal-500">*</span>
                  </label>
                  <input type="text" placeholder="John Doe" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-between">
                    Email Address <span className="text-teal-500">*</span>
                  </label>
                  <input type="email" placeholder="name@company.com" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Repeat Password</label>
                  <div className="relative">
                    <input type={showRepeatPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all pr-12" />
                    <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                      {showRepeatPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button className="w-full py-3 mt-6 rounded-xl bg-teal-500 text-navy-950 font-bold hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  Create Account
                </button>
              </form>
            </div>
            <p className="text-center text-sm text-slate-400 mt-8 relative z-10">
              Already have an account? <button onClick={() => setAuthMode('login')} className="text-teal-400 hover:text-teal-300 font-medium transition-colors">Log in</button>
            </p>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING OVERLAY — title pinned to top, labels pinned to bottom */}
      {authMode === 'onboarding' && (
        <>
          {/* ── Top caption — safely above the 3D scene ── */}
          <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center pt-16 animate-in fade-in duration-1000">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] text-center px-4">
              Choose your workspace theme
            </h1>
            <p className="text-slate-300 text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">Click a sphere to select your preference.</p>
            <p className="text-teal-400/90 text-sm mt-1 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center">(Don't worry, you can always change this later in settings)</p>
          </div>

          {/* ── Bottom labels — one below each sphere ── */}
          <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-around items-end pb-12 animate-in fade-in duration-1000 delay-500">
            <div className="text-center">
              <p className="text-teal-400 font-bold tracking-widest uppercase text-sm drop-shadow-[0_0_12px_rgba(45,212,191,0.9)]">Dark Theme</p>
            </div>
            <div className="text-center">
              <p className="text-teal-400 font-bold tracking-widest uppercase text-sm drop-shadow-[0_0_12px_rgba(45,212,191,0.9)]">Light Theme</p>
            </div>
          </div>
        </>
      )}

    </main>
  );
}
