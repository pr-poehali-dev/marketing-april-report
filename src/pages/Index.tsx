import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const KPI_DATA = [
  { label: "Total SMS", value: 497013, icon: "✉", color: "#00B4D8" },
  { label: "Total Clicks", value: 218755, icon: "⚡", color: "#38BDF8" },
  { label: "Deposits", value: 4248, icon: "💎", color: "#06D6A0" },
  { label: "Grandpa Check SMS", value: 171668, icon: "✅", color: "#818CF8" },
];

const CHANNELS = [
  { name: "SMSretail", sms: 497013, color: "#00B4D8" },
  { name: "Webcom", sms: 206428, color: "#38BDF8" },
  { name: "WhatsApp", sms: 12400, color: "#06D6A0" },
  { name: "KakaoTalk", sms: 8581, color: "#F472B6" },
  { name: "Botim", sms: 601, color: "#818CF8" },
];

const SMS_BREAKDOWN = [
  { label: "Total SMS (SMSretail)", value: 497013, pct: 100, color: "#00B4D8" },
  { label: "Grandpa Check SMS", value: 171668, pct: 34.5, color: "#818CF8" },
  { label: "KakaoTalk SMS", value: 8581, pct: 1.7, color: "#F472B6" },
  { label: "Botim SMS", value: 601, pct: 0.1, color: "#06D6A0" },
];

const CLICK_GEO = [
  { label: "Международный", value: 137849, pct: 63.0, color: "#00B4D8" },
  { label: "Россия", value: 80906, pct: 37.0, color: "#818CF8" },
];

const FUNNEL = [
  { label: "SMS Отправлено", value: 497013, color: "#00B4D8" },
  { label: "Клики", value: 218755, color: "#38BDF8" },
  { label: "Депозиты", value: 4248, color: "#06D6A0" },
];

const CHALLENGES = [
  {
    icon: "⚠",
    title: "Низкий CTR",
    problem: "44% click rate относительно объёма рассылок",
    solution: "A/B тестирование CTA, персонализация контента",
    impact: "+15% CTR",
    color: "#F59E0B",
  },
  {
    icon: "📉",
    title: "Конверсия",
    problem: "Deposits: 1.9% от кликов — ниже benchmark",
    solution: "Оптимизация лендинга, ретаргетинг аудитории",
    impact: "+0.5% CVR",
    color: "#EF4444",
  },
  {
    icon: "🌍",
    title: "GEO микс",
    problem: "63% трафика — международный, сложнее конвертить",
    solution: "Локализация офферов, сегментация по GEO",
    impact: "+20% RU dep.",
    color: "#818CF8",
  },
];

const ROADMAP = [
  { month: "МАЙ", items: ["Рост SMS до 550 000", "A/B тест CTA-кнопок"], color: "#00B4D8" },
  { month: "ИЮН", items: ["CTR ≥ 50%", "Ретаргетинг запущен"], color: "#38BDF8" },
  { month: "ИЮЛ", items: ["Deposits 5 000+", "Cost per click −10%"], color: "#06D6A0" },
];

const SHORT_SLIDES_IDX = [0, 1, 3, 6, 9];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return val;
}

// ─── BASE COMPONENTS ──────────────────────────────────────────────────────────
function Logo({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: small ? 22 : 28,
          height: small ? 22 : 28,
          background: "linear-gradient(135deg,#00B4D8,#0077B6)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: small ? 9 : 12,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.5px",
          flexShrink: 0,
        }}
      >
        AR
      </div>
      {!small && (
        <span style={{ fontFamily: "Oswald", fontSize: 12, fontWeight: 600, color: "#475569", letterSpacing: 3 }}>
          ANALYTICS
        </span>
      )}
    </div>
  );
}

function GlassCard({ children, accent, style = {} }: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent ? accent + "30" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "16px 18px",
        boxShadow: accent ? `0 0 24px ${accent}10` : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <div style={{ width: 3, height: 14, background: "#00B4D8", borderRadius: 2 }} />
      <span style={{ fontFamily: "Oswald", fontSize: 9, fontWeight: 500, color: "#00B4D8", letterSpacing: 3, textTransform: "uppercase" }}>
        {text}
      </span>
    </div>
  );
}

function HBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: "#94A3B8" }}>{label}</span>
        <span style={{ fontFamily: "Oswald", fontSize: 11, color, fontWeight: 600 }}>{fmt(value)}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

