export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const city = searchParams.get("city") || "";

  const res = await fetch(
    `https://places.googleapis.com/v1/places:searchText`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.primaryTypeDisplayName",
      },
      body: JSON.stringify({
        textQuery: `${query} in ${city}`,
        maxResultCount: 10,
      }),
    }
  );

  const data = await res.json();

  const businesses = (data.places || []).map((p) => ({
    id: p.id,
    name: p.displayName?.text || "Unknown",
    category: p.primaryTypeDisplayName?.text || "Business",
    address: p.formattedAddress || "",
    phone: p.nationalPhoneNumber || "No phone listed",
    rating: p.rating || 0,
    reviews: p.userRatingCount || 0,
    website: p.websiteUri || null,
    status: !p.websiteUri
      ? "no_website"
      : ["wixsite","squarespace","weebly","godaddysites"].some(x => p.websiteUri.includes(x))
      ? "weak_website"
      : "has_website",
    services: [],
  }));

  return Response.json({ businesses });
}