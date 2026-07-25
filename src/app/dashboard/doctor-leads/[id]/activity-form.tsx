'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { logLeadActivity } from '../../actions';
import { ConfettiBurst } from '@/components/confetti-burst';
import { toast } from 'sonner';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function ActivityForm({ leadId, currentStatus }: { leadId: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStatus = formData.get('new_status') as string;
    const isConversion = newStatus === 'converted' && currentStatus !== 'converted';

    startTransition(async () => {
      const result = await logLeadActivity(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        if (isConversion) {
          setShowConfetti(true);
          toast.success('🎉 DEAL CLOSED! Congratulations on the conversion!', { duration: 6000 });
          setTimeout(() => setShowConfetti(false), 5000);
        } else {
          toast.success('Activity logged successfully!');
        }
        setNotes('');
      }
    });
  }

  return (
    <>
      {showConfetti && <ConfettiBurst />}
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Log New Activity
        </h3>

        <input type="hidden" name="lead_id" value={leadId} />
        <input type="hidden" name="current_status" value={currentStatus} />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="type" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Activity Type</Label>
            <select
              id="type"
              name="type"
              required
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <option value="note">📝 Note</option>
              <option value="call">📞 Call</option>
              <option value="visit">🏃 Field Visit</option>
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="status_change">🔄 Status Change</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new_status" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Update Status</Label>
            <select
              id="new_status"
              name="new_status"
              defaultValue={currentStatus}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <option value="new">🔵 New</option>
              <option value="contacted">🟡 Contacted</option>
              <option value="demo_scheduled">🟣 Demo Scheduled</option>
              <option value="converted">🟢 Converted ✓</option>
              <option value="rejected">🔴 Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Notes / Details</Label>
          <Input
            id="notes"
            name="notes"
            placeholder="Discussed pricing, scheduled demo for next week..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            className="bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 h-10"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11"
        >
          {isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging...</>
          ) : (
            'Log Activity'
          )}
        </Button>
      </form>
    </>
  );
}
