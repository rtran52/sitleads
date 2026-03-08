"use client";
import { useState, useEffect } from "react";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  no_website:   { label: "No Website",   color: "#f87171", bg: "#7f1d1d22", border: "#f8717140" },
  weak_website: { label: "Weak Website", color: "#fbbf24", bg: "#78350f22", border: "#fbbf2440" },
  has_website:  { label: "Has Website",  color: "#34d399", bg: "#064e3b22", border: "#34d39940" },
};

const GRADIENTS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#3b82f6,#6366f1)",
  "linear-gradient(135deg,#10b981,#3b82f6)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
  "linear-gradient(135deg,#14b8a6,#6366f1)",
  "linear-gradient(135deg,#f97316,#ec4899)",
  "linear-gradient(135deg,#a855f7,#3b82f6)",
  "linear-gradient(135deg,#06b6d4,#10b981)",
];
const EMOJIS = ["✂️","🔧","💅","🚗","🐾","🍕","💇","🏋️","🦷","👗"];

const G = {
  bg: "#08090e",
  surface: "#0f1117",
  card: "#13151d",
  border: "#1e2130",
  borderHover: "#2d3148",
  text: "#e8eaf0",
  muted: "#6b7280",
  accent: "#6366f1",
  accentGlow: "#6366f120",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:${G.bg}; color:${G.text}; }
  ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#0f1117; } ::-webkit-scrollbar-thumb { background:#2d3148; border-radius:4px; }
  input,select,textarea { font-family:'Plus Jakarta Sans',sans-serif; }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation: fadeUp 0.35s ease forwards; }
  .biz-card { transition:all 0.15s ease; }
  .biz-card:hover { border-color:#2d3148 !important; transform:translateY(-1px); }
`;

function generateHTML(biz: any, copy: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${biz.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #1e293b; background: #fff; }
    nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; padding: 0 6%; display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .nav-logo { font-size: 18px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
    .nav-cta { background: #6366f1; color: #fff; border: none; padding: 10px 24px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; }
    .hero { background: linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #fdf2ff 100%); padding: 100px 6% 88px; text-align: center; }
    .hero-badge { display: inline-flex; align-items:center; gap:6px; background: #fff; color: #6d28d9; border: 1px solid #ddd6fe; border-radius: 100px; padding: 6px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 24px; }
    .hero h1 { font-size: clamp(36px, 5.5vw, 64px); font-weight: 900; color: #0f172a; line-height: 1.1; margin-bottom: 20px; letter-spacing: -2px; }
    .hero h1 span { background: linear-gradient(135deg,#6366f1,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .hero p { font-size: 18px; color: #64748b; max-width: 500px; margin: 0 auto 36px; line-height: 1.75; font-weight: 500; }
    .hero-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
    .btn-primary { background: #6366f1; color: #fff; border: none; padding: 15px 36px; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; font-family:inherit; }
    .btn-secondary { background: #fff; color: #475569; border: 2px solid #e2e8f0; padding: 15px 28px; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; font-family:inherit; }
    .hero-rating { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #fde68a; border-radius:100px; padding:8px 18px; font-size:14px; font-weight:600; color:#92400e; }
    section { padding: 88px 6%; }
    .section-label { font-size: 11px; font-weight: 800; letter-spacing: 2.5px; color: #6366f1; text-transform: uppercase; margin-bottom: 12px; }
    h2 { font-size: clamp(26px, 3.5vw, 42px); font-weight: 900; color: #0f172a; margin-bottom: 18px; letter-spacing: -1px; line-height:1.15; }
    .section-text { font-size: 17px; color: #475569; line-height: 1.8; max-width: 600px; font-weight:500; }
    .about { background: #fff; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
    .about-image { background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 24px; height: 340px; display: flex; align-items: center; justify-content: center; font-size: 96px; }
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 32px; }
    .stat-card { background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; }
    .stat-number { font-size: 32px; font-weight: 900; color: #6366f1; letter-spacing:-1px; }
    .stat-label { font-size: 13px; color: #64748b; margin-top: 4px; font-weight:600; }
    .services { background: #fafbff; }
    .reviews { background: #fff; }
    .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 36px; }
    .review-card { background: #fff; border-radius: 18px; padding: 28px; border: 1px solid #e2e8f0; }
    .review-stars { color: #f59e0b; font-size: 15px; margin-bottom: 14px; letter-spacing:2px; }
    .review-text { font-size: 15px; color: #475569; line-height: 1.75; margin-bottom: 18px; font-style:italic; }
    .review-author { font-size: 13px; font-weight: 800; color: #1e293b; }
    .faq { background: #fafbff; }
    .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
    .faq-item { background: #fff; border-radius: 18px; padding: 28px; border: 1px solid #e2e8f0; }
    .faq-q { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
    .faq-a { font-size: 14px; color: #64748b; line-height: 1.75; font-weight:500; }
    .booking { background: linear-gradient(160deg, #1e1b4b 0%, #1e1035 100%); color: #fff; }
    .booking h2 { color: #fff; }
    .booking-sub { color: #a5b4fc; font-size: 17px; margin-bottom: 40px; font-weight:500; }
    .booking-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
    .booking-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-input { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 12px; padding: 14px 18px; font-size: 15px; width: 100%; outline: none; font-family: inherit; }
    .form-input::placeholder { color: rgba(255,255,255,0.3); }
    .form-textarea { resize: vertical; min-height: 110px; }
    .form-submit { background: #fff; color: #312e81; border: none; padding: 15px 32px; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; font-family:inherit; }
    .form-success { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.35); border-radius: 12px; padding: 18px; color: #6ee7b7; font-weight: 700; text-align: center; }
    .contact-info { display: flex; flex-direction: column; gap: 14px; }
    .contact-item { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px 22px; }
    .contact-icon { font-size: 22px; width:40px; text-align:center; }
    .contact-label { font-size: 10px; color: #a5b4fc; font-weight: 800; letter-spacing: 1px; margin-bottom: 4px; text-transform:uppercase; }
    .contact-value { font-size: 15px; color: #fff; font-weight: 700; }
    footer { background: #060810; color: #374151; padding: 28px 6%; display:flex; align-items:center; justify-content:space-between; font-size: 13px; font-weight:600; }
    .footer-brand { color:#6366f1; font-weight:800; }
    @media (max-width: 768px) {
      .about-grid, .booking-grid, .faq-grid { grid-template-columns: 1fr; }
      .about-image { display: none; }
      .form-row { grid-template-columns: 1fr; }
      footer { flex-direction:column; gap:8px; text-align:center; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">${biz.name}</div>
    <button class="nav-cta" onclick="document.querySelector('.booking').scrollIntoView({behavior:'smooth'})">${copy.cta}</button>
  </nav>
  <section class="hero">
    <div class="hero-badge">⭐ ${biz.rating > 0 ? `${biz.rating} Stars on Google` : biz.category}</div>
    <h1>${copy.headline}</h1>
    <p>${copy.subheadline}</p>
    <div class="hero-buttons">
      <button class="btn-primary" onclick="document.querySelector('.booking').scrollIntoView({behavior:'smooth'})">${copy.cta}</button>
      <button class="btn-secondary" onclick="window.location.href='tel:${biz.phone}'">📞 Call Us</button>
    </div>
    ${biz.rating > 0 ? `<div class="hero-rating">⭐ ${biz.rating} stars · ${biz.reviews} happy customers on Google</div>` : ""}
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
  <section class="booking">
    <div class="section-label" style="color:#a5b4fc">Book Now</div>
    <h2>Get In Touch</h2>
    <p class="booking-sub">Fill out the form and we'll get back to you as soon as possible.</p>
    <div class="booking-grid">
      <form class="booking-form" id="bookingForm" onsubmit="submitBooking(event)">
        <div class="form-row">
          <input class="form-input" type="text" id="customerName" placeholder="Your Name" required />
          <input class="form-input" type="tel" id="customerPhone" placeholder="Your Phone" />
        </div>
        <input class="form-input" type="email" id="customerEmail" placeholder="Your Email" required />
        <textarea class="form-input form-textarea" id="message" placeholder="Tell us what you need..."></textarea>
        <button type="submit" class="form-submit">${copy.cta} →</button>
        <div id="formSuccess" class="form-success" style="display:none">✓ Thanks! We'll be in touch soon.</div>
      </form>
      <div class="contact-info">
        <div class="contact-item"><div class="contact-icon">📞</div><div><div class="contact-label">Phone</div><div class="contact-value">${biz.phone}</div></div></div>
        <div class="contact-item"><div class="contact-icon">📍</div><div><div class="contact-label">Address</div><div class="contact-value">${biz.address}</div></div></div>
        <div class="contact-item"><div class="contact-icon">⏰</div><div><div class="contact-label">Hours</div><div class="contact-value">Mon–Sat: 9am – 6pm</div></div></div>
      </div>
    </div>
  </section>
  <footer>
    <span>© ${new Date().getFullYear()} ${biz.name} · All rights reserved</span>
    <span>Built with <span class="footer-brand">SiteLeads</span></span>
  </footer>
  <script>
    async function submitBooking(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.form-submit');
      btn.textContent = 'Sending...'; btn.disabled = true;
      try {
        await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_place_id: '${biz.id}',
            business_name: '${biz.name}',
            customer_name: document.getElementById('customerName').value,
            customer_email: document.getElementById('customerEmail').value,
            customer_phone: document.getElementById('customerPhone').value,
            message: document.getElementById('message').value,
          })
        });
        document.getElementById('bookingForm').reset();
        document.getElementById('formSuccess').style.display = 'block';
        btn.style.display = 'none';
      } catch(err) {
        btn.textContent = '${copy.cta} →'; btn.disabled = false;
        alert('Something went wrong. Please call us directly.');
      }
    }
  </script>
</body>
</html>`;
}

