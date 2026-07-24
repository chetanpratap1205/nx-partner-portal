"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { OBJECTIONS, Objection } from "@/data/objections";
import { Search, Sparkles, Copy, Check, Volume2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ObjectionHandler() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  
  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const filteredObjections = useMemo(() => {
    if (!query.trim()) return OBJECTIONS;
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return OBJECTIONS.filter(obj => {
      // Check if any trigger word matches any search term
      const matchesTrigger = obj.triggerWords.some(word => 
        searchTerms.some(term => word.includes(term) || term.includes(word))
      );
      
      const matchesText = obj.doctorSays.toLowerCase().includes(query.toLowerCase());
      
      return matchesTrigger || matchesText;
    });
  }, [query]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    if (isSpeaking === id) {
      setIsSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(null);
    
    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] max-h-[800px] border border-slate-200 shadow-xl rounded-2xl overflow-hidden bg-slate-50">
      {/* Search Header */}
      <div className="bg-white p-6 border-b border-slate-200 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">NX Intelligence</h2>
              <p className="text-sm text-slate-500 font-medium">Type what the doctor said. We'll give you the perfect rebuttal.</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g. 'It's too expensive' or 'I already use Practo'"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-700 font-medium transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Sparkles className="absolute right-4 text-indigo-400 w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="max-w-2xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredObjections.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-slate-500 text-lg">No exact match found.</p>
                <p className="text-slate-400 text-sm mt-2">Try using simpler keywords like 'cost', 'data', or 'time'.</p>
              </motion.div>
            ) : (
              filteredObjections.map((objection) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={objection.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Doctor's Objection */}
                  <div className="bg-red-50/50 p-4 border-b border-red-100 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">Dr.</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 block">
                        The Objection
                      </span>
                      <p className="text-slate-700 font-medium text-lg leading-snug">"{objection.doctorSays}"</p>
                    </div>
                  </div>

                  {/* NX Rebuttal */}
                  <div className="p-5 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-indigo-600 font-bold text-sm">NX</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                          The Perfect Rebuttal
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-full uppercase">
                          Tone: {objection.tone}
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {objection.rebuttal}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => handleCopy(objection.rebuttal, objection.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                            copiedId === objection.id 
                              ? "bg-emerald-100 text-emerald-700" 
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {copiedId === objection.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedId === objection.id ? "Copied!" : "Copy Script"}
                        </button>
                        
                        <button
                          onClick={() => handleSpeak(objection.rebuttal, objection.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                            isSpeaking === objection.id
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <Volume2 className={`w-4 h-4 ${isSpeaking === objection.id ? 'animate-pulse' : ''}`} />
                          {isSpeaking === objection.id ? "Stop Listening" : "Listen to Delivery"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
