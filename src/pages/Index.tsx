import { useState, useEffect, useRef, useCallback } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg:      "#080C14",
  surface: "#0D1422",
  glass:   "rgba(255,255,255,0.04)",
  border:  "rgba(255,255,255,0.07)",
  blue:    "#3B82F6",
  cyan:    "#06B6D4",
  teal:    "#14B8A6",
  purple:  "#8B5CF6",
  rose:    "#F43F5E",
  amber:   "#F59E0B",
  white:   "#F8FAFC",
  muted:   "#94A3B8",
  dim:     "#334155",
  faint:   "#1E293B",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const KPI = [
  { label: "SMS Sent",       value: 497013,  unit: "",  color: C.cyan,   glow: "rgba(6,182,212,0.2)"  },
  { label: "Clicks",         value: 218755,  unit: "",  color: C.blue,   glow: "rgba(59,130,246,0.2)" },
  { label: "Deposits",       value: 4248,    unit: "",  color: C.teal,   glow: "rgba(20,184,166,0.2)" },
  { label: "Grandpa Check",  value: 171668,  unit: "",  color: C.purple, glow: "rgba(139,92,246,0.2)" },
];

const CHANNELS = [
  { name: "SMSretail",  sms: 497013, share: 68.3, color: C.cyan   },
  { name: "Webcom",     sms: 206428, share: 28.4, color: C.blue   },
  { name: "WhatsApp",   sms: 12400,  share: 1.7,  color: C.teal   },
  { name: "KakaoTalk",  sms: 8581,   share: 1.2,  color: C.purple },
  { name: "Botim",      sms: 601,    share: 0.1,  color: C.rose   },
];

const SMS_SPLIT = [
  { label: "Grandpa Check",  value: 171668, pct: 34.5, color: C.purple },
  { label: "KakaoTalk",      value: 8581,   pct: 1.7,  color: C.blue   },
  { label: "Botim",          value: 601,    pct: 0.1,  color: C.teal   },
  { label: "Other",          value: 316163, pct: 63.6, color: C.cyan   },
];

const GEO = [
  { label: "International", value: 137849, pct: 63, color: C.cyan   },
  { label: "Russia",        value: 80906,  pct: 37, color: C.purple },
];

const FUNNEL_STEPS = [
  { label: "SMS", value: 497013, color: C.cyan   },
  { label: "Clicks",   value: 218755, color: C.blue   },
  { label: "Deposits", value: 4248,   color: C.teal   },
];

const CHALLENGES = [
  { num: "01", title: "CTR Gap",     body: "44% click rate vs industry benchmark 55%",        fix: "A/B test CTA messaging",     kpi: "+15% CTR",   c: C.amber  },
  { num: "02", title: "CVR Drop",    body: "1.9% click-to-deposit vs target 2.5%",            fix: "Landing page optimisation",  kpi: "+0.5% CVR",  c: C.rose   },
  { num: "03", title: "GEO Mix",     body: "63% international traffic, lower intent",          fix: "GEO-segmented creatives",    kpi: "+20% RU dep", c: C.purple },
];

const ROADMAP = [
  { q: "MAY",  goals: ["550 000 SMS", "A/B CTA launch"],       c: C.cyan   },
  { q: "JUN",  goals: ["CTR ≥ 50%",  "Retargeting live"],      c: C.blue   },
  { q: "JUL",  goals: ["5 000 Dep",  "CPC −10%"],              c: C.teal   },
];

const SHORT_IDX = [0, 1, 3, 6, 9];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt  = (n: number) => n.toLocaleString("ru-RU");
const pct  = (a: number, b: number) => ((a / b) * 100).toFixed(1) + "%";

function useCount(target: number, run: boolean, ms = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) { setV(0); return; }
    let cur = 0;
    const step = target / (ms / 16);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setV(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [run, target, ms]);
  return v;
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const T: React.CSSProperties = { fontFamily: "'Oswald', sans-serif" };
const M: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

