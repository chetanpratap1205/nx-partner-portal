'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPartnerProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('growth_partners')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching partner profile:', error);
    return null;
  }

  return data;
}

export async function createDoctorLead(formData: FormData) {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) {
    return { error: 'Unauthorized' };
  }

  const doctor_name = formData.get('doctor_name') as string;
  const clinic_name = formData.get('clinic_name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const specialty = formData.get('specialty') as string;
  const city = formData.get('city') as string;
  const address = formData.get('address') as string;
  const source = formData.get('source') as string;
  const priority = formData.get('priority') as string;

  const { data: lead, error: leadError } = await supabase
    .from('doctor_leads')
    .insert({
      assigned_to: partner.id,
      doctor_name,
      clinic_name,
      phone,
      email,
      specialty,
      city,
      address,
      source,
      status: 'new',
      priority,
    })
    .select()
    .single();

  if (leadError) {
    console.error('Error creating lead:', leadError);
    return { error: leadError.message };
  }

  // Create initial activity log
  const { error: activityError } = await supabase
    .from('lead_activities')
    .insert({
      lead_id: lead.id,
      partner_id: partner.id,
      type: 'note',
      notes: 'Lead created in system',
      new_status: 'new'
    });

  if (activityError) {
    console.error('Error logging activity:', activityError);
  }

  revalidatePath('/doctor-leads');
  return { success: true, lead };
}

export async function updatePartnerProfile(formData: FormData) {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) {
    return { error: 'Unauthorized' };
  }

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const city = formData.get('city') as string;
  const region = formData.get('region') as string;

  const { error } = await supabase
    .from('growth_partners')
    .update({ name, phone, city, region })
    .eq('id', partner.id);

  if (error) {
    console.error('Error updating profile:', error);
    return { error: error.message };
  }

  revalidatePath('/profile');
  return { success: true };
}

export async function logLeadActivity(formData: FormData) {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) {
    return { error: 'Unauthorized' };
  }

  const lead_id = formData.get('lead_id') as string;
  const type = formData.get('type') as string;
  const notes = formData.get('notes') as string;
  const new_status = formData.get('new_status') as string;
  const current_status = formData.get('current_status') as string;

  // Verify lead belongs to partner
  const { data: lead, error: leadError } = await supabase
    .from('doctor_leads')
    .select('id, status')
    .eq('id', lead_id)
    .eq('assigned_to', partner.id)
    .single();

  if (leadError || !lead) {
    return { error: 'Lead not found or unauthorized' };
  }

  // Insert activity
  const { error: activityError } = await supabase
    .from('lead_activities')
    .insert({
      lead_id,
      partner_id: partner.id,
      type,
      notes,
      previous_status: current_status,
      new_status: new_status !== current_status ? new_status : null,
    });

  if (activityError) {
    console.error('Error logging activity:', activityError);
    return { error: activityError.message };
  }

  // Update lead status if changed
  if (new_status && new_status !== current_status) {
    const { error: updateError } = await supabase
      .from('doctor_leads')
      .update({ status: new_status })
      .eq('id', lead_id);
      
    if (updateError) {
      console.error('Error updating lead status:', updateError);
    }
  }

  revalidatePath('/doctor-leads');
  revalidatePath(`/doctor-leads/${lead_id}`);
  return { success: true };
}

export async function updateLeadStatusDirectly(leadId: string, newStatus: string) {
  const supabase = await createClient();
  const partner = await getPartnerProfile();

  if (!partner) return { error: 'Unauthorized' };

  // Verify lead belongs to partner
  const { data: lead, error: leadError } = await supabase
    .from('doctor_leads')
    .select('id, status')
    .eq('id', leadId)
    .eq('assigned_to', partner.id)
    .single();

  if (leadError || !lead) return { error: 'Lead not found' };

  if (lead.status !== newStatus) {
    const { error: updateError } = await supabase
      .from('doctor_leads')
      .update({ status: newStatus })
      .eq('id', leadId);
      
    if (updateError) return { error: updateError.message };

    // Log the activity automatically
    await supabase.from('lead_activities').insert({
      lead_id: leadId,
      partner_id: partner.id,
      type: 'status_change',
      notes: `Moved to ${newStatus.replace('_', ' ')}`,
      previous_status: lead.status,
      new_status: newStatus,
    });
  }

  revalidatePath('/dashboard/doctor-leads');
  return { success: true };
}
