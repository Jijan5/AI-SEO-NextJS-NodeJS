"use client";

import { ArrowUpRight, BarChart3, FileText, Zap, Megaphone, PieChart as PieChartIcon, Activity } from "lucide-react";
import { useState } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const generationData = [
  { name: 'Mon', articles: 120, traffic: 400 },
  { name: 'Tue', articles: 210, traffic: 600 },
  { name: 'Wed', articles: 180, traffic: 800 },
  { name: 'Thu', articles: 290, traffic: 1200 },
  { name: 'Fri', articles: 350, traffic: 1600 },
  { name: 'Sat', articles: 150, traffic: 1100 },
  { name: 'Sun', articles: 110, traffic: 950 },
];

const difficultyData = [
  { name: 'Low', value: 400, color: '#2DD4BF' }, // teal-400
  { name: 'Medium', value: 300, color: '#60A5FA' }, // blue-400
  { name: 'High', value: 150, color: '#F59E0B' }, // amber-500
];

export default function OverviewPage() {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what your AI Crew has been up to.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          <Zap className="w-4 h-4 fill-slate-900" />
          New Campaign
        </button>
      </div>

      {/* ── METRICS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Articles Generated" 
          value="1,284" 
          change="+12.5%" 
          icon={<FileText className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
          bgColor="bg-blue-100 dark:bg-blue-500/10"
          borderColor="border-blue-200 dark:border-blue-500/20"
        />
        <MetricCard 
          title="Active Campaigns" 
          value="12" 
          change="+3" 
          icon={<Megaphone className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
          bgColor="bg-teal-100 dark:bg-teal-500/10"
          borderColor="border-teal-200 dark:border-teal-500/20"
        />
        <MetricCard 
          title="Avg. Traffic Growth" 
          value="34.2%" 
          change="+4.1%" 
          icon={<BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          bgColor="bg-purple-100 dark:bg-purple-500/10"
          borderColor="border-purple-200 dark:border-purple-500/20"
        />
      </div>

      {/* ── CHARTS SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Content Output Trends</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Articles generated vs estimated traffic</p>
            </div>
            
            {/* Chart Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-[#152B50] rounded-lg p-1 border border-slate-200 dark:border-white/5">
              <button 
                onClick={() => setChartType('bar')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${chartType === 'bar' ? 'bg-white dark:bg-[#0A1628] text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <BarChart3 className="w-4 h-4" /> Bar
              </button>
              <button 
                onClick={() => setChartType('line')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${chartType === 'line' ? 'bg-white dark:bg-[#0A1628] text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Activity className="w-4 h-4" /> Line
              </button>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={generationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar yAxisId="left" dataKey="articles" name="Articles Generated" fill="#2DD4BF" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  <Bar yAxisId="right" dataKey="traffic" name="Est. Traffic" fill="#60A5FA" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              ) : (
                <LineChart data={generationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="articles" name="Articles Generated" stroke="#2DD4BF" strokeWidth={3} dot={{ r: 4, fill: '#2DD4BF', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} animationDuration={1500} />
                  <Line yAxisId="right" type="monotone" dataKey="traffic" name="Est. Traffic" stroke="#60A5FA" strokeWidth={3} dot={{ r: 4, fill: '#60A5FA', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} animationDuration={1500} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Keyword Difficulty Pie Chart */}
        <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Keyword Difficulty</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Distribution across active campaigns</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <PieChartIcon className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-1" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">850</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Total KW</span>
            </div>
          </div>
          
          {/* Custom Legend */}
          <div className="flex justify-center gap-4 mt-4">
            {difficultyData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── RECENT CAMPAIGNS ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Campaigns</h2>
          <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Target Site</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm text-slate-600 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Best Coffee Gear 2026</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">caffeine.com</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[100%] rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">250/250</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20 uppercase">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Today, 09:41 AM</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">B2B SaaS Reviews</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">saasweekly.io</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">30/50</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 uppercase flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
                    Generating
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Yesterday, 14:20 PM</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Local Plumber Guides</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">apexmarketing.com</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[0%] rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">0/100</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 uppercase">
                    Queued
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Sep 12, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon, bgColor, borderColor }: any) {
  return (
    <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40 dark:opacity-20 ${bgColor} group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity`}></div>
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bgColor} ${borderColor}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/10 px-2 py-1 rounded-lg border border-teal-200 dark:border-teal-500/20">
          <ArrowUpRight className="w-3 h-3" />
          <span className="text-xs font-bold">{change}</span>
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
      </div>
    </div>
  );
}
