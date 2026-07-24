'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { logLeadActivity } from '../../actions';

export function ActivityForm({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [notes, setNotes] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await logLeadActivity(formData);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Activity logged successfully!' });
      setNotes(''); // Clear notes on success
      setTimeout(() => setMessage(null), 3000);
    }
    
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900">Log New Activity</h3>
      
      <input type="hidden" name="lead_id" value={leadId} />
      <input type="hidden" name="current_status" value={currentStatus} />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="type">Activity Type</Label>
          <select 
            id="type" 
            name="type" 
            required 
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="note">Note</option>
            <option value="call">Call</option>
            <option value="visit">Field Visit</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="status_change">Status Change</option>
          </select>
        </div>
        
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="new_status">Update Status</Label>
          <select 
            id="new_status" 
            name="new_status" 
            defaultValue={currentStatus}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="demo_scheduled">Demo Scheduled</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes / Details</Label>
        <Input 
          id="notes" 
          name="notes" 
          placeholder="Discussed pricing, scheduled demo for next week..." 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required 
        />
      </div>

      {message && (
        <p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-emerald-600'}`}>
          {message.text}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
        {loading ? "Logging..." : "Log Activity"}
      </Button>
    </form>
  );
}
