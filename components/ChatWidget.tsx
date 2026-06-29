"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Users, Circle, ChevronLeft, Send, Paperclip, Smile, Hash, Image as ImageIcon, File as FileIcon } from "lucide-react";

export function ChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const isTeam = true; 
  const teamMembers = [
    { id: 1, name: "Sarah Connor", role: "Content Lead", online: true, avatar: "bg-purple-500" },
    { id: 2, name: "Mike Ross", role: "SEO Specialist", online: true, avatar: "bg-blue-500" },
    { id: 3, name: "Jane Doe", role: "Copywriter", online: false, avatar: "bg-teal-500" },
  ];
  
  const hasGroupChats = teamMembers.length >= 2;

  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<{sender: string, text: string, time: string, isGif?: boolean, isFile?: boolean}[]>([
    { sender: "Sarah Connor", text: "Hey! Did we finish the keyword map for the coffee campaign?", time: "10:42 AM" },
    { sender: "me", text: "Yes, just exported it. The commercial intent keywords look great.", time: "10:45 AM" }
  ]);
  const [inputText, setInputText] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (val.includes("@")) {
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && attachedFiles.length === 0) return;
    
    // Add file messages
    attachedFiles.forEach(file => {
      setMessages(prev => [...prev, { sender: "me", text: file, time: "Now", isFile: true }]);
    });
    
    // Add text message
    if (inputText.trim()) {
      setMessages(prev => [...prev, { sender: "me", text: inputText, time: "Now" }]);
    }
    
    setInputText("");
    setAttachedFiles([]);
    setShowMentions(false);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          setAttachedFiles(prev => [...prev, "Pasted Image.png"]);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileNames = Array.from(e.dataTransfer.files).map(f => f.name);
      setAttachedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const triggerMockGif = () => {
    setMessages(prev => [...prev, { sender: "me", text: "https://media.giphy.com/media/mock-gif/giphy.gif", time: "Now", isGif: true }]);
  };

  const triggerMockFile = () => {
    setAttachedFiles(prev => [...prev, "SEO_Report.pdf"]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Main Panel Container (Expands left to accommodate WhatsApp style) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.4 }}
            className={`fixed top-0 right-0 bottom-0 z-[60] flex bg-slate-50 dark:bg-[#0A1628] shadow-2xl transition-[width] duration-300 ease-in-out border-l border-slate-200 dark:border-white/10
              ${activeChat ? 'w-full md:w-[850px]' : 'w-full md:w-[350px]'}
            `}
          >
            
            {/* ── CHAT LIST (Left Side on Desktop, slides away or stays hidden underneath on mobile) ── */}
            <div className={`w-full md:w-[350px] shrink-0 flex flex-col bg-white dark:bg-[#0A1628] absolute md:static inset-0 transition-opacity duration-300 z-10 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
              
              {/* Header */}
              <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Team Chat
                </h2>
                {!activeChat && (
                  <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors md:hidden">
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors hidden md:block">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col" data-lenis-prevent="true">
                
                {/* Search */}
                <div className="p-4 shrink-0">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search team or groups..." 
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-teal-500/50 text-slate-900 dark:text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-6">
                  
                  {/* Groups */}
                  {hasGroupChats && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Group Chats
                      </h4>
                      <div className="space-y-1">
                        <button 
                          onClick={() => setActiveChat({ name: "SEO Content Team", isGroup: true })}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors text-left ${activeChat?.name === "SEO Content Team" ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 flex items-center justify-center shrink-0">
                            <Hash className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">SEO Content Team</h5>
                            <p className="text-xs text-slate-500 truncate">Sarah: Yes, just exported it.</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Direct Messages */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                      <Circle className="w-3 h-3" /> Direct Messages
                    </h4>
                    <div className="space-y-1">
                      {teamMembers.map(member => (
                        <button 
                          key={member.id}
                          onClick={() => setActiveChat(member)}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors text-left group ${activeChat?.id === member.id ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                          <div className={`relative w-10 h-10 rounded-full ${member.avatar} flex items-center justify-center text-white font-bold shrink-0`}>
                            {member.name.charAt(0)}
                            {member.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0A1628] rounded-full"></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">{member.name}</h5>
                              {member.id === 1 && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                            </div>
                            <p className="text-xs text-slate-500 truncate">{member.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── ACTIVE CHAT WINDOW (Right Side on Desktop, slides over on mobile) ── */}
            <AnimatePresence>
              {activeChat && (
                <motion.div 
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0, transition: { duration: 0.2 } }}
                  className="flex-1 flex flex-col bg-slate-50 dark:bg-[#0D1F3C] border-l border-slate-200 dark:border-white/10 relative z-20 absolute md:static inset-0 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]"
                >
                  {/* Chat Header */}
                  <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 gap-3 bg-white dark:bg-[#0D1F3C] sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setActiveChat(null)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 md:hidden"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      
                      {activeChat.isGroup ? (
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center border border-teal-200 dark:border-teal-500/30">
                          <Hash className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full ${activeChat.avatar} flex items-center justify-center text-white font-bold relative`}>
                          {activeChat.name.charAt(0)}
                          {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0D1F3C] rounded-full"></div>}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white leading-none">{activeChat.name}</h3>
                        <span className="text-xs text-slate-500 mt-1 block">{activeChat.isGroup ? '3 Members' : activeChat.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4" data-lenis-prevent="true">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col max-w-[85%] ${msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start"}`}>
                        
                        {msg.isFile ? (
                          <div className={`p-3 rounded-2xl text-sm shadow-sm flex items-center gap-3 ${msg.sender === "me" ? "bg-teal-500 text-white rounded-tr-sm" : "bg-white dark:bg-[#152B50] text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-white/5"}`}>
                            <div className="p-2 bg-black/10 rounded-lg"><FileIcon className="w-5 h-5" /></div>
                            <span className="font-bold">{msg.text}</span>
                          </div>
                        ) : msg.isGif ? (
                          <div className={`rounded-2xl overflow-hidden border-4 ${msg.sender === "me" ? "border-teal-500 rounded-tr-sm" : "border-white dark:border-[#152B50] rounded-tl-sm shadow-md"}`}>
                            <div className="w-48 h-32 bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-400 text-xs font-bold uppercase">[GIF Image]</div>
                          </div>
                        ) : (
                          <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "me" ? "bg-teal-500 text-white rounded-tr-sm" : "bg-white dark:bg-[#152B50] text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-white/5"}`}>
                            {msg.text}
                          </div>
                        )}
                        <span className="text-[10px] text-slate-400 mt-1 font-medium px-1">{msg.time}</span>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-white dark:bg-[#0D1F3C] border-t border-slate-200 dark:border-white/10 shrink-0 relative">
                    
                    {/* Attached Files Preview */}
                    {attachedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {attachedFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300">
                            <FileIcon className="w-3 h-3" /> {file}
                            <button onClick={() => setAttachedFiles(f => f.filter((_, idx) => idx !== i))} className="ml-1 text-slate-400 hover:text-rose-500"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* @Mention Popup */}
                    <AnimatePresence>
                      {showMentions && activeChat?.isGroup && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-[#152B50] rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-20"
                        >
                          <div className="p-2 bg-slate-50 dark:bg-black/20 text-xs font-bold text-slate-500 uppercase tracking-wider">Mention Team Member</div>
                          <div className="p-1 max-h-40 overflow-y-auto scrollbar-none" data-lenis-prevent="true">
                            {teamMembers.map(member => (
                              <button key={member.id} onClick={() => { setInputText(inputText + member.name + " "); setShowMentions(false); }} className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors text-left">
                                <div className={`w-6 h-6 rounded-full ${member.avatar} flex items-center justify-center text-white text-[10px] font-bold`}>{member.name.charAt(0)}</div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{member.name}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSend} className="flex items-end gap-2 relative z-10">
                      <div 
                        onPaste={handlePaste}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex-1 bg-slate-50 dark:bg-[#152B50] border border-slate-200 dark:border-white/10 rounded-2xl flex items-end p-1 transition-colors focus-within:border-teal-500/50 relative"
                      >
                        <button type="button" onClick={triggerMockFile} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl transition-colors shrink-0" title="Attach File">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        
                        <input 
                          type="text" 
                          value={inputText}
                          onChange={handleInputChange}
                          placeholder="Type a message... (Drop files here or paste images)" 
                          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 py-2.5 px-1 min-w-0"
                        />

                        {/* Emoji & GIF Triggers */}
                        <div className="flex items-center pr-1 shrink-0">
                          <button type="button" className="p-2 text-slate-400 hover:text-amber-500 rounded-xl transition-colors">
                            <Smile className="w-5 h-5" />
                          </button>
                          <button type="button" onClick={triggerMockGif} className="p-1 text-slate-400 hover:text-teal-500 transition-colors flex items-center justify-center font-black text-[10px] bg-slate-200 dark:bg-white/10 rounded-md h-6 w-8 ml-1">
                            GIF
                          </button>
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={!inputText.trim() && attachedFiles.length === 0}
                        className="bg-teal-500 text-white p-3 rounded-2xl hover:bg-teal-400 transition-colors shadow-lg disabled:opacity-50 disabled:shadow-none shrink-0"
                      >
                        <Send className="w-5 h-5 ml-0.5" />
                      </button>
                    </form>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
