import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// We use the service role key here because webhooks act on behalf of the system, not a logged-in user.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, data } = body;

    // Example Payload:
    // {
    //   "event": "clinic.upgraded",
    //   "data": {
    //     "lead_id": "uuid-of-lead",
    //     "amount_paid": 2500,
    //     "commission_pct": 20
    //   }
    // }

    if (event === 'clinic.upgraded' && data.lead_id) {
      // 1. Verify lead exists and get partner info
      const { data: lead, error: leadError } = await supabaseAdmin
        .from('doctor_leads')
        .select('assigned_to, status')
        .eq('id', data.lead_id)
        .single();

      if (leadError || !lead) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }

      // 2. Update Lead Status to converted
      if (lead.status !== 'converted') {
        await supabaseAdmin
          .from('doctor_leads')
          .update({ status: 'converted' })
          .eq('id', data.lead_id);

        await supabaseAdmin.from('lead_activities').insert({
          lead_id: data.lead_id,
          partner_id: lead.assigned_to,
          type: 'status_change',
          notes: 'Automated Webhook: Clinic upgraded to paid plan',
          previous_status: lead.status,
          new_status: 'converted',
        });
      }

      // 3. Calculate and insert commission
      const commission_paise = (data.amount_paid * (data.commission_pct / 100)) * 100;

      await supabaseAdmin.from('commission_payouts').insert({
        partner_id: lead.assigned_to,
        lead_id: data.lead_id,
        amount_base_paise: data.amount_paid * 100,
        commission_pct: data.commission_pct,
        commission_paise: commission_paise,
        status: 'pending',
        type: 'first_sale',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString() // 1st of next month
      });

      return NextResponse.json({ success: true, message: 'Commission logged and lead converted' });
    }

    if (event === 'clinic.churn_risk' && data.lead_id) {
      // In a real app, this would update a "churn_risk" flag on the lead
      return NextResponse.json({ success: true, message: 'Churn risk noted' });
    }

    return NextResponse.json({ error: 'Unknown event' }, { status: 400 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
