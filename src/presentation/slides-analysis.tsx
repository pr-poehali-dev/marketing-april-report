import { C, T, M, fmt, SMS_SPLIT, GEO, FUNNEL_STEPS } from "./constants";
import { Glass, Label, Arc, Ring, Shell } from "./primitives";
import type { SlideProps } from "./slides";

// ─── SLIDE 4: SMSRETAIL DETAIL ────────────────────────────────────────────────
export function S4({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="Grandpa Check — 34.5% от общего объёма. Приоритетный сегмент для оптимизации.">
      <Label text="SMSretail — детальный анализ" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Разбивка трафика
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100% - 105px)" }}>
        <Glass style={{ padding: "26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 20 }}>РАЗБИВКА ПО СЕГМЕНТАМ</div>
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
            <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 8 }}>ЛИДИРУЮЩИЙ КАНАЛ</div>
            <div style={{ ...T, fontSize: 52, color: C.cyan, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>497К</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>Всего SMS через SMSretail</div>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(6,182,212,0.08)", borderRadius: 99, border: "1px solid rgba(6,182,212,0.2)" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.cyan }} />
              <span style={{ ...M, fontSize: 8, color: C.cyan, letterSpacing: 1 }}>#1 по объёму</span>
            </div>
          </Glass>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 5: COMPARISON ──────────────────────────────────────────────────────
export function S5({ active, n, total }: SlideProps) {
  const MAX = 520000;
  const providers = [
    { name: "SMSretail", total: 497013, grandpa: 171668, color: C.cyan },
    { name: "Webcom",    total: 206428, grandpa: 83360,  color: C.blue },
  ];
  return (
    <Shell n={n} total={total} note="SMSretail опережает Webcom в 2.4 раза по общему объёму.">
      <Label text="Сравнительный анализ" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        SMSretail  vs  Webcom
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {providers.map(p => (
          <Glass key={p.name} glow={`${p.color}18`} style={{ padding: "26px 28px" }}>
            <div style={{ ...M, fontSize: 8, color: p.color, letterSpacing: 3, marginBottom: 20 }}>{p.name.toUpperCase()}</div>
            {[{ l: "Всего SMS", v: p.total }, { l: "Grandpa Check", v: p.grandpa }].map(row => (
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
          { l: "Разница объёма",  v: "+290 585", c: C.cyan   },
          { l: "Разница Grandpa", v: "+88 308",  c: C.purple },
          { l: "Эффективность",   v: "2.4×",     c: C.teal   },
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
export function S6({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="Международный трафик превысил российский на 56 943 клика. Ключ — локализация.">
      <Label text="Аналитика кликов" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        218 755 кликов — география
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100% - 110px)" }}>
        <Glass style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 16 }}>ИТОГО</div>
            <div style={{ ...T, fontSize: 64, fontWeight: 700, color: C.cyan, lineHeight: 1, letterSpacing: -3, marginBottom: 6 }}>218 755</div>
            <div style={{ fontSize: 11, color: C.muted }}>кликов по всем регионам</div>
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
                Международный трафик превысил РФ на <strong style={{ color: C.cyan }}>56 943 клика</strong>
              </span>
            </div>
          </Glass>
        </div>
      </div>
    </Shell>
  );
}

// ─── SLIDE 7: FUNNEL ──────────────────────────────────────────────────────────
export function S7({ active, n, total }: SlideProps) {
  const ctr = ((218755 / 497013) * 100).toFixed(1);
  const cvr = ((4248 / 218755) * 100).toFixed(2);
  const e2e = ((4248 / 497013) * 100).toFixed(3);

  return (
    <Shell n={n} total={total} note="Сквозная конверсия 0.854%. Цель на май: 1.0% через оптимизацию лендинга.">
      <Label text="Воронка конверсии" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 30px", letterSpacing: -0.5 }}>
        SMS → Клики → Депозиты
      </h2>

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
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: ws[i], background: step.color + "12", transition: "width 1.4s ease" }} />
                <div style={{ ...T, fontSize: 22, color: step.color, fontWeight: 700, position: "relative", lineHeight: 1 }}>{fmt(step.value)}</div>
                <div style={{ fontSize: 9, color: C.muted, position: "relative" }}>{step.label}</div>
              </div>
              {i < 2 && (
                <div style={{ width: 0, height: 0, flexShrink: 0, zIndex: 2, borderTop: `${hs[i] / 2}px solid transparent`, borderBottom: `${hs[i] / 2}px solid transparent`, borderLeft: `16px solid ${step.color}25` }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {[
          { label: "Кликабельность",  value: ctr + "%", sub: "SMS → Клик",     color: C.blue,   glow: "rgba(59,130,246,0.15)" },
          { label: "Конверсия",        value: cvr + "%", sub: "Клик → Деп",    color: C.teal,   glow: "rgba(20,184,166,0.15)" },
          { label: "Сквозная ставка",  value: e2e + "%", sub: "SMS → Депозит", color: C.purple, glow: "rgba(139,92,246,0.15)" },
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