function DonutSVG({ segments, total, label, size = 110 }: { segments: { value: number; color: string }[]; total: number; label: string; size?: number }) {
  const r = 40, cx = 56, cy = 56, sw = 13, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 112 112" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ, gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset * circ + circ * 0.25} strokeLinecap="round" />
        );
        offset += pct;
        return el;
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="Oswald" fontWeight="700">{label}</text>
    </svg>
  );
}

// ─── SLIDE SHELL ──────────────────────────────────────────────────────────────
function Shell({ children, n, total, note }: { children: React.ReactNode; n: number; total: number; note?: string }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/9", background: "#0F172A", position: "relative",
      overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'IBM Plex Sans',sans-serif",
    }}>
      {/* bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,180,216,0.07) 0%,transparent 70%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(0,119,182,0.06) 0%,transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px" }} />
      {/* top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#00B4D8,#0077B6,transparent)" }} />
      {/* logo */}
      <div style={{ position: "absolute", top: 16, left: 24 }}><Logo small /></div>
      {/* slide num */}
      <div style={{ position: "absolute", top: 18, right: 24, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "#1E293B", letterSpacing: 2 }}>
        {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      {/* content */}
      <div style={{ flex: 1, padding: "44px 40px 32px", position: "relative", zIndex: 1 }}>{children}</div>
      {/* speaker note */}
      {note && (
        <div style={{ background: "rgba(15,23,42,0.95)", borderTop: "1px solid rgba(0,180,216,0.12)", padding: "6px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 8, color: "#1E293B", fontFamily: "monospace", letterSpacing: 2 }}>SPEAKER:</span>
          <span style={{ fontSize: 9, color: "#334155", fontStyle: "italic" }}>{note}</span>
        </div>
      )}
    </div>
  );
}

// ─── SLIDES ───────────────────────────────────────────────────────────────────
function S1({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Представьте команду и контекст. Апрель 2024 — финальные итоги.">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", fontFamily: "Oswald", fontSize: 200, fontWeight: 700, color: "rgba(0,180,216,0.035)", lineHeight: 1, userSelect: "none" }}>04</div>
        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel text="Departmental Report · April 2024" />
          <h1 style={{ fontFamily: "Oswald", fontSize: 52, fontWeight: 600, color: "#F1F5F9", lineHeight: 1.1, margin: "12px 0 6px", maxWidth: 680 }}>
            Отчёт департамента<br /><span style={{ color: "#00B4D8" }}>Апрель 2024</span>
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            {[{ icon: "✉", label: "SMS", c: "#00B4D8" }, { icon: "💬", label: "WhatsApp", c: "#06D6A0" }, { icon: "⚡", label: "Clicks", c: "#38BDF8" }, { icon: "💎", label: "Deposits", c: "#818CF8" }].map(ch => (
              <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 7, background: ch.c + "12", border: `1px solid ${ch.c}30`, borderRadius: 99, padding: "5px 14px" }}>
                <span style={{ fontSize: 13 }}>{ch.icon}</span>
                <span style={{ fontFamily: "Oswald", fontSize: 11, fontWeight: 500, color: ch.c, letterSpacing: 1 }}>{ch.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 44 }}>
            {[{ l: "Департамент", v: "Digital Marketing" }, { l: "Период", v: "Апрель 2024" }, { l: "Версия", v: "Executive Final" }].map(m => (
              <div key={m.l}>
                <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{m.l}</div>
                <div style={{ fontFamily: "Oswald", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function KPICard({ label, value, icon, color, active }: { label: string; value: number; icon: string; color: string; active: boolean }) {
  const d = useCountUp(value, active);
  return (
    <GlassCard accent={color} style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
      <div style={{ fontFamily: "Oswald", fontSize: 28, fontWeight: 600, color, lineHeight: 1, letterSpacing: "-0.5px" }}>{fmt(d)}</div>
      <div style={{ fontSize: 9, color: "#475569", marginTop: 5, lineHeight: 1.4 }}>{label}</div>
    </GlassCard>
  );
}

function S2({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="SMSretail обеспечил 88% объёма всех рассылок. Конверсия SMS→Dep: 0.85%.">
      <SectionLabel text="Executive Summary" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 18px" }}>Главные показатели апреля</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {KPI_DATA.map(k => <KPICard key={k.label} {...k} active={active} />)}
      </div>
      <GlassCard style={{ background: "rgba(0,180,216,0.05)", borderColor: "#00B4D825" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(0,180,216,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontFamily: "Oswald", fontSize: 11, color: "#00B4D8", letterSpacing: 1, marginBottom: 3 }}>KEY INSIGHT</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.4 }}>
              Основной объём трафика обеспечил <strong style={{ color: "#00B4D8" }}>SMSretail</strong> — 497 013 SMS и 218 755 кликов. Конверсия SMS→Deposit: <strong style={{ color: "#06D6A0" }}>0.85%</strong>.
            </div>
          </div>
        </div>
      </GlassCard>
    </Shell>
  );
}

function S3({ active, n, total }: { active: boolean; n: number; total: number }) {
  const maxSMS = 497013;
  const totalSMS = CHANNELS.reduce((a, c) => a + c.sms, 0);
  return (
    <Shell n={n} total={total} note="SMSretail доминирует. WhatsApp и KakaoTalk — перспективные каналы для роста.">
      <SectionLabel text="Channel Overview" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 16px" }}>Статистика по каналам</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <GlassCard>
          <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>SMS Volume by Channel</div>
          {CHANNELS.map(ch => <HBar key={ch.name} value={ch.sms} max={maxSMS} color={ch.color} label={ch.name} />)}
        </GlassCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <GlassCard style={{ flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
            <DonutSVG segments={CHANNELS.map(c => ({ value: c.sms, color: c.color }))} total={totalSMS} label="SMS" size={100} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Share</div>
              {CHANNELS.map(ch => (
                <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ch.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, color: "#64748B", flex: 1 }}>{ch.name}</span>
                  <span style={{ fontFamily: "Oswald", fontSize: 10, color: ch.color, fontWeight: 600 }}>{((ch.sms / totalSMS) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ l: "Total Clicks", v: "218 755", c: "#38BDF8", i: "⚡" }, { l: "Deposits", v: "4 248", c: "#06D6A0", i: "💎" }].map(k => (
              <GlassCard key={k.l} accent={k.c} style={{ flex: 1, padding: "12px 14px" }}>
                <div style={{ fontSize: 14, marginBottom: 4 }}>{k.i}</div>
                <div style={{ fontFamily: "Oswald", fontSize: 20, color: k.c, fontWeight: 600 }}>{k.v}</div>
                <div style={{ fontSize: 9, color: "#334155", marginTop: 2 }}>{k.l}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function S4({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Grandpa Check — 34.5% от общего объёма. Ключевой сегмент для оптимизации.">
      <SectionLabel text="SMSretail — Detailed Analysis" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 16px" }}>SMSretail — детальный разрез</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
        <GlassCard>
          <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Breakdown by Type</div>
          {SMS_BREAKDOWN.map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: "#94A3B8" }}>{item.label}</span>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 8, color: "#334155", fontFamily: "monospace" }}>{item.pct}%</span>
                  <span style={{ fontFamily: "Oswald", fontSize: 13, color: item.color, fontWeight: 600 }}>{fmt(item.value)}</span>
                </div>
              </div>
              <div style={{ height: 7, background: "rgba(255,255,255,0.04)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </GlassCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <GlassCard style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <DonutSVG segments={SMS_BREAKDOWN.map(s => ({ value: s.value, color: s.color }))} total={SMS_BREAKDOWN[0].value} label="SMS" size={120} />
            <div>
              {SMS_BREAKDOWN.slice(1).map(s => (
                <div key={s.label} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />
                    <span style={{ fontSize: 8, color: "#64748B" }}>{s.label}</span>
                  </div>
                  <div style={{ fontFamily: "Oswald", fontSize: 13, color: s.color, paddingLeft: 10 }}>{fmt(s.value)}</div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard accent="#00B4D8" style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Dominant Traffic</div>
            <div style={{ fontFamily: "Oswald", fontSize: 34, color: "#00B4D8", fontWeight: 700, lineHeight: 1 }}>497 013</div>
            <div style={{ fontSize: 9, color: "#64748B", marginTop: 3 }}>Total SMS — SMSretail</div>
            <div style={{ marginTop: 8, padding: "3px 10px", background: "rgba(0,180,216,0.1)", borderRadius: 6, display: "inline-block", fontSize: 9, color: "#00B4D8", fontWeight: 600 }}>#1 канал по объёму</div>
          </GlassCard>
        </div>
      </div>
    </Shell>
  );
}

function S5({ active, n, total }: { active: boolean; n: number; total: number }) {
  const max = 550000;
  return (
    <Shell n={n} total={total} note="SMSretail опережает Webcom в 2.4x. Потенциал Webcom — масштабирование.">
      <SectionLabel text="Comparative Analysis" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 16px" }}>SMSretail vs Webcom</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { name: "SMSretail", icon: "✉", total: 497013, grandpa: 171668, color: "#00B4D8", color2: "#0077B6" },
          { name: "Webcom", icon: "📡", total: 206428, grandpa: 83360, color: "#38BDF8", color2: "#0077B6" },
        ].map(p => (
          <GlassCard key={p.name} accent={p.color}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: p.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{p.icon}</div>
              <span style={{ fontFamily: "Oswald", fontSize: 15, color: p.color, fontWeight: 600, letterSpacing: 1 }}>{p.name}</span>
            </div>
            {[{ l: "Total SMS", v: p.total }, { l: "Grandpa Check", v: p.grandpa }].map(item => (
              <div key={item.l} style={{ marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "#64748B" }}>{item.l}</span>
                  <span style={{ fontFamily: "Oswald", fontSize: 12, color: p.color }}>{fmt(item.v)}</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(item.v / max) * 100}%`, background: `linear-gradient(90deg,${p.color},${p.color2})`, borderRadius: 99 }} />
                </div>
              </div>
            ))}
            <div style={{ fontFamily: "Oswald", fontSize: 38, color: p.color, fontWeight: 700, lineHeight: 1, marginTop: 8 }}>{p.total > 300000 ? "497K" : "206K"}</div>
            <div style={{ fontSize: 9, color: "#334155", marginTop: 2 }}>Total volume</div>
          </GlassCard>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {[{ l: "Разница Total SMS", v: "+290 585", c: "#00B4D8" }, { l: "Разница Grandpa", v: "+88 308", c: "#818CF8" }, { l: "SMSretail эффективнее", v: "2.4×", c: "#06D6A0" }].map(d => (
          <GlassCard key={d.l} style={{ flex: 1, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontFamily: "Oswald", fontSize: 22, color: d.c, fontWeight: 700 }}>{d.v}</div>
            <div style={{ fontSize: 8, color: "#334155", marginTop: 3 }}>{d.l}</div>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}

function S6({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Международный трафик превысил российский — фокус на локализацию INT аудитории.">
      <SectionLabel text="Click Analytics" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 16px" }}>Geography of Clicks</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <GlassCard style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Total Clicks</div>
            <div style={{ fontFamily: "Oswald", fontSize: 48, color: "#00B4D8", fontWeight: 700, lineHeight: 1 }}>218 755</div>
          </div>
          {CLICK_GEO.map(g => (
            <div key={g.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: g.color }} />
                  <span style={{ fontSize: 10, color: "#94A3B8" }}>{g.label}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontFamily: "Oswald", fontSize: 10, color: "#334155" }}>{g.pct}%</span>
                  <span style={{ fontFamily: "Oswald", fontSize: 12, color: g.color, fontWeight: 600 }}>{fmt(g.value)}</span>
                </div>
              </div>
              <div style={{ height: 7, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </GlassCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <GlassCard accent="#00B4D8" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>🌍 Международный</div>
            <div style={{ fontFamily: "Oswald", fontSize: 40, color: "#00B4D8", fontWeight: 700, lineHeight: 1 }}>137 849</div>
            <div style={{ fontFamily: "Oswald", fontSize: 20, color: "#38BDF8", marginTop: 3 }}>63.0%</div>
          </GlassCard>
          <GlassCard accent="#818CF8" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>🇷🇺 Россия</div>
            <div style={{ fontFamily: "Oswald", fontSize: 40, color: "#818CF8", fontWeight: 700, lineHeight: 1 }}>80 906</div>
            <div style={{ fontFamily: "Oswald", fontSize: 20, color: "#A78BFA", marginTop: 3 }}>37.0%</div>
          </GlassCard>
          <GlassCard style={{ background: "rgba(0,180,216,0.04)", borderColor: "#00B4D818", padding: "10px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>💡</span>
              <span style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.4 }}>Международный трафик превысил РФ на <strong style={{ color: "#00B4D8" }}>56 943 клика</strong></span>
            </div>
          </GlassCard>
        </div>
      </div>
    </Shell>
  );
}

function S7({ active, n, total }: { active: boolean; n: number; total: number }) {
  const ctr = ((218755 / 497013) * 100).toFixed(1);
  const cvr = ((4248 / 218755) * 100).toFixed(2);
  const e2e = ((4248 / 497013) * 100).toFixed(3);
  const widths = ["100%", "44%", "2%"];
  const heights = [86, 68, 50];
  return (
    <Shell n={n} total={total} note="Конверсия SMS→Deposit — 0.854%. Цель на май: 1.0% через оптимизацию лендинга.">
      <SectionLabel text="Conversion Funnel" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 18px" }}>Воронка: SMS → Deposits</h2>
      <div style={{ display: "flex", marginBottom: 18 }}>
        {FUNNEL.map((step, i) => (
          <div key={step.label} style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%", height: heights[i], background: step.color + "18", border: `1px solid ${step.color}35`, borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: widths[i], background: step.color + "18" }} />
              <div style={{ fontFamily: "Oswald", fontSize: 20, color: step.color, fontWeight: 700, position: "relative" }}>{fmt(step.value)}</div>
              <div style={{ fontSize: 8, color: "#64748B", position: "relative" }}>{step.label}</div>
            </div>
            {i < 2 && <div style={{ width: 0, height: 0, borderTop: `${heights[i] / 2}px solid transparent`, borderBottom: `${heights[i] / 2}px solid transparent`, borderLeft: `14px solid ${step.color}35`, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { label: "CTR (SMS→Click)", value: ctr + "%", color: "#38BDF8", desc: "Click-Through Rate" },
          { label: "CVR (Click→Dep)", value: cvr + "%", color: "#06D6A0", desc: "Conversion Rate" },
          { label: "Overall (SMS→Dep)", value: e2e + "%", color: "#818CF8", desc: "End-to-End Rate" },
        ].map(r => (
          <GlassCard key={r.label} accent={r.color} style={{ flex: 1, textAlign: "center", padding: "16px 12px" }}>
            <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>{r.desc}</div>
            <div style={{ fontFamily: "Oswald", fontSize: 34, color: r.color, fontWeight: 700 }}>{r.value}</div>
            <div style={{ fontSize: 8, color: "#64748B", marginTop: 3 }}>{r.label}</div>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}

function S8({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Три приоритетных направления оптимизации. Фокус — CTR и CVR.">
      <SectionLabel text="Challenges & Optimizations" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 18px" }}>Проблемы · Решения · Impact</h2>
      <div style={{ display: "flex", gap: 14, height: "calc(100% - 95px)" }}>
        {CHALLENGES.map((ch, i) => (
          <GlassCard key={i} accent={ch.color} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{ch.icon}</div>
            <div style={{ fontFamily: "Oswald", fontSize: 17, color: ch.color, fontWeight: 600, marginBottom: 14 }}>{ch.title}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ fontSize: 7, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>⚠ Проблема</div>
                <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.5 }}>{ch.problem}</div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div>
                <div style={{ fontSize: 7, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>✓ Решение</div>
                <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.5 }}>{ch.solution}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "8px 10px", background: ch.color + "14", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 7, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Expected Impact</div>
              <div style={{ fontFamily: "Oswald", fontSize: 20, color: ch.color, fontWeight: 700 }}>{ch.impact}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}

function S9({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total} note="Трёхмесячный roadmap с конкретными KPI. Q2 — фокус на рост эффективности.">
      <SectionLabel text="Plans & Roadmap" />
      <h2 style={{ fontFamily: "Oswald", fontSize: 26, color: "#F1F5F9", fontWeight: 500, margin: "6px 0 16px" }}>Планы на май — июль 2024</h2>
      <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
        {ROADMAP.map((m, i) => (
          <GlassCard key={i} accent={m.color} style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: m.color + "18", border: `1px solid ${m.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Oswald", fontSize: 10, color: m.color, fontWeight: 700, letterSpacing: 1 }}>{m.month}</div>
              <div style={{ flex: 1, height: 1, background: m.color + "25" }} />
            </div>
            {m.items.map((item, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 9, paddingBottom: 9, borderBottom: j < m.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: m.color + "14", border: `1px solid ${m.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: m.color, flexShrink: 0, marginTop: 1 }}>→</div>
                <span style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </GlassCard>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { l: "SMS Target", v: "550 000", i: "✉", c: "#00B4D8" },
          { l: "CTR Target", v: "≥50%", i: "⚡", c: "#38BDF8" },
          { l: "Deposits Target", v: "5 000+", i: "💎", c: "#06D6A0" },
          { l: "Cost per Click", v: "−10%", i: "📉", c: "#818CF8" },
        ].map(t => (
          <GlassCard key={t.l} style={{ flex: 1, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 15, marginBottom: 4 }}>{t.i}</div>
            <div style={{ fontFamily: "Oswald", fontSize: 19, color: t.c, fontWeight: 700 }}>{t.v}</div>
            <div style={{ fontSize: 8, color: "#334155", marginTop: 2 }}>{t.l}</div>
          </GlassCard>
        ))}
      </div>
    </Shell>
  );
}

function S10({ active, n, total }: { active: boolean; n: number; total: number }) {
  return (
    <Shell n={n} total={total}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,180,216,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease", position: "relative" }}>
          <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>Digital Marketing Department</div>
          <h1 style={{ fontFamily: "Oswald", fontSize: 68, fontWeight: 700, color: "#F1F5F9", lineHeight: 1, marginBottom: 6 }}>Questions?</h1>
          <div style={{ fontFamily: "Oswald", fontSize: 20, color: "#00B4D8", fontWeight: 300, letterSpacing: 3, marginBottom: 32 }}>АПРЕЛЬ 2024 · EXECUTIVE REPORT</div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", padding: "18px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,180,216,0.14)", borderRadius: 14 }}>
            {[{ icon: "✉", l: "Email", v: "dept@company.com" }, { icon: "📱", l: "Telegram", v: "@analytics_dept" }, { icon: "🌐", l: "Dashboard", v: "analytics.company.com" }].map(c => (
              <div key={c.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
                <div style={{ fontSize: 8, color: "#1E293B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>{c.l}</div>
                <div style={{ fontSize: 10, color: "#94A3B8" }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const ALL_SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState<"full" | "short">("full");
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const indices = mode === "full" ? ALL_SLIDES.map((_, i) => i) : SHORT_SLIDES_IDX;
  const totalShown = indices.length;
  const globalIdx = indices[current];
  const Slide = ALL_SLIDES[globalIdx];

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(totalShown - 1, c + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [totalShown]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const pw = containerRef.current.clientWidth - 80;
      const ph = containerRef.current.clientHeight - 150;
      const maxW = Math.min(pw, 1280);
      const sh = maxW * (9 / 16);
      if (sh > ph) setScale(ph / sh);
      else setScale(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid rgba(0,180,216,0.2)",
    background: "rgba(15,23,42,0.9)",
    color: disabled ? "#1E293B" : "#00B4D8",
    cursor: disabled ? "default" : "pointer",
    fontSize: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  });

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: "#060D1A", display: "flex", flexDirection: "column", fontFamily: "'IBM Plex Sans',sans-serif" }}>
      {/* Topbar */}
      <div style={{ background: "rgba(15,23,42,0.97)", borderBottom: "1px solid rgba(0,180,216,0.1)", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo />
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 11, color: "#334155", fontFamily: "monospace" }}>Отчёт департамента · Апрель 2024</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Mode */}
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,180,216,0.2)" }}>
            {(["full", "short"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setCurrent(0); }} style={{ padding: "5px 14px", fontSize: 10, fontFamily: "Oswald", letterSpacing: 1, cursor: "pointer", border: "none", background: mode === m ? "#00B4D8" : "transparent", color: mode === m ? "#0F172A" : "#334155", fontWeight: mode === m ? 700 : 400, transition: "all 0.2s" }}>
                {m === "full" ? "10 СЛАЙДОВ" : "5 СЛАЙДОВ"}
              </button>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {indices.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: current === i ? 18 : 5, height: 5, borderRadius: 99, border: "none", cursor: "pointer", background: current === i ? "#00B4D8" : "rgba(0,180,216,0.18)", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 60px", position: "relative" }}>
        <button onClick={prev} disabled={current === 0} style={{ ...btnStyle(current === 0), left: 12 }}>‹</button>

        <div style={{ width: "100%", maxWidth: 1280, transform: `scale(${scale})`, transformOrigin: "center center", borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,180,216,0.08)" }}>
          <Slide active={true} n={current + 1} total={totalShown} />
        </div>

        <button onClick={next} disabled={current === totalShown - 1} style={{ ...btnStyle(current === totalShown - 1), right: 12 }}>›</button>
      </div>

      {/* Bottombar */}
      <div style={{ background: "rgba(15,23,42,0.9)", borderTop: "1px solid rgba(0,180,216,0.07)", padding: "7px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, color: "#1E293B", fontFamily: "monospace", letterSpacing: 2 }}>CONFIDENTIAL · INTERNAL USE ONLY</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 9, color: "#1E293B", fontFamily: "monospace" }}>← → для навигации</span>
          <span style={{ fontFamily: "Oswald", fontSize: 11, color: "#334155", letterSpacing: 2 }}>{String(current + 1).padStart(2, "0")} / {String(totalShown).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
