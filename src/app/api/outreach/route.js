import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { business, method, status, notes } = await req.json();

    const { data, error } = await supabase
      .from('outreach')
      .upsert({
        business_place_id: business.id,
        business_name: business.name,
        method,
        status,
        notes,
      }, { onConflict: 'business_place_id' })
      .select();

    if (error) throw error;
    return Response.json({ success: true, outreach: data[0] });

  } catch (err) {
    console.error('Outreach error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('outreach')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Response.json({ outreach: data });

  } catch (err) {
    console.error('Get outreach error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}