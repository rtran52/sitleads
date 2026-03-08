"use client";
import { useState } from "react";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  no_website:   { label: "No Website",   color: "#ef4444", bg: "#fef2f2" },
  weak_website: { label: "Weak Website", color: "#f59e0b", bg: "#fffbeb" },
  has_website:  { label: "Has Website",  color: "#10b981", bg: "#f0fdf4" },
};

const COLORS = [
  ["#6366f1","#8b5cf6"],["#8b5cf6","#ec4899"],["#ec4899","#f59e0b"],
  ["#f59e0b","#10b981"],["#10b981","#6366f1"],["#3b82f6","#6366f1"],
  ["#f43f5e","#ec4899"],["#14b8a6","#10b981"],["#f97316","#f59e0b"],["#a855f7","#8b5cf6"]
];
const EMOJIS = ["✂️","🔧","💅","🚗","🐾","🍕","💇","🏋️","🦷","👗"];

function generateHTML(biz: any, copy: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${biz.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1e293b; background: #fff; }
    a { text-decoration: none; }
    nav {
      position: sticky; top: 0; z-index: 100;
      background: #fff; border-bottom: 1px solid #e2e8f0;
      padding: 0 5%; display: flex; align-items: center;
      justify-content: space-between; height: 64px;
    }
    .nav-logo { font-size: 20px; font-weight: 800; color: #1e293b; }
    .nav-cta { background: #6366f1; color: #fff; border: none; padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .hero { background: linear-gradient(135deg, #f8faff 0%, #ede9fe 100%); padding: 96px 5% 80px; text-align: center; }
    .hero-badge { display: inline-block; background: #ede9fe; color: #6d28d9; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 20px; }
    .hero h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #0f172a; line-height: 1.15; margin-bottom: 18px; letter-spacing: -1px; }
    .hero p { font-size: 18px; color: #64748b; max-width: 520px; margin: 0 auto 32px; line-height: 1.7; }
    .hero-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-primary { background: #6366f1; color: #fff; border: none; padding: 14px 32px; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; }
    .btn-secondary { background: #fff; color: #475569; border: 2px solid #e2e8f0; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .hero-rating { margin-top: 28px; color: #f59e0b; font-size: 15px; font-weight: 600; }
    section { padding: 80px 5%; }
    .section-label { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #6366f1; text-transform: uppercase; margin-bottom: 10px; }
    h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; color: #0f172a; margin-bottom: 16px; letter-spacing: -0.5px; }
    .section-text { font-size: 16px; color: #475569; line-height: 1.8; max-width: 640px; }
    .about { background: #fff; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
    .about-image { background: linear-gradient(135deg, #ede9fe, #ddd6fe); border-radius: 20px; height: 320px; display: flex; align-items: center; justify-content: center; font-size: 80px; }
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
    .stat-card { background: #f8fafc; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; }
    .stat-number { font-size: 28px; font-weight: 900; color: #6366f1; }
    .stat-label { font-size: 13px; color: #64748b; margin-top: 2px; }
    .services { background: #f8fafc; }
    .reviews { background: #fff; }
    .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 32px; }
    .review-card { background: #f8fafc; border-radius: 14px; padding: 24px; border: 1px solid #e2e8f0; }
    .review-stars { color: #f59e0b; font-size: 16px; margin-bottom: 10px; }
    .review-text { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 14px; }
    .review-author { font-size: 13px; font-weight: 700; color: #1e293b; }
    .faq { background: #f8fafc; }
    .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
    .faq-item { background: #fff; border-radius: 14px; padding: 24px; border: 1px solid #e2e8f0; }
    .faq-q { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
    .faq-a { font-size: 14px; color: #64748b; line-height: 1.7; }
    .contact { background: linear-gradient(135deg, #1e1b4b, #312e81); color: #fff; text-align: center; }
    .contact h2 { color: #fff; margin-bottom: 12px; }
    .contact p { color: #a5b4fc; font-size: 16px; margin-bottom: 32px; }
    .contact-cards { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
    .contact-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 16px 24px; color: #fff; font-size: 15px; font-weight: 600; }
    .contact-btn { background: #fff; color: #312e81; border: none; padding: 14px 36px; border-radius: 10px; font-size: 16px; font-weight: 800; cursor: pointer; }
    footer { background: #0f172a; color: #64748b; padding: 24px 5%; text-align: center; font-size: 13px; }
    @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } .faq-grid { grid-template-columns: 1fr; } .about-image { display: none; } }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">${biz.name}</div>
    <button class="nav-cta" onclick="document.querySelector('.contact').scrollIntoView({behavior:'smooth'})">${copy.cta}</button>
  </nav>
  <section class="hero">
    <div class="hero-badge">${biz.category} · ${biz.address.split(",")[1]?.trim() || "Local Business"}</div>
    <h1>${copy.headline}</h1>
    <p>${copy.subheadline}</p>
    <div class="hero-buttons">
      <button class="btn-primary" onclick="document.querySelector('.contact').scrollIntoView({behavior:'smooth'})">${copy.cta}</button>
      <button class="btn-secondary" onclick="window.location.href='tel:${biz.phone}'">📞 ${biz.phone}</button>
    </div>
    ${biz.rating > 0 ? `<div class="hero-rating">★★★★★ ${biz.rating} stars · ${biz.reviews} reviews on Google</div>` : ""}
  </section>
  <section class="about">
    <div class="about-grid">
      <div>
        <div class="section-label">About Us</div>
        <h2>Who We Are</h2>
        <p class="section-text">${copy.about}</p>
        <div class="stat-grid">
          ${biz.rating > 0 ? `<div class="stat-card"><div class="stat-number">${biz.rating}★</div><div class="stat-label">Google Rating</div></div>` : ""}
          ${biz.reviews > 0 ? `<div class="stat-card"><div class="stat-number">${biz.reviews}+</div><div class="stat-label">Happy Customers</div></div>` : ""}
        </div>
      </div>
      <div class="about-image">🏪</div>
    </div>
  </section>
  <section class="services">
    <div class="section-label">What We Offer</div>
    <h2>Our Services</h2>
    <p class="section-text">${copy.services}</p>
  </section>
  <section class="reviews">
    <div class="section-label">Customer Reviews</div>
    <h2>What People Are Saying</h2>
    <div class="reviews-grid">
      <div class="review-card"><div class="review-stars">★★★★★</div><p class="review-text">"${copy.review1}"</p><div class="review-author">— ${copy.reviewer1}</div></div>
      <div class="review-card"><div class="review-stars">★★★★★</div><p class="review-text">"${copy.review2}"</p><div class="review-author">— ${copy.reviewer2}</div></div>
      <div class="review-card"><div class="review-stars">★★★★★</div><p class="review-text">"${copy.review3}"</p><div class="review-author">— ${copy.reviewer3}</div></div>
    </div>
  </section>
  <section class="faq">
    <div class="section-label">FAQ</div>
    <h2>Common Questions</h2>
    <div class="faq-grid">
      <div class="faq-item"><div class="faq-q">${copy.faq1q}</div><div class="faq-a">${copy.faq1a}</div></div>
      <div class="faq-item"><div class="faq-q">${copy.faq2q}</div><div class="faq-a">${copy.faq2a}</div></div>
      <div class="faq-item"><div class="faq-q">${copy.faq3q}</div><div class="faq-a">${copy.faq3a}</div></div>
    </div>
  </section>
  <section class="contact">
    <div class="section-label" style="color:#a5b4fc">Get In Touch</div>
    <h2>Ready to Get Started?</h2>
    <p>${copy.subheadline}</p>
    <div class="contact-cards">
      <div class="contact-card">📞 ${biz.phone}</div>
      <div class="contact-card">📍 ${biz.address}</div>
    </div>
    <button class="contact-btn" onclick="window.location.href='tel:${biz.phone}'">${copy.cta}</button>
  </section>
  <footer>
    <p>© ${new Date().getFullYear()} ${biz.name} · ${biz.address} · Built with SiteLeads</p>
  </footer>
</body>
</html>`;
}

const saveCopyToSupabase = async (business: any, copy: any) => {
  try {
    await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business, copy }),
    });
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  const [tab, setTab] = useState<"search"|"leads">("search");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("San Luis Obispo");
  const [minRating, setMinRating] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [page, setPage] = useState<"main"|"builder"|"preview"|"outreach">("main");
  const [selected, setSelected] = useState<any>(null);
  const [copy, setCopy] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [outreachTab, setOutreachTab] = useState<"email"|"sms"|"call">("email");
  const [approved, setApproved] = useState<Record<string,boolean>>({});
  const [editingField, setEditingField] = useState<string|null>(null);
  const [saving, setSaving] = useState(false);

  const search = async () => {
    setSearched(true);
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
      const data = await res.json();
      const filtered = (data.businesses || []).filter((b: any) => b.rating >= minRating);
      setResults(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveLead = async (biz: any) => {
    if (!leads.find(l => l.id === biz.id)) setLeads([...leads, biz]);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: biz }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openBuilder = async (biz: any) => {
    setSelected(biz);
    setCopy(null);
    setGenerating(true);
    setPage("builder");
    try {
      const existing = await fetch(`/api/sites?place_id=${biz.id}`);
      const existingData = await existing.json();
      if (existingData.sites?.length > 0) {
        const site = existingData.sites[0];
        setCopy({
          ...JSON.parse(site.html_content || '{}'),
          headline: site.headline,
          subheadline: site.subheadline,
          about: site.about_copy,
          services: site.services_copy,
          cta: site.cta_text,
        });
        setGenerating(false);
        return;
      }
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: biz }),
      });
      const data = await res.json();
      if (data.copy) {
        setCopy(data.copy);
        await saveCopyToSupabase(biz, data.copy);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const updateField = async (field: string, value: string) => {
    const newCopy = { ...copy, [field]: value };
    setCopy(newCopy);
    setEditingField(null);
    setSaving(true);
    await saveCopyToSupabase(selected, newCopy);
    setSaving(false);
  };

  const downloadSite = () => {
    if (!selected || !copy) return;
    const html = generateHTML(selected, copy);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.name.toLowerCase().replace(/\s+/g, "-")}-website.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const otab = (id: string) => ({
    background: outreachTab === id ? "#ffffff10" : "transparent",
    color: outreachTab === id ? "#fff" : "#64748b",
    border: "none", padding: "12px 20px", cursor: "pointer",
    fontSize: 13, fontWeight: 600,
    borderBottom: outreachTab === id ? "2px solid #6366f1" : "2px solid transparent",
  } as React.CSSProperties);

  const EditableField = ({ field, label, multiline = false }: { field: string; label: string; multiline?: boolean }) => (
    <div style={{ background:"#1e1e28", border:"1px solid #ffffff0a", borderRadius:12, padding:"14px 18px", marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <div style={{ fontSize:10, color:"#475569", fontWeight:700, letterSpacing:0.8 }}>{label}</div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          {saving && editingField === field && <span style={{ fontSize:10, color:"#6366f1" }}>Saving...</span>}
          {editingField !== field && (
            <span onClick={() => setEditingField(field)} style={{ fontSize:11, color:"#6366f1", cursor:"pointer", background:"#6366f115", border:"1px solid #6366f130", padding:"3px 8px", borderRadius:5 }}>Edit</span>
          )}
        </div>
      </div>
      {editingField === field ? (
        <div>
          {multiline ? (
            <textarea
              defaultValue={copy[field]}
              autoFocus
              rows={4}
              style={{ width:"100%", background:"#0f0f13", border:"1px solid #6366f1", color:"#e2e8f0", borderRadius:6, padding:"8px", fontSize:13, resize:"vertical", outline:"none", boxSizing:"border-box" }}
              onBlur={e => updateField(field, e.target.value)}
            />
          ) : (
            <input
              defaultValue={copy[field]}
              autoFocus
              style={{ width:"100%", background:"#0f0f13", border:"1px solid #6366f1", color:"#e2e8f0", borderRadius:6, padding:"8px", fontSize:13, outline:"none", boxSizing:"border-box" }}
              onBlur={e => updateField(field, e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") updateField(field, (e.target as HTMLInputElement).value); }}
            />
          )}
          <div style={{ fontSize:11, color:"#475569", marginTop:4 }}>Click outside or press Enter to save</div>
        </div>
      ) : (
        <div style={{ fontSize:13, color:"#e2e8f0", lineHeight:1.6 }}>{copy[field]}</div>
      )}
    </div>
  );

  // ── BUILDER PAGE ──────────────────────────────────────────────
  if (page === "builder" && selected) return (
    <div style={{ background:"#0f0f13", minHeight:"100vh", color:"#e2e8f0", fontFamily:"sans-serif", padding:32 }}>
      <button onClick={() => setPage("main")} style={{ background:"#ffffff0a", border:"1px solid #ffffff10", color:"#94a3b8", borderRadius:8, padding:"6px 14px", fontSize:13, cursor:"pointer", marginBottom:24 }}>← Back</button>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", margin:"0 0 4px" }}>AI Website Builder — {selected.name}</h2>
      <p style={{ color:"#64748b", margin:"0 0 24px", fontSize:13 }}>
        {generating ? "Generating..." : "Click any field to edit · Changes auto-save"}
      </p>

      {generating ? (
        <div style={{ background:"#1e1e28", borderRadius:16, padding:64, textAlign:"center", border:"1px solid #6366f130" }}>
          <div style={{ width:48, height:48, border:"3px solid #6366f1", borderTopColor:"transparent", borderRadius:"50%", margin:"0 auto 20px", animation:"spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <div style={{ fontWeight:700, color:"#fff", fontSize:16, marginBottom:8 }}>Claude is building your website...</div>
          <div style={{ color:"#64748b", fontSize:13 }}>Writing headlines, about, services, reviews, FAQ and contact</div>
        </div>
      ) : copy && (
        <>
          <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
            <button onClick={() => setPage("preview")} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"10px 22px", fontSize:14, fontWeight:700, cursor:"pointer" }}>👁 Preview Full Site</button>
            <button onClick={downloadSite} style={{ background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", border:"none", borderRadius:8, padding:"10px 22px", fontSize:14, fontWeight:700, cursor:"pointer" }}>⬇️ Download HTML</button>
            <button onClick={() => setPage("outreach")} style={{ background:"#ffffff0a", color:"#94a3b8", border:"1px solid #ffffff10", borderRadius:8, padding:"10px 16px", fontSize:14, cursor:"pointer" }}>✉️ Draft Outreach</button>
            <button onClick={() => saveLead(selected)} style={{ background: leads.find(l => l.id === selected.id) ? "#10b98120" : "#ffffff0a", color: leads.find(l => l.id === selected.id) ? "#10b981" : "#94a3b8", border:`1px solid ${leads.find(l => l.id === selected.id) ? "#10b98130" : "#ffffff10"}`, borderRadius:8, padding:"10px 16px", fontSize:14, cursor:"pointer" }}>
              {leads.find(l => l.id === selected.id) ? "✓ Saved" : "+ Save Lead"}
            </button>
          </div>

          <EditableField field="headline" label="🎯 HEADLINE" />
          <EditableField field="subheadline" label="📝 SUBHEADLINE" />
          <EditableField field="cta" label="📢 CALL TO ACTION" />
          <EditableField field="about" label="ℹ️ ABOUT SECTION" multiline />
          <EditableField field="services" label="⚙️ SERVICES SECTION" multiline />

          <div style={{ background:"#1e1e28", border:"1px solid #ffffff0a", borderRadius:12, padding:"14px 18px", marginBottom:10 }}>
            <div style={{ fontSize:10, color:"#475569", fontWeight:700, letterSpacing:0.8, marginBottom:10 }}>⭐ AI-GENERATED REVIEWS</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ background:"#0f0f13", borderRadius:8, padding:12, border:"1px solid #ffffff0a" }}>
                  <div style={{ color:"#f59e0b", fontSize:12, marginBottom:4 }}>★★★★★</div>
                  <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.5, marginBottom:6 }}>"{copy[`review${n}`]}"</div>
                  <div style={{ fontSize:11, color:"#64748b", fontWeight:700 }}>— {copy[`reviewer${n}`]}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"#1e1e28", border:"1px solid #ffffff0a", borderRadius:12, padding:"14px 18px" }}>
            <div style={{ fontSize:10, color:"#475569", fontWeight:700, letterSpacing:0.8, marginBottom:10 }}>❓ FAQ SECTION</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ background:"#0f0f13", borderRadius:8, padding:12, border:"1px solid #ffffff0a" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#c7d2fe", marginBottom:4 }}>Q: {copy[`faq${n}q`]}</div>
                  <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>A: {copy[`faq${n}a`]}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ── PREVIEW PAGE ──────────────────────────────────────────────
  if (page === "preview" && selected && copy) return (
    <div style={{ background:"#0f0f13", minHeight:"100vh", fontFamily:"sans-serif" }}>
      <div style={{ background:"#16161d", padding:"12px 24px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid #ffffff0a" }}>
        <button onClick={() => setPage("builder")} style={{ background:"#ffffff0a", border:"1px solid #ffffff10", color:"#94a3b8", borderRadius:8, padding:"6px 14px", fontSize:13, cursor:"pointer" }}>← Back</button>
        <span style={{ color:"#fff", fontWeight:700 }}>Full Website Preview — {selected.name}</span>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          <button onClick={downloadSite} style={{ background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", border:"none", borderRadius:8, padding:"7px 18px", fontSize:12, fontWeight:700, cursor:"pointer" }}>⬇️ Download HTML</button>
          <button style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"7px 18px", fontSize:12, fontWeight:700, cursor:"pointer" }}>🚀 Deploy to Vercel</button>
        </div>
      </div>
      <div style={{ background:"#1e1e28", margin:24, borderRadius:16, overflow:"hidden", border:"1px solid #ffffff10" }}>
        <div style={{ background:"#16161d", padding:"10px 16px", display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid #ffffff0a" }}>
          {["#ef4444","#f59e0b","#10b981"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
          <div style={{ flex:1, background:"#0f0f13", borderRadius:5, padding:"3px 10px", fontSize:11, color:"#475569", marginLeft:6 }}>
            {selected.name.toLowerCase().replace(/\s+/g,"")}.com
          </div>
        </div>
        <iframe srcDoc={generateHTML(selected, copy)} style={{ width:"100%", height:"80vh", border:"none" }} title="Website Preview" />
      </div>
    </div>
  );

  // ── OUTREACH PAGE ──────────────────────────────────────────────
  if (page === "outreach" && selected) return (
    <div style={{ background:"#0f0f13", minHeight:"100vh", color:"#e2e8f0", fontFamily:"sans-serif", padding:32 }}>
      <button onClick={() => setPage("main")} style={{ background:"#ffffff0a", border:"1px solid #ffffff10", color:"#94a3b8", borderRadius:8, padding:"6px 14px", fontSize:13, cursor:"pointer", marginBottom:24 }}>← Back</button>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", margin:"0 0 4px" }}>Outreach — {selected.name}</h2>
      <p style={{ color:"#64748b", margin:"0 0 24px", fontSize:13 }}>Review and approve before sending</p>
      <div style={{ background:"#1e1e28", borderRadius:16, border:"1px solid #ffffff0a", overflow:"hidden" }}>
        <div style={{ display:"flex", borderBottom:"1px solid #ffffff0a" }}>
          {(["email","sms","call"] as const).map(t => (
            <button key={t} onClick={() => setOutreachTab(t)} style={otab(t)}>
              {t === "email" ? "✉️ Email" : t === "sms" ? "💬 SMS" : "📞 Call Script"}
            </button>
          ))}
        </div>
        <div style={{ padding:28 }}>
          {approved[`${selected.id}-${outreachTab}`] && (
            <div style={{ background:"#10b98115", border:"1px solid #10b98130", borderRadius:8, padding:"10px 16px", marginBottom:16, fontSize:13, color:"#10b981", fontWeight:600 }}>✓ Approved — Ready to send</div>
          )}
          {outreachTab === "email" && (
            <div>
              <div style={{ fontSize:11, color:"#64748b", fontWeight:700, marginBottom:6 }}>SUBJECT</div>
              <div style={{ background:"#0f0f13", border:"1px solid #ffffff0a", borderRadius:8, padding:"10px 14px", fontSize:14, color:"#e2e8f0", marginBottom:16 }}>Free website for {selected.name} — ready to launch today</div>
              <div style={{ fontSize:11, color:"#64748b", fontWeight:700, marginBottom:6 }}>BODY</div>
              <div style={{ background:"#0f0f13", border:"1px solid #ffffff0a", borderRadius:8, padding:16, fontSize:14, color:"#cbd5e1", lineHeight:1.8 }}>
                Hi there,<br /><br />
                I came across {selected.name} on Google —{selected.rating > 0 ? ` ${selected.rating} stars and ${selected.reviews} reviews is incredible!` : ""} I noticed you don't have a website yet, so I built a free draft for you — complete with your services, about section, reviews, and contact info.<br /><br />
                Can I send you a preview link? No cost, no strings attached.<br /><br />
                Best,<br />[Your Name]<br />[Your Phone]
              </div>
            </div>
          )}
          {outreachTab === "sms" && (
            <div>
              <div style={{ fontSize:11, color:"#64748b", fontWeight:700, marginBottom:6 }}>MESSAGE</div>
              <div style={{ background:"#0f0f13", border:"1px solid #ffffff0a", borderRadius:8, padding:16, fontSize:14, color:"#cbd5e1", lineHeight:1.8, maxWidth:360 }}>
                Hi! I saw {selected.name} on Google — amazing reviews! I built a free website for you with your services, reviews, and contact info. Mind if I send a preview link? — [Your Name]
              </div>
              <div style={{ fontSize:11, color:"#f59e0b", marginTop:10 }}>⚠️ Ensure you have consent before texting business numbers.</div>
            </div>
          )}
          {outreachTab === "call" && (
            <div>
              {[
                ["OPENER", `"Hi, is this ${selected.name}? My name is [Name], I'm a local web designer."`],
                ["HOOK", `"I noticed you don't have a website yet. I actually built a full one for you — hero section, services, reviews, contact page — would you have 30 seconds?"`],
                ["VALUE PROP", `"${selected.rating > 0 ? `You've got ${selected.rating} stars and ${selected.reviews} reviews — a` : "A"} professional website would help people find you on Google and contact you directly."`],
                ["CLOSE", `"Can I text or email you a preview link? It's a full website, completely free, no obligation."`],
              ].map(([label, text]) => (
                <div key={label} style={{ marginBottom:14 }}>
                  <div style={{ fontSize:10, color:"#6366f1", fontWeight:700, letterSpacing:0.8, marginBottom:5 }}>{label}</div>
                  <div style={{ background:"#0f0f13", border:"1px solid #ffffff0a", borderRadius:8, padding:"12px 14px", fontSize:14, color:"#e2e8f0", fontStyle:"italic", lineHeight:1.7 }}>{text}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"flex", gap:8, marginTop:20, paddingTop:20, borderTop:"1px solid #ffffff0a" }}>
            <button onClick={() => setApproved(p => ({ ...p, [`${selected.id}-${outreachTab}`]: true }))} style={{ background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", border:"none", borderRadius:8, padding:"9px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>✓ Approve</button>
            <button style={{ background:"#ffffff0a", color:"#94a3b8", border:"1px solid #ffffff10", borderRadius:8, padding:"9px 16px", fontSize:13, cursor:"pointer" }}>✏️ Edit</button>
            <button style={{ background:"#ef444410", color:"#ef4444", border:"1px solid #ef444420", borderRadius:8, padding:"9px 16px", fontSize:13, cursor:"pointer" }}>✗ Skip</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── MAIN PAGE ──────────────────────────────────────────────────
  return (
    <div style={{ background:"#0f0f13", minHeight:"100vh", color:"#e2e8f0", fontFamily:"sans-serif" }}>
      <div style={{ background:"#16161d", borderBottom:"1px solid #ffffff0f", padding:"0 28px", display:"flex", alignItems:"center", height:56, gap:8, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:20 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚡</div>
          <span style={{ fontWeight:800, fontSize:15, color:"#fff" }}>SiteLeads</span>
          <span style={{ background:"#6366f120", color:"#818cf8", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:4 }}>BETA</span>
        </div>
        {(["search","leads"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab===t ? "#ffffff0f" : "transparent", border:"none", color: tab===t ? "#fff" : "#94a3b8", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>
            {t === "search" ? "🔍 Lead Finder" : `📋 Saved Leads${leads.length > 0 ? ` (${leads.length})` : ""}`}
          </button>
        ))}
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 24px" }}>
        {tab === "search" && (
          <>
            {!searched && (
              <div style={{ textAlign:"center", padding:"40px 0 32px" }}>
                <h1 style={{ fontSize:38, fontWeight:900, margin:"0 0 10px", background:"linear-gradient(135deg,#fff 40%,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-1 }}>Find Businesses Without Websites</h1>
                <p style={{ color:"#64748b", fontSize:15, margin:0 }}>Search local businesses, detect missing websites, generate full sites in minutes.</p>
              </div>
            )}
            <div style={{ background:"#1e1e28", border:"1px solid #ffffff0f", borderRadius:16, padding:20, marginBottom:24 }}>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="barbers, plumbers, nail salons..." style={{ flex:2, minWidth:160, background:"#0f0f13", border:"1px solid #ffffff15", color:"#e2e8f0", borderRadius:8, padding:"9px 12px", fontSize:14, outline:"none" }} />
                <input value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="City" style={{ flex:1, minWidth:130, background:"#0f0f13", border:"1px solid #ffffff15", color:"#e2e8f0", borderRadius:8, padding:"9px 12px", fontSize:14, outline:"none" }} />
                <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} style={{ background:"#0f0f13", border:"1px solid #ffffff15", color:"#e2e8f0", borderRadius:8, padding:"9px 12px", fontSize:14, outline:"none" }}>
                  <option value={0}>Any Rating</option>
                  <option value={4}>4.0+</option>
                  <option value={4.5}>4.5+</option>
                  <option value={4.8}>4.8+</option>
                </select>
                <button onClick={search} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"9px 22px", fontSize:14, fontWeight:700, cursor:"pointer" }}>{loading ? "Searching..." : "Search →"}</button>
              </div>
              <div style={{ marginTop:12, display:"flex", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, color:"#475569" }}>Try:</span>
                {["barbers","plumbers","nail salons","pet groomers","dentists","restaurants"].map(q => (
                  <button key={q} onClick={() => setQuery(q)} style={{ background:"#ffffff08", border:"1px solid #ffffff10", color:"#94a3b8", borderRadius:6, padding:"2px 10px", fontSize:11, cursor:"pointer" }}>{q}</button>
                ))}
              </div>
            </div>

            {loading && (
              <div style={{ textAlign:"center", padding:40, color:"#64748b" }}>
                <div style={{ width:32, height:32, border:"3px solid #6366f1", borderTopColor:"transparent", borderRadius:"50%", margin:"0 auto 12px", animation:"spin 0.8s linear infinite" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                Searching real businesses...
              </div>
            )}

            {searched && !loading && (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <span style={{ fontWeight:700 }}>{results.length} businesses found in {city}</span>
                  <div style={{ display:"flex", gap:12, fontSize:12 }}>
                    {Object.entries(STATUS_CONFIG).map(([k,v]) => (
                      <span key={k} style={{ color:v.color }}>● {results.filter(r => r.status === k).length} {v.label}</span>
                    ))}
                  </div>
                </div>
                {results.length === 0 && (
                  <div style={{ background:"#1e1e28", border:"1px dashed #ffffff15", borderRadius:16, padding:40, textAlign:"center", color:"#475569" }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>🔍</div>
                    <div style={{ fontWeight:700, marginBottom:4 }}>No results found</div>
                    <div style={{ fontSize:13 }}>Try a different search term or city</div>
                  </div>
                )}
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {results.map((biz, i) => (
                    <div key={biz.id} style={{ background:"#1e1e28", border:"1px solid #ffffff0a", borderRadius:14, padding:"18px 22px", display:"flex", alignItems:"center", gap:16 }}>
                      <div style={{ width:44, height:44, borderRadius:10, flexShrink:0, background:`linear-gradient(135deg,${COLORS[i%10][0]},${COLORS[i%10][1]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{EMOJIS[i%10]}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                          <span style={{ fontWeight:800, color:"#fff", fontSize:15 }}>{biz.name}</span>
                          <span style={{ background:STATUS_CONFIG[biz.status].bg, color:STATUS_CONFIG[biz.status].color, border:`1px solid ${STATUS_CONFIG[biz.status].color}30`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{STATUS_CONFIG[biz.status].label}</span>
                        </div>
                        <div style={{ fontSize:12, color:"#64748b", marginBottom:4 }}>📍 {biz.address} · 📞 {biz.phone}</div>
                        {biz.rating > 0 && <div style={{ fontSize:12, color:"#f59e0b" }}>★ {biz.rating} <span style={{ color:"#475569" }}>({biz.reviews} reviews)</span></div>}
                      </div>
                      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                        <button onClick={() => saveLead(biz)} style={{ background: leads.find(l => l.id === biz.id) ? "#10b98120" : "#ffffff0a", color: leads.find(l => l.id === biz.id) ? "#10b981" : "#94a3b8", border:`1px solid ${leads.find(l => l.id === biz.id) ? "#10b98130" : "#ffffff10"}`, borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{leads.find(l => l.id === biz.id) ? "✓ Saved" : "+ Save"}</button>
                        {biz.status !== "has_website" && <button onClick={() => openBuilder(biz)} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>⚡ Build Site</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {tab === "leads" && (
          <>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", margin:"0 0 4px" }}>Saved Leads</h2>
            <p style={{ color:"#64748b", fontSize:14, margin:"0 0 20px" }}>{leads.length} businesses saved</p>
            {leads.length === 0 ? (
              <div style={{ background:"#1e1e28", border:"1px dashed #ffffff15", borderRadius:16, padding:48, textAlign:"center", color:"#475569" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>📋</div>
                <div style={{ fontWeight:700, marginBottom:4 }}>No leads saved yet</div>
                <div style={{ fontSize:13 }}>Go to Lead Finder and save businesses to target</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {leads.map((biz, i) => (
                  <div key={biz.id} style={{ background:"#1e1e28", border:"1px solid #ffffff0a", borderRadius:14, padding:"18px 22px", display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:42, height:42, borderRadius:10, background:`linear-gradient(135deg,${COLORS[i%10][0]},${COLORS[i%10][1]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{EMOJIS[i%10]}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, color:"#fff", marginBottom:4 }}>{biz.name}</div>
                      <div style={{ fontSize:12, color:"#64748b" }}>{biz.phone} · <span style={{ color:STATUS_CONFIG[biz.status].color }}>{STATUS_CONFIG[biz.status].label}</span></div>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      {biz.status !== "has_website" && <button onClick={() => openBuilder(biz)} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>⚡ Build Site</button>}
                      <button onClick={() => { setSelected(biz); setPage("outreach"); }} style={{ background:"#ffffff0a", color:"#94a3b8", border:"1px solid #ffffff10", borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer" }}>✉️ Outreach</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}