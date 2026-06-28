"use client";

import Link from "next/link";
import { LayoutDashboard, Megaphone, FileText, Puzzle, Settings, Coins, LogOut, Bell, Search, Sparkles, Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1628] text-slate-700 dark:text-slate-300 flex">
      {/* MOBILE OVERLAY */}
      <div 
        className={`md:hidden fixed inset-0 bg-navy-950/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsSidebarOpen(false)} 
      />

      {/* ── SIDEBAR ── */}
      <aside className={`bg-white dark:bg-[#0D1F3C] border-r border-slate-200 dark:border-white/5 flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}`}>
        <div className={`h-20 flex items-center px-6 border-b border-slate-200 dark:border-white/5`}>
          <Link href="/overview" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <span className={`text-xl font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
              Opticrew<span className="text-teal-400">.io</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 relative">
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 px-2 whitespace-nowrap">Main Menu</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}
          
          <NavItem href="/overview" icon={<LayoutDashboard className="w-5 h-5 text-teal-400" />} label="Overview" isOpen={isSidebarOpen} active={true} />
          <NavItem href="/campaigns" icon={<Megaphone className="w-5 h-5" />} label="Campaigns" isOpen={isSidebarOpen} />
          <NavItem href="/articles" icon={<FileText className="w-5 h-5" />} label="Articles" isOpen={isSidebarOpen} />
          
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2 whitespace-nowrap">Configuration</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}
          
          <NavItem href="/integrations" icon={<Puzzle className="w-5 h-5" />} label="CMS Integrations" isOpen={isSidebarOpen} />
          <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Tenant Settings" isOpen={isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/5">
          <Link 
            href="/"
            className={`w-full flex items-center px-3 py-2.5 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group relative`}
          >
            <div className={`shrink-0 flex items-center justify-center transition-all duration-300 ${isSidebarOpen ? 'w-5' : 'w-full'}`}>
              <LogOut className="w-5 h-5" />
            </div>
            <span className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? 'opacity-100 ml-3 max-w-[200px]' : 'opacity-0 ml-0 max-w-0'}`}>
              Logout
            </span>
            {!isSidebarOpen && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 dark:bg-[#152B50] text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] flex items-center hidden md:flex">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 dark:bg-[#152B50] rotate-45"></div>
                Logout
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* ── TOPBAR ── */}
        <header className="h-20 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0A1628]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-96 hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search campaigns, articles..." 
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />

            {/* Credit Gate Indicator */}
            <Link href="/credits" className="flex items-center gap-3 bg-slate-100 dark:bg-[#152B50] border border-slate-200 dark:border-white/10 px-3 md:px-4 py-1.5 rounded-full hover:border-teal-500/30 transition-colors group">
              <Coins className="w-4 h-4 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="hidden md:block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold leading-none tracking-wider">AI Credits</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">4,950 <span className="text-slate-400 dark:text-slate-500 font-normal hidden md:inline">/ 5,000</span></span>
              </div>
            </Link>
            
            <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white dark:border-[#0A1628]"></span>
            </button>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">John Doe</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Apex Marketing</div>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0D1F3C] flex items-center justify-center">
                  <UserIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className="p-4 md:p-8 flex-1 w-full max-w-[100vw]">
          {children}
        </div>
      </main>
    </div>
  );
}

// ── CUSTOM COMPONENTS ──

function NavItem({ href, icon, label, isOpen, active = false }: any) {
  return (
    <Link 
      href={href} 
      className={`relative group flex items-center px-3 py-2.5 rounded-xl font-medium transition-colors ${active ? 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
    >
      <div className={`shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'w-5' : 'w-full'}`}>
        {icon}
      </div>
      <span className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'opacity-100 ml-3 max-w-[200px]' : 'opacity-0 ml-0 max-w-0'}`}>
        {label}
      </span>
      {!isOpen && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 dark:bg-[#152B50] text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] hidden md:flex items-center">
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 dark:bg-[#152B50] rotate-45"></div>
          {label}
        </div>
      )}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