function Glass({ children, style = {}, glow }: { children: React.ReactNode; style?: React.CSSProperties; glow?: string }) {
  return (
    <div style={{
      background: C.glass,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      backdropFilter: "blur(12px)",
      boxShadow: glow ? `0 0 40px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
      ...style,
    }}>{children}</div>
  );
}

function Label({ text, color = C.cyan }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 2, height: 12, background: color, borderRadius: 2 }} />
      <span style={{ ...M, fontSize: 9, color, letterSpacing: 3, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

function Arc({ pct: p, color, size = 100, stroke = 8 }: { pct: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2, cx = size / 2, circ = 2 * Math.PI * r;
  const dash = (p / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 1.2s ease" }} />
    </svg>
  );
}

function Ring({ segments, size = 120 }: { segments: { value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = size * 0.35, cx = size / 2, circ = 2 * Math.PI * r, sw = size * 0.1;
  let off = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={sw} />
      {segments.map((s, i) => {
        const frac = s.value / total, dash = frac * circ;
        const el = <circle key={i} cx={cx} cy={cx} r={r} fill="none" stroke={s.color} strokeWidth={sw}
          strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-off * circ + circ * 0.25} strokeLinecap="round" />;
        off += frac;
        return el;
      })}
    </svg>
  );
}

// ─── SLIDE SHELL ─────────────────────────────────────────────────────────────
function Shell({ children, n, total, note }: { children: React.ReactNode; n: number; total: number; note?: string }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/9", background: C.bg,
      position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Noise grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.018, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Ambient glow top-right */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Ambient glow bottom-left */}
      <div style={{ position: "absolute", bottom: -100, left: -60, width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent)" }} />

      {/* Logo */}
      <div style={{ position: "absolute", top: 20, left: 28, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6,
          background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", ...T }}>
          AR
        </div>
        <span style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3 }}>ANALYTICS</span>
      </div>

      {/* Slide counter */}
      <div style={{ position: "absolute", top: 22, right: 28, ...M, fontSize: 9, color: C.faint, letterSpacing: 2 }}>
        {String(n).padStart(2, "0")} <span style={{ color: "#1a2535" }}>/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "52px 48px 36px", position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* Speaker note */}
      {note && (
        <div style={{ borderTop: `1px solid ${C.faint}`, padding: "5px 28px",
          display: "flex", alignItems: "center", gap: 10, background: "rgba(8,12,20,0.8)" }}>
          <span style={{ ...M, fontSize: 7, color: C.faint, letterSpacing: 3 }}>NOTE</span>
          <span style={{ fontSize: 9, color: "#1E293B", fontStyle: "italic" }}>{note}</span>
        </div>
      )}
    </div>
  );
}

// ─── SLIDE 1: COVER ───────────────────────────────────────────────────────────
function S1({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Set context. April 2024 final department results.">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Giant bg text */}
        <div style={{ position: "absolute", right: -24, bottom: -20, ...T, fontSize: 240, fontWeight: 700,
          background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, transparent 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", userSelect: "none", lineHeight: 1 }}>
          APR
        </div>

        <div style={{ opacity: active ? 1 : 0, transform: active ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, #3B82F6)" }} />
            <span style={{ ...M, fontSize: 9, color: C.blue, letterSpacing: 4 }}>DIGITAL MARKETING · APRIL 2024</span>
          </div>

          <h1 style={{ ...T, fontSize: 68, fontWeight: 600, color: C.white, lineHeight: 1.0, margin: "0 0 6px", letterSpacing: -1 }}>
            Department<br />
            <span style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Report
            </span>
          </h1>

          <p style={{ fontSize: 13, color: C.muted, margin: "16px 0 36px", maxWidth: 440, lineHeight: 1.6, fontWeight: 300 }}>
            Executive summary · Performance analytics · Q2 outlook
          </p>

          {/* Channel pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { ch: "SMS",       c: C.cyan   },
              { ch: "WhatsApp",  c: C.teal   },
              { ch: "Clicks",    c: C.blue   },
              { ch: "Deposits",  c: C.purple },
            ].map(x => (
              <div key={x.ch} style={{ padding: "6px 18px", borderRadius: 99,
                background: x.c + "10", border: `1px solid ${x.c}25`,
                color: x.c, fontSize: 11, fontWeight: 500, letterSpacing: 0.5 }}>
                {x.ch}
              </div>
            ))}
          </div>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 48, marginTop: 40, paddingTop: 28,
            borderTop: `1px solid ${C.faint}` }}>
            {[{ l: "Period", v: "April 2024" }, { l: "Version", v: "Executive" }, { l: "Clearance", v: "Confidential" }].map(m => (
              <div key={m.l}>
                <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 2, marginBottom: 4 }}>{m.l.toUpperCase()}</div>
                <div style={{ ...T, fontSize: 12, color: C.muted, fontWeight: 400 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 2: EXECUTIVE SUMMARY ───────────────────────────────────────────────
function BigKPI({ label, value, color, glow, active }: { label: string; value: number; color: string; glow: string; active: boolean }) {
  const v = useCount(value, active);
  return (
    <Glass glow={glow} style={{ flex: 1, padding: "24px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}` }} />
      <div>
        <div style={{ ...T, fontSize: 46, fontWeight: 700, color, lineHeight: 1, letterSpacing: -1 }}>
          {fmt(v)}
        </div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 8, letterSpacing: 0.5 }}>{label}</div>
      </div>
    </Glass>
  );
}

