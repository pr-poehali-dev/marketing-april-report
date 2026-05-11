import { C, T, M, fmt, KPI, CHANNELS, SMS_SPLIT, GEO, FUNNEL_STEPS, CHALLENGES, ROADMAP } from "./constants";
import { useCount, Glass, Label, Arc, Ring, Shell } from "./primitives";

// ─── SLIDE PROP TYPE ──────────────────────────────────────────────────────────
export interface SlideProps {
  active: boolean;
  n: number;
  total: number;
}

// ─── SLIDE 1: COVER ───────────────────────────────────────────────────────────
export function S1({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="Представьте контекст. Итоги апреля 2026 по департаменту.">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          position: "absolute", right: -24, bottom: -20, ...T, fontSize: 240, fontWeight: 700,
          background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, transparent 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", userSelect: "none", lineHeight: 1,
        }}>
          АПР
        </div>

        <div style={{ opacity: active ? 1 : 0, transform: active ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, #3B82F6)" }} />
            <span style={{ ...M, fontSize: 9, color: C.blue, letterSpacing: 4 }}>DIGITAL MARKETING · АПРЕЛЬ 2026</span>
          </div>

          <h1 style={{ ...T, fontSize: 68, fontWeight: 600, color: C.white, lineHeight: 1.0, margin: "0 0 6px", letterSpacing: -1 }}>
            Отчёт<br />
            <span style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Департамента
            </span>
          </h1>

          <p style={{ fontSize: 13, color: C.muted, margin: "16px 0 36px", maxWidth: 440, lineHeight: 1.6, fontWeight: 300 }}>
            Executive-резюме · Аналитика показателей · Прогноз на Q2
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { ch: "SMS",      c: C.cyan   },
              { ch: "WhatsApp", c: C.teal   },
              { ch: "Клики",    c: C.blue   },
              { ch: "Депозиты", c: C.purple },
            ].map(x => (
              <div key={x.ch} style={{ padding: "6px 18px", borderRadius: 99, background: x.c + "10", border: `1px solid ${x.c}25`, color: x.c, fontSize: 11, fontWeight: 500, letterSpacing: 0.5 }}>
                {x.ch}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 48, marginTop: 40, paddingTop: 28, borderTop: `1px solid ${C.faint}` }}>
            {[{ l: "Период", v: "Апрель 2026" }, { l: "Версия", v: "Executive" }, { l: "Доступ", v: "Конфиденциально" }].map(m => (
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
        <div style={{ ...T, fontSize: 46, fontWeight: 700, color, lineHeight: 1, letterSpacing: -1 }}>{fmt(v)}</div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 8, letterSpacing: 0.5 }}>{label}</div>
      </div>
    </Glass>
  );
}

