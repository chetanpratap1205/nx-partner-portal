import { createClient } from '@supabase/supabase-js';

const url = 'https://iaksabscvjzsychzlwae.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlha3NhYnNjdmp6c3ljaHpsd2FlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjEyNDk5OCwiZXhwIjoyMDk3NzAwOTk4fQ.hj2lRbGX6H7ecvn9RVGhUux2aYi684CQECZw71mBDnY';

const supabase = createClient(url, key);

async function test() {
  const { data: cols, error: colsErr } = await supabase.rpc('get_table_info', { table_name: 'growth_partners' });
  console.log("Cols via RPC:", cols, colsErr);
  
  // Alternative: query a row and log it
  const { data: row } = await supabase.from('growth_partners').select('*').limit(1);
  console.log("Row keys:", Object.keys(row?.[0] || {}));
}

test();