function S2({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="SMSretail drove 88% of all volume. SMS→Deposit conversion: 0.85%.">
      <Label text="Executive Summary" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 28px", letterSpacing: -0.5 }}>
        April at a Glance
      </h2>

      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        {KPI.map(k => <BigKPI key={k.label} label={k.label} value={k.value} color={k.color} glow={k.glow} active={active} />)}
      </div>

      {/* Insight */}
      <Glass style={{ padding: "16px 22px",
        background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04))",
        border: "1px solid rgba(59,130,246,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(59,130,246,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>⚡</div>
          <div>
            <div style={{ ...M, fontSize: 8, color: C.blue, letterSpacing: 3, marginBottom: 4 }}>KEY INSIGHT</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
              <span style={{ color: C.cyan, fontWeight: 600 }}>SMSretail</span> drove the primary volume — 497k SMS, 218k clicks.
              End-to-end conversion: <span style={{ color: C.teal, fontWeight: 600 }}>0.85%</span>
            </div>
          </div>
        </div>
      </Glass>
    </Shell>
  );
}

// ─── SLIDE 3: CHANNELS ────────────────────────────────────────────────────────
function Bar({ value, max, color, label, share }: { value: number; max: number; color: string; label: string; share: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ ...M, fontSize: 9, color: C.dim }}>{share}%</span>
          <span style={{ ...T, fontSize: 13, color, fontWeight: 600 }}>{fmt(value)}</span>
        </div>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(value / max) * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}60)`,
          borderRadius: 99, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
      </div>
    </div>
  );
}

function S3({ active, n, total }: { active: boolean; n: number; total: number }) {
  const totalSMS = CHANNELS.reduce((a, c) => a + c.sms, 0);
  return (
    <Shell n={n} total={total} note="SMSretail dominates at 68%. WhatsApp and KakaoTalk are emerging growth channels.">
      <Label text="Channel Overview" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Volume by Channel
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, height: "calc(100% - 100px)" }}>
        <Glass style={{ padding: "24px" }}>
          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 18 }}>SMS VOLUME</div>
          {CHANNELS.map(ch => <Bar key={ch.name} value={ch.sms} max={CHANNELS[0].sms} color={ch.color} label={ch.name} share={ch.share} />)}
        </Glass>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Glass style={{ flex: 1, padding: "24px", display: "flex", alignItems: "center", gap: 20 }}>
            <Ring segments={CHANNELS.map(c => ({ value: c.sms, color: c.color }))} size={110} />
            <div style={{ flex: 1 }}>
              <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 12 }}>SHARE</div>
              {CHANNELS.map(ch => (
                <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ch.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: C.muted, flex: 1 }}>{ch.name}</span>
                  <span style={{ ...T, fontSize: 11, color: ch.color, fontWeight: 600 }}>{ch.share}%</span>
                </div>
              ))}
            </div>
          </Glass>
          <div style={{ display: "flex", gap: 12 }}>
            {[{ l: "Total SMS", v: fmt(totalSMS), c: C.cyan }, { l: "Channels", v: "5", c: C.blue }].map(k => (
              <Glass key={k.l} style={{ flex: 1, padding: "14px 16px" }}>
                <div style={{ ...T, fontSize: 26, color: k.c, fontWeight: 700, lineHeight: 1 }}>{k.v}</div>
                <div style={{ ...M, fontSize: 8, color: C.dim, marginTop: 6, letterSpacing: 1 }}>{k.l}</div>
              </Glass>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 4: SMSRETAIL DETAIL ────────────────────────────────────────────────
function S4({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Grandpa Check accounts for 34.5% of total volume — prime optimisation target.">
      <Label text="SMSretail — Deep Dive" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Traffic Breakdown
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100% - 105px)" }}>
        <Glass style={{ padding: "26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 20 }}>SEGMENT BREAKDOWN</div>
          {SMS_SPLIT.map(item => (
            <div key={item.label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 11, color: C.muted }}>{item.label}</span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ ...M, fontSize: 9, color: C.dim }}>{item.pct}%</span>
                  <span style={{ ...T, fontSize: 14, color: item.color, fontWeight: 700 }}>{fmt(item.value)}</span>
                </div>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </Glass>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Glass style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
            <Ring segments={SMS_SPLIT.map(s => ({ value: s.value, color: s.color }))} size={140} />
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              {SMS_SPLIT.map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, margin: "0 auto 4px" }} />
                  <div style={{ ...M, fontSize: 7, color: C.dim }}>{s.pct}%</div>
                </div>
              ))}
            </div>
          </Glass>

          <Glass glow="rgba(6,182,212,0.1)" style={{ padding: "22px 24px" }}>
            <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 8 }}>DOMINANT CHANNEL</div>
            <div style={{ ...T, fontSize: 52, color: C.cyan, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>497K</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>Total SMS via SMSretail</div>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", background: "rgba(6,182,212,0.08)", borderRadius: 99,
              border: "1px solid rgba(6,182,212,0.2)" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.cyan }} />
              <span style={{ ...M, fontSize: 8, color: C.cyan, letterSpacing: 1 }}>#1 by volume</span>
            </div>
          </Glass>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 5: COMPARISON ──────────────────────────────────────────────────────
function S5({ active, n, total }: { active: boolean; n: number; total: number }) {
  const MAX = 520000;
  const providers = [
    { name: "SMSretail", total: 497013, grandpa: 171668, color: C.cyan   },
    { name: "Webcom",    total: 206428, grandpa: 83360,  color: C.blue   },
  ];
  return (
    <Shell n={n} total={total} note="SMSretail outperforms Webcom 2.4× in total volume.">
      <Label text="Competitive Analysis" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        SMSretail  vs  Webcom
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {providers.map(p => (
          <Glass key={p.name} glow={`${p.color}18`} style={{ padding: "26px 28px" }}>
            <div style={{ ...M, fontSize: 8, color: p.color, letterSpacing: 3, marginBottom: 20 }}>{p.name.toUpperCase()}</div>
            {[{ l: "Total SMS", v: p.total }, { l: "Grandpa Check", v: p.grandpa }].map(row => (
              <div key={row.l} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: C.muted }}>{row.l}</span>
                  <span style={{ ...T, fontSize: 14, color: p.color, fontWeight: 600 }}>{fmt(row.v)}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(row.v / MAX) * 100}%`, background: p.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
            <div style={{ ...T, fontSize: 60, color: p.color, fontWeight: 700, letterSpacing: -3, lineHeight: 1, marginTop: 10 }}>
              {p.total > 300000 ? "497K" : "206K"}
            </div>
          </Glass>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {[
          { l: "Volume delta",   v: "+290 585", c: C.cyan   },
          { l: "Grandpa delta",  v: "+88 308",  c: C.purple },
          { l: "Efficiency",     v: "2.4×",     c: C.teal   },
        ].map(d => (
          <Glass key={d.l} style={{ flex: 1, padding: "14px 18px" }}>
            <div style={{ ...T, fontSize: 28, color: d.c, fontWeight: 700 }}>{d.v}</div>
            <div style={{ ...M, fontSize: 8, color: C.dim, marginTop: 5, letterSpacing: 1 }}>{d.l.toUpperCase()}</div>
          </Glass>
        ))}
      </div>
    </Shell>
  );
}