export function S2({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="SMSretail обеспечил 88% объёма. Конверсия SMS→Депозит: 0.85%.">
      <Label text="Executive-резюме" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 28px", letterSpacing: -0.5 }}>
        Апрель в цифрах
      </h2>

      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        {KPI.map(k => <BigKPI key={k.label} label={k.label} value={k.value} color={k.color} glow={k.glow} active={active} />)}
      </div>

      <Glass style={{ padding: "16px 22px", background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04))", border: "1px solid rgba(59,130,246,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(59,130,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>⚡</div>
          <div>
            <div style={{ ...M, fontSize: 8, color: C.blue, letterSpacing: 3, marginBottom: 4 }}>КЛЮЧЕВОЙ ВЫВОД</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
              <span style={{ color: C.cyan, fontWeight: 600 }}>SMSretail</span> обеспечил основной объём — 497К SMS, 218К кликов.
              Сквозная конверсия: <span style={{ color: C.teal, fontWeight: 600 }}>0.85%</span>
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
        <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}60)`, borderRadius: 99, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
      </div>
    </div>
  );
}

export function S3({ active, n, total }: SlideProps) {
  const totalSMS = CHANNELS.reduce((a, c) => a + c.sms, 0);
  return (
    <Shell n={n} total={total} note="SMSretail доминирует — 68%. WhatsApp и KakaoTalk — перспективные каналы роста.">
      <Label text="Обзор каналов" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Объём по каналам
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, height: "calc(100% - 100px)" }}>
        <Glass style={{ padding: "24px" }}>
          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 18 }}>ОБЪЁМ SMS</div>
          {CHANNELS.map(ch => <Bar key={ch.name} value={ch.sms} max={CHANNELS[0].sms} color={ch.color} label={ch.name} share={ch.share} />)}
        </Glass>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Glass style={{ flex: 1, padding: "24px", display: "flex", alignItems: "center", gap: 20 }}>
            <Ring segments={CHANNELS.map(c => ({ value: c.sms, color: c.color }))} size={110} />
            <div style={{ flex: 1 }}>
              <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 3, marginBottom: 12 }}>ДОЛЯ</div>
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
            {[{ l: "Всего SMS", v: fmt(totalSMS), c: C.cyan }, { l: "Каналов", v: "5", c: C.blue }].map(k => (
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

// ─── SLIDE 8: CHALLENGES ──────────────────────────────────────────────────────
export function S8({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="Три приоритета: CTR, конверсия, GEO-сегментация.">
      <Label text="Задачи и оптимизации" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Проблема · Решение · Результат
      </h2>
      <div style={{ display: "flex", gap: 16, height: "calc(100% - 108px)" }}>
        {CHALLENGES.map(ch => (
          <Glass key={ch.num} glow={`${ch.c}14`} style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ ...M, fontSize: 9, color: ch.c, letterSpacing: 3, marginBottom: 12 }}>{ch.num}</div>
            <div style={{ ...T, fontSize: 22, color: C.white, fontWeight: 600, marginBottom: 20 }}>{ch.title}</div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ ...M, fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 6 }}>ПРОБЛЕМА</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ch.body}</div>
              </div>
              <div style={{ padding: "12px 14px", background: `${ch.c}06`, borderRadius: 12, border: `1px solid ${ch.c}18` }}>
                <div style={{ ...M, fontSize: 7, color: ch.c, letterSpacing: 2, marginBottom: 6 }}>РЕШЕНИЕ</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ch.fix}</div>
              </div>
            </div>

            <div style={{ marginTop: 20, padding: "14px", background: `${ch.c}10`, borderRadius: 14, border: `1px solid ${ch.c}22`, textAlign: "center" }}>
              <div style={{ ...M, fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 4 }}>ОЖИДАЕМЫЙ ЭФФЕКТ</div>
              <div style={{ ...T, fontSize: 26, color: ch.c, fontWeight: 700 }}>{ch.kpi}</div>
            </div>
          </Glass>
        ))}
      </div>
    </Shell>
  );
}

// ─── SLIDE 9: ROADMAP ─────────────────────────────────────────────────────────
export function S9({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total} note="Дорожная карта Q2. Фокус: эффективность, а не только объём.">
      <Label text="Дорожная карта Q2" />
      <h2 style={{ ...T, fontSize: 36, color: C.white, fontWeight: 500, margin: "0 0 24px", letterSpacing: -0.5 }}>
        Май – Июль 2026
      </h2>

      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        {ROADMAP.map((m, i) => (
          <Glass key={i} glow={`${m.c}14`} style={{ flex: 1, padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${m.c}12`, border: `1px solid ${m.c}30`, display: "flex", alignItems: "center", justifyContent: "center", ...T, fontSize: 10, color: m.c, fontWeight: 700, letterSpacing: 2 }}>
                {m.q}
              </div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${m.c}30, transparent)` }} />
            </div>
            {m.goals.map((g, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14, paddingBottom: j < m.goals.length - 1 ? 14 : 0, borderBottom: j < m.goals.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 16, height: 16, borderRadius: 5, background: `${m.c}12`, border: `1px solid ${m.c}25`, display: "flex", alignItems: "center", justifyContent: "center", ...M, fontSize: 7, color: m.c, flexShrink: 0, marginTop: 2 }}>→</div>
                <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </Glass>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {[
          { l: "Цель SMS",      v: "550 000", c: C.cyan   },
          { l: "Цель CTR",      v: "≥50%",    c: C.blue   },
          { l: "Цель Депозиты", v: "5 000+",  c: C.teal   },
          { l: "Снижение CPC",  v: "−10%",    c: C.purple },
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
export function S10({ active, n, total }: SlideProps) {
  return (
    <Shell n={n} total={total}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%,-50%)", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ opacity: active ? 1 : 0, transform: active ? "none" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)", position: "relative" }}>
          <div style={{ ...M, fontSize: 8, color: C.dim, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            Департамент Digital Marketing
          </div>

          <h1 style={{ ...T, fontSize: 80, fontWeight: 700, lineHeight: 1, marginBottom: 10, background: `linear-gradient(135deg, ${C.white} 40%, ${C.muted} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Вопросы?
          </h1>

          <div style={{ ...T, fontSize: 16, letterSpacing: 4, marginBottom: 48, background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            АПРЕЛЬ 2026 · EXECUTIVE ОТЧЁТ
          </div>

          <Glass style={{ display: "inline-flex", gap: 40, padding: "22px 40px", background: "rgba(255,255,255,0.02)" }}>
            {[
              { icon: "✉", l: "Email",    v: "dept@company.com"      },
              { icon: "⚡", l: "Telegram", v: "@analytics_dept"        },
              { icon: "◉", l: "Дашборд",  v: "analytics.company.com" },
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

// ─── SLIDES REGISTRY ──────────────────────────────────────────────────────────
export const ALL_SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];
