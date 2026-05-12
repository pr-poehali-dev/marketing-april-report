import { C, T, M, CHALLENGES, ROADMAP } from "./constants";
import { Glass, Label, Shell } from "./primitives";
import type { SlideProps } from "./slides";

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
      <Label text="Цели на 3 месяца" />
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
              { icon: "✉", l: "Email",    v: "otdel_wa@o3goteam"           },
              { icon: "⚡", l: "Telegram", v: "@le_cavali_er"             },
              { icon: "◉", l: "Дашборд",  v: "WaOtdel.dezainebeishiy.GO" },
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