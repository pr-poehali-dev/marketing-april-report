import { useState } from "react";
import Icon from "@/components/ui/icon";

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const revenueData = [4.2, 5.1, 4.8, 6.3, 7.1, 8.4, 7.9, 9.2, 10.1, 11.4, 10.8, 13.2];
const expenseData = [3.1, 3.4, 3.2, 4.1, 4.5, 5.2, 4.9, 5.6, 6.1, 6.8, 6.5, 7.9];
const trafficData = [12, 19, 15, 24, 31, 28, 35, 42, 38, 51, 46, 58];

const kpiCards = [
  {
    label: "Выручка",
    value: "₽13.2М",
    delta: "+22.2%",
    positive: true,
    color: "hsl(196,100%,50%)",
    bg: "hsla(196,100%,50%,0.08)",
    border: "hsla(196,100%,50%,0.2)",
    icon: "TrendingUp",
    sub: "vs прошлый месяц",
  },
  {
    label: "Клиенты",
    value: "4 831",
    delta: "+341",
    positive: true,
    color: "hsl(158,64%,52%)",
    bg: "hsla(158,64%,52%,0.08)",
    border: "hsla(158,64%,52%,0.2)",
    icon: "Users",
    sub: "новых за месяц",
  },
  {
    label: "Конверсия",
    value: "7.4%",
    delta: "-0.3%",
    positive: false,
    color: "hsl(42,100%,55%)",
    bg: "hsla(42,100%,55%,0.08)",
    border: "hsla(42,100%,55%,0.2)",
    icon: "Target",
    sub: "лидов в продажи",
  },
  {
    label: "Расходы",
    value: "₽7.9М",
    delta: "+15.8%",
    positive: false,
    color: "hsl(347,77%,60%)",
    bg: "hsla(347,77%,60%,0.08)",
    border: "hsla(347,77%,60%,0.2)",
    icon: "CreditCard",
    sub: "операционные",
  },
];

const topChannels = [
  { name: "Органический поиск", value: 38, color: "hsl(196,100%,50%)" },
  { name: "Прямые переходы", value: 24, color: "hsl(158,64%,52%)" },
  { name: "Социальные сети", value: 19, color: "hsl(42,100%,55%)" },
  { name: "Email-рассылка", value: 12, color: "hsl(262,83%,68%)" },
  { name: "Реклама", value: 7, color: "hsl(347,77%,60%)" },
];

const topProducts = [
  { name: "Тариф Про", revenue: "₽4.8М", units: 1240, growth: "+18%" },
  { name: "Тариф Бизнес", revenue: "₽3.2М", units: 420, growth: "+31%" },
  { name: "Доп. модули", revenue: "₽2.1М", units: 890, growth: "+7%" },
  { name: "Консалтинг", revenue: "₽1.9М", units: 64, growth: "+44%" },
  { name: "Тариф Стартер", revenue: "₽1.2М", units: 2100, growth: "-3%" },
];

const navItems = [
  { icon: "LayoutDashboard", label: "Обзор", active: true },
  { icon: "BarChart2", label: "Продажи" },
  { icon: "Users", label: "Клиенты" },
  { icon: "ShoppingCart", label: "Продукты" },
  { icon: "Megaphone", label: "Маркетинг" },
  { icon: "FileText", label: "Отчёты" },
];

function LineChart({ data, color, max }: { data: number[]; color: string; max: number }) {
  const w = 500, h = 120, pad = 8;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v / max) * (h - pad * 2));
    return `${x},${y}`;
  });
  const path = `M ${pts.join(" L ")}`;
  const gradId = `grad-${color.replace(/[^a-z0-9]/gi, "")}`;
  const areaPath = `M ${pts[0]} L ${pts.join(" L ")} L ${pad + (w - pad * 2)},${h - pad} L ${pad},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v / max) * (h - pad * 2));
        return <circle key={i} cx={x} cy={y} r="3.5" fill={color} />;
      })}
    </svg>
  );
}

function BarChart({ data, colors, labels }: { data: number[][]; colors: string[]; labels: string[] }) {
  const max = Math.max(...data.flat());
  return (
    <div className="flex items-end gap-1 h-full w-full">
      {labels.map((label, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end gap-0.5" style={{ height: "100px" }}>
            {data.map((series, j) => (
              <div
                key={j}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${(series[i] / max) * 100}%`,
                  backgroundColor: colors[j],
                  opacity: 0.85,
                  transition: "height 1s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }: { segments: { value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  const r = 40, cx = 56, cy = 56, strokeW = 14;
  const circumference = 2 * Math.PI * r;

  return (
    <svg viewBox="0 0 112 112" className="w-full h-full">
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circumference;
        const gap = circumference - dash;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circumference + circumference * 0.25}
            strokeLinecap="round"
          />
        );
        offset += pct;
        return el;
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="13" fontFamily="Oswald" fontWeight="600">
        {total}%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="hsl(215,15%,45%)" fontSize="7" fontFamily="IBM Plex Sans">
        покрытие рынка
      </text>
    </svg>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState(0);
  const [activePeriod, setActivePeriod] = useState(2);
  const periods = ["7Д", "30Д", "12М", "Всё"];

  return (
    <div className="min-h-screen bg-background flex" style={{
      backgroundImage: "linear-gradient(hsla(210,20%,92%,0.03) 1px, transparent 1px), linear-gradient(90deg, hsla(210,20%,92%,0.03) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}>
      {/* Sidebar */}
      <aside className="w-14 lg:w-56 flex-shrink-0 border-r border-border flex flex-col py-6 bg-card/50">
        <div className="px-3 lg:px-4 mb-8 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(196,100%,50%)", boxShadow: "0 0 20px hsla(196,100%,50%,0.4)" }}
          >
            <Icon name="Activity" size={16} className="text-background" />
          </div>
          <span className="hidden lg:block font-display text-base font-semibold tracking-widest text-foreground">
            АНАЛИТИКА
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveNav(i)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeNav === i
                  ? "text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              style={activeNav === i ? { backgroundColor: "hsla(196,100%,50%,0.1)" } : {}}
            >
              <Icon name={item.icon} size={16} />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-2 mt-4">
          <div className="flex items-center gap-3 p-2 rounded-lg border border-border">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-background flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(196,100%,50%), hsl(42,100%,55%))" }}
            >
              АГ
            </div>
            <div className="hidden lg:block leading-none">
              <div className="text-xs font-medium text-foreground">А. Громов</div>
              <div className="text-[10px] text-muted-foreground">Директор</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold tracking-widest text-foreground">
              ОБЗОР ПОКАЗАТЕЛЕЙ
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Обновлено: {new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-border overflow-hidden">
              {periods.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePeriod(i)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all ${
                    activePeriod === i
                      ? "text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={activePeriod === i ? { backgroundColor: "hsl(196,100%,50%)" } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Download" size={15} />
            </button>
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Bell" size={15} />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-5">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: card.bg, borderColor: card.border }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{card.label}</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + "25" }}>
                    <Icon name={card.icon} size={14} style={{ color: card.color }} />
                  </div>
                </div>
                <div className="font-display text-3xl font-semibold tracking-tight" style={{ color: card.color }}>
                  {card.value}
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span
                    className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      color: card.positive ? "hsl(158,64%,52%)" : "hsl(347,77%,60%)",
                      backgroundColor: card.positive ? "hsla(158,64%,52%,0.12)" : "hsla(347,77%,60%,0.12)",
                    }}
                  >
                    {card.delta}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{card.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Revenue chart */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-sm font-semibold tracking-widest text-foreground">ДИНАМИКА ДОХОДОВ / РАСХОДОВ</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">12-месячный период</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="w-4 h-0.5 rounded-full inline-block" style={{ backgroundColor: "hsl(196,100%,50%)" }} />
                    Доходы
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="w-4 h-0.5 rounded-full inline-block" style={{ backgroundColor: "hsl(347,77%,60%)" }} />
                    Расходы
                  </span>
                </div>
              </div>

              <div className="h-28">
                <LineChart data={revenueData} color="hsl(196,100%,50%)" max={15} />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground px-1 my-1">
                {MONTHS.map((m) => <span key={m}>{m}</span>)}
              </div>
              <div className="h-20 opacity-60">
                <LineChart data={expenseData} color="hsl(347,77%,60%)" max={15} />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                {[
                  { label: "Ср. доход/мес", value: "₽8.2М", color: "hsl(196,100%,50%)" },
                  { label: "Ср. расход/мес", value: "₽5.1М", color: "hsl(347,77%,60%)" },
                  { label: "Маржинальность", value: "40.2%", color: "hsl(158,64%,52%)" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-lg font-semibold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-sm font-semibold tracking-widest text-foreground mb-1">ИСТОЧНИКИ ТРАФИКА</h2>
              <p className="text-xs text-muted-foreground mb-4">Распределение по каналам</p>
              <div className="w-28 h-28 mx-auto mb-5">
                <DonutChart segments={topChannels.map(c => ({ value: c.value, color: c.color }))} />
              </div>
              <div className="space-y-2.5">
                {topChannels.map((ch, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }} />
                    <span className="text-xs text-muted-foreground flex-1 truncate">{ch.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${ch.value}%`, backgroundColor: ch.color }} />
                      </div>
                      <span className="text-xs font-mono font-semibold text-foreground w-7 text-right">{ch.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Traffic bars */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-sm font-semibold tracking-widest text-foreground mb-1">ТРАФИК</h2>
              <p className="text-xs text-muted-foreground mb-4">Тысяч посещений / мес</p>
              <div className="h-32">
                <BarChart
                  data={[trafficData, trafficData.map(v => Math.round(v * 0.6))]}
                  colors={["hsl(196,100%,50%)", "hsl(262,83%,68%)"]}
                  labels={MONTHS}
                />
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "hsl(196,100%,50%)" }} />
                  Визиты
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "hsl(262,83%,68%)" }} />
                  Уникальные
                </span>
              </div>
            </div>

            {/* Top products */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-sm font-semibold tracking-widest text-foreground">ТОП ПРОДУКТОВ</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">По выручке за период</p>
                </div>
                <button className="text-xs font-medium transition-colors" style={{ color: "hsl(196,100%,50%)" }}>
                  Смотреть все →
                </button>
              </div>
              <div className="space-y-0.5">
                <div className="grid grid-cols-4 text-[10px] font-medium text-muted-foreground uppercase tracking-widest pb-2 border-b border-border px-1">
                  <span>Продукт</span>
                  <span className="text-right">Выручка</span>
                  <span className="text-right">Продаж</span>
                  <span className="text-right">Рост</span>
                </div>
                {topProducts.map((p, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 py-2.5 border-b border-border/40 hover:bg-secondary/30 rounded-lg px-1 transition-colors cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground w-4">{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                    </div>
                    <span className="text-right font-mono text-sm font-semibold text-foreground">{p.revenue}</span>
                    <span className="text-right font-mono text-sm text-muted-foreground">{p.units.toLocaleString("ru-RU")}</span>
                    <span
                      className="text-right font-mono text-sm font-semibold"
                      style={{ color: p.growth.startsWith("+") ? "hsl(158,64%,52%)" : "hsl(347,77%,60%)" }}
                    >
                      {p.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Средний чек", value: "₽28 400", icon: "ShoppingBag", color: "hsl(196,100%,50%)" },
              { label: "LTV клиента", value: "₽142 000", icon: "Heart", color: "hsl(262,83%,68%)" },
              { label: "Отток (Churn)", value: "3.1%", icon: "UserMinus", color: "hsl(347,77%,60%)" },
              { label: "NPS индекс", value: "72 / 100", icon: "Star", color: "hsl(42,100%,55%)" },
            ].map((m, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: m.color + "20" }}
                >
                  <Icon name={m.icon} size={17} style={{ color: m.color }} />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
                  <div className="font-display text-base font-semibold mt-0.5" style={{ color: m.color }}>{m.value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
