import { useState, useEffect, useRef, useCallback } from "react";
import { C, M, SHORT_IDX, LOGO_URL } from "@/presentation/constants";
import { ALL_SLIDES } from "@/presentation/slides";

export default function Index() {
  const [cur,          setCur]          = useState(0);
  const [mode,         setMode]         = useState<"full" | "short">("full");
  const [scale,        setScale]        = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const idx   = mode === "full" ? ALL_SLIDES.map((_, i) => i) : SHORT_IDX;
  const total = idx.length;
  const Slide = ALL_SLIDES[idx[cur]];

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
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
        background: "#04080F",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'IBM Plex Sans', sans-serif",
        userSelect: "none",
      }}
    >
      {/* ── TOP NAV ── */}
      <nav
        style={{
          height: 48,
          background: "rgba(8,12,20,0.96)",
          borderBottom: `1px solid ${C.faint}`,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={LOGO_URL}
            alt="O3GO TEAM"
            style={{
              height: 26,
              width: "auto",
              opacity: 0.55,
              filter: "grayscale(100%) brightness(2.2) contrast(0.9)",
              mixBlendMode: "screen",
              borderRadius: 3,
            }}
          />
          <div style={{ width: 1, height: 14, background: C.faint }} />
          <span style={{ fontSize: 10, color: C.dim, fontFamily: "monospace", letterSpacing: 1 }}>
            Отчёт департамента · Апрель 2026
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", borderRadius: 8, border: `1px solid ${C.faint}`, overflow: "hidden" }}>
            {(["full", "short"] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setCur(0); }}
                style={{
                  padding: "5px 16px",
                  fontSize: 9,
                  cursor: "pointer",
                  border: "none",
                  background: mode === m ? "#3B82F6" : "transparent",
                  color: mode === m ? "#fff" : C.dim,
                  fontFamily: "monospace",
                  letterSpacing: 2,
                  fontWeight: mode === m ? 700 : 400,
                  transition: "all 0.2s",
                }}
              >
                {m === "full" ? "10 СЛАЙДОВ" : "5 СЛАЙДОВ"}
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {idx.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                style={{
                  width: cur === i ? 20 : 5,
                  height: 5,
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: cur === i
                    ? "linear-gradient(90deg, #3B82F6, #06B6D4)"
                    : "rgba(255,255,255,0.08)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* ── SLIDE AREA ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 56px",
          position: "relative",
        }}
      >
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          disabled={cur === 0}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1px solid ${cur === 0 ? C.faint : "rgba(59,130,246,0.3)"}`,
            background: "rgba(8,12,20,0.8)",
            backdropFilter: "blur(8px)",
            color: cur === 0 ? C.faint : C.blue,
            cursor: cur === 0 ? "default" : "pointer",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "all 0.2s",
          }}
        >
          ‹
        </button>

        {/* Slide */}
        <div
          style={{
            width: "100%",
            maxWidth: 1400,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 48px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.32s ease",
          }}
        >
          <Slide active={!transitioning} n={cur + 1} total={total} />
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          disabled={cur === total - 1}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1px solid ${cur === total - 1 ? C.faint : "rgba(59,130,246,0.3)"}`,
            background: "rgba(8,12,20,0.8)",
            backdropFilter: "blur(8px)",
            color: cur === total - 1 ? C.faint : C.blue,
            cursor: cur === total - 1 ? "default" : "pointer",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "all 0.2s",
          }}
        >
          ›
        </button>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          height: 36,
          background: "rgba(8,12,20,0.9)",
          borderTop: `1px solid ${C.faint}`,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 8, color: "#0F172A", letterSpacing: 3 }}>
          КОНФИДЕНЦИАЛЬНО · ТОЛЬКО ДЛЯ ВНУТРЕННЕГО ИСПОЛЬЗОВАНИЯ
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, color: C.faint }}>← → навигация</span>
          <span style={{ ...M, fontSize: 9, color: C.dim, letterSpacing: 3 }}>
            {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
