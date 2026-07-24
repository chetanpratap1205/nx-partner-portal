'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePartnerProfile } from '../actions';

interface Partner {
  name: string;
  phone: string;
  city: string;
  region: string;
}

export function ProfileForm({ partner }: { partner: Partner }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await updatePartnerProfile(formData);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
    
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={partner.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" defaultValue={partner.phone} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={partner.city} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region / Territory</Label>
          <Input id="region" name="region" defaultValue={partner.region} required />
        </div>
      </div>

      {message && (
        <p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-emerald-600'}`}>
          {message.text}
        </p>
      )}

      <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
        {loading ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
