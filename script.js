(() => {
  "use strict";

  /* =========================================================
     CLINIC DIRECTORY AND DEMO DATA
     ========================================================= */
  // Clinic names and contact details supplied by the project owner.
  // Keep legacy IDs for saved providers/visits. Insurance, specialties, formats,
  // intro calls, openings, and travel times remain simulated prototype data.
  // The existing insurance arrays are the accepted-insurance filter model.
  const PROVIDERS = [
    { id: "maya", initials: "MS", name: "Metrocare Services (Hillside Center)", role: "Mental health clinic",
      bio: "3230 Remond Dr, Dallas, TX 75211 | (214) 330-0036",
      city: "Dallas, TX", state: "Texas", format: "Online", intro: 15, openings: 4, travel: null, tags: ["Anxiety", "Depression", "Couples", "Sliding scale"],
      insurance: ["Aetna", "Cigna", "Blue Cross Blue Shield"] },
    { id: "jordan", initials: "UB", name: "Unity Behavioral Health", role: "Mental health clinic",
      bio: "660 W Campbell Rd, Ste 100, Richardson, TX 75080 | (469) 940-6900",
      city: "Richardson, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 25, tags: ["Anxiety", "Sliding scale"],
      insurance: ["Aetna", "Kaiser Permanente"] },
    { id: "elena", initials: "SM", name: "Serenity Mental Health Centers - Richardson", role: "Mental health clinic",
      bio: "2221 Lakeside Blvd, Suite 1225, Richardson, TX 75082 | (214) 790-7912",
      city: "Richardson, TX", state: "Texas", format: "Online", intro: 20, openings: 6, travel: null, tags: ["Depression", "Couples"],
      insurance: ["Cigna", "UnitedHealthcare", "Kaiser Permanente"] },
    { id: "priya", initials: "RO", name: "Richland Oaks Counseling Center", role: "Mental health clinic",
      bio: "1221 Abrams Rd, Suite 325, Richardson, TX 75081 | (469) 619-7622",
      city: "Richardson, TX", state: "Texas", format: "Online", intro: 15, openings: 5, travel: null, tags: ["Couples", "Anxiety"],
      insurance: ["Kaiser Permanente", "Aetna", "Blue Cross Blue Shield"] },
    { id: "marcus", initials: "RL", name: "Reflections Lifestyle Center", role: "Mental health clinic",
      bio: "100 N Central Expy, Suite 300, Richardson, TX 75080 | (469) 777-4688",
      city: "Richardson, TX", state: "Texas", format: "In-person", intro: 20, openings: 3, travel: 12, tags: ["Couples", "Depression", "Sliding scale"],
      insurance: ["Cigna", "Blue Cross Blue Shield", "UnitedHealthcare"] },
    { id: "dana", initials: "SM", name: "SMU Center for Family Counseling", role: "Mental health clinic",
      bio: "6116 N Central Expy, Suite 410, Dallas, TX 75206 | (214) 768-6789",
      city: "Dallas, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 20, tags: ["Couples", "Anxiety"],
      insurance: ["Kaiser Permanente", "Aetna"] },
    { id: "taylor", initials: "TC", name: "Taylor Counseling Group", role: "Mental health clinic",
      bio: "8150 N Central Expy, Suite 1625, Dallas, TX 75206 | (214) 530-0021",
      city: "Dallas, TX", state: "Texas", format: "Online", intro: 15, openings: 4, travel: null, tags: ["Anxiety", "Depression", "Couples", "Sliding scale"],
      insurance: ["Aetna", "Cigna", "Blue Cross Blue Shield"] },
    { id: "lifestance", initials: "LH", name: "LifeStance Health Dallas", role: "Mental health clinic",
      bio: "11300 N Central Expy, Suite 400, Dallas, TX 75243 | (214) 307-2377",
      city: "Dallas, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 25, tags: ["Anxiety", "Sliding scale"],
      insurance: ["Aetna", "Kaiser Permanente"] },
    { id: "holiner", initials: "HP", name: "The Holiner Psychiatric Group", role: "Mental health clinic",
      bio: "7777 Forest Ln, Building C, Suite 833, Dallas, TX 75230 | (972) 566-4591",
      city: "Dallas, TX", state: "Texas", format: "Online", intro: 20, openings: 6, travel: null, tags: ["Depression", "Couples"],
      insurance: ["Cigna", "UnitedHealthcare", "Kaiser Permanente"] },
    { id: "cohen", initials: "SC", name: "The Steven A. Cohen Military Family Clinic at Metrocare", role: "Mental health clinic",
      bio: "9696 Skillman St, Suite 170, Dallas, TX 75243 | (469) 680-3500",
      city: "Dallas, TX", state: "Texas", format: "Online", intro: 15, openings: 5, travel: null, tags: ["Couples", "Anxiety"],
      insurance: ["Kaiser Permanente", "Aetna", "Blue Cross Blue Shield"] },
    { id: "ellie", initials: "EM", name: "Ellie Mental Health - Dallas-Carrollton", role: "Mental health clinic",
      bio: "4222 Trinity Mills Rd, Suite 250, Dallas, TX 75287 | (469) 850-4800",
      city: "Dallas, TX", state: "Texas", format: "In-person", intro: 20, openings: 3, travel: 12, tags: ["Couples", "Depression", "Sliding scale"],
      insurance: ["Cigna", "Blue Cross Blue Shield", "UnitedHealthcare"] },
    { id: "mhmr", initials: "MH", name: "MHMR of Tarrant County", role: "Mental health clinic",
      bio: "3800 Hulen St, Fort Worth, TX 76107 | (817) 335-3022",
      city: "Fort Worth, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 20, tags: ["Couples", "Anxiety"],
      insurance: ["Kaiser Permanente", "Aetna"] },
    { id: "serenity-fort-worth", initials: "SM", name: "Serenity Mental Health Centers - Fort Worth", role: "Mental health clinic",
      bio: "6500 West Freeway, Suite 700, Fort Worth, TX 76116 | (817) 502-3075",
      city: "Fort Worth, TX", state: "Texas", format: "Online", intro: 15, openings: 4, travel: null, tags: ["Anxiety", "Depression", "Couples", "Sliding scale"],
      insurance: ["Aetna", "Cigna", "Blue Cross Blue Shield"] },
    { id: "connections", initials: "CW", name: "Connections Wellness Group (Arlington)", role: "Mental health clinic",
      bio: "4907 S Collins St, Suite 121, Arlington, TX 76018 | (817) 900-0453",
      city: "Arlington, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 25, tags: ["Anxiety", "Sliding scale"],
      insurance: ["Aetna", "Kaiser Permanente"] }
  ];

  const FILTERS = ["Anxiety", "Depression", "Couples", "Online", "Sliding scale"];
  const SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "6:00 PM"];

  const DEFAULT_PAST_VISITS = [
    {
      id: 101,
      providerId: "marcus",
      date: "2026-10-28",
      time: "2:30 PM",
      type: "person",
      sessionKind: "50-min Individual Session",
      notes: "Worked on academic stress management and breaking large project deadlines into smaller daily blocks."
    },
    {
      id: 102,
      providerId: "priya",
      date: "2026-10-14",
      time: "10:30 AM",
      type: "video",
      sessionKind: "15-min Intro Consultation",
      notes: "Discussed communication goals and evening wind-down routines. Great fit for remote sessions."
    }
  ];

  const DEFAULT_ACCOUNT = {
    name: "Alex Rivera",
    pronouns: "they/them",
    dob: "2003-05-14",
    email: "alex.rivera@utdallas.edu",
    phone: "(972) 555-0148",
    alias: "Willow",
    memberId: "BCBS-8849201",
    groupNumber: "GRP-44210",
    preferredFormat: "Either",
    emergencyName: "Maria Rivera",
    emergencyRelation: "Parent",
    emergencyPhone: "(281) 555-0192",
    remindersEmail: true,
    remindersSms: true,
    careGoals: "Build sustainable routines for exam weeks, improve sleep consistency, and practice grounding techniques."
  };

  const COMMUNITY = {
    alias: "Willow",
    threads: {
      "c:Cedar": { title: "Cedar", sub: "Connected · Shared interest: walking", msgs: [
        { who: "them", name: "Cedar", text: "Hi Willow! Did you get a chance to take that little walk you mentioned?" },
        { who: "me", name: "You", text: "I did! Just ten minutes around the block, but the fresh air was lovely." },
        { who: "them", name: "Cedar", text: "That sounds like a lovely little win. I'm taking my tea outside this afternoon." }] },
      "c:Maple": { title: "Maple", sub: "Connected · Shared interest: reading", msgs: [
        { who: "them", name: "Maple", text: "Good morning! Any good books lately?" }] },
      "c:River": { title: "River", sub: "Connected · Shared interest: cooking", msgs: [
        { who: "them", name: "River", text: "I finally tried that soup recipe. Worth it." }] },
      "c:Sage": { title: "Sage", sub: "Connected · Shared interest: music", msgs: [
        { who: "them", name: "Sage", text: "Hey Willow, glad we connected." }] },
      "g:Small wins": { title: "Small wins", sub: "Group · 3 joined", desc: "Make room for the little things that went well.", msgs: [
        { who: "them", name: "Birch", text: "I made my bed today. Small, but it counts." },
        { who: "them", name: "Cedar", text: "That counts. I walked for ten minutes." }] },
      "g:Everyday connections": { title: "Everyday connections", sub: "Group · 3 joined", desc: "Talk about ordinary days and small routines.", msgs: [
        { who: "them", name: "Maple", text: "What's one thing that made today easier?" }] },
      "g:Mindful moments": { title: "Mindful moments", sub: "Group · 3 joined", desc: "Share a pause, a breath, or a quiet minute.", msgs: [
        { who: "them", name: "Sage", text: "Three slow breaths before my first call today." }] }
    },
    connections: ["Cedar", "Maple", "River", "Sage"],
    groups: ["Small wins", "Everyday connections", "Mindful moments"],
    suggestions: [
      { name: "Juniper", interest: "Shared interest: gardening" },
      { name: "Birch", interest: "Preparing for a first visit" },
      { name: "Willow Creek", interest: "Shared interest: journaling" }
    ]
  };

  const RESOURCES = [
    { id: "r1", title: "Preparing for Your First Therapy Visit", cat: "First Visit", readTime: "4 min read",
      summary: "What to expect during an intake session, questions you can ask your provider, and how to set comfortable goals.",
      steps: [
        "Jot down 2–3 main things you've been feeling or hoping to work on.",
        "Keep your insurance card or self-pay questions handy for the first 5 minutes.",
        "Remember that an intro call is a two-way fit check—you can ask about their style and structure.",
        "Give yourself 10 quiet minutes after the session to decompress."
      ] },
    { id: "r2", title: "5-Minute Grounding Exercises for Anxiety", cat: "Anxiety", readTime: "3 min practice",
      summary: "Quick sensory and breathing techniques you can use before an exam, presentation, or stressful conversation.",
      steps: [
        "Box Breathing: Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4.",
        "5-4-3-2-1 Method: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you appreciate.",
        "Progressive Muscle Release: Gently tense your shoulders for 5 seconds, then release completely."
      ] },
    { id: "r3", title: "Understanding Insurance, Copays & Sliding Scale", cat: "Insurance", readTime: "5 min guide",
      summary: "A plain-language breakdown of in-network coverage, out-of-network superbills, and sliding-scale self-pay options.",
      steps: [
        "In-Network: Your provider bills your insurance directly; you only pay a fixed copay or coinsurance.",
        "Sliding Scale: Reduced session rates offered by providers based on your current income or student status.",
        "Superbills: Itemized receipts you can submit to your insurer for partial out-of-network reimbursement."
      ] },
    { id: "r4", title: "Low-Energy Routines for Heavy Days", cat: "Depression", readTime: "4 min read",
      summary: "Gentle, zero-pressure habits for days when motivation and energy feel out of reach.",
      steps: [
        "Pick one 'micro-step'—like drinking a glass of water or opening the blinds.",
        "Swap 'all-or-nothing' tasks for 2-minute versions (e.g., rinsing one plate instead of cleaning the kitchen).",
        "Share a tiny win in the Patient Connections 'Small wins' group if you want low-stakes encouragement."
      ] },
    { id: "r5", title: "Evening Wind-Down & Sleep Hygiene Checklist", cat: "Mindfulness", readTime: "3 min guide",
      summary: "Simple cues to help your mind transition out of work or study mode before bed.",
      steps: [
        "Write down tomorrow's top task on paper so your brain doesn't have to hold onto it overnight.",
        "Dim overhead lights 45 minutes before sleep.",
        "Try 3 slow breaths with a longer exhale (inhale for 4 seconds, exhale for 6 seconds)."
      ] },
    { id: "r6", title: "How to Know If a Therapist Is the Right Fit", cat: "First Visit", readTime: "4 min read",
      summary: "Signs of a strong therapeutic alliance and how to switch providers comfortably if needed.",
      steps: [
        "You feel heard and respected without judgment, even when talking about difficult topics.",
        "The therapist explains their approach clearly and checks in on how sessions feel for you.",
        "If it doesn't click after 1–2 visits, you can book with another provider anytime—therapists expect and support this."
      ] }
  ];

  const RESOURCE_CATS = ["All", "First Visit", "Anxiety", "Depression", "Insurance", "Mindfulness"];

  const FAQS = [
    { id: "f1", q: "How do I book, reschedule, or cancel an appointment?",
      a: "Select 'Book visit' on any provider card to pick an in-person or video slot. Once booked, your appointment appears under 'Your visits' on the Find care screen and in your Account tab, where you can mark it completed or cancel it anytime." },
    { id: "f2", q: "What if I don't have insurance or want to pay out of pocket?",
      a: "You can click 'I'll pay without insurance' in the Insurance panel on Find care, or filter by 'Sliding scale' to see providers who offer reduced self-pay rates." },
    { id: "f3", q: "Are Patient Connections peer groups really anonymous?",
      a: "Yes. When you join Patient Connections, you interact using a community alias (like 'Willow'). Other members never see your real name, email, insurance details, or booked providers." },
    { id: "f4", q: "What is the difference between an intro call and a full session?",
      a: "Many providers offer a 15–30 minute intro call so you can ask questions, discuss your goals, and confirm insurance or sliding-scale rates before committing to ongoing weekly or biweekly therapy." },
    { id: "f5", q: "How are travel times calculated for in-person visits?",
      a: "When you enter your city or state in the Insurance & Location panel, in-person provider cards display an estimated drive time from your area." }
  ];

  /* =========================================================
     STATE  (insurance, location, saved providers, account info,
     and both upcoming & past visits are saved in localStorage)
     ========================================================= */
  const saved = (() => { try { return JSON.parse(localStorage.getItem("mc-state") || "{}"); } catch { return {}; } })();

  const state = {
    query: "", filters: new Set(), sort: "best", savedOnly: false,
    insurance: saved.insurance !== undefined ? saved.insurance : "Blue Cross Blue Shield",
    location: saved.location !== undefined ? saved.location : "Richardson, TX",
    saved: new Set(saved.saved || ["marcus"]),
    visits: saved.visits || [],
    pastVisits: Array.isArray(saved.pastVisits) ? saved.pastVisits : [...DEFAULT_PAST_VISITS],
    selectedId: null, expanded: new Set(),
    providerId: null, weekStart: null, date: null, time: null, visitType: null, showBenefits: false,
    optedIn: saved.optedIn !== undefined ? saved.optedIn : true,
    chat: [{ who: "bot", text: "Choose a visit type, date, and time." }],
    comm: { tab: "groups", list: "messages", active: "c:Cedar", requested: new Set() },
    res: { query: "", cat: "All", savedOnly: false, saved: new Set(saved.savedRes || ["r1"]), open: new Set() },
    sup: { openFaq: new Set(["f1"]), tickets: saved.tickets || [], liveChat: [
      { who: "bot", text: "Hi! I'm MindConnect Support. Ask me about booking, insurance, peer privacy, or technical issues." }
    ] },
    account: { ...DEFAULT_ACCOUNT, ...(saved.account || {}) },
    editingNoteId: null,
    showLogVisitForm: false
  };

  COMMUNITY.alias = state.account.alias || "Willow";

  function persist() {
    try {
      localStorage.setItem("mc-state", JSON.stringify({
        insurance: state.insurance,
        location: state.location,
        saved: [...state.saved],
        visits: state.visits,
        pastVisits: state.pastVisits,
        optedIn: state.optedIn,
        savedRes: [...state.res.saved],
        tickets: state.sup.tickets,
        account: state.account
      }));
    } catch { /* storage unavailable: the site still works, it just forgets */ }
  }

  /* =========================================================
     HELPERS
     ========================================================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const byId = id => PROVIDERS.find(p => p.id === id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));
  const longDay = d => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const fullDate = d => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const TZ = (new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(new Date()).find(p => p.type === "timeZoneName") || {}).value || "";

  const ICON = {
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/></svg>',
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
  };

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  /* =========================================================
     ROUTING  (#find, #book, #community, #resources, #support, #account)
     ========================================================= */
  const VIEWS = ["find", "book", "community", "resources", "support", "account"];

  function go(view) {
    if (location.hash === "#" + view) route(); else location.hash = "#" + view;
  }

  function route() {
    const raw = location.hash.replace("#", "");
    const view = VIEWS.includes(raw) ? raw : "find";
    VIEWS.forEach(v => { $("#view-" + v).hidden = v !== view; });
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === view);
    });
    if (view === "find") {
      $("#ins-input").value = state.insurance;
      $("#loc-input").value = state.location;
      renderChips(); renderList(); renderVisits();
    }
    if (view === "book") renderBook();
    if (view === "community") renderCommunity();
    if (view === "resources") renderResources();
    if (view === "support") renderSupport();
    if (view === "account") renderAccount();
    window.scrollTo(0, 0);
  }

  /* =========================================================
     SCREEN 1: FIND CARE
     ========================================================= */
  function filtered() {
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    const ins = state.insurance.toLowerCase();
    const selfPay = ins === "self-pay";
    const loc = state.location.toLowerCase();

    let list = PROVIDERS.filter(p => {
      if (state.savedOnly && !state.saved.has(p.id)) return false;
      for (const f of state.filters) {
        if (f === "Online" ? p.format !== "Online" : !p.tags.includes(f)) return false;
      }
      if (words.length) {
        const hay = [p.name, p.role, p.bio, p.city, p.state, p.format, ...p.tags].join(" ").toLowerCase();
        if (!words.every(w => hay.includes(w))) return false;
      }
      if (ins && !selfPay && !p.insurance.some(i => i.toLowerCase().includes(ins))) return false;
      if (loc && p.format !== "Online" && !`${p.city} ${p.state}`.toLowerCase().includes(loc)) return false;
      return true;
    });

    if (state.sort === "openings") list = [...list].sort((a, b) => b.openings - a.openings);
    if (state.sort === "closest") list = [...list].sort((a, b) => (a.travel ?? 999) - (b.travel ?? 999));
    return list;
  }

  function renderChips() {
    $("#chips").innerHTML = FILTERS.map(f =>
      `<button type="button" class="chip" data-chip="${esc(f)}" aria-pressed="${state.filters.has(f)}">${esc(f)}</button>`
    ).join("");
  }

  function providerCard(p) {
    const isSaved = state.saved.has(p.id);
    const open = state.expanded.has(p.id);
    const pastCount = state.pastVisits.filter(v => v.providerId === p.id).length;
    const travel = p.format === "Online" ? "Video visits"
      : state.location ? `About ${p.travel} min away` : "Add your location for travel time";
    return `
      <article class="card provider ${state.selectedId === p.id ? "is-selected" : ""}" data-id="${p.id}">
        <div class="avatar" aria-hidden="true">${p.initials}</div>
        <div>
          <div class="p-head">
            <h3>${esc(p.name)}</h3>
            <div class="badges">
              ${pastCount ? `<span class="badge visited-badge">Visited (${pastCount})</span>` : ""}
              <span class="badge fmt">${p.format}</span>
              <span class="badge">${plural(p.openings, "opening")}</span>
            </div>
          </div>
          <p class="role">${esc(p.role)}</p>
          <p class="bio">${esc(p.bio)}</p>
          <p class="meta">
            <span>${ICON.pin}${esc(p.city)}</span>
            <span>${ICON.clock}${p.intro} min intro call</span>
            <span>${ICON.shield}Demo credentials</span>
            <span class="travel">${travel}</span>
          </p>
          ${open ? `<div class="profile">
            <p><strong>Specialties:</strong> ${p.tags.join(", ")}</p>
            <p><strong>Accepted insurance:</strong> ${p.insurance.join(", ")}</p>
            <p>${p.tags.includes("Sliding scale") ? "Offers sliding-scale rates for self-pay." : "Self-pay rates available on request."}</p>
          </div>` : ""}
          <div class="p-foot">
            <span class="sub">Demo availability</span>
            <div class="p-actions">
              <button type="button" class="btn" data-act="save" aria-pressed="${isSaved}">${isSaved ? "Saved ✓" : "Save"}</button>
              <button type="button" class="btn" data-act="profile" aria-expanded="${open}">${open ? "Hide profile" : "View profile"}</button>
              <button type="button" class="btn primary" data-act="book">Book visit</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderList() {
    const list = filtered();
    if (!list.some(p => p.id === state.selectedId)) state.selectedId = list[0] ? list[0].id : null;
    $("#count").textContent = `${plural(list.length, "provider")} • Updated today`;
    $("#provider-list").innerHTML = list.length
      ? list.map(providerCard).join("")
      : `<div class="card empty"><h2>No providers match</h2>
           <p class="sub">Try removing a filter, changing your insurance, or paying without insurance.</p>
           <button type="button" class="btn primary" data-act="clear">Clear filters</button></div>`;
    $("#saved-count").hidden = state.saved.size === 0;
    $("#saved-count").textContent = state.saved.size;
    $("#saved-btn").setAttribute("aria-pressed", state.savedOnly);
    updateInsuranceStatus(list.length);
  }

  function updateInsuranceStatus(n) {
    const s = $("#ins-status");
    const ins = state.insurance;
    if (!ins) s.textContent = "No insurance entered. Showing all providers.";
    else if (ins.toLowerCase() === "self-pay") s.textContent = "Paying without insurance. Showing all providers, including sliding-scale options.";
    else s.textContent = `${plural(n, "provider")} match ${ins}.`;
  }

  function completeVisit(visitId) {
    const idx = state.visits.findIndex(v => String(v.id) === String(visitId));
    if (idx === -1) return;
    const v = state.visits[idx];
    state.visits.splice(idx, 1);
    state.pastVisits.unshift({
      id: v.id,
      providerId: v.providerId,
      date: v.date,
      time: v.time,
      type: v.type,
      sessionKind: "Completed Therapy Visit",
      notes: "Completed session. Add any personal reflections or next steps in your Account tab."
    });
    persist();
  }

  function renderVisits() {
    const sorted = [...state.visits].sort((a, b) =>
      (a.date + String(SLOTS.indexOf(a.time)).padStart(2, "0")).localeCompare(b.date + String(SLOTS.indexOf(b.time)).padStart(2, "0")));
    $("#visits").innerHTML = `
      <h2 id="visits-h">Your visits${sorted.length ? ` (${sorted.length})` : ""}</h2>
      ${sorted.length ? `<div class="visit-list">${sorted.map(v => {
        const p = byId(v.providerId);
        return `<div class="visit">
          <div>
            <strong>${esc(p ? p.name : "Provider")}</strong>
            <small>${longDay(fromIso(v.date))} at ${v.time}, ${v.type === "video" ? "video" : "in person"}</small>
          </div>
          <div class="visit-actions">
            <button type="button" class="link-btn success-link" data-complete="${v.id}" title="Mark as completed and move to history">Complete</button>
            <button type="button" class="link-btn" data-cancel="${v.id}">Cancel</button>
          </div>
        </div>`;
      }).join("")}</div>`
      : `<p class="sub" style="margin-top:6px">No upcoming visits booked. Choose <strong>Book visit</strong> on a provider to start.</p>`}
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;font-size:12px">
        <span class="sub">${plural(state.pastVisits.length, "past visit")} on file</span>
        <a href="#account" style="color:var(--green-dark);font-weight:600;text-decoration:none">View history →</a>
      </div>`;
  }

  function applyInsurance(value) {
    state.insurance = value.trim();
    $("#ins-input").value = state.insurance;
    persist();
    renderList();
  }

  function initFind() {
    $("#ins-input").value = state.insurance;
    $("#loc-input").value = state.location;

    $("#search-form").addEventListener("submit", e => { e.preventDefault(); state.query = $("#q").value; renderList(); });
    $("#q").addEventListener("input", e => { state.query = e.target.value; renderList(); });
    $("#sort").addEventListener("change", e => { state.sort = e.target.value; renderList(); });

    $("#chips").addEventListener("click", e => {
      const b = e.target.closest("[data-chip]");
      if (!b) return;
      const f = b.dataset.chip;
      state.filters.has(f) ? state.filters.delete(f) : state.filters.add(f);
      renderChips(); renderList();
    });

    $("#provider-list").addEventListener("click", e => {
      const btn = e.target.closest("[data-act]");
      const card = e.target.closest(".provider");
      if (card) { state.selectedId = card.dataset.id; document.querySelectorAll(".provider").forEach(c => c.classList.toggle("is-selected", c === card)); }
      if (!btn) return;
      const id = card && card.dataset.id;
      if (btn.dataset.act === "save") {
        state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
        toast(state.saved.has(id) ? "Provider saved" : "Removed from saved providers");
        persist(); renderList();
      }
      if (btn.dataset.act === "profile") {
        state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id);
        renderList();
      }
      if (btn.dataset.act === "book") startBooking(id);
      if (btn.dataset.act === "clear") {
        state.filters.clear(); state.query = ""; state.savedOnly = false; $("#q").value = "";
        state.insurance = ""; $("#ins-input").value = ""; persist();
        renderChips(); renderList();
      }
    });

    $("#insurance-panel").addEventListener("submit", e => {
      e.preventDefault();
      state.location = $("#loc-input").value.trim();
      applyInsurance($("#ins-input").value);
      toast("Insurance updated. Matching providers refreshed.");
    });
    $("#loc-input").addEventListener("input", e => { state.location = e.target.value.trim(); persist(); renderList(); });
    $("#ins-self").addEventListener("click", () => { applyInsurance("Self-pay"); toast("Continuing without insurance"); });

    $("#learn-peer").addEventListener("click", e => {
      const note = $("#peer-note");
      note.hidden = !note.hidden;
      e.currentTarget.setAttribute("aria-expanded", !note.hidden);
    });

    $("#visits").addEventListener("click", e => {
      const comp = e.target.closest("[data-complete]");
      if (comp) {
        completeVisit(comp.dataset.complete);
        renderVisits();
        renderList();
        toast("Visit marked as completed and saved to your Account history");
        return;
      }
      const b = e.target.closest("[data-cancel]");
      if (!b) return;
      state.visits = state.visits.filter(v => String(v.id) !== b.dataset.cancel);
      persist(); renderVisits(); toast("Visit cancelled");
    });
  }

  /* =========================================================
     SCREEN 2: CHOOSE APPOINTMENT
     ========================================================= */
  function startBooking(providerId) {
    state.providerId = providerId;
    state.weekStart = mondayOf(today0());
    state.date = iso(today0());
    state.time = null;
    state.visitType = null;
    state.showBenefits = false;
    state.chat = [{ who: "bot", text: "Choose a visit type, date, and time." }];
    go("book");
  }

  function slotsFor(p, d) {
    return SLOTS.filter((_, i) => (d.getDate() + i + p.id.length) % 4 !== 0);
  }

  function renderBook() {
    const root = $("#view-book");
    const p = byId(state.providerId);
    if (!p) {
      root.innerHTML = `<div class="card empty"><h2>Pick a provider first</h2>
        <p class="sub">Choose <strong>Book visit</strong> on any provider to see times.</p>
        <button type="button" class="btn primary" data-go="find">Find care</button></div>`;
      return;
    }

    const types = p.format === "Online" ? ["video"] : ["person", "video"];
    if (!types.includes(state.visitType)) {
      if (state.account.preferredFormat === "Video" && types.includes("video")) state.visitType = "video";
      else if (state.account.preferredFormat === "In-person" && types.includes("person")) state.visitType = "person";
      else state.visitType = types[0];
    }

    const now = today0();
    const firstWeek = mondayOf(now);
    const days = [...Array(7)].map((_, i) => addDays(state.weekStart, i));
    const selected = state.date ? fromIso(state.date) : null;
    const times = selected ? slotsFor(p, selected) : [];
    if (state.time && !times.includes(state.time)) state.time = null;

    const typeBtn = (key, label, sub, icon) => `
      <button type="button" class="type" data-act="type" data-type="${key}" aria-pressed="${state.visitType === key}" ${types.includes(key) ? "" : "disabled"}>
        ${icon}<span><strong>${label}</strong><small>${types.includes(key) ? sub : "Not offered by this provider"}</small></span>
      </button>`;

    root.innerHTML = `
      <div class="book-top">
        <button type="button" class="back" data-act="back">← Back</button>
        <ol class="steps" aria-label="Booking progress">
          <li class="done"><span class="n">✓</span>Provider</li>
          <li class="current" aria-current="step"><span class="n">2</span>Appointment</li>
          <li><span class="n">3</span>Confirmed</li>
        </ol>
      </div>
      <h1 class="page-title">Choose appointment</h1>
      <p class="sub">Select visit type, date, and time with ${esc(p.name)}.</p>

      <div class="layout" style="margin-top:16px">
        <div>
          <div class="panel">
            <h3>Visit type</h3>
            <div class="type-row">
              ${typeBtn("person", "In person", p.city, ICON.person)}
              ${typeBtn("video", "Video", "Remote", ICON.video)}
            </div>

            <div class="cal-head">
              <span>${state.weekStart.toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
              <span class="cal-nav">
                <button type="button" class="btn" data-act="prev" aria-label="Previous week" ${state.weekStart <= firstWeek ? "disabled" : ""}>←</button>
                <button type="button" class="btn" data-act="next" aria-label="Next week" ${state.weekStart >= addDays(firstWeek, 56) ? "disabled" : ""}>→</button>
              </span>
            </div>
            <div class="days" role="group" aria-label="Choose a day">
              ${days.map(d => `<button type="button" class="day" data-day="${iso(d)}" aria-pressed="${iso(d) === state.date}" ${d < now ? "disabled" : ""}>
                <small>${d.toLocaleDateString("en-US", { weekday: "short" })}</small><strong>${d.getDate()}</strong></button>`).join("")}
            </div>

            <div class="times-head">
              <span>${selected ? longDay(selected) : "Select a day to see times"}</span><span>${TZ}</span>
            </div>
            <div class="times" role="group" aria-label="Choose a time">
              ${selected ? times.map(t => `<button type="button" class="time" data-time="${t}" aria-pressed="${t === state.time}">${t}${t === state.time ? " ✓" : ""}</button>`).join("") : ""}
            </div>
          </div>

          <div class="card summary">
            <div class="summary-head"><span>Appointment</span><span class="tag">Booking for ${esc(state.account.name)}</span></div>
            <div class="summary-body">
              <div class="who-row"><span class="mini-avatar">${p.initials}</span>
                <div><strong>${esc(p.name)}</strong><div class="tag">${esc(state.visitType === "video" ? "Video, remote" : p.city)}</div></div></div>
              <div>${state.time
                ? `<strong>${longDay(selected)} at ${state.time} ${TZ}</strong><div class="tag">${state.visitType === "video" ? "Video" : "In person"}</div>`
                : `<span class="tag">Choose a date and time</span>`}</div>
            </div>
            <div class="summary-foot">
              <span class="tag">Review next</span>
              <button type="button" class="btn mint" data-act="continue" ${state.time ? "" : "disabled"}>Continue →</button>
            </div>
          </div>
        </div>

        <aside class="col-side" aria-label="Help">
          <div class="mini-card">
            <h3>Connect</h3>
            <div class="row two">
              <button type="button" class="btn" data-act="optin" aria-pressed="${state.optedIn}">${state.optedIn ? "Opted in ✓" : "Opt in"}</button>
              <button type="button" class="btn" data-act="learn">Learn</button>
            </div>
          </div>
          <div class="mini-card">
            <h3>Provider</h3>
            <button type="button" class="link-btn" style="color:var(--green-dark)" data-act="benefits" aria-expanded="${state.showBenefits}">Check benefits →</button>
            ${state.showBenefits ? `<p class="sub" style="margin-top:6px">${benefitsText(p)}</p>` : ""}
          </div>
          <div class="mini-card">
            <h3>Help <span class="sub">(demo assistant)</span></h3>
            <div class="chat-log" id="chat-log" aria-live="polite">
              ${state.chat.map(m => `<div class="bubble ${m.who === "me" ? "me" : ""}"><small>${m.who === "me" ? "You" : "Assistant"}</small>${esc(m.text)}</div>`).join("")}
            </div>
            <form class="chat-form" id="chat-form">
              <label class="sr" for="chat-input">Ask the assistant</label>
              <input id="chat-input" placeholder="Ask..." autocomplete="off">
              <button class="btn dark" type="submit" aria-label="Send">${ICON.send}</button>
            </form>
          </div>
        </aside>
      </div>`;

    const log = $("#chat-log");
    if (log) log.scrollTop = log.scrollHeight;
  }

  function benefitsText(p) {
    const ins = state.insurance;
    if (!ins) return "Add your insurance on Find care to see whether this provider accepts it.";
    if (ins.toLowerCase() === "self-pay") return "You are booking as self-pay. " + (p.tags.includes("Sliding scale") ? "This provider offers sliding-scale rates." : "Ask about self-pay rates at your intro call.");
    return p.insurance.some(i => i.toLowerCase().includes(ins.toLowerCase()))
      ? `${p.name.split(",")[0]} accepts ${ins} (Member ID: ${state.account.memberId || "on file"}).`
      : `${p.name.split(",")[0]} may not accept ${ins}. Confirm before booking.`;
  }

  function assistantReply(text) {
    const t = text.toLowerCase();
    const p = byId(state.providerId);
    if (/insur|cover|cost|price|pay|benefit/.test(t)) return benefitsText(p);
    if (/time|when|slot|avail|date|day/.test(t)) return `Pick a day, then choose a time. Times are shown in your time zone (${TZ}).`;
    if (/video|person|online|remote|visit/.test(t)) return p.format === "Online" ? "This provider offers video visits only." : "You can choose in person or video at the top of the page.";
    return "I can help with visit type, date, time, or insurance.";
  }

  function confirmBooking() {
    const p = byId(state.providerId);
    if (state.visits.some(v => v.providerId === p.id && v.date === state.date && v.time === state.time)) {
      toast("You already booked that time with this provider.");
      return;
    }
    state.visits.push({ id: Date.now(), providerId: p.id, date: state.date, time: state.time, type: state.visitType });
    persist();
    const d = fromIso(state.date);
    const dlg = $("#confirm");
    dlg.innerHTML = `
      <div class="check" aria-hidden="true">✓</div>
      <h2 id="confirm-h">Appointment confirmed</h2>
      <p><strong>${esc(p.name)}</strong></p>
      <p>${longDay(d)} at ${state.time} ${TZ}, ${state.visitType === "video" ? "video" : "in person"}</p>
      <p>Booked for <strong>${esc(state.account.name)}</strong>. You now have ${plural(state.visits.length, "upcoming visit")}.</p>
      <div class="row">
        <button type="button" class="btn" data-dlg="another">Book another visit</button>
        <button type="button" class="btn primary" data-dlg="done">Done</button>
      </div>`;
    dlg.showModal();
  }

  function initBook() {
    const root = $("#view-book");
    root.addEventListener("click", e => {
      const goBtn = e.target.closest("[data-go]");
      if (goBtn) return go(goBtn.dataset.go);
      const day = e.target.closest("[data-day]");
      if (day) { state.date = day.dataset.day; state.time = null; return renderBook(); }
      const time = e.target.closest("[data-time]");
      if (time) { state.time = time.dataset.time; return renderBook(); }
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      switch (btn.dataset.act) {
        case "back": go("find"); break;
        case "type": state.visitType = btn.dataset.type; renderBook(); break;
        case "prev": state.weekStart = addDays(state.weekStart, -7); state.date = null; state.time = null; renderBook(); break;
        case "next": state.weekStart = addDays(state.weekStart, 7); state.date = null; state.time = null; renderBook(); break;
        case "continue": confirmBooking(); break;
        case "optin": state.optedIn = !state.optedIn; persist(); toast(state.optedIn ? "You opted in to peer connections" : "You opted out"); renderBook(); break;
        case "learn": toast("Peer groups are anonymous. Members only see your alias."); break;
        case "benefits": state.showBenefits = !state.showBenefits; renderBook(); break;
      }
    });
    root.addEventListener("submit", e => {
      if (e.target.id !== "chat-form") return;
      e.preventDefault();
      const input = $("#chat-input");
      const text = input.value.trim();
      if (!text) return;
      state.chat.push({ who: "me", text }, { who: "bot", text: assistantReply(text) });
      renderBook();
      $("#chat-input").focus();
    });
  }

  /* =========================================================
     SCREEN 3: GROUPS & MESSAGES
     ========================================================= */
  function renderCommunity() {
    const root = $("#view-community");
    const c = state.comm;
    const thread = COMMUNITY.threads[c.active];
    const isGroup = c.active.startsWith("g:");
    COMMUNITY.alias = state.account.alias || "Willow";

    const discover = `
      <div class="suggest">
        ${COMMUNITY.suggestions.map(s => `
          <div class="card"><div class="who-row"><span class="dot">${s.name[0]}</span><div><strong>${s.name}</strong><div class="tag">${s.interest}</div></div></div>
          <button type="button" class="btn ${c.requested.has(s.name) ? "" : "primary"}" data-req="${s.name}" ${c.requested.has(s.name) ? "disabled" : ""}>${c.requested.has(s.name) ? "Request sent" : "Connect"}</button></div>`).join("")}
      </div>`;

    const listItems = c.list === "messages"
      ? `<div class="label-s">YOUR CONNECTIONS</div>` + COMMUNITY.connections.map(n =>
          `<button type="button" class="conn" data-open="c:${n}" aria-current="${c.active === "c:" + n}"><span class="dot">${n[0]}</span>${n}</button>`).join("")
      : `<div class="label-s">YOUR GROUPS</div>` + COMMUNITY.groups.map(n =>
          `<button type="button" class="conn" data-open="g:${n}" aria-current="${c.active === "g:" + n}"><span class="dot">${n[0]}</span>${n}</button>`).join("");

    const conversation = `
      <div class="comm">
        <section class="card" aria-label="Conversations">
          <h2>Conversations</h2>
          <div class="seg">
            <button type="button" data-list="messages" aria-pressed="${c.list === "messages"}">Messages</button>
            <button type="button" data-list="groups" aria-pressed="${c.list === "groups"}">Groups</button>
          </div>
          ${listItems}
        </section>

        <section class="card chat" aria-label="Conversation with ${esc(thread.title)}">
          <div class="chat-head"><span class="dot">${thread.title[0]}</span><div><strong>${esc(thread.title)}</strong><small>${esc(thread.sub)}</small></div></div>
          <div class="msgs" id="msgs">
            ${thread.msgs.map(m => `<div class="msg ${m.who === "me" ? "me" : ""}"><span class="who">${esc(m.name)}</span><p>${esc(m.text)}</p></div>`).join("")}
          </div>
          <form class="composer" id="composer">
            <label class="sr" for="msg-input">Message ${esc(thread.title)}</label>
            <input id="msg-input" placeholder="Message ${esc(thread.title)}" autocomplete="off">
            <button type="submit" class="btn dark">Send →</button>
          </form>
        </section>

        <section class="card" aria-label="Your groups">
          <h2>Your groups <span class="sub" style="float:right">${COMMUNITY.groups.length} joined</span></h2>
          ${COMMUNITY.groups.map(n => `<button type="button" class="group-btn" data-open="g:${n}" aria-current="${c.active === "g:" + n}"><span class="dot">${n[0]}</span>${n}</button>`).join("")}
          ${isGroup ? `<div class="card sel-group"><span class="label-s" style="margin:0">SELECTED GROUP</span>
            <h3>${esc(thread.title)}</h3><p class="sub">${esc(thread.desc)}</p></div>` : ""}
        </section>
      </div>`;

    root.innerHTML = `
      <p class="crumbs"><a href="#find">Find care</a> / Patient connections / Groups &amp; messages</p>
      <div class="comm-top">
        <div><h1>Groups &amp; messages</h1><p class="sub">Pick up a conversation, share a small win, or simply read along.</p></div>
        <div class="alias"><span class="dot">${esc(COMMUNITY.alias[0] || "W")}</span><div><strong>${esc(COMMUNITY.alias)}</strong><small>Your community alias</small></div></div>
      </div>
      <div class="tabs" role="group" aria-label="Community sections">
        <button type="button" class="tab" data-tab="discover" aria-pressed="${c.tab === "discover"}">Discover connections</button>
        <button type="button" class="tab" data-tab="groups" aria-pressed="${c.tab === "groups"}">Groups &amp; messages</button>
        <span class="demo">Demo community. All conversations are illustrative.</span>
      </div>
      ${c.tab === "discover" ? discover : conversation}
      <div class="disclaimer">
        <span>Peer support is not professional care or crisis support. In immediate danger, contact local emergency services.</span>
        <a href="#find">Find care</a>
      </div>`;

    const m = $("#msgs");
    if (m) m.scrollTop = m.scrollHeight;
  }

  function initCommunity() {
    const root = $("#view-community");
    root.addEventListener("click", e => {
      const c = state.comm;
      const tab = e.target.closest("[data-tab]");
      if (tab) { c.tab = tab.dataset.tab; return renderCommunity(); }
      const list = e.target.closest("[data-list]");
      if (list) { c.list = list.dataset.list; c.active = c.list === "messages" ? "c:Cedar" : "g:Small wins"; return renderCommunity(); }
      const open = e.target.closest("[data-open]");
      if (open) { c.active = open.dataset.open; c.list = c.active.startsWith("g:") ? "groups" : "messages"; return renderCommunity(); }
      const req = e.target.closest("[data-req]");
      if (req) { c.requested.add(req.dataset.req); toast("Connection request sent"); renderCommunity(); }
    });
    root.addEventListener("submit", e => {
      if (e.target.id !== "composer") return;
      e.preventDefault();
      const input = $("#msg-input");
      const text = input.value.trim();
      if (!text) return;
      COMMUNITY.threads[state.comm.active].msgs.push({ who: "me", name: "You", text });
      renderCommunity();
      $("#msg-input").focus();
    });
  }

  /* =========================================================
     SCREEN 4: RESOURCES
     ========================================================= */
  function filteredResources() {
    const q = state.res.query.toLowerCase().trim();
    return RESOURCES.filter(r => {
      if (state.res.savedOnly && !state.res.saved.has(r.id)) return false;
      if (state.res.cat !== "All" && r.cat !== state.res.cat) return false;
      if (q) {
        const hay = `${r.title} ${r.cat} ${r.summary} ${r.steps.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderResources() {
    const root = $("#view-resources");
    const list = filteredResources();
    const rState = state.res;

    root.innerHTML = `
      <p class="crumbs"><a href="#find">Find care</a> / Resources</p>
      <div class="comm-top">
        <div>
          <h1 class="page-title">Mental health resources &amp; guides</h1>
          <p class="sub">Practical grounding tools, first-visit checklists, and insurance guides.</p>
        </div>
        <button type="button" class="btn" data-res-act="toggle-saved" aria-pressed="${rState.savedOnly}">
          Saved guides (${rState.saved.size})
        </button>
      </div>

      <div class="layout" style="margin-top:16px">
        <div class="col-main">
          <form class="card search" id="res-search-form" role="search">
            <label class="sr" for="res-q">Search guides and exercises</label>
            <div class="field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input id="res-q" type="search" value="${esc(rState.query)}" placeholder="Search guides, breathing exercises, or insurance tips..." autocomplete="off">
            </div>
            <button class="btn primary" type="submit">Search</button>
          </form>

          <div class="card filters">
            <div class="chips" role="group" aria-label="Resource categories">
              ${RESOURCE_CATS.map(c => `<button type="button" class="chip" data-res-cat="${esc(c)}" aria-pressed="${rState.cat === c}">${esc(c)}</button>`).join("")}
            </div>
            <p class="count">${plural(list.length, "resource")}</p>
          </div>

          <div class="plist">
            ${list.length ? list.map(r => {
              const isOpen = rState.open.has(r.id);
              const isSaved = rState.saved.has(r.id);
              return `
                <article class="card res-card">
                  <div class="p-head">
                    <div>
                      <span class="badge fmt">${esc(r.cat)}</span>
                      <h3 style="margin-top:6px">${esc(r.title)}</h3>
                    </div>
                    <span class="badge">${ICON.clock} ${esc(r.readTime)}</span>
                  </div>
                  <p class="bio">${esc(r.summary)}</p>
                  ${isOpen ? `
                    <div class="profile" style="margin-top:12px">
                      <strong>Key takeaways &amp; steps:</strong>
                      <ol class="res-steps">
                        ${r.steps.map(s => `<li>${esc(s)}</li>`).join("")}
                      </ol>
                    </div>
                  ` : ""}
                  <div class="p-foot">
                    <span class="sub">Self-guided tool</span>
                    <div class="p-actions">
                      <button type="button" class="btn" data-res-save="${r.id}" aria-pressed="${isSaved}">${isSaved ? "Saved ✓" : "Bookmark"}</button>
                      <button type="button" class="btn primary" data-res-open="${r.id}" aria-expanded="${isOpen}">${isOpen ? "Close guide" : "Read guide"}</button>
                    </div>
                  </div>
                </article>`;
            }).join("") : `
              <div class="card empty">
                <h2>No matching guides found</h2>
                <p class="sub">Try clearing your search or switching categories.</p>
                <button type="button" class="btn primary" data-res-act="reset">Reset filters</button>
              </div>
            `}
          </div>
        </div>

        <aside class="col-side" aria-label="Immediate support and tools">
          <section class="card side crisis-card">
            <h2>Immediate crisis support</h2>
            <p class="sub" style="margin-top:4px">If you or someone you know is in crisis or immediate danger, free confidential support is available 24/7.</p>
            <div class="crisis-list">
              <div><strong>988 Suicide &amp; Crisis Lifeline</strong><small>Call or text 988 (Available 24/7)</small></div>
              <div><strong>Crisis Text Line</strong><small>Text HOME to 741741</small></div>
              <div><strong>Emergency Services</strong><small>Call 911 or go to the nearest emergency room</small></div>
            </div>
          </section>

          <section class="card side">
            <h2>Ready to talk to someone?</h2>
            <p class="sub" style="margin-top:4px">Filter providers by specialty or insurance to book an intro call.</p>
            <div class="row two">
              <button type="button" class="btn primary" data-go="find">Find providers</button>
              <button type="button" class="btn" data-go="community">Peer groups</button>
            </div>
          </section>
        </aside>
      </div>`;
  }

  function initResources() {
    const root = $("#view-resources");
    root.addEventListener("click", e => {
      const cat = e.target.closest("[data-res-cat]");
      if (cat) { state.res.cat = cat.dataset.resCat; return renderResources(); }

      const open = e.target.closest("[data-res-open]");
      if (open) {
        const id = open.dataset.resOpen;
        state.res.open.has(id) ? state.res.open.delete(id) : state.res.open.add(id);
        return renderResources();
      }

      const save = e.target.closest("[data-res-save]");
      if (save) {
        const id = save.dataset.resSave;
        state.res.saved.has(id) ? state.res.saved.delete(id) : state.res.saved.add(id);
        persist();
        toast(state.res.saved.has(id) ? "Guide bookmarked" : "Removed from bookmarks");
        return renderResources();
      }

      const act = e.target.closest("[data-res-act]");
      if (act) {
        if (act.dataset.resAct === "toggle-saved") state.res.savedOnly = !state.res.savedOnly;
        if (act.dataset.resAct === "reset") { state.res.query = ""; state.res.cat = "All"; state.res.savedOnly = false; }
        return renderResources();
      }
    });

    root.addEventListener("submit", e => {
      if (e.target.id !== "res-search-form") return;
      e.preventDefault();
      state.res.query = $("#res-q").value;
      renderResources();
    });

    root.addEventListener("input", e => {
      if (e.target.id !== "res-q") return;
      state.res.query = e.target.value;
      const cursor = e.target.selectionStart;
      renderResources();
      const input = $("#res-q");
      if (input) { input.focus(); input.setSelectionRange(cursor, cursor); }
    });
  }

  /* =========================================================
     SCREEN 5: SUPPORT
     ========================================================= */
  function renderSupport() {
    const root = $("#view-support");
    const sState = state.sup;

    root.innerHTML = `
      <p class="crumbs"><a href="#find">Find care</a> / Support</p>
      <div class="comm-top">
        <div>
          <h1 class="page-title">Help &amp; support center</h1>
          <p class="sub">Get answers to common questions, chat with our care team, or submit a support request.</p>
        </div>
        <div class="row" style="margin-top:0">
          <button type="button" class="btn" data-dlg="open-support">Live chat support</button>
          <button type="button" class="btn dark" data-dlg="call-support">Request a callback</button>
        </div>
      </div>

      <div class="layout" style="margin-top:16px">
        <div class="col-main">
          <section class="card">
            <h2>Frequently asked questions</h2>
            <p class="sub">Click any question to view details.</p>
            <div class="faq-list">
              ${FAQS.map(f => {
                const open = sState.openFaq.has(f.id);
                return `
                  <div class="faq-item">
                    <button type="button" class="faq-q" data-faq="${f.id}" aria-expanded="${open}">
                      <span>${esc(f.q)}</span>
                      <span>${open ? "−" : "+"}</span>
                    </button>
                    ${open ? `<p class="faq-a">${esc(f.a)}</p>` : ""}
                  </div>`;
              }).join("")}
            </div>
          </section>

          <form class="card insurance" id="support-form">
            <h2>Submit a support request</h2>
            <p class="sub">Need help with billing, insurance verification, or rescheduling? Send us a message.</p>
            <div class="ins-grid">
              <label>Topic
                <select id="sup-topic" class="full-select">
                  <option value="Insurance & Billing">Insurance &amp; Billing</option>
                  <option value="Scheduling & Visits">Scheduling &amp; Visits</option>
                  <option value="Provider Matching">Provider Matching</option>
                  <option value="Peer Community">Peer Community</option>
                  <option value="Technical Issue">Technical Issue</option>
                </select>
              </label>
              <label>Your email
                <input id="sup-email" type="email" value="${esc(state.account.email)}" required placeholder="you@example.com">
              </label>
            </div>
            <label class="block-label">How can we help?
              <textarea id="sup-msg" rows="3" required placeholder="Describe your question or issue..."></textarea>
            </label>
            <div class="row">
              <button type="submit" class="btn primary">Send request</button>
            </div>
          </form>
        </div>

        <aside class="col-side" aria-label="Support status and tickets">
          <section class="card side">
            <h2>Support hours &amp; response times</h2>
            <p class="sub" style="margin-top:4px">Live chat: Mon–Fri, 8:00 AM – 8:00 PM CST<br>Ticket replies: Within 1 business day</p>
            <p class="note">Phone support: (800) 555-MIND (demo line)</p>
          </section>

          <section class="card side">
            <h2>Your support requests (${sState.tickets.length})</h2>
            ${sState.tickets.length ? `
              <div class="visit-list">
                ${sState.tickets.map(t => `
                  <div class="visit">
                    <div>
                      <strong>#${t.id} · ${esc(t.topic)}</strong>
                      <small>${esc(t.text)}</small>
                      <small style="color:var(--green-dark);font-weight:500">${esc(t.status)} · ${esc(t.date)}</small>
                    </div>
                    <button type="button" class="link-btn" data-del-ticket="${t.id}">Resolve</button>
                  </div>
                `).join("")}
              </div>
            ` : `<p class="sub" style="margin-top:6px">No open support tickets.</p>`}
          </section>
        </aside>
      </div>`;
  }

  function initSupport() {
    const root = $("#view-support");
    root.addEventListener("click", e => {
      const faq = e.target.closest("[data-faq]");
      if (faq) {
        const id = faq.dataset.faq;
        state.sup.openFaq.has(id) ? state.sup.openFaq.delete(id) : state.sup.openFaq.add(id);
        return renderSupport();
      }
      const del = e.target.closest("[data-del-ticket]");
      if (del) {
        state.sup.tickets = state.sup.tickets.filter(t => String(t.id) !== del.dataset.delTicket);
        persist();
        toast("Support ticket marked as resolved");
        return renderSupport();
      }
    });

    root.addEventListener("submit", e => {
      if (e.target.id !== "support-form") return;
      e.preventDefault();
      const topic = $("#sup-topic").value;
      const text = $("#sup-msg").value.trim();
      if (!text) return;
      const ticketId = Math.floor(1000 + Math.random() * 9000);
      state.sup.tickets.unshift({
        id: ticketId,
        topic,
        text,
        status: "Open",
        date: longDay(new Date())
      });
      persist();
      renderSupport();
      toast(`Support ticket #${ticketId} submitted`);
    });
  }

  /* =========================================================
     SCREEN 6: ACCOUNT (Profile, Insurance Card & Visit History)
     ========================================================= */
  function readAccountFormIntoState() {
    const root = $("#view-account");
    if (!root || root.hidden) return;
    const val = id => { const el = $(id, root); return el ? el.value : ""; };
    const chk = id => { const el = $(id, root); return el ? el.checked : false; };

    state.account.name = val("#acc-name").trim() || "Alex Rivera";
    state.account.pronouns = val("#acc-pronouns").trim();
    state.account.dob = val("#acc-dob");
    state.account.email = val("#acc-email").trim();
    state.account.phone = val("#acc-phone").trim();
    state.account.alias = val("#acc-alias").trim() || "Willow";
    COMMUNITY.alias = state.account.alias;

    state.location = val("#acc-loc").trim();
    state.insurance = val("#acc-ins").trim();
    state.account.memberId = val("#acc-member").trim();
    state.account.groupNumber = val("#acc-group").trim();
    state.account.preferredFormat = val("#acc-format");
    state.optedIn = val("#acc-optin") === "true";

    state.account.emergencyName = val("#acc-em-name").trim();
    state.account.emergencyRelation = val("#acc-em-rel").trim();
    state.account.emergencyPhone = val("#acc-em-phone").trim();
    state.account.careGoals = val("#acc-goals").trim();
    state.account.remindersEmail = chk("#acc-rem-email");
    state.account.remindersSms = chk("#acc-rem-sms");

    const insInput = $("#ins-input");
    const locInput = $("#loc-input");
    if (insInput) insInput.value = state.insurance;
    if (locInput) locInput.value = state.location;

    persist();
  }

  function renderAccount() {
    const root = $("#view-account");
    const acc = state.account;
    const initials = acc.name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join("") || "AR";

    const sortedUpcoming = [...state.visits].sort((a, b) =>
      (a.date + String(SLOTS.indexOf(a.time)).padStart(2, "0")).localeCompare(b.date + String(SLOTS.indexOf(b.time)).padStart(2, "0")));

    const sortedPast = [...state.pastVisits].sort((a, b) => b.date.localeCompare(a.date));

    const uniqueProvidersVisited = new Set(state.pastVisits.map(v => v.providerId)).size;

    root.innerHTML = `
      <p class="crumbs"><a href="#find">Find care</a> / Account</p>
      <div class="comm-top">
        <div class="who-row">
          <div class="avatar" style="width:52px;height:52px;font-size:15px;background:var(--green-soft);color:var(--green-dark);border-color:var(--green-line)">${esc(initials)}</div>
          <div>
            <h1 class="page-title">${esc(acc.name)} ${acc.pronouns ? `<span class="badge">${esc(acc.pronouns)}</span>` : ""}</h1>
            <p class="sub">${esc(acc.email)} · ${esc(acc.phone || "No phone on file")} · Community alias: <strong>${esc(acc.alias)}</strong></p>
          </div>
        </div>
        <span class="badge fmt" id="acc-save-indicator">All changes saved to browser</span>
      </div>

      <div class="layout" style="margin-top:16px">
        <div class="col-main">

          <!-- 1. Personal & Insurance Form -->
          <form class="card insurance" id="account-form">
            <h2>Personal information &amp; insurance details</h2>
            <p class="sub">Inputs automatically save and sync with your Find Care filters and booking profile.</p>

            <div class="ins-grid">
              <label>Full legal name (private)
                <input id="acc-name" value="${esc(acc.name)}" required>
              </label>
              <label>Pronouns
                <input id="acc-pronouns" value="${esc(acc.pronouns)}" placeholder="e.g. she/her, he/him, they/them">
              </label>
              <label>Date of birth
                <input id="acc-dob" type="date" value="${esc(acc.dob)}">
              </label>
              <label>Phone number
                <input id="acc-phone" type="tel" value="${esc(acc.phone)}" placeholder="(555) 234-5678">
              </label>
              <label>Email address
                <input id="acc-email" type="email" value="${esc(acc.email)}" required>
              </label>
              <label>Community alias (shown in peer groups)
                <input id="acc-alias" value="${esc(acc.alias)}" required>
              </label>
            </div>

            <h3 class="sec-subhead">Insurance &amp; care preferences</h3>
            <div class="ins-grid">
              <label>Default insurance provider
                <input id="acc-ins" list="insurers" value="${esc(state.insurance)}" placeholder="e.g. Aetna or Self-pay">
              </label>
              <label>Default location (city, state)
                <input id="acc-loc" value="${esc(state.location)}" placeholder="e.g. Richardson, TX">
              </label>
              <label>Subscriber / Member ID
                <input id="acc-member" value="${esc(acc.memberId)}" placeholder="e.g. BCBS-8849201">
              </label>
              <label>Group number
                <input id="acc-group" value="${esc(acc.groupNumber)}" placeholder="e.g. GRP-44210">
              </label>
              <label>Preferred visit format
                <select id="acc-format" class="full-select">
                  <option value="Either" ${acc.preferredFormat === "Either" ? "selected" : ""}>Either In-person or Video</option>
                  <option value="Video" ${acc.preferredFormat === "Video" ? "selected" : ""}>Video (Remote)</option>
                  <option value="In-person" ${acc.preferredFormat === "In-person" ? "selected" : ""}>In-person</option>
                </select>
              </label>
              <label>Peer connection visibility
                <select id="acc-optin" class="full-select">
                  <option value="true" ${state.optedIn ? "selected" : ""}>Opted in (visible via alias)</option>
                  <option value="false" ${!state.optedIn ? "selected" : ""}>Opted out</option>
                </select>
              </label>
            </div>

            <h3 class="sec-subhead">Emergency contact &amp; care goals</h3>
            <div class="ins-grid">
              <label>Emergency contact name
                <input id="acc-em-name" value="${esc(acc.emergencyName)}" placeholder="Full name">
              </label>
              <label>Relationship &amp; phone
                <div style="display:grid;grid-template-columns:110px 1fr;gap:8px">
                  <input id="acc-em-rel" value="${esc(acc.emergencyRelation)}" placeholder="Relation">
                  <input id="acc-em-phone" type="tel" value="${esc(acc.emergencyPhone)}" placeholder="(555) 000-0000">
                </div>
              </label>
            </div>

            <label class="block-label">Personal therapy goals &amp; intake notes (shared with your provider)
              <textarea id="acc-goals" rows="2" placeholder="What would you like your provider to know before your session?">${esc(acc.careGoals)}</textarea>
            </label>

            <div class="chk-row">
              <label class="chk-label"><input type="checkbox" id="acc-rem-email" ${acc.remindersEmail ? "checked" : ""}> Email appointment reminders</label>
              <label class="chk-label"><input type="checkbox" id="acc-rem-sms" ${acc.remindersSms ? "checked" : ""}> SMS text reminders</label>
            </div>

            <div class="row">
              <button type="submit" class="btn primary">Save account settings</button>
              <button type="button" class="btn" data-acc-act="reset-demo">Reset to default demo data</button>
            </div>
          </form>

          <!-- 2. Previous Visits & Clinical History -->
          <section class="card">
            <div class="p-head">
              <div>
                <h2>Previous visits &amp; session history (${sortedPast.length})</h2>
                <p class="sub">Track completed appointments, personal session takeaways, or log past visits with your providers.</p>
              </div>
              <button type="button" class="btn primary" data-acc-act="toggle-log-form">
                ${state.showLogVisitForm ? "Cancel" : "+ Log a past visit"}
              </button>
            </div>

            ${state.showLogVisitForm ? `
              <form id="log-visit-form" class="panel" style="margin-top:12px">
                <h3>Log a previous visit</h3>
                <div class="ins-grid">
                  <label>Provider
                    <select id="log-provider" class="full-select" required>
                      ${PROVIDERS.map(p => `<option value="${p.id}">${esc(p.name)} (${esc(p.city)})</option>`).join("")}
                    </select>
                  </label>
                  <label>Visit date
                    <input id="log-date" type="date" value="${iso(addDays(today0(), -7))}" max="${iso(today0())}" required>
                  </label>
                  <label>Time
                    <select id="log-time" class="full-select">
                      ${SLOTS.map(s => `<option value="${s}">${s}</option>`).join("")}
                    </select>
                  </label>
                  <label>Visit format &amp; session type
                    <div style="display:grid;grid-template-columns:110px 1fr;gap:8px">
                      <select id="log-type" class="full-select">
                        <option value="video">Video</option>
                        <option value="person">In person</option>
                      </select>
                      <input id="log-kind" value="50-min Individual Session" placeholder="Session type">
                    </div>
                  </label>
                </div>
                <label class="block-label">Session reflections / key takeaways
                  <textarea id="log-notes" rows="2" placeholder="What did you work on or want to remember from this visit?"></textarea>
                </label>
                <div class="row">
                  <button type="submit" class="btn primary">Add to visit history</button>
                </div>
              </form>
            ` : ""}

            <div class="plist" style="margin-top:14px">
              ${sortedPast.length ? sortedPast.map(v => {
                const p = byId(v.providerId);
                const isEditing = String(state.editingNoteId) === String(v.id);
                return `
                  <article class="card past-visit-card">
                    <div class="p-head">
                      <div class="who-row">
                        <span class="mini-avatar">${esc(p ? p.initials : "PR")}</span>
                        <div>
                          <h3>${esc(p ? p.name : "Provider")}</h3>
                          <span class="sub">${esc(v.sessionKind || "Therapy Session")} · ${v.type === "video" ? "Video visit" : `In person (${p ? esc(p.city) : ""})`}</span>
                        </div>
                      </div>
                      <div class="badges">
                        <span class="badge fmt">Completed</span>
                        <span class="badge">${fullDate(fromIso(v.date))} · ${esc(v.time)}</span>
                      </div>
                    </div>

                    ${isEditing ? `
                      <div class="profile" style="margin-top:10px">
                        <label style="font-weight:600;font-size:12px">Edit your session reflections:
                          <textarea id="edit-note-${v.id}" rows="2" style="margin-top:4px">${esc(v.notes)}</textarea>
                        </label>
                        <div class="row" style="margin-top:8px">
                          <button type="button" class="btn primary" data-save-note="${v.id}">Save note</button>
                          <button type="button" class="btn" data-cancel-note="${v.id}">Cancel</button>
                        </div>
                      </div>
                    ` : `
                      <div class="profile" style="margin-top:10px">
                        <p><strong>Session notes:</strong> ${esc(v.notes || "No notes recorded for this visit.")}</p>
                      </div>
                    `}

                    <div class="p-foot">
                      <span class="sub">Logged in owner history</span>
                      <div class="p-actions">
                        <button type="button" class="btn" data-edit-note="${v.id}">${isEditing ? "Editing..." : "Edit notes"}</button>
                        <button type="button" class="btn" data-del-past="${v.id}">Remove</button>
                        ${p ? `<button type="button" class="btn primary" data-rebook="${p.id}">Book again</button>` : ""}
                      </div>
                    </div>
                  </article>
                `;
              }).join("") : `
                <div class="empty">
                  <p class="sub">No previous visits recorded yet. Mark an upcoming visit as completed or click <strong>+ Log a past visit</strong> above.</p>
                </div>
              `}
            </div>
          </section>

        </div>

        <!-- Right Sidebar: Owner Summary & Upcoming Visits -->
        <aside class="col-side" aria-label="Account summary and upcoming visits">
          <section class="card side">
            <h2>Digital insurance card</h2>
            <div class="ins-card-preview">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <strong>${esc(state.insurance || "No Insurance Set")}</strong>
                <span class="badge fmt">Active</span>
              </div>
              <div class="ins-card-meta">
                <div><small>MEMBER</small><strong>${esc(acc.name)}</strong></div>
                <div><small>MEMBER ID</small><strong>${esc(acc.memberId || "—")}</strong></div>
                <div><small>GROUP NO.</small><strong>${esc(acc.groupNumber || "—")}</strong></div>
                <div><small>LOCATION</small><strong>${esc(state.location || "—")}</strong></div>
              </div>
            </div>
          </section>

          <section class="card side">
            <h2>Upcoming scheduled visits (${sortedUpcoming.length})</h2>
            ${sortedUpcoming.length ? `
              <div class="visit-list">
                ${sortedUpcoming.map(v => {
                  const p = byId(v.providerId);
                  return `
                    <div class="visit">
                      <div>
                        <strong>${esc(p ? p.name : "Provider")}</strong>
                        <small>${longDay(fromIso(v.date))} at ${v.time} (${v.type === "video" ? "video" : "in person"})</small>
                      </div>
                      <div class="visit-actions">
                        <button type="button" class="link-btn success-link" data-acc-complete="${v.id}">Complete</button>
                        <button type="button" class="link-btn" data-acc-cancel="${v.id}">Cancel</button>
                      </div>
                    </div>`;
                }).join("")}
              </div>
            ` : `<p class="sub" style="margin-top:6px">No upcoming visits scheduled.</p>`}
          </section>

          <section class="card side">
            <h2>Owner care metrics</h2>
            <div class="visit-list">
              <div class="visit"><span>Completed past visits</span><strong>${state.pastVisits.length}</strong></div>
              <div class="visit"><span>Providers visited</span><strong>${uniqueProvidersVisited}</strong></div>
              <div class="visit"><span>Upcoming visits</span><strong>${state.visits.length}</strong></div>
              <div class="visit"><span>Saved providers</span><strong>${state.saved.size}</strong></div>
              <div class="visit"><span>Bookmarked guides</span><strong>${state.res.saved.size}</strong></div>
              <div class="visit"><span>Open support tickets</span><strong>${state.sup.tickets.length}</strong></div>
            </div>
          </section>
        </aside>
      </div>`;
  }

  function initAccount() {
    const root = $("#view-account");

    // Auto-save any input/change inside #account-form immediately
    root.addEventListener("input", e => {
      if (!e.target.closest("#account-form")) return;
      readAccountFormIntoState();
      const ind = $("#acc-save-indicator");
      if (ind) ind.textContent = "Saved just now ✓";
    });

    root.addEventListener("submit", e => {
      if (e.target.id === "account-form") {
        e.preventDefault();
        readAccountFormIntoState();
        renderAccount();
        toast("Account settings & insurance profile saved");
      }
      if (e.target.id === "log-visit-form") {
        e.preventDefault();
        const providerId = $("#log-provider").value;
        const date = $("#log-date").value || iso(today0());
        const time = $("#log-time").value;
        const type = $("#log-type").value;
        const sessionKind = $("#log-kind").value.trim() || "50-min Individual Session";
        const notes = $("#log-notes").value.trim() || "Completed session.";

        state.pastVisits.unshift({
          id: Date.now(),
          providerId,
          date,
          time,
          type,
          sessionKind,
          notes
        });
        state.showLogVisitForm = false;
        persist();
        renderAccount();
        toast("Previous visit added to your history");
      }
    });

    root.addEventListener("click", e => {
      const act = e.target.closest("[data-acc-act]");
      if (act) {
        if (act.dataset.accAct === "toggle-log-form") {
          state.showLogVisitForm = !state.showLogVisitForm;
          renderAccount();
          return;
        }
        if (act.dataset.accAct === "reset-demo") {
          localStorage.removeItem("mc-state");
          state.account = { ...DEFAULT_ACCOUNT };
          state.pastVisits = [...DEFAULT_PAST_VISITS];
          state.visits = [];
          state.saved = new Set(["marcus"]);
          state.res.saved = new Set(["r1"]);
          state.sup.tickets = [];
          state.insurance = "Blue Cross Blue Shield";
          state.location = "Richardson, TX";
          COMMUNITY.alias = state.account.alias;
          persist();
          renderAccount();
          toast("Demo data restored to defaults");
          return;
        }
      }

      const rebook = e.target.closest("[data-rebook]");
      if (rebook) {
        startBooking(rebook.dataset.rebook);
        return;
      }

      const editBtn = e.target.closest("[data-edit-note]");
      if (editBtn) {
        state.editingNoteId = editBtn.dataset.editNote;
        renderAccount();
        return;
      }

      const cancelNote = e.target.closest("[data-cancel-note]");
      if (cancelNote) {
        state.editingNoteId = null;
        renderAccount();
        return;
      }

      const saveNote = e.target.closest("[data-save-note]");
      if (saveNote) {
        const id = saveNote.dataset.saveNote;
        const textarea = $(`#edit-note-${id}`);
        const visit = state.pastVisits.find(v => String(v.id) === String(id));
        if (visit && textarea) {
          visit.notes = textarea.value.trim();
          persist();
          toast("Session notes updated");
        }
        state.editingNoteId = null;
        renderAccount();
        return;
      }

      const delPast = e.target.closest("[data-del-past]");
      if (delPast) {
        state.pastVisits = state.pastVisits.filter(v => String(v.id) !== String(delPast.dataset.delPast));
        persist();
        renderAccount();
        toast("Past visit removed from history");
        return;
      }

      const accComp = e.target.closest("[data-acc-complete]");
      if (accComp) {
        completeVisit(accComp.dataset.accComplete);
        renderAccount();
        toast("Visit marked as completed and moved to Previous Visits");
        return;
      }

      const accCancel = e.target.closest("[data-acc-cancel]");
      if (accCancel) {
        state.visits = state.visits.filter(v => String(v.id) !== String(accCancel.dataset.accCancel));
        persist();
        renderAccount();
        toast("Upcoming visit cancelled");
      }
    });
  }

  /* =========================================================
     SUPPORT DIALOGS (Live Chat & Callback Modal)
     ========================================================= */
  function openSupportChatModal() {
    const dlg = $("#confirm");
    dlg.innerHTML = `
      <h2 id="confirm-h">Live Support Chat</h2>
      <p>Ask a question below and our support assistant will help right away.</p>
      <div class="chat-log modal-chat-log" id="modal-chat-log" aria-live="polite">
        ${state.sup.liveChat.map(m => `
          <div class="bubble ${m.who === "me" ? "me" : ""}">
            <small>${m.who === "me" ? "You" : "Support Agent"}</small>${esc(m.text)}
          </div>
        `).join("")}
      </div>
      <form class="chat-form" id="modal-chat-form" style="margin-top:10px">
        <input id="modal-chat-input" placeholder="Type your question..." autocomplete="off" required>
        <button class="btn primary" type="submit">Send</button>
      </form>
      <div class="row">
        <button type="button" class="btn" data-dlg="go-support">Open Support Center</button>
        <button type="button" class="btn dark" data-dlg="close">Close</button>
      </div>`;
    if (!dlg.open) dlg.showModal();
    const log = $("#modal-chat-log");
    if (log) log.scrollTop = log.scrollHeight;
    const inp = $("#modal-chat-input");
    if (inp) inp.focus();
  }

  function openCallSupportModal() {
    const dlg = $("#confirm");
    dlg.innerHTML = `
      <div class="check" aria-hidden="true">${ICON.phone}</div>
      <h2 id="confirm-h">Call MindConnect Support</h2>
      <p>Speak directly with a care coordinator at <strong>(800) 555-0199</strong>, or request a callback below.</p>
      <form id="modal-call-form" style="margin-top:12px;text-align:left;display:grid;gap:8px">
        <label style="font-size:12px;font-weight:600">Your phone number
          <input id="call-phone" type="tel" value="${esc(state.account.phone)}" placeholder="(555) 234-5678" required>
        </label>
        <label style="font-size:12px;font-weight:600">Best time to call
          <select id="call-window" class="full-select">
            <option value="Within 15 minutes">Within 15 minutes</option>
            <option value="This afternoon">This afternoon</option>
            <option value="Tomorrow morning">Tomorrow morning</option>
          </select>
        </label>
        <div class="row">
          <button type="button" class="btn" data-dlg="close">Cancel</button>
          <button type="submit" class="btn primary">Request callback</button>
        </div>
      </form>`;
    if (!dlg.open) dlg.showModal();
  }

  function supportBotReply(text) {
    const t = text.toLowerCase();
    if (/insur|aetna|cigna|kaiser|blue|self-pay|cost|price/.test(t)) {
      return "You can filter providers by insurance on the Find care screen, or update your Member ID & default insurance in the Account tab.";
    }
    if (/cancel|resched|visit|book|appoint|history|past/.test(t)) {
      return "You can view upcoming visits or log/review previous visits in the Account tab.";
    }
    if (/peer|group|anon|alias/.test(t)) {
      return `Peer groups use your alias (${state.account.alias}). You can change your alias anytime in the Account tab.`;
    }
    return "Thanks for reaching out! I can help with provider filters, insurance, visit history, or you can submit a ticket in the Support tab.";
  }

  /* =========================================================
     GLOBAL WIRING
     ========================================================= */
  function initGlobal() {
    document.addEventListener("click", e => {
      const stub = e.target.closest("[data-stub]");
      if (stub) { e.preventDefault(); toast(`${stub.dataset.stub} isn't part of this prototype yet.`); return; }
      const t = e.target.closest("[data-toast]");
      if (t) return toast(t.dataset.toast);
      const g = e.target.closest("[data-go]");
      if (g && !g.closest("#view-book")) go(g.dataset.go);

      const dlgBtn = e.target.closest("[data-dlg]");
      if (dlgBtn) {
        const act = dlgBtn.dataset.dlg;
        if (act === "open-support") return openSupportChatModal();
        if (act === "call-support") return openCallSupportModal();
        if (act === "close") return $("#confirm").close();
        if (act === "go-support") { $("#confirm").close(); return go("support"); }
        if (act === "another") {
          $("#confirm").close();
          state.time = null; state.date = iso(today0()); state.weekStart = mondayOf(today0());
          renderBook(); window.scrollTo(0, 0);
          return;
        }
        if (act === "done") {
          $("#confirm").close();
          return go("find");
        }
      }
    });

    $("#confirm").addEventListener("submit", e => {
      if (e.target.id === "modal-chat-form") {
        e.preventDefault();
        const inp = $("#modal-chat-input");
        const text = inp.value.trim();
        if (!text) return;
        state.sup.liveChat.push({ who: "me", text }, { who: "bot", text: supportBotReply(text) });
        openSupportChatModal();
      }
      if (e.target.id === "modal-call-form") {
        e.preventDefault();
        const phone = $("#call-phone").value.trim();
        const win = $("#call-window").value;
        $("#confirm").close();
        toast(`Callback requested for ${phone} (${win}).`);
      }
    });

    $("#nav-insurance").addEventListener("click", e => {
      e.preventDefault();
      go("find");
      $("#insurance-panel").scrollIntoView({ behavior: "smooth", block: "center" });
      $("#ins-input").focus({ preventScroll: true });
    });

    $("#saved-btn").addEventListener("click", () => {
      state.savedOnly = !state.savedOnly;
      go("find"); renderList();
      if (state.savedOnly && state.saved.size === 0) toast("No saved providers yet. Choose Save on a provider.");
    });

    $("#book-btn").addEventListener("click", () => {
      const id = state.selectedId || (filtered()[0] && filtered()[0].id);
      if (id) startBooking(id); else toast("No providers to book. Clear your filters first.");
    });

    window.addEventListener("hashchange", route);
  }

  /* ---------- Start ---------- */
  initFind();
  initBook();
  initCommunity();
  initResources();
  initSupport();
  initAccount();
  initGlobal();
  route();
})();