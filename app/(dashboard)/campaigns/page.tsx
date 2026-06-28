import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Megaphone, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Campaigns</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your keyword mapping and content generation campaigns.</p>
        </div>
        <Link 
          href="/campaigns/new"
          className="flex items-center justify-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)] shrink-0"
        >
          <Plus className="w-5 h-5" />
          Create Campaign
        </Link>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search campaigns by name or target site..." 
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 appearance-none">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── CAMPAIGN GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <CampaignCard 
          title="Best Coffee Gear 2026"
          site="caffeine.com"
          progress={100}
          generated={250}
          total={250}
          status="completed"
          date="Today, 09:41 AM"
        />
        
        <CampaignCard 
          title="B2B SaaS Reviews"
          site="saasweekly.io"
          progress={60}
          generated={30}
          total={50}
          status="active"
          date="Yesterday, 14:20 PM"
        />
        
        <CampaignCard 
          title="Local Plumber Guides"
          site="apexmarketing.com"
          progress={0}
          generated={0}
          total={100}
          status="queued"
          date="Sep 12, 2026"
        />

        <CampaignCard 
          title="Ultimate VPN Comparisons"
          site="privacyfirst.net"
          progress={100}
          generated={120}
          total={120}
          status="completed"
          date="Sep 10, 2026"
        />

        <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[250px] group hover:border-teal-500/50 hover:bg-teal-500/5 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
            <Plus className="w-6 h-6 text-slate-400 group-hover:text-teal-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Create New Campaign</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">Launch a new keyword mapping and generation engine.</p>
        </div>

      </div>

    </div>
  );
}

function CampaignCard({ title, site, progress, generated, total, status, date }: any) {
  const getStatusDisplay = () => {
    switch(status) {
      case 'completed': return { icon: <CheckCircle2 className="w-3 h-3" />, color: 'text-teal-700 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-500/10', border: 'border-teal-200 dark:border-teal-500/20', label: 'Completed', bar: 'bg-teal-500' };
      case 'active': return { icon: <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20', label: 'Generating', bar: 'bg-blue-500' };
      case 'queued': return { icon: <Clock className="w-3 h-3" />, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', label: 'Queued', bar: 'bg-amber-500' };
      default: return { icon: <AlertCircle className="w-3 h-3" />, color: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-white/10', border: 'border-slate-200 dark:border-white/10', label: 'Unknown', bar: 'bg-slate-500' };
    }
  };

  const style = getStatusDisplay();

  return (
    <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-teal-500/30 transition-colors cursor-pointer flex flex-col justify-between min-h-[250px]">
      
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </div>
        <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{site}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${style.bg} ${style.color} ${style.border} uppercase`}>
              {style.icon} {style.label}
            </span>
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{generated} / {total}</span>
        </div>
        
        <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-3">
          <div className={`h-full ${style.bar} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="text-xs text-slate-400 font-medium">Last updated: {date}</div>
      </div>
    </div>
  );
}
