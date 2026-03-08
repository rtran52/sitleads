import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req) {
  try {
    const { business } = await req.json();

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a professional copywriter. Write website copy for this local business and return ONLY raw JSON with no markdown, no backticks, no extra text.

Business:
- Name: ${business.name}
- Category: ${business.category}
- Location: ${business.address}
- Rating: ${business.rating} stars (${business.reviews} reviews)
- Phone: ${business.phone}

Return this exact JSON structure:
{
  "headline": "short compelling headline under 10 words",
  "subheadline": "supporting subtitle under 20 words",
  "about": "3-4 sentence about section, warm, local, trustworthy",
  "services": "2-3 sentence services paragraph",
  "cta": "call to action button text under 5 words",
  "review1": "fake but realistic 5-star review from a happy customer",
  "reviewer1": "first name only",
  "review2": "fake but realistic 5-star review from a happy customer",
  "reviewer2": "first name only",
  "review3": "fake but realistic 5-star review from a happy customer",
  "reviewer3": "first name only",
  "faq1q": "common question",
  "faq1a": "helpful answer",
  "faq2q": "common question",
  "faq2a": "helpful answer",
  "faq3q": "common question",
  "faq3a": "helpful answer"
}`,
        },
      ],
    });

    const text = message.content[0]?.text || "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const copy = JSON.parse(cleaned);
    return Response.json({ copy });

  } catch (err) {
    console.error("Generate error:", err);
    return Response.json({
      copy: {
        headline: "Professional Service You Can Trust",
        subheadline: "Serving our community with pride and dedication.",
        about: "We are a trusted local business committed to quality service and customer satisfaction. Our team brings years of experience and genuine care to every job. We treat every customer like family and take pride in our work.",
        services: "We offer a wide range of professional services tailored to meet your needs. Contact us to learn more about how we can help you.",
        cta: "Book Now",
        review1: "Absolutely amazing experience. Will definitely be coming back!",
        reviewer1: "Sarah",
        review2: "Best in town, hands down. Super professional and friendly.",
        reviewer2: "Mike",
        review3: "I've tried others but this place is on another level.",
        reviewer3: "Jessica",
        faq1q: "Are you accepting new customers?",
        faq1a: "Yes! We'd love to hear from you. Give us a call anytime.",
        faq2q: "What are your hours?",
        faq2a: "We're open Monday through Saturday. Call us for exact times.",
        faq3q: "Do I need an appointment?",
        faq3a: "Walk-ins are welcome but appointments are recommended.",
      }
    });
  }
}