'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Phone, Mail, MapPin, BriefcaseMedical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function LeadList({ initialLeads }: { initialLeads: any[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      const matchesSearch = 
        lead.clinic_name.toLowerCase().includes(search.toLowerCase()) || 
        lead.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
        lead.city.toLowerCase().includes(search.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [initialLeads, search, statusFilter]);

  return (
    <>
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search clinics, doctors, cities..." 
            className="pl-9 bg-white border-slate-200 focus-visible:ring-blue-600" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select 
              className="pl-9 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-0">
        {filteredLeads.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center text-slate-500 flex flex-col items-center"
          >
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <BriefcaseMedical className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No leads found</h3>
            <p className="text-sm max-w-md mx-auto">Try adjusting your search or filter to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredLeads.map((lead) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={lead.id} 
                  className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{lead.clinic_name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        lead.status === 'converted' ? 'bg-emerald-100 text-emerald-700' :
                        lead.status === 'demo_scheduled' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.priority === 'hot' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{lead.doctor_name} • {lead.specialty}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                      <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {lead.phone}</div>
                      {lead.email && <div className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {lead.email}</div>}
                      <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lead.city}</div>
                    </div>
                  </div>
                  <Link href={`/doctor-leads/${lead.id}`}>
                    <Button variant="outline" className="shrink-0 text-blue-600 border-blue-200 group-hover:bg-blue-50 transition-colors">
                      View Details
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}