// ─── SLIDE 6: CLICK GEO ───────────────────────────────────────────────────────
function S6({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="International traffic exceeded Russia by 56 943 clicks. Localisation is key.">
      <Label text="Click Analytics" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        218 755 Clicks — Geographic Split
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100% - 110px)" }}>
        {/* Left */}
        <Glass style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 16 }}>TOTAL</div>
            <div style={{ ...T, fontSize: 64, fontWeight: 700, color: C.cyan, lineHeight: 1, letterSpacing: -3, marginBottom: 6 }}>
              218 755
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>clicks across all geos</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {GEO.map(g => (
              <div key={g.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: g.color }} />
                    <span style={{ fontSize: 11, color: C.muted }}>{g.label}</span>
                  </div>
                  <span style={{ ...T, fontSize: 13, color: g.color, fontWeight: 600 }}>{fmt(g.value)}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </Glass>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {GEO.map(g => (
            <Glass key={g.label} glow={`${g.color}14`} style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ ...M, fontSize: 8, color: g.color, letterSpacing: 3, marginBottom: 10 }}>{g.label.toUpperCase()}</div>
              <div style={{ ...T, fontSize: 52, color: g.color, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{fmt(g.value)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                <Arc pct={g.pct} color={g.color} size={48} stroke={5} />
                <div style={{ ...T, fontSize: 28, color: g.color, fontWeight: 700 }}>{g.pct}%</div>
              </div>
            </Glass>
          ))}
          <Glass style={{ padding: "12px 18px", background: "rgba(59,130,246,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12 }}>💡</span>
              <span style={{ fontSize: 10, color: C.muted, lineHeight: 1.5 }}>
                International exceeded Russia by <strong style={{ color: C.cyan }}>56 943 clicks</strong>
              </span>
            </div>
          </Glass>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 7: FUNNEL ──────────────────────────────────────────────────────────
function S7({ active, n, total }: { active: boolean; n: number; total: number }) {
  const ctr   = ((218755 / 497013) * 100).toFixed(1);
  const cvr   = ((4248 / 218755) * 100).toFixed(2);
  const e2e   = ((4248 / 497013) * 100).toFixed(3);

  return (
    <Shell n={n} total={total} note="End-to-end 0.854%. Target for May: 1.0% via landing optimisation.">
      <Label text="Conversion Funnel" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 30px", letterSpacing: -0.5 }}>
        SMS → Clicks → Deposits
      </h2>

      {/* Visual funnel */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginBottom: 24 }}>
        {FUNNEL_STEPS.map((step, i) => {
          const hs = [96, 76, 54];
          const ws = ["100%", "44%", "0.86%"];
          return (
            <div key={step.label} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{
                width: "100%", height: hs[i],
                background: `linear-gradient(135deg, ${step.color}14, ${step.color}06)`,
                border: `1px solid ${step.color}25`,
                borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : "0",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 3, position: "relative", overflow: "hidden",
              }}>
                {/* fill bar */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: ws[i],
                  background: step.color + "12", transition: "width 1.4s ease" }} />
                <div style={{ ...T, fontSize: 22, color: step.color, fontWeight: 700, position: "relative", lineHeight: 1 }}>
                  {fmt(step.value)}
                </div>
                <div style={{ fontSize: 9, color: C.muted, position: "relative" }}>{step.label}</div>
              </div>
              {i < 2 && (
                <div style={{ width: 0, height: 0, flexShrink: 0, zIndex: 2,
                  borderTop: `${hs[i] / 2}px solid transparent`,
                  borderBottom: `${hs[i] / 2}px solid transparent`,
                  borderLeft: `16px solid ${step.color}25` }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Rate cards */}
      <div style={{ display: "flex", gap: 14 }}>
        {[
          { label: "Click-Through Rate",  value: ctr + "%", sub: "SMS → Click",   color: C.blue,   glow: "rgba(59,130,246,0.15)" },
          { label: "Conversion Rate",      value: cvr + "%", sub: "Click → Dep",   color: C.teal,   glow: "rgba(20,184,166,0.15)" },
          { label: "End-to-End Rate",      value: e2e + "%", sub: "SMS → Deposit", color: C.purple, glow: "rgba(139,92,246,0.15)" },
        ].map(r => (
          <Glass key={r.label} glow={r.glow} style={{ flex: 1, padding: "20px 22px", textAlign: "center" }}>
            <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 8 }}>{r.label.toUpperCase()}</div>
            <div style={{ ...T, fontSize: 44, color: r.color, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{r.value}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>{r.sub}</div>
          </Glass>
        ))}
      </div>
    </Shell>
  );
}

// ─── SLIDE 8: CHALLENGES ──────────────────────────────────────────────────────
function S8({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Three priorities: CTR gap, CVR improvement, GEO segmentation.">
      <Label text="Challenges & Optimisations" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Problem · Solution · Impact
      </h2>
      <div style={{ display: "flex", gap: 16, height: "calc(100% - 108px)" }}>
        {CHALLENGES.map(ch => (
          <Glass key={ch.num} glow={`${ch.c}14`} style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ ...M, fontSize: 9, color: ch.c, letterSpacing: 3, marginBottom: 12 }}>{ch.num}</div>
            <div style={{ ...T, fontSize: 22, color: C.white, fontWeight: 600, marginBottom: 20 }}>{ch.title}</div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ ...M, fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 6 }}>PROBLEM</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ch.body}</div>
              </div>
              <div style={{ padding: "12px 14px", background: `${ch.c}06`, borderRadius: 12,
                border: `1px solid ${ch.c}18` }}>
                <div style={{ ...M, fontSize: 7, color: ch.c, letterSpacing: 2, marginBottom: 6 }}>SOLUTION</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ch.fix}</div>
              </div>
            </div>

            <div style={{ marginTop: 20, padding: "14px", background: `${ch.c}10`,
              borderRadius: 14, border: `1px solid ${ch.c}22`, textAlign: "center" }}>
              <div style={{ ...M, fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 4 }}>EXPECTED IMPACT</div>
              <div style={{ ...T, fontSize: 26, color: ch.c, fontWeight: 700 }}>{ch.kpi}</div>
            </div>
          </Glass>
        ))}
      </div>
    </Shell>
  );
}

// ─── SLIDE 9: ROADMAP ─────────────────────────────────────────────────────────
function S9({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Q2 roadmap. Focus: scale efficiency, not just volume.">
      <Label text="Q2 Roadmap" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        May – July 2024
      </h2>

      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        {ROADMAP.map((m, i) => (
          <Glass key={i} glow={`${m.c}14`} style={{ flex: 1, padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12,
                background: `${m.c}12`, border: `1px solid ${m.c}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...T, fontSize: 10, color: m.c, fontWeight: 700, letterSpacing: 2 }}>
                {m.q}
              </div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${m.c}30, transparent)` }} />
            </div>
            {m.goals.map((g, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14,
                paddingBottom: j < m.goals.length - 1 ? 14 : 0,
                borderBottom: j < m.goals.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 16, height: 16, borderRadius: 5, background: `${m.c}12`,
                  border: `1px solid ${m.c}25`, display: "flex", alignItems: "center", justifyContent: "center",
                  ...M, fontSize: 7, color: m.c, flexShrink: 0, marginTop: 2 }}>→</div>
                <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </Glass>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {[
          { l: "SMS Target",     v: "550 000", c: C.cyan   },
          { l: "CTR Target",     v: "≥50%",    c: C.blue   },
          { l: "Deposit Target", v: "5 000+",  c: C.teal   },
          { l: "CPC Reduction",  v: "−10%",    c: C.purple },
        ].map(t => (
          <Glass key={t.l} style={{ flex: 1, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ ...T, fontSize: 24, color: t.c, fontWeight: 700 }}>{t.v}</div>
            <div style={{ ...M, fontSize: 8, color: C.dim, marginTop: 6, letterSpacing: 1 }}>{t.l.toUpperCase()}</div>
          </Glass>
        ))}
      </div>
    </Shell>
  );
}

// ─── SLIDE 10: FINAL ──────────────────────────────────────────────────────────
function S10({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        {/* Glow orb */}
        <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%,-50%)",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)",
          pointerEvents: "none" }} />

        <div style={{ opacity: active ? 1 : 0, transform: active ? "none" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)", position: "relative" }}>

          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            Digital Marketing Department
          </div>

          <h1 style={{ ...T, fontSize: 80, fontWeight: 700, lineHeight: 1, marginBottom: 10,
            background: `linear-gradient(135deg, ${C.white} 40%, ${C.muted} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Questions?
          </h1>

          <div style={{ ...T, fontSize: 16, letterSpacing: 4, marginBottom: 48,
            background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            APRIL 2024 · EXECUTIVE REPORT
          </div>

          <Glass style={{ display: "inline-flex", gap: 40, padding: "22px 40px",
            background: "rgba(255,255,255,0.02)" }}>
            {[
              { icon: "✉", l: "Email",     v: "dept@company.com"       },
              { icon: "⚡", l: "Telegram",  v: "@analytics_dept"         },
              { icon: "◉", l: "Dashboard", v: "analytics.company.com"   },
            ].map(c => (
              <div key={c.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ ...M, fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 3 }}>{c.l.toUpperCase()}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{c.v}</div>
              </div>
            ))}
          </Glass>
        </div>
      </div>
    </Shell>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const ALL = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

export default function Index() {
  const [cur,   setCur]  = useState(0);
  const [mode,  setMode] = useState<"full" | "short">("full");
  const [scale, setScale] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const idx = mode === "full" ? ALL.map((_, i) => i) : SHORT_IDX;
  const total = idx.length;
  const Slide = ALL[idx[cur]];

  const go = useCallback((dir: number) => {
    if (transitioning) return;
    const next = cur + dir;
    if (next < 0 || next >= total) return;
    setTransitioning(true);
    setTimeout(() => { setCur(next); setTransitioning(false); }, 320);
  }, [cur, total, transitioning]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const pw = ref.current.clientWidth - 80;
      const ph = ref.current.clientHeight - 130;
      const mw = Math.min(pw, 1400);
      const sh = mw * (9 / 16);
      setScale(sh > ph ? ph / sh : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: "#04080F",
      display: "flex", flexDirection: "column", fontFamily: "'IBM Plex Sans', sans-serif", userSelect: "none" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ height: 48, background: "rgba(8,12,20,0.96)", borderBottom: `1px solid ${C.faint}`,
        padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6,
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 800, color: "#fff", ...T }}>AR</div>
          <div style={{ width: 1, height: 14, background: C.faint }} />
          <span style={{ fontSize: 10, color: C.dim, fontFamily: "monospace", letterSpacing: 1 }}>
            Department Report · April 2024
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", borderRadius: 8, border: `1px solid ${C.faint}`, overflow: "hidden" }}>
            {(["full", "short"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setCur(0); }} style={{
                padding: "5px 16px", fontSize: 9, cursor: "pointer", border: "none",
                background: mode === m ? "#3B82F6" : "transparent",
                color: mode === m ? "#fff" : C.dim,
                fontFamily: "monospace", letterSpacing: 2, fontWeight: mode === m ? 700 : 400,
                transition: "all 0.2s",
              }}>
                {m === "full" ? "10 SLIDES" : "5 SLIDES"}
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {idx.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} style={{
                width: cur === i ? 20 : 5, height: 5, borderRadius: 99, border: "none",
                cursor: "pointer", padding: 0,
                background: cur === i
                  ? "linear-gradient(90deg, #3B82F6, #06B6D4)"
                  : "rgba(255,255,255,0.08)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }} />
            ))}
          </div>
        </div>
      </nav>

      {/* ── SLIDE AREA ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 56px", position: "relative" }}>

        {/* Prev */}
        <button onClick={() => go(-1)} disabled={cur === 0} style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          width: 38, height: 38, borderRadius: "50%",
          border: `1px solid ${cur === 0 ? C.faint : "rgba(59,130,246,0.3)"}`,
          background: "rgba(8,12,20,0.8)", backdropFilter: "blur(8px)",
          color: cur === 0 ? C.faint : C.blue,
          cursor: cur === 0 ? "default" : "pointer",
          fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
          transition: "all 0.2s",
        }}>‹</button>

        {/* Slide */}
        <div style={{
          width: "100%", maxWidth: 1400,
          transform: `scale(${scale})`, transformOrigin: "center center",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 48px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.32s ease",
        }}>
          <Slide active={!transitioning} n={cur + 1} total={total} />
        </div>

        {/* Next */}
        <button onClick={() => go(1)} disabled={cur === total - 1} style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          width: 38, height: 38, borderRadius: "50%",
          border: `1px solid ${cur === total - 1 ? C.faint : "rgba(59,130,246,0.3)"}`,
          background: "rgba(8,12,20,0.8)", backdropFilter: "blur(8px)",
          color: cur === total - 1 ? C.faint : C.blue,
          cursor: cur === total - 1 ? "default" : "pointer",
          fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
          transition: "all 0.2s",
        }}>›</button>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ height: 36, background: "rgba(8,12,20,0.9)", borderTop: `1px solid ${C.faint}`,
        padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: "#0F172A", letterSpacing: 3 }}>
          CONFIDENTIAL · INTERNAL USE ONLY
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, color: C.faint }}>← → to navigate</span>
          <span style={{ ...M, fontSize: 9, color: C.dim, letterSpacing: 3 }}>
            {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
