import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { business } = await req.json();

    const { data, error } = await supabase
      .from('leads')
      .upsert({
        business_name: business.name,
        category: business.category,
        address: business.address,
        phone: business.phone,
        rating: business.rating,
        review_count: business.reviews,
        website_status: business.status,
        place_id: business.id,
      }, { onConflict: 'place_id' })
      .select();

    if (error) throw error;
    return Response.json({ success: true, lead: data[0] });

  } catch (err) {
    console.error('Save lead error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Response.json({ leads: data });

  } catch (err) {
    console.error('Get leads error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}