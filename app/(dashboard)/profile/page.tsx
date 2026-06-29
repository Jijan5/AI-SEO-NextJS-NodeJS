"use client";

import { useState, useEffect } from "react";
import { User, Save, Shield, Users, MessageSquare, MoreVertical, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const [memberToKick, setMemberToKick] = useState<string | null>(null);

  const openKickModal = (name: string) => {
    setMemberToKick(name);
    setIsKickModalOpen(true);
  };

  useEffect(() => {
    if (isKickModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isKickModalOpen]);
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* ── HEADER ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">User Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your personal information and security preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* ── PROFILE SECTION ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Update your account details and avatar.</p>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#0A1628] flex items-center justify-center">
              <User className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            Upload New Avatar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Email Address</label>
            <input type="email" defaultValue="john@apexmarketing.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Job Title</label>
            <input type="text" defaultValue="Head of SEO" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
        </div>
      </div>

      {/* ── SECURITY SECTION ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security & Password</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Keep your account secure.</p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="md:col-start-1 space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Confirm New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
          </div>
        </form>
      </div>

      {/* ── TEAM & WORKSPACE SECTION ── */}
      <div className="bg-white dark:bg-[#0D1F3C] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Team & Workspace</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Invite members to collaborate and chat in real-time.</p>
          </div>
        </div>

        {/* Invite Member */}
        <div className="mb-8 p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="email" 
              placeholder="Enter email to invite..." 
              className="w-full bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-slate-900 dark:text-white"
            />
          </div>
          <button className="bg-teal-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-teal-400 transition-colors whitespace-nowrap text-sm">
            Invite to Team
          </button>
        </div>

        {/* Team List */}
        <div className="space-y-4">
          {/* Leader (Current User) */}
          <div className="flex items-center justify-between p-4 border border-teal-500/30 bg-teal-500/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-bold">
                JD
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  John Doe <span className="text-[10px] uppercase tracking-wider bg-teal-500 text-slate-900 px-2 py-0.5 rounded-full">Leader</span>
                </div>
                <div className="text-xs text-slate-500">john@apexmarketing.com</div>
              </div>
            </div>
          </div>

          {/* Member 1 */}
          <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] rounded-xl hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                AS
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                  <span className="truncate">Alice Smith</span> <span className="text-[10px] uppercase tracking-wider bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full shrink-0">Member</span>
                </div>
                <div className="text-xs text-slate-500 truncate">alice@apexmarketing.com</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openKickModal("Alice Smith")}
                className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Member 2 */}
          <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] rounded-xl hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">
                MJ
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                  <span className="truncate">Mark Johnson</span> <span className="text-[10px] uppercase tracking-wider bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full shrink-0">Member</span>
                </div>
                <div className="text-xs text-slate-500 truncate">mark@apexmarketing.com</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openKickModal("Mark Johnson")}
                className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* ── KICK MEMBER SLIDE-OVER MODAL ── */}
      <AnimatePresence>
        {isKickModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsKickModalOpen(false)}
              className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-[100]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white dark:bg-[#0A1628] border-l border-slate-200 dark:border-white/10 shadow-2xl z-[100] flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Remove Team Member</h2>
                  <p className="text-sm text-slate-500">Revoke access for {memberToKick}</p>
                </div>
                <button 
                  onClick={() => setIsKickModalOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6" data-lenis-prevent="true">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Why are you removing this member?</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <input type="radio" name="kick_reason" className="text-teal-500 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">They stopped working / inactive</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <input type="radio" name="kick_reason" className="text-teal-500 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Not my team anymore / changed roles</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <input type="radio" name="kick_reason" className="text-teal-500 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Other reason</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Additional Notes (Optional)</h3>
                  <textarea 
                    rows={4}
                    placeholder="Provide any additional context for this removal..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all text-slate-900 dark:text-white resize-none"
                  ></textarea>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Warning: This action is permanent. The user will immediately lose access to this workspace and all associated campaigns.
                  </p>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200 dark:border-white/10 flex gap-3">
                <button 
                  onClick={() => setIsKickModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Confirm Removal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
