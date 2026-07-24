'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { createDoctorLead } from '../actions';

export function CreateLeadDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await createDoctorLead(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setOpen(false);
    }
    
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11">
          <Plus className="w-4 h-4 mr-2" /> Add New Lead
        </Button>
      } />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor Lead</DialogTitle>
          <DialogDescription>
            Enter the details of the clinic or doctor you are prospecting.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctor_name">Doctor Name *</Label>
              <Input id="doctor_name" name="doctor_name" required placeholder="Dr. John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinic_name">Clinic Name *</Label>
              <Input id="clinic_name" name="clinic_name" required placeholder="City Care Clinic" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" required placeholder="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="dr@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty *</Label>
              <Input id="specialty" name="specialty" required placeholder="Cardiologist, Dentist..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input id="city" name="city" required placeholder="Mumbai" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input id="address" name="address" placeholder="123 Main St..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="source">Source *</Label>
              <select 
                id="source" 
                name="source" 
                required 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="field_visit">Field Visit</option>
                <option value="online">Online / Social Media</option>
                <option value="referral">Referral</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="priority">Priority *</Label>
              <select 
                id="priority" 
                name="priority" 
                required 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="normal">Normal</option>
                <option value="cold">Cold</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? "Saving..." : "Save Lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
