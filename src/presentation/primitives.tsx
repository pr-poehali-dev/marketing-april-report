import { useState, useEffect } from "react";
import { C, M, T, LOGO_URL } from "./constants";

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export function useCount(target: number, run: boolean, ms = 1200) {
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

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
export function Glass({
  children,
  style = {},
  glow,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: string;
}) {
  return (
    <div
      style={{
        background: C.glass,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        backdropFilter: "blur(12px)",
        boxShadow: glow
          ? `0 0 40px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
export function Label({ text, color = C.cyan }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 2, height: 12, background: color, borderRadius: 2 }} />
      <span style={{ ...M, fontSize: 9, color, letterSpacing: 3, textTransform: "uppercase" }}>
        {text}
      </span>
    </div>
  );
}

// ─── ARC (single progress circle) ────────────────────────────────────────────
export function Arc({
  pct: p,
  color,
  size = 100,
  stroke = 8,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (p / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
    </svg>
  );
}

// ─── RING (multi-segment donut) ───────────────────────────────────────────────
export function Ring({
  segments,
  size = 120,
}: {
  segments: { value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = size * 0.35;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  const sw = size * 0.1;
  let off = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={sw} />
      {segments.map((s, i) => {
        const frac = s.value / total;
        const dash = frac * circ;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={sw}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-off * circ + circ * 0.25}
            strokeLinecap="round"
          />
        );
        off += frac;
        return el;
      })}
    </svg>
  );
}

// ─── SLIDE SHELL ──────────────────────────────────────────────────────────────
export function Shell({
  children,
  n,
  total,
  note,
}: {
  children: React.ReactNode;
  n: number;
  total: number;
  note?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.018,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent)",
        }}
      />

      {/* Logo */}
      <div style={{ position: "absolute", top: 14, left: 22 }}>
        <img
          src={LOGO_URL}
          alt="O3GO TEAM"
          style={{
            height: 32,
            width: "auto",
            opacity: 0.18,
            filter: "grayscale(100%) brightness(2.5) contrast(0.8)",
            mixBlendMode: "screen",
            borderRadius: 4,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 22,
          right: 28,
          ...M,
          fontSize: 9,
          color: C.faint,
          letterSpacing: 2,
        }}
      >
        {String(n).padStart(2, "0")}{" "}
        <span style={{ color: "#1a2535" }}>/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "52px 48px 36px", position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* Speaker note */}
      {note && (
        <div
          style={{
            borderTop: `1px solid ${C.faint}`,
            padding: "5px 28px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(8,12,20,0.8)",
          }}
        >
          <span style={{ ...M, fontSize: 7, color: C.faint, letterSpacing: 3 }}>NOTE</span>
          <span style={{ fontSize: 9, color: "#1E293B", fontStyle: "italic" }}>{note}</span>
        </div>
      )}
    </div>
  );
}
