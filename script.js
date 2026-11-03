(() => {
  "use strict";

  /* =========================================================
     DEMO DATA  (edit freely: this is all placeholder content)
     ========================================================= */
  const PROVIDERS = [
    { id: "maya", initials: "MC", name: "Maya Chen, LMFT", role: "Licensed Marriage and Family Therapist",
      bio: "Specializes in anxiety, depression, and relationship therapy for adults and couples. Warm, collaborative approach with a focus on practical tools and long-term growth.",
      city: "San Francisco, CA", state: "California", format: "Online", intro: 15, openings: 4, travel: null,
      tags: ["Anxiety", "Depression", "Couples", "Sliding scale"], insurance: ["Aetna", "Cigna", "Blue Cross Blue Shield"] },
    { id: "jordan", initials: "JP", name: "Jordan Patel, LCSW", role: "Licensed Clinical Social Worker",
      bio: "Focuses on trauma-informed care, stress management, and life transitions. Calm, grounded approach with an emphasis on safety and sustainable progress.",
      city: "Oakland, CA", state: "California", format: "In-person", intro: 30, openings: 2, travel: 25,
      tags: ["Anxiety", "Sliding scale"], insurance: ["Aetna", "Kaiser Permanente"] },
    { id: "elena", initials: "EB", name: "Elena Brooks, PsyD", role: "Licensed Clinical Psychologist",
      bio: "Supports individuals navigating grief, burnout, and major life changes. Structured yet empathetic approach with a focus on clarity, coping skills, and next steps.",
      city: "Los Angeles, CA", state: "California", format: "Online", intro: 20, openings: 6, travel: null,
      tags: ["Depression", "Couples"], insurance: ["Cigna", "UnitedHealthcare", "Kaiser Permanente"] },
    { id: "priya", initials: "PN", name: "Priya Nair, LMFT", role: "Licensed Marriage and Family Therapist",
      bio: "Helps couples rebuild communication and trust. Practical, judgment-free sessions with take-home exercises between visits.",
      city: "Dallas, TX", state: "Texas", format: "Online", intro: 15, openings: 5, travel: null,
      tags: ["Couples", "Anxiety"], insurance: ["Kaiser Permanente", "Aetna", "Blue Cross Blue Shield"] },
    { id: "marcus", initials: "MH", name: "Marcus Hill, LPC", role: "Licensed Professional Counselor",
      bio: "Works with couples and individuals on conflict, stress, and low mood. Steady, encouraging style with clear goals for each session.",
      city: "Richardson, TX", state: "Texas", format: "In-person", intro: 20, openings: 3, travel: 12,
      tags: ["Couples", "Depression", "Sliding scale"], insurance: ["Cigna", "Blue Cross Blue Shield", "UnitedHealthcare"] },
    { id: "dana", initials: "DO", name: "Dana Ortiz, LCSW", role: "Licensed Clinical Social Worker",
      bio: "Couples and family work centered on big transitions: moving, new babies, blended families. Warm, direct, and collaborative.",
      city: "Plano, TX", state: "Texas", format: "In-person", intro: 30, openings: 2, travel: 20,
      tags: ["Couples", "Anxiety"], insurance: ["Kaiser Permanente", "Aetna"] }
  ];

  const FILTERS = ["Anxiety", "Depression", "Couples", "Online", "Sliding scale"];
  const SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "6:00 PM"];

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

  /* =========================================================
     STATE  (insurance, location, saved providers and visits
     are remembered in this browser with localStorage)
     ========================================================= */
  const saved = (() => { try { return JSON.parse(localStorage.getItem("mc-state") || "{}"); } catch { return {}; } })();

  const state = {
    query: "", filters: new Set(), sort: "best", savedOnly: false,
    insurance: saved.insurance || "", location: saved.location || "",
    saved: new Set(saved.saved || []), visits: saved.visits || [],
    selectedId: null, expanded: new Set(),
    providerId: null, weekStart: null, date: null, time: null, visitType: null, showBenefits: false, optedIn: false,
    chat: [{ who: "bot", text: "Choose a visit type, date, and time." }],
    comm: { tab: "groups", list: "messages", active: "c:Cedar", requested: new Set() }
  };

  function persist() {
    try {
      localStorage.setItem("mc-state", JSON.stringify({
        insurance: state.insurance, location: state.location, saved: [...state.saved], visits: state.visits
      }));
    } catch { /* storage unavailable: the site still works, it just forgets */ }
  }

  /* =========================================================
     HELPERS
     ========================================================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const byId = id => PROVIDERS.find(p => p.id === id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));
  const longDay = d => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const TZ = (new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(new Date()).find(p => p.type === "timeZoneName") || {}).value || "";

  const ICON = {
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/></svg>',
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
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
     ROUTING  (#find, #book, #community)
     ========================================================= */
  const VIEWS = ["find", "book", "community"];

  function go(view) {
    if (location.hash === "#" + view) route(); else location.hash = "#" + view;
  }

  function route() {
    const raw = location.hash.replace("#", "");
    const view = VIEWS.includes(raw) ? raw : "find";
    VIEWS.forEach(v => { $("#view-" + v).hidden = v !== view; });
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === "find" && view === "find");
    });
    if (view === "find") { renderChips(); renderList(); renderVisits(); }
    if (view === "book") renderBook();
    if (view === "community") renderCommunity();
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
    const travel = p.format === "Online" ? "Video visits"
      : state.location ? `About ${p.travel} min away` : "Add your location for travel time";
    return `
      <article class="card provider ${state.selectedId === p.id ? "is-selected" : ""}" data-id="${p.id}">
        <div class="avatar" aria-hidden="true">${p.initials}</div>
        <div>
          <div class="p-head">
            <h3>${esc(p.name)}</h3>
            <div class="badges">
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

  function renderVisits() {
    const sorted = [...state.visits].sort((a, b) =>
      (a.date + String(SLOTS.indexOf(a.time)).padStart(2, "0")).localeCompare(b.date + String(SLOTS.indexOf(b.time)).padStart(2, "0")));
    $("#visits").innerHTML = `
      <h2 id="visits-h">Your visits${sorted.length ? ` (${sorted.length})` : ""}</h2>
      ${sorted.length ? `<div class="visit-list">${sorted.map(v => {
        const p = byId(v.providerId);
        return `<div class="visit"><div><strong>${esc(p.name)}</strong>
          <small>${longDay(fromIso(v.date))} at ${v.time}, ${v.type === "video" ? "video" : "in person"}</small></div>
          <button type="button" class="link-btn" data-cancel="${v.id}">Cancel</button></div>`;
      }).join("")}</div>`
      : `<p class="sub" style="margin-top:6px">No visits booked yet. Choose <strong>Book visit</strong> on a provider to start.</p>`}`;
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
    if (!types.includes(state.visitType)) state.visitType = types[0];

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
            <div class="summary-head"><span>Appointment</span><span class="tag">Not booked</span></div>
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
      ? `${p.name.split(",")[0]} accepts ${ins} (demo data).`
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
      <p>You now have ${plural(state.visits.length, "upcoming visit")}. See them all under Your visits on Find care.</p>
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
        case "optin": state.optedIn = !state.optedIn; toast(state.optedIn ? "You opted in to peer connections" : "You opted out"); renderBook(); break;
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

    $("#confirm").addEventListener("click", e => {
      const b = e.target.closest("[data-dlg]");
      if (!b) return;
      $("#confirm").close();
      if (b.dataset.dlg === "another") { state.time = null; state.date = iso(today0()); state.weekStart = mondayOf(today0()); renderBook(); window.scrollTo(0, 0); }
      else go("find");
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
        <div class="alias"><span class="dot">${COMMUNITY.alias[0]}</span><div><strong>${COMMUNITY.alias}</strong><small>Your community alias</small></div></div>
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
  initGlobal();
  route();
})();