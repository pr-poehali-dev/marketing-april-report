import { C, T, M, fmt, KPI, CHANNELS } from "./constants";
import { useCount, Glass, Label, Ring, Shell } from "./primitives";
import type { SlideProps } from "./slides";

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
