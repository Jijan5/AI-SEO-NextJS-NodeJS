import { Search, Filter, MoreHorizontal, FileText, CheckCircle2, Clock, Eye, Edit3, Globe } from "lucide-react";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">All Articles</h1>
          <p className="text-slate-500 dark:text-slate-400">View, edit, and manage all your generated SEO content.</p>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles by keyword or title..." 
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 appearance-none">
            <option value="all">All Campaigns</option>
            <option value="1">Q3 Coffee Reviews</option>
            <option value="2">B2B SaaS 2026</option>
          </select>
          <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 appearance-none">
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* ── DATA TABLE ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-6 py-4">Article Title & Keyword</th>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Word Count</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm text-slate-600 dark:text-slate-300">
              
              <ArticleRow 
                title="10 Best Espresso Machines for Home Baristas (2026 Guide)"
                keyword="best espresso machine for home"
                campaign="Q3 Coffee Reviews"
                words={2145}
                status="published"
              />
              <ArticleRow 
                title="How to Choose the Right Coffee Bean Grinder"
                keyword="coffee bean grinder guide"
                campaign="Q3 Coffee Reviews"
                words={1890}
                status="published"
              />
              <ArticleRow 
                title="Top 5 CRM Softwares for Small B2B Agencies"
                keyword="crm for small b2b"
                campaign="B2B SaaS 2026"
                words={2450}
                status="draft"
              />
              <ArticleRow 
                title="Why Your Startup Needs an ERP System Immediately"
                keyword="startup erp system"
                campaign="B2B SaaS 2026"
                words={0}
                status="generating"
              />

            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to 10 of 1,284 articles</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">Previous</button>
            <button className="px-3 py-1 rounded-md bg-teal-500 text-slate-900 font-bold">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}

function ArticleRow({ title, keyword, campaign, words, status }: any) {
  const getStatus = () => {
    switch (status) {
      case 'published': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20 uppercase"><CheckCircle2 className="w-3 h-3" /> Published</span>;
      case 'draft': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/20 uppercase"><FileText className="w-3 h-3" /> Draft</span>;
      case 'generating': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span> Generating</span>;
      default: return null;
    }
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{title}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <span className="font-medium bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">KW</span>
          {keyword}
        </div>
      </td>
      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{campaign}</td>
      <td className="px-6 py-4">
        {words > 0 ? (
          <span className="font-medium text-slate-700 dark:text-slate-300">{words.toLocaleString()} words</span>
        ) : (
          <span className="text-slate-400 italic">Pending...</span>
        )}
      </td>
      <td className="px-6 py-4">
        {getStatus()}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {status === 'published' && (
            <button className="p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors tooltip-trigger" title="View Live">
              <Globe className="w-4 h-4" />
            </button>
          )}
          {status === 'draft' && (
            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors tooltip-trigger" title="Publish Now">
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
          <Link href="/articles/1" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors tooltip-trigger" title="Edit Article">
            <Edit3 className="w-4 h-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