const saveCopyToSupabase = async (business: any, copy: any) => {
  try { await fetch('/api/sites',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business,copy})}); } catch(err){console.error(err);}
};
const logOutreach = async (business: any, method: string, status: string) => {
  try { await fetch('/api/outreach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business,method,status,notes:''})}); } catch(err){console.error(err);}
};

const OUTREACH_STATUS: Record<string,{color:string;label:string}> = {
  sent:{color:"#818cf8",label:"Sent"}, replied:{color:"#34d399",label:"Replied"},
  closed:{color:"#fbbf24",label:"Closed 🎉"}, skipped:{color:"#f87171",label:"Skipped"}, drafted:{color:"#6b7280",label:"Drafted"},
};

function OutreachLog() {
  const [log, setLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ fetch('/api/outreach').then(r=>r.json()).then(d=>{setLog(d.outreach||[]);setLoading(false);}); },[]);
  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:24,fontWeight:900,color:G.text,letterSpacing:-0.5}}>Outreach Log</h2>
        <p style={{color:G.muted,fontSize:14,marginTop:4}}>{log.length} businesses contacted</p>
      </div>
      {loading && <div style={{color:G.muted,textAlign:"center",padding:48}}>Loading...</div>}
      {!loading && log.length===0 && (
        <div style={{background:G.card,border:`1px dashed ${G.border}`,borderRadius:20,padding:56,textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>📊</div>
          <div style={{fontWeight:800,color:G.text,marginBottom:6}}>No outreach logged yet</div>
          <div style={{fontSize:14,color:G.muted}}>Approve outreach messages to track them here</div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {log.map(item=>{
          const s=OUTREACH_STATUS[item.status]||OUTREACH_STATUS.drafted;
          return (
            <div key={item.id} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:16,padding:"18px 24px",display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:40,height:40,borderRadius:12,background:`${s.color}18`,border:`1px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                {item.method==="email"?"✉️":item.method==="sms"?"💬":"📞"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,color:G.text,fontSize:15,marginBottom:3}}>{item.business_name}</div>
                <div style={{fontSize:12,color:G.muted}}>{item.method} · {new Date(item.created_at).toLocaleDateString()}</div>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{background:`${s.color}15`,color:s.color,border:`1px solid ${s.color}30`,borderRadius:100,padding:"4px 14px",fontSize:12,fontWeight:700}}>{s.label}</span>
                <select defaultValue={item.status} onChange={async e=>{
                  await fetch('/api/outreach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:{id:item.business_place_id,name:item.business_name},method:item.method,status:e.target.value,notes:item.notes})});
                }} style={{background:G.surface,border:`1px solid ${G.border}`,color:G.text,borderRadius:10,padding:"7px 12px",fontSize:12,outline:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <option value="drafted">Drafted</option>
                  <option value="sent">Sent</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed Deal 🎉</option>
                  <option value="skipped">Skipped</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<"search"|"leads"|"outreach-log"|"creator">("search");
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

  useEffect(()=>{
    fetch('/api/leads').then(r=>r.json()).then(d=>{
      if(d.leads) setLeads(d.leads.map((l:any)=>({
        id:l.place_id, name:l.business_name, category:l.category,
        address:l.address, phone:l.phone, rating:l.rating,
        reviews:l.review_count, status:l.website_status,
      })));
    });
  },[]);

  const search = async () => {
    setSearched(true); setLoading(true); setResults([]);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
      const data = await res.json();
      setResults((data.businesses||[]).filter((b:any)=>b.rating>=minRating));
    } catch(err){console.error(err);} finally{setLoading(false);}
  };

  const saveLead = async (biz:any) => {
    if (!leads.find(l=>l.id===biz.id)) setLeads(p=>[...p,biz]);
    try { await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:biz})}); } catch(err){console.error(err);}
  };

  const openBuilder = async (biz:any) => {
    setSelected(biz); setCopy(null); setGenerating(true); setPage("builder");
    try {
      const ex = await fetch(`/api/sites?place_id=${biz.id}`);
      const exd = await ex.json();
      if (exd.sites?.length>0) {
        const s=exd.sites[0];
        setCopy({...JSON.parse(s.html_content||'{}'),headline:s.headline,subheadline:s.subheadline,about:s.about_copy,services:s.services_copy,cta:s.cta_text});
        setGenerating(false); return;
      }
      const res = await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({business:biz})});
      const data = await res.json();
      if (data.copy){setCopy(data.copy);await saveCopyToSupabase(biz,data.copy);}
    } catch(err){console.error(err);} finally{setGenerating(false);}
  };

  const updateField = async (field:string, value:string) => {
    const newCopy={...copy,[field]:value};
    setCopy(newCopy); setEditingField(null); setSaving(true);
    await saveCopyToSupabase(selected,newCopy); setSaving(false);
  };

  const downloadSite = () => {
    if (!selected||!copy) return;
    const blob=new Blob([generateHTML(selected,copy)],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=`${selected.name.toLowerCase().replace(/\s+/g,"-")}-website.html`; a.click();
    URL.revokeObjectURL(url);
  };

  const Btn = ({children,onClick,style}:any) => (
    <button onClick={onClick} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",cursor:"pointer",...style}}>{children}</button>
  );

  const EditableField = ({field,label,multiline=false}:{field:string;label:string;multiline?:boolean}) => (
    <div style={{background:G.surface,border:`1px solid ${editingField===field?G.accent+"60":G.border}`,borderRadius:14,padding:"16px 20px",marginBottom:10,transition:"border-color 0.15s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1}}>{label}</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {saving&&editingField===field&&<span style={{fontSize:11,color:G.accent}}>Saving...</span>}
          {editingField!==field&&(
            <span onClick={()=>setEditingField(field)} style={{fontSize:11,color:G.accent,cursor:"pointer",background:G.accentGlow,border:`1px solid ${G.accent}30`,padding:"3px 10px",borderRadius:6,fontWeight:700}}>Edit</span>
          )}
        </div>
      </div>
      {editingField===field?(
        <div>
          {multiline
            ?<textarea defaultValue={copy[field]} autoFocus rows={4} style={{width:"100%",background:G.bg,border:`1px solid ${G.accent}`,color:G.text,borderRadius:8,padding:"10px 12px",fontSize:13,resize:"vertical",outline:"none",boxSizing:"border-box",fontFamily:"'Plus Jakarta Sans',sans-serif"}} onBlur={e=>updateField(field,e.target.value)} />
            :<input defaultValue={copy[field]} autoFocus style={{width:"100%",background:G.bg,border:`1px solid ${G.accent}`,color:G.text,borderRadius:8,padding:"10px 12px",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Plus Jakarta Sans',sans-serif"}} onBlur={e=>updateField(field,e.target.value)} onKeyDown={e=>{if(e.key==="Enter")updateField(field,(e.target as HTMLInputElement).value);}} />
          }
          <div style={{fontSize:11,color:G.muted,marginTop:6}}>Click outside or press Enter to save</div>
        </div>
      ):(
        <div style={{fontSize:14,color:G.text,lineHeight:1.65}}>{copy[field]}</div>
      )}
    </div>
  );

  const NavBar = () => (
    <div style={{background:G.surface,borderBottom:`1px solid ${G.border}`,padding:"0 28px",display:"flex",alignItems:"center",height:58,gap:4,position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginRight:24}}>
        <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,boxShadow:"0 4px 12px #6366f140"}}>⚡</div>
        <span style={{fontWeight:900,fontSize:16,color:G.text,letterSpacing:-0.5}}>SiteLeads</span>
        <span style={{background:"#6366f118",color:"#818cf8",border:"1px solid #6366f130",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:6,letterSpacing:0.5}}>BETA</span>
      </div>
      {(["search","leads","outreach-log","creator"] as const).map(t=>(
        <Btn key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#ffffff0c":"transparent",border:`1px solid ${tab===t?G.border:"transparent"}`,color:tab===t?G.text:G.muted,padding:"6px 16px",borderRadius:10,fontSize:13,fontWeight:700}}>
          {t==="search"?"🔍 Lead Finder":t==="leads"?`📋 Saved Leads${leads.length>0?` (${leads.length})`:""}`
           :t==="outreach-log"?"📊 Outreach Log":"👤 Creator"}
        </Btn>
      ))}
    </div>
  );

  if (page==="builder"&&selected) return (
    <div style={{background:G.bg,minHeight:"100vh",color:G.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar />
      <div style={{maxWidth:860,margin:"0 auto",padding:"32px 24px"}}>
        <Btn onClick={()=>setPage("main")} style={{background:G.card,border:`1px solid ${G.border}`,color:G.muted,borderRadius:10,padding:"7px 16px",fontSize:13,fontWeight:700,marginBottom:28}}>← Back</Btn>
        <div style={{marginBottom:28}}>
          <h2 style={{fontSize:22,fontWeight:900,color:G.text,letterSpacing:-0.5,marginBottom:4}}>{selected.name}</h2>
          <p style={{color:G.muted,fontSize:13}}>{generating?"Claude is writing your website copy...":"Click any field to edit · Changes auto-save"}</p>
        </div>
        {generating?(
          <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:20,padding:72,textAlign:"center"}}>
            <div style={{width:48,height:48,border:`3px solid ${G.accent}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto 20px",animation:"spin 0.8s linear infinite"}} />
            <div style={{fontWeight:800,color:G.text,fontSize:17,marginBottom:8}}>Building your website...</div>
            <div style={{color:G.muted,fontSize:14}}>Claude is writing headlines, reviews, FAQ, and more</div>
          </div>
        ):copy&&(
          <>
            <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
              <Btn onClick={()=>setPage("preview")} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:800,boxShadow:"0 4px 16px #6366f140"}}>👁 Preview Site</Btn>
              <Btn onClick={downloadSite} style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:800,boxShadow:"0 4px 16px #10b98140"}}>⬇️ Download HTML</Btn>
              <Btn onClick={()=>setPage("outreach")} style={{background:G.card,color:G.muted,border:`1px solid ${G.border}`,borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700}}>✉️ Draft Outreach</Btn>
              <Btn onClick={()=>saveLead(selected)} style={{background:leads.find(l=>l.id===selected.id)?"#10b98118":G.card,color:leads.find(l=>l.id===selected.id)?"#34d399":G.muted,border:`1px solid ${leads.find(l=>l.id===selected.id)?"#34d39930":G.border}`,borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700}}>
                {leads.find(l=>l.id===selected.id)?"✓ Saved":"+ Save Lead"}
              </Btn>
            </div>
            <EditableField field="headline" label="🎯 HEADLINE" />
            <EditableField field="subheadline" label="📝 SUBHEADLINE" />
            <EditableField field="cta" label="📢 CALL TO ACTION" />
            <EditableField field="about" label="ℹ️ ABOUT SECTION" multiline />
            <EditableField field="services" label="⚙️ SERVICES SECTION" multiline />
            <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:14,padding:"16px 20px",marginBottom:10}}>
              <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1,marginBottom:12}}>⭐ CUSTOMER REVIEWS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[1,2,3].map(n=>(
                  <div key={n} style={{background:G.bg,borderRadius:12,padding:14,border:`1px solid ${G.border}`}}>
                    <div style={{color:"#fbbf24",fontSize:11,marginBottom:6,letterSpacing:2}}>★★★★★</div>
                    <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.6,marginBottom:8}}>"{copy[`review${n}`]}"</div>
                    <div style={{fontSize:11,color:G.muted,fontWeight:800}}>— {copy[`reviewer${n}`]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:14,padding:"16px 20px",marginBottom:10}}>
              <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1,marginBottom:12}}>❓ FAQ</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[1,2,3].map(n=>(
                  <div key={n} style={{background:G.bg,borderRadius:12,padding:14,border:`1px solid ${G.border}`}}>
                    <div style={{fontSize:12,fontWeight:800,color:"#a5b4fc",marginBottom:6}}>Q: {copy[`faq${n}q`]}</div>
                    <div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>A: {copy[`faq${n}a`]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"#6366f10e",border:"1px solid #6366f125",borderRadius:14,padding:"14px 20px"}}>
              <div style={{fontSize:10,color:"#818cf8",fontWeight:800,letterSpacing:1,marginBottom:6}}>📋 BOOKING FORM INCLUDED</div>
              <div style={{fontSize:13,color:G.muted}}>A booking form is built into the generated website. Submissions save to your Supabase database.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (page==="preview"&&selected&&copy) return (
    <div style={{background:G.bg,minHeight:"100vh",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{css}</style>
      <div style={{background:G.surface,padding:"12px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${G.border}`}}>
        <Btn onClick={()=>setPage("builder")} style={{background:G.card,border:`1px solid ${G.border}`,color:G.muted,borderRadius:10,padding:"6px 14px",fontSize:13,fontWeight:700}}>← Back</Btn>
        <span style={{color:G.text,fontWeight:800,fontSize:14}}>{selected.name}</span>
        <div style={{marginLeft:"auto"}}>
          <Btn onClick={downloadSite} style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",border:"none",borderRadius:10,padding:"8px 20px",fontSize:13,fontWeight:800,boxShadow:"0 4px 12px #10b98140"}}>⬇️ Download HTML</Btn>
        </div>
      </div>
      <div style={{margin:20,borderRadius:18,overflow:"hidden",border:`1px solid ${G.border}`,boxShadow:"0 24px 64px #00000040"}}>
        <div style={{background:G.card,padding:"10px 18px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${G.border}`}}>
          {["#f87171","#fbbf24","#34d399"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}} />)}
          <div style={{flex:1,background:G.bg,borderRadius:6,padding:"4px 12px",fontSize:11,color:G.muted,marginLeft:8,fontWeight:600}}>{selected.name.toLowerCase().replace(/\s+/g,"")}.com</div>
        </div>
        <iframe srcDoc={generateHTML(selected,copy)} style={{width:"100%",height:"82vh",border:"none"}} title="Preview" />
      </div>
    </div>
  );

  if (page==="outreach"&&selected) return (
    <div style={{background:G.bg,minHeight:"100vh",color:G.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar />
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px 24px"}}>
        <Btn onClick={()=>setPage("main")} style={{background:G.card,border:`1px solid ${G.border}`,color:G.muted,borderRadius:10,padding:"7px 16px",fontSize:13,fontWeight:700,marginBottom:28}}>← Back</Btn>
        <div style={{marginBottom:28}}>
          <h2 style={{fontSize:22,fontWeight:900,color:G.text,letterSpacing:-0.5,marginBottom:4}}>Outreach — {selected.name}</h2>
          <p style={{color:G.muted,fontSize:13}}>Review and approve before sending manually</p>
        </div>
        <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:20,overflow:"hidden"}}>
          <div style={{display:"flex",borderBottom:`1px solid ${G.border}`}}>
            {(["email","sms","call"] as const).map(t=>(
              <Btn key={t} onClick={()=>setOutreachTab(t)} style={{background:outreachTab===t?"#6366f112":"transparent",color:outreachTab===t?"#818cf8":G.muted,border:"none",borderBottom:`2px solid ${outreachTab===t?G.accent:"transparent"}`,padding:"14px 22px",fontSize:13,fontWeight:800}}>
                {t==="email"?"✉️ Email":t==="sms"?"💬 SMS":"📞 Call Script"}
              </Btn>
            ))}
          </div>
          <div style={{padding:28}}>
            {approved[`${selected.id}-${outreachTab}`]&&(
              <div style={{background:"#10b98112",border:"1px solid #10b98130",borderRadius:12,padding:"12px 18px",marginBottom:20,fontSize:13,color:"#34d399",fontWeight:800}}>✓ Approved & Logged</div>
            )}
            {outreachTab==="email"&&(
              <div>
                <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1,marginBottom:8}}>SUBJECT LINE</div>
                <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:12,padding:"12px 16px",fontSize:14,color:G.text,marginBottom:20,fontWeight:600}}>Free website for {selected.name} — ready to launch today</div>
                <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1,marginBottom:8}}>EMAIL BODY</div>
                <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:12,padding:20,fontSize:14,color:"#94a3b8",lineHeight:2}}>
                  Hi there,<br /><br />
                  I came across {selected.name} on Google{selected.rating>0?` — ${selected.rating} stars and ${selected.reviews} reviews is incredible!`:""} I noticed you don't have a website yet, so I built a free draft — complete with your services, reviews, FAQ, and a booking form.<br /><br />
                  Can I send you the preview link? No cost, no strings attached.<br /><br />
                  Best,<br />[Your Name]<br />[Your Phone]
                </div>
              </div>
            )}
            {outreachTab==="sms"&&(
              <div>
                <div style={{fontSize:10,color:G.muted,fontWeight:800,letterSpacing:1,marginBottom:8}}>TEXT MESSAGE</div>
                <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:12,padding:20,fontSize:14,color:"#94a3b8",lineHeight:2,maxWidth:380}}>
                  Hi! I saw {selected.name} on Google — amazing reviews! I built a free website for you with services, reviews, and a booking form. Mind if I send a preview link? — [Your Name]
                </div>
                <div style={{fontSize:12,color:"#fbbf24",marginTop:12,fontWeight:600}}>⚠️ Only text numbers with consent</div>
              </div>
            )}
            {outreachTab==="call"&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  ["OPENER","Hi, is this [Business Name]? My name is [Name] — I'm a local web designer."],
                  ["HOOK","I noticed you don't have a website yet. I built a full one for you — hero section, services, reviews, FAQ, and a booking form. Would you have 30 seconds?"],
                  ["VALUE",`${selected.rating>0?`You've got ${selected.rating} stars and ${selected.reviews} reviews — a`:"A"} professional website would help new customers find you on Google and book directly.`],
                  ["CLOSE","Can I text or email you the preview link? It's completely free — no obligation at all."],
                ].map(([label,text])=>(
                  <div key={label}>
                    <div style={{fontSize:10,color:G.accent,fontWeight:800,letterSpacing:1,marginBottom:6}}>{label}</div>
                    <div style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:12,padding:"14px 18px",fontSize:14,color:"#94a3b8",fontStyle:"italic",lineHeight:1.75}}>"{text}"</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{display:"flex",gap:10,marginTop:24,paddingTop:24,borderTop:`1px solid ${G.border}`}}>
              <Btn onClick={async()=>{setApproved(p=>({...p,[`${selected.id}-${outreachTab}`]:true}));await logOutreach(selected,outreachTab,'sent');}} style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:800,boxShadow:"0 4px 12px #10b98140"}}>✓ Approve & Log Sent</Btn>
              <Btn onClick={async()=>{await logOutreach(selected,outreachTab,'skipped');setPage("main");}} style={{background:"#f8717112",color:"#f87171",border:"1px solid #f8717125",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700}}>✗ Skip</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{background:G.bg,minHeight:"100vh",color:G.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{css}</style>
      <NavBar />
      <div style={{maxWidth:1000,margin:"0 auto",padding:"36px 24px"}}>

        {tab==="search"&&(
          <>
            {!searched&&(
              <div style={{textAlign:"center",padding:"48px 0 40px"}} className="fade-up">
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#6366f112",border:"1px solid #6366f125",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:800,color:"#818cf8",marginBottom:20,letterSpacing:0.5}}>⚡ AI-POWERED LEAD FINDER</div>
                <h1 style={{fontSize:42,fontWeight:900,color:G.text,letterSpacing:-2,lineHeight:1.1,marginBottom:14}}>
                  Find Businesses<br /><span style={{background:"linear-gradient(135deg,#6366f1,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Without Websites</span>
                </h1>
                <p style={{color:G.muted,fontSize:16,maxWidth:480,margin:"0 auto",lineHeight:1.7,fontWeight:500}}>Search any city, detect missing websites, and generate a full professional site with one click.</p>
              </div>
            )}
            <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:18,padding:20,marginBottom:20}}>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="barbers, plumbers, nail salons..." style={{flex:2,minWidth:160,background:G.surface,border:`1px solid ${G.border}`,color:G.text,borderRadius:12,padding:"11px 16px",fontSize:14,outline:"none",fontWeight:600}} />
                <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="City" style={{flex:1,minWidth:130,background:G.surface,border:`1px solid ${G.border}`,color:G.text,borderRadius:12,padding:"11px 16px",fontSize:14,outline:"none",fontWeight:600}} />
                <select value={minRating} onChange={e=>setMinRating(Number(e.target.value))} style={{background:G.surface,border:`1px solid ${G.border}`,color:G.text,borderRadius:12,padding:"11px 14px",fontSize:14,outline:"none",fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <option value={0}>Any Rating</option>
                  <option value={4}>4.0+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
                <Btn onClick={search} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:12,padding:"11px 26px",fontSize:14,fontWeight:800,boxShadow:"0 4px 16px #6366f145"}}>{loading?"Searching...":"Search →"}</Btn>
              </div>
              <div style={{marginTop:14,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:11,color:G.muted,fontWeight:700}}>Quick:</span>
                {["barbers","nail salons","pet groomers","plumbers","dentists","restaurants"].map(q=>(
                  <Btn key={q} onClick={()=>setQuery(q)} style={{background:G.surface,border:`1px solid ${G.border}`,color:G.muted,borderRadius:8,padding:"3px 12px",fontSize:11,fontWeight:700}}>{q}</Btn>
                ))}
              </div>
            </div>

            {loading&&(
              <div style={{textAlign:"center",padding:48,color:G.muted}}>
                <div style={{width:36,height:36,border:`3px solid ${G.accent}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto 16px",animation:"spin 0.8s linear infinite"}} />
                <div style={{fontWeight:700}}>Searching real businesses...</div>
              </div>
            )}

            {searched&&!loading&&(
              <div className="fade-up">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:15,color:G.text}}>{results.length} results in {city}</div>
                  <div style={{display:"flex",gap:16,fontSize:12}}>
                    {Object.entries(STATUS_CONFIG).map(([k,v])=>(
                      <span key={k} style={{color:v.color,fontWeight:700}}>● {results.filter(r=>r.status===k).length} {v.label}</span>
                    ))}
                  </div>
                </div>
                {results.length===0&&(
                  <div style={{background:G.card,border:`1px dashed ${G.border}`,borderRadius:18,padding:48,textAlign:"center"}}>
                    <div style={{fontSize:36,marginBottom:12}}>🔍</div>
                    <div style={{fontWeight:800,color:G.text,marginBottom:6}}>No results found</div>
                    <div style={{fontSize:13,color:G.muted}}>Try a different search term or city</div>
                  </div>
                )}
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {results.map((biz,i)=>(
                    <div key={biz.id} className="biz-card" style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:16,padding:"18px 22px",display:"flex",alignItems:"center",gap:16}}>
                      <div style={{width:46,height:46,borderRadius:13,flexShrink:0,background:GRADIENTS[i%10],display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{EMOJIS[i%10]}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                          <span style={{fontWeight:900,color:G.text,fontSize:15,letterSpacing:-0.3}}>{biz.name}</span>
                          <span style={{background:STATUS_CONFIG[biz.status].bg,color:STATUS_CONFIG[biz.status].color,border:`1px solid ${STATUS_CONFIG[biz.status].border}`,borderRadius:100,padding:"3px 12px",fontSize:11,fontWeight:800}}>{STATUS_CONFIG[biz.status].label}</span>
                        </div>
                        <div style={{fontSize:12,color:G.muted,marginBottom:4,fontWeight:600}}>📍 {biz.address} · 📞 {biz.phone}</div>
                        {biz.rating>0&&<div style={{fontSize:12,color:"#fbbf24",fontWeight:700}}>★ {biz.rating} <span style={{color:G.muted}}>({biz.reviews} reviews)</span></div>}
                      </div>
                      <div style={{display:"flex",gap:8,flexShrink:0}}>
                        <Btn onClick={()=>saveLead(biz)} style={{background:leads.find(l=>l.id===biz.id)?"#10b98118":G.surface,color:leads.find(l=>l.id===biz.id)?"#34d399":G.muted,border:`1px solid ${leads.find(l=>l.id===biz.id)?"#34d39930":G.border}`,borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:800}}>{leads.find(l=>l.id===biz.id)?"✓ Saved":"+ Save"}</Btn>
                        {biz.status!=="has_website"&&<Btn onClick={()=>openBuilder(biz)} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:800,boxShadow:"0 4px 12px #6366f140"}}>⚡ Build Site</Btn>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab==="leads"&&(
          <div className="fade-up">
            <div style={{marginBottom:28}}>
              <h2 style={{fontSize:24,fontWeight:900,color:G.text,letterSpacing:-0.5}}>Saved Leads</h2>
              <p style={{color:G.muted,fontSize:14,marginTop:4}}>{leads.length} businesses saved</p>
            </div>
            {leads.length===0?(
              <div style={{background:G.card,border:`1px dashed ${G.border}`,borderRadius:20,padding:56,textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>📋</div>
                <div style={{fontWeight:800,color:G.text,marginBottom:6}}>No leads saved yet</div>
                <div style={{fontSize:14,color:G.muted}}>Search for businesses and click + Save</div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {leads.map((biz,i)=>(
                  <div key={biz.id} className="biz-card" style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:16,padding:"18px 22px",display:"flex",alignItems:"center",gap:16}}>
                    <div style={{width:44,height:44,borderRadius:13,background:GRADIENTS[i%10],display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{EMOJIS[i%10]}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:900,color:G.text,fontSize:15,marginBottom:4,letterSpacing:-0.3}}>{biz.name}</div>
                      <div style={{fontSize:12,color:G.muted,fontWeight:600}}>{biz.phone} · <span style={{color:STATUS_CONFIG[biz.status]?.color}}>{STATUS_CONFIG[biz.status]?.label}</span></div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {biz.status!=="has_website"&&<Btn onClick={()=>openBuilder(biz)} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:800,boxShadow:"0 4px 12px #6366f140"}}>⚡ Build Site</Btn>}
                      <Btn onClick={()=>{setSelected(biz);setPage("outreach");}} style={{background:G.surface,color:G.muted,border:`1px solid ${G.border}`,borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:700}}>✉️ Outreach</Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="outreach-log"&&<OutreachLog />}

        {tab==="creator"&&(
          <div className="fade-up" style={{maxWidth:600,margin:"0 auto",padding:"48px 0"}}>
            <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:24,padding:48,textAlign:"center"}}>
              <div style={{width:88,height:88,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:900,color:"#fff",margin:"0 auto 24px",boxShadow:"0 8px 32px #6366f140",letterSpacing:-1}}>
                RT
              </div>
              <h2 style={{fontSize:26,fontWeight:900,color:G.text,letterSpacing:-0.5,marginBottom:6}}>Ryan Tran</h2>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#6366f115",border:"1px solid #6366f130",borderRadius:100,padding:"5px 14px",fontSize:12,fontWeight:800,color:"#818cf8",marginBottom:24}}>
                💻 Software Engineer · San Luis Obispo, CA
              </div>
              <p style={{fontSize:15,color:"#94a3b8",lineHeight:1.8,fontWeight:500,marginBottom:32}}>
                I'm a software engineer based in San Luis Obispo. I built SiteLeads to help local businesses get online fast — using AI to generate professional websites in minutes so business owners can focus on what they do best. Every business deserves a great website, and I'm on a mission to make that happen one city at a time.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:32}}>
                {[
                  {icon:"⚡",label:"Built SiteLeads"},
                  {icon:"📍",label:"San Luis Obispo"},
                  {icon:"🚀",label:"Software Engineer"},
                ].map(item=>(
                  <div key={item.label} style={{background:G.surface,border:`1px solid ${G.border}`,borderRadius:14,padding:"16px 12px"}}>
                    <div style={{fontSize:22,marginBottom:6}}>{item.icon}</div>
                    <div style={{fontSize:12,color:G.muted,fontWeight:700}}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{borderTop:`1px solid ${G.border}`,paddingTop:24,fontSize:13,color:G.muted,fontWeight:600}}>
                Built with ⚡ by Ryan Tran · SiteLeads {new Date().getFullYear()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}