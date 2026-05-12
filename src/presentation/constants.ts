// ─── PALETTE ──────────────────────────────────────────────────────────────────
export const C = {
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

// ─── FONT SHORTHANDS ──────────────────────────────────────────────────────────
export const T: React.CSSProperties = { fontFamily: "'Oswald', sans-serif" };
export const M: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

// ─── UTILS ────────────────────────────────────────────────────────────────────
export const fmt = (n: number) => n.toLocaleString("ru-RU");

// ─── DATA ─────────────────────────────────────────────────────────────────────
export const KPI = [
  { label: "SMS Отправлено", value: 497013, color: C.cyan,   glow: "rgba(6,182,212,0.2)"   },
  { label: "Клики",          value: 218755, color: C.blue,   glow: "rgba(59,130,246,0.2)"  },
  { label: "Депозиты",       value: 4248,   color: C.teal,   glow: "rgba(20,184,166,0.2)"  },
  { label: "Grandpa Check",  value: 171668, color: C.purple, glow: "rgba(139,92,246,0.2)"  },
];

export const CHANNELS = [
  { name: "Retail-wa", sms: 497013, share: 68.3, color: C.cyan   },
  { name: "Webcom",    sms: 206428, share: 28.4, color: C.blue   },
  { name: "KakaoTalk", sms: 8581,   share: 1.2,  color: C.purple },
  { name: "Botim",     sms: 601,    share: 0.1,  color: C.rose   },
];

export const SMS_SPLIT = [
  { label: "Grandpa Check", value: 171668, pct: 34.5, color: C.purple },
  { label: "KakaoTalk",     value: 8581,   pct: 1.7,  color: C.blue   },
  { label: "Botim",         value: 601,    pct: 0.1,  color: C.teal   },
  { label: "SpamWa",        value: 316163, pct: 63.6, color: C.cyan   },
];

export const GEO = [
  { label: "Международный", value: 137849, pct: 63, color: C.cyan   },
  { label: "Россия",         value: 80906,  pct: 37, color: C.purple },
];

export const FUNNEL_STEPS = [
  { label: "SMS",      value: 497013, color: C.cyan },
  { label: "Клики",    value: 218755, color: C.blue },
  { label: "Депозиты", value: 4248,   color: C.teal },
];

export const CHALLENGES = [
  { num: "01", title: "Конверсия", body: "2-3% кликов против целевых 5-7%",                   fix: "Увеличение разных Geo баз и более живых баз", kpi: "+0.5% CVR",   c: C.rose   },
  { num: "02", title: "GEO Mix",   body: "63% трафика — международный, меньший intent",      fix: "GEO-сегментация креативов", kpi: "+20% RU деп", c: C.purple },
];

export const ROADMAP = [
  { q: "МАЙ", goals: ["550 000 SMS", "Запуск A/B CTA"],       c: C.cyan  },
  { q: "ИЮН", goals: ["Увеличение кликов до 7-8%", "Увеличение живых баз и поднятие доставки"],  c: C.blue  },
  { q: "ИЮЛ", goals: ["5 000 деп.", "CPC −10%"],              c: C.teal  },
];

export const SHORT_IDX = [0, 1, 3, 6, 9];

export const LOGO_URL =
  "https://cdn.poehali.dev/projects/afffc50d-ae59-4938-be8a-6f7792d412c4/bucket/e8db726b-f803-474b-8768-b5938efba94a.jpg";