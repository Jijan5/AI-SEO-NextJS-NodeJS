"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, FileText, Puzzle, Settings, Coins, LogOut, Bell, Search, Sparkles, Menu, Sun, Moon, Map, Crosshair, Share2, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ChatWidget } from "@/components/ChatWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Simulated logic: Is the user part of a team?
  const isTeam = true; 

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Open sidebar by default only on desktop
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isNotificationsOpen || isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isNotificationsOpen, isChatOpen]);

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

        <nav className="flex-1 py-6 px-4 space-y-2 relative overflow-y-auto overscroll-contain scrollbar-none" data-lenis-prevent="true">
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 px-2 whitespace-nowrap">Main Menu</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}
          
          <NavItem href="/overview" icon={<LayoutDashboard className={`w-5 h-5 ${pathname.startsWith('/overview') ? 'text-teal-400' : ''}`} />} label="Overview" isOpen={isSidebarOpen} active={pathname.startsWith('/overview')} onClick={handleNavClick} />
          
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-6 mb-3 px-2 whitespace-nowrap">Strategy & Tools</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}
          
          <NavItem href="/research" icon={<Map className="w-5 h-5" />} label="Keyword Mapper" isOpen={isSidebarOpen} active={pathname.startsWith('/research')} onClick={handleNavClick} />
          <NavItem href="/competitor-spy" icon={<Crosshair className="w-5 h-5" />} label="Competitor Spy" isOpen={isSidebarOpen} active={pathname.startsWith('/competitor-spy')} onClick={handleNavClick} />
          <NavItem href="/link-graph" icon={<Share2 className="w-5 h-5" />} label="Internal Linker" isOpen={isSidebarOpen} active={pathname.startsWith('/link-graph')} onClick={handleNavClick} />
          
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-6 mb-3 px-2 whitespace-nowrap">Content Generation</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}

          <NavItem href="/campaigns" icon={<Megaphone className="w-5 h-5" />} label="Campaigns" isOpen={isSidebarOpen} active={pathname.startsWith('/campaigns')} onClick={handleNavClick} />
          <NavItem href="/articles" icon={<FileText className="w-5 h-5" />} label="Articles & Editor" isOpen={isSidebarOpen} active={pathname.startsWith('/articles')} onClick={handleNavClick} />
          
          {isSidebarOpen ? (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2 whitespace-nowrap">Configuration</div>
          ) : (
            <div className="h-px bg-white/10 my-4 mx-2" />
          )}
          
          <NavItem href="/integrations" icon={<Puzzle className="w-5 h-5" />} label="CMS Integrations" isOpen={isSidebarOpen} active={pathname.startsWith('/integrations')} onClick={handleNavClick} />
          <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Tenant Settings" isOpen={isSidebarOpen} active={pathname.startsWith('/settings')} onClick={handleNavClick} />
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
      <main className={`flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
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
            
            {/* Chat Trigger (Only if Team) */}
            {isTeam && (
              <button 
                onClick={() => setIsChatOpen(true)}
                className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-[#0A1628]"></span>
              </button>
            )}

            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white dark:border-[#0A1628]"></span>
            </button>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            
            <Link href="/profile" className="flex items-center gap-3 cursor-pointer group hover:bg-slate-100 dark:hover:bg-white/5 p-1.5 -m-1.5 rounded-xl transition-colors">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">John Doe</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Apex Marketing</div>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0D1F3C] flex items-center justify-center">
                  <UserIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-900 dark:text-white" />
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className="p-4 md:p-8 flex-1 w-full max-w-[100vw]">
          {children}
        </div>
      </main>

      {/* ── NOTIFICATION MODAL (SLIDE-OVER) ── */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-50"
            />
            
            {/* Slide Over Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white dark:bg-[#0A1628] border-l border-slate-200 dark:border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h2>
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4" data-lenis-prevent="true">
                <NotificationItem 
                  icon={<Megaphone className="w-5 h-5 text-teal-500" />}
                  title="Campaign Completed"
                  desc="Q3 Coffee Reviews has finished generating 250 articles."
                  time="2 mins ago"
                  unread={true}
                />
                <NotificationItem 
                  icon={<Coins className="w-5 h-5 text-amber-500" />}
                  title="Low Credits Warning"
                  desc="You have used 90% of your monthly AI credits."
                  time="1 hour ago"
                  unread={true}
                />
                <NotificationItem 
                  icon={<FileText className="w-5 h-5 text-blue-500" />}
                  title="New Feature Published"
                  desc="We just added Shopify CMS support!"
                  time="2 days ago"
                />
              </div>
              
              <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
                <button className="w-full py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── TEAM CHAT WIDGET ── */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

// ── CUSTOM COMPONENTS ──

function NotificationItem({ icon, title, desc, time, unread = false }: any) {
  return (
    <div className={`p-4 rounded-xl border transition-colors flex gap-4 ${unread ? 'bg-slate-50 dark:bg-white/[0.02] border-teal-500/30' : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-white/5'}`}>
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {title}
          {unread && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
        <span className="text-[10px] text-slate-400 font-medium mt-2 block">{time}</span>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, isOpen, active = false, onClick }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
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
