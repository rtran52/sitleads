import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { business_place_id, business_name, customer_name, customer_email, customer_phone, message } = await req.json();

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        business_place_id,
        business_name,
        customer_name,
        customer_email,
        customer_phone,
        message,
        status: 'new'
      })
      .select();

    if (error) throw error;
    return Response.json({ success: true, booking: data[0] });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('place_id');

    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (placeId) query = query.eq('business_place_id', placeId);

    const { data, error } = await query;
    if (error) throw error;
    return Response.json({ bookings: data });

  } catch (err) {
    console.error('Get bookings error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}