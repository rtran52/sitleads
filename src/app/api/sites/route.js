import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { business, copy } = await req.json();

    const { data, error } = await supabase
      .from('generated_sites')
      .upsert({
        business_place_id: business.id,
        headline: copy.headline,
        subheadline: copy.subheadline,
        about_copy: copy.about,
        services_copy: copy.services,
        cta_text: copy.cta,
        html_content: JSON.stringify(copy),
        status: 'draft'
      }, { onConflict: 'business_place_id' })
      .select();

    if (error) throw error;
    return Response.json({ success: true, site: data[0] });

  } catch (err) {
    console.error('Save site error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('place_id');

    const query = supabase.from('generated_sites').select('*');
    if (placeId) query.eq('business_place_id', placeId);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return Response.json({ sites: data });

  } catch (err) {
    console.error('Get sites error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}