'use client';

import { useState, useMemo, useTransition } from 'react';
import { Search, Phone, Mail, MapPin, MoreVertical, BriefcaseMedical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { updateLeadStatusDirectly } from '@/app/dashboard/actions';

const KANBAN_COLUMNS = [
  { id: 'new', label: 'New Lead', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'demo_scheduled', label: 'Demo Scheduled', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'converted', label: 'Closed Won', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'rejected', label: 'Lost', color: 'bg-red-100 text-red-700 border-red-200' },
];

export function LeadList({ initialLeads }: { initialLeads: any[] }) {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      return lead.clinic_name.toLowerCase().includes(search.toLowerCase()) || 
             lead.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
             lead.city.toLowerCase().includes(search.toLowerCase());
    });
  }, [initialLeads, search]);

  const handleStatusChange = (leadId: string, newStatus: string) => {
    startTransition(async () => {
      await updateLeadStatusDirectly(leadId, newStatus);
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden">
      {/* Kanban Header / Toolbar */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between shrink-0">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search pipeline..." 
            className="pl-9 bg-white border-slate-200 focus-visible:ring-blue-600" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm font-semibold text-slate-500 flex items-center">
          Total Pipeline Value: <span className="ml-2 text-emerald-600 font-bold">₹{(filteredLeads.length * 2500).toLocaleString()}/mo MRR</span>
        </div>
      </div>
      
      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 bg-slate-50">
        <div className="flex gap-6 h-full items-start w-max">
          {KANBAN_COLUMNS.map(column => {
            const columnLeads = filteredLeads.filter(l => l.status === column.id);
            
            return (
              <div key={column.id} className="w-80 flex flex-col h-full max-h-full">
                <div className={`mb-3 px-3 py-2 rounded-lg border flex justify-between items-center ${column.color}`}>
                  <h3 className="font-bold text-sm">{column.label}</h3>
                  <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                    {columnLeads.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pb-6 pr-1 custom-scrollbar">
                  <AnimatePresence>
                    {columnLeads.map((lead) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={lead.id} 
                        className={`bg-white border border-slate-200 shadow-sm rounded-xl p-4 flex flex-col gap-3 group relative hover:border-blue-300 hover:shadow-md transition-all ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 leading-tight">{lead.clinic_name}</h4>
                            <p className="text-xs text-slate-500 font-medium mt-1">{lead.doctor_name}</p>
                          </div>
                          {lead.priority === 'hot' && (
                            <span className="bg-red-100 text-red-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0">
                              Hot
                            </span>
                          )}
                        </div>
                        
                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-400" /> <span className="truncate">{lead.city}</span></div>
                          <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> <span>{lead.phone}</span></div>
                        </div>

                        <div className="flex gap-2 mt-2 pt-3 border-t border-slate-100">
                          <select 
                            className="text-xs border border-slate-200 rounded p-1 flex-1 bg-slate-50 hover:bg-slate-100 cursor-pointer focus:outline-none"
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          >
                            {KANBAN_COLUMNS.map(col => (
                              <option key={col.id} value={col.id}>{col.label}</option>
                            ))}
                          </select>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-full px-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                            title="Log GPS Visit"
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(() => {
                                  alert(`GPS Visit Logged for ${lead.clinic_name}! (+50 NX Points)`);
                                });
                              }
                            }}
                          >
                            <MapPin className="w-4 h-4" />
                          </Button>
                          <Link href={`/dashboard/doctor-leads/${lead.id}`}>
                            <Button variant="outline" size="sm" className="h-full px-2 border-slate-200 text-blue-600 bg-blue-50/50 hover:bg-blue-100">
                              View
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {columnLeads.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl h-24 flex items-center justify-center text-slate-400 text-sm font-medium">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
