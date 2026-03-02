/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Все категории", icon: "Layers", color: "#00ffb3" },
  { id: "coil", label: "Рулонная сталь", icon: "Disc", color: "#00d4ff" },
  { id: "sheet_galv", label: "Лист оцинкованный", icon: "Square", color: "#00ffb3" },
  { id: "sheet_cold", label: "Лист х/к", icon: "LayoutGrid", color: "#b347ff" },
  { id: "strip", label: "Штрипс оцинковка", icon: "AlignLeft", color: "#ffd700" },
  { id: "pack", label: "Упаковочный лист / обёртка", icon: "Package", color: "#ff6b35" },
  { id: "polymer", label: "Полимер покрытие", icon: "Zap", color: "#00d4ff" },
  { id: "grade2", label: "2-й сорт / Некондиция", icon: "AlertTriangle", color: "#ffd700" },
  { id: "scrap", label: "Отход / Неликвид", icon: "Trash2", color: "#ff6b35" },
];

const SOURCES = [
  { id: "tender", label: "Тендеры (44-ФЗ/223-ФЗ)", icon: "FileText" },
  { id: "board", label: "Доски объявлений", icon: "Layout" },
  { id: "b2b", label: "B2B площадки", icon: "Briefcase" },
];

const LOTS = [
  { id: "ST-2026-04421", type: "tender", title: "Прокат рулонный холоднокатаный х/к 0.7×1250мм, 40 тонн", category: "coil", seller: "АО «Северсталь»", region: "Вологодская обл.", price: 3800000, pricePerTon: 95000, qty: "40 т", deadline: "2026-03-08", urgency: "high", platform: "ЕИС Закупки", aiPrice: 3320000, aiPerTon: 83000, competitors: 4, grade: "ГОСТ 19904-90" },
  { id: "ST-2026-04389", type: "tender", title: "Лист оцинкованный 0.5×1000×2000мм, ГОСТ 14918, 25 тонн", category: "sheet_galv", seller: "ПАО «ММК»", region: "Челябинская обл.", price: 2875000, pricePerTon: 115000, qty: "25 т", deadline: "2026-03-11", urgency: "high", platform: "Росэлторг", aiPrice: 2530000, aiPerTon: 101200, competitors: 3, grade: "ГОСТ 14918-80" },
  { id: "ST-2026-04201", type: "board", title: "Штрипс оцинкованный 0.55×180мм в рулонах, 15 тонн", category: "strip", seller: "ООО «МеталлСервис»", region: "Москва", price: 1650000, pricePerTon: 110000, qty: "15 т", deadline: "2026-03-15", urgency: "medium", platform: "Металлторг.ру", aiPrice: 1485000, aiPerTon: 99000, competitors: 5, grade: "ТУ 1212-033" },
  { id: "ST-2026-04187", type: "tender", title: "Лист холоднокатаный 1.0×1250×2500мм, 60 тонн", category: "sheet_cold", seller: "АО «НЛМК»", region: "Липецкая обл.", price: 5400000, pricePerTon: 90000, qty: "60 т", deadline: "2026-03-17", urgency: "medium", platform: "Сбербанк-АСТ", aiPrice: 4860000, aiPerTon: 81000, competitors: 6, grade: "ГОСТ 19904-90" },
  { id: "ST-2026-04023", type: "board", title: "Обёртка упаковочная от рулонной стали б/у, 8 тонн", category: "pack", seller: "ООО «ВторМеталл»", region: "Нижний Новгород", price: 48000, pricePerTon: 6000, qty: "8 т", deadline: "2026-03-20", urgency: "medium", platform: "Авито Бизнес", aiPrice: 40000, aiPerTon: 5000, competitors: 2, grade: "Вторсырьё" },
  { id: "ST-2026-03998", type: "board", title: "Полимерный прокат 2-й сорт, полиэстер PE, 0.45мм, 12 тонн", category: "polymer", seller: "ЗАО «КрашМеталл»", region: "Екатеринбург", price: 1560000, pricePerTon: 130000, qty: "12 т", deadline: "2026-03-22", urgency: "low", platform: "Металлоснабжение.ру", aiPrice: 1380000, aiPerTon: 115000, competitors: 3, grade: "2 сорт" },
  { id: "ST-2026-03876", type: "tender", title: "Лист оцинкованный 2-й сорт, некондиция 0.5–1.0мм, 30 тонн", category: "grade2", seller: "ОАО «Металлоторг»", region: "Самара", price: 2100000, pricePerTon: 70000, qty: "30 т", deadline: "2026-03-25", urgency: "low", platform: "ЕИС Закупки", aiPrice: 1890000, aiPerTon: 63000, competitors: 7, grade: "Некондиция" },
  { id: "ST-2026-03654", type: "board", title: "Обрезь рулонная, отход х/к, смешанная фракция, 20 тонн", category: "scrap", seller: "ООО «ПромОтход»", region: "Санкт-Петербург", price: 440000, pricePerTon: 22000, qty: "20 т", deadline: "2026-03-28", urgency: "low", platform: "Авито Бизнес", aiPrice: 380000, aiPerTon: 19000, competitors: 8, grade: "Отход" },
];

const MY_DEALS = [
  { id: "ST-2026-02100", title: "Рулон х/к 0.7×1000мм, 35т", myPrice: 3150000, listPrice: 3500000, status: "won", date: "2026-02-18", disc: 10.0 },
  { id: "ST-2026-01987", title: "Лист оцинк. 0.5×1250мм, 20т", myPrice: 2240000, listPrice: 2500000, status: "won", date: "2026-02-10", disc: 10.4 },
  { id: "ST-2026-01654", title: "Штрипс оцинк. 0.55×180мм, 10т", myPrice: 1010000, listPrice: 1050000, status: "lost", date: "2026-01-30", disc: 3.8 },
  { id: "ST-2026-01432", title: "Полимер 2с PE 0.45мм, 8т", myPrice: 960000, listPrice: 1040000, status: "review", date: "2026-02-24", disc: 7.7 },
  { id: "ST-2026-01201", title: "Лист х/к 1.0×1250мм, 50т", myPrice: 4350000, listPrice: 4800000, status: "won", date: "2026-01-22", disc: 9.4 },
];

const COMPETITORS = [
  { name: "МеталлСервис-МСК", deals: 54, avgDisc: 7.8, active: "сегодня", threat: "high", cats: ["coil", "sheet_galv"] },
  { name: "СтальГрупп", deals: 38, avgDisc: 11.2, active: "вчера", threat: "high", cats: ["sheet_cold", "strip"] },
  { name: "ЕвразМеталл", deals: 29, avgDisc: 6.4, active: "2 дня назад", threat: "medium", cats: ["coil"] },
  { name: "ПромМеталл", deals: 21, avgDisc: 9.0, active: "4 дня назад", threat: "medium", cats: ["grade2", "scrap"] },
  { name: "ВторМеталлРесурс", deals: 14, avgDisc: 5.1, active: "неделю назад", threat: "low", cats: ["pack", "scrap"] },
];

const MONTHS = ["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"];
const VOLS = [1800, 2300, 2100, 2700, 2500, 3200];

const fmtRub = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} млн ₽`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} тыс ₽`;
  return `${n} ₽`;
};
const fmtTon = (n: number) => `${n.toLocaleString("ru-RU")} ₽/т`;
const getDays = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);
const getCatColor = (id: string) => CATEGORIES.find(c => c.id === id)?.color ?? "#00ffb3";
const getCatLabel = (id: string) => CATEGORIES.find(c => c.id === id)?.label ?? id;
const getCatIcon = (id: string) => CATEGORIES.find(c => c.id === id)?.icon ?? "Layers";

type Section = "lots" | "monitoring" | "mydeals" | "analytics" | "competitors" | "support" | "profile" | "portfolio";

export default function Index() {
  const [section, setSection] = useState<Section>("lots");
  const [selected, setSelected] = useState<typeof LOTS[0] | null>(null);
  const [catFilter, setCatFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [urgFilter, setUrgFilter] = useState("all");
  const [bid, setBid] = useState("");
  const [notif, setNotif] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const toast = (msg: string) => { setNotif(msg); setTimeout(() => setNotif(null), 3200); };
  const go = (s: Section) => { setSection(s); setSelected(null); setBid(""); };

  const filtered = LOTS.filter(l => {
    if (catFilter !== "all" && l.category !== catFilter) return false;
    if (sourceFilter !== "all" && l.type !== sourceFilter) return false;
    if (urgFilter !== "all" && l.urgency !== urgFilter) return false;
    return true;
  });

  const navItems: { key: Section; label: string; icon: string; badge?: number }[] = [
    { key: "lots", label: "Лоты", icon: "ShoppingCart", badge: filtered.length },
    { key: "monitoring", label: "Мониторинг", icon: "Activity" },
    { key: "mydeals", label: "Мои сделки", icon: "Target", badge: 1 },
    { key: "analytics", label: "Аналитика", icon: "BarChart2" },
    { key: "competitors", label: "Конкуренты", icon: "Users" },
    { key: "portfolio", label: "Портфель", icon: "Briefcase" },
    { key: "support", label: "Поддержка", icon: "MessageSquare" },
    { key: "profile", label: "Профиль", icon: "User" },
  ];

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: "var(--dark-bg)", color: "#e0f4f4" }}>
      {notif && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in card-glass neon-border px-5 py-3 text-sm font-ibm" style={{ color: "var(--neon-green)" }}>
          ⬡ {notif}
        </div>
      )}

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-40 h-7 flex items-center overflow-hidden"
        style={{ backgroundColor: "rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.12)" }}>
        <div className="ticker-wrap flex-1">
          <div className="ticker-content font-mono-ibm text-xs" style={{ color: "rgba(0,212,255,0.75)" }}>
            &nbsp;&nbsp;&nbsp;⬡ РУЛОН Х/К 0.7×1250мм · 40Т · 95 000 ₽/Т · СРОК 8 МАР&nbsp;&nbsp;&nbsp;
            ⬡ ЛИСТ ОЦИНК 0.5×1000 · 25Т · 115 000 ₽/Т · СРОК 11 МАР&nbsp;&nbsp;&nbsp;
            ⬡ ШТРИПС 0.55×180 · 15Т · 110 000 ₽/Т&nbsp;&nbsp;&nbsp;
            ⬡ AI: СНИЗИТЬ НА 12.8% → ШАНС ПОБЕДЫ +68%&nbsp;&nbsp;&nbsp;
            ⬡ МЕТАЛЛСЕРВИС-МСК АКТИВЕН СЕГОДНЯ&nbsp;&nbsp;&nbsp;
            ⬡ НОВЫХ ЛОТОВ +5 ЗА 3 ЧАСА
          </div>
        </div>
        <div className="px-3 font-mono-ibm text-xs shrink-0" style={{ color: "var(--neon-green)" }}>
          {time.toLocaleTimeString("ru-RU")}
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-7 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 h-14"
        style={{ backgroundColor: "rgba(6,10,15,0.96)", borderBottom: "1px solid var(--dark-border)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center"
            style={{ border: "2px solid var(--neon-cyan)", boxShadow: "0 0 12px rgba(0,212,255,0.35)" }}>
            <span className="font-orbitron font-black text-xs" style={{ color: "var(--neon-cyan)" }}>ST</span>
          </div>
          <div>
            <div className="font-orbitron font-bold text-sm tracking-widest">
              <span style={{ color: "var(--neon-cyan)" }}>STEEL</span><span style={{ color: "var(--neon-green)" }}>TRACK</span>
            </div>
            <div className="hidden md:block font-mono-ibm text-xs" style={{ color: "rgba(0,212,255,0.4)" }}>
              РУЛОННАЯ СТАЛЬ · МЕТАЛЛОПРОКАТ · ОНЛАЙН-ТРЕКЕР
            </div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map(item => (
            <button key={item.key} onClick={() => go(item.key)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-ibm font-medium transition-all duration-200 rounded-sm"
              style={{
                color: section === item.key ? "var(--neon-cyan)" : "rgba(180,220,220,0.5)",
                backgroundColor: section === item.key ? "rgba(0,212,255,0.08)" : "transparent",
                border: section === item.key ? "1px solid rgba(0,212,255,0.22)" : "1px solid transparent",
              }}>
              <Icon name={item.icon as any} size={12} />
              {item.label}
              {item.badge !== undefined && (
                <span className="w-5 h-4 rounded-sm flex items-center justify-center font-bold"
                  style={{ backgroundColor: "rgba(0,212,255,0.18)", color: "var(--neon-cyan)", fontSize: "9px" }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-sm"
            style={{ backgroundColor: "rgba(0,255,179,0.06)", border: "1px solid rgba(0,255,179,0.18)" }}>
            <div className="w-1.5 h-1.5 rounded-full status-pulse" style={{ backgroundColor: "var(--neon-green)" }} />
            <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>ONLINE</span>
          </div>
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-orbitron font-bold text-xs"
            style={{ backgroundColor: "rgba(0,212,255,0.12)", color: "var(--neon-cyan)", border: "1px solid rgba(0,212,255,0.25)" }}>МВ</div>
        </div>
      </header>

      <main className="pt-28 px-4 md:px-8 pb-24 md:pb-10 max-w-7xl mx-auto relative z-10">

        {/* ══ ЛОТЫ ══ */}
        {section === "lots" && !selected && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
              <div>
                <h1 className="font-orbitron font-bold text-2xl" style={{ color: "var(--neon-cyan)" }}>ЛОТЫ / ОБЪЯВЛЕНИЯ</h1>
                <p className="font-ibm text-sm mt-1" style={{ color: "rgba(180,220,220,0.5)" }}>
                  {filtered.length} позиций · обновлено {time.toLocaleTimeString("ru-RU")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                  className="font-mono-ibm text-xs px-3 py-2 rounded-sm outline-none"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "var(--neon-cyan)" }}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
                  className="font-mono-ibm text-xs px-3 py-2 rounded-sm outline-none"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "var(--neon-cyan)" }}>
                  <option value="all">Все источники</option>
                  {SOURCES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <select value={urgFilter} onChange={e => setUrgFilter(e.target.value)}
                  className="font-mono-ibm text-xs px-3 py-2 rounded-sm outline-none"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "var(--neon-cyan)" }}>
                  <option value="all">Все сроки</option>
                  <option value="high">Срочно ≤7 дней</option>
                  <option value="medium">8–14 дней</option>
                  <option value="low">15+ дней</option>
                </select>
              </div>
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCatFilter(c.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono-ibm text-xs transition-all"
                  style={{
                    backgroundColor: catFilter === c.id ? `${c.color}18` : "rgba(0,0,0,0.25)",
                    border: `1px solid ${catFilter === c.id ? c.color + "55" : "var(--dark-border)"}`,
                    color: catFilter === c.id ? c.color : "rgba(180,220,220,0.4)",
                  }}>
                  <Icon name={c.icon as any} size={11} />{c.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((lot, i) => {
                const days = getDays(lot.deadline);
                const pct = (((lot.price - lot.aiPrice) / lot.price) * 100).toFixed(1);
                const col = getCatColor(lot.category);
                return (
                  <div key={lot.id} className="card-glass rounded-sm p-4 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                    onClick={() => setSelected(lot)}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                            style={{ backgroundColor: `${col}14`, border: `1px solid ${col}44`, color: col, fontSize: "10px" }}>
                            {getCatLabel(lot.category)}
                          </span>
                          <span className="font-mono-ibm text-xs px-1.5 py-0.5 rounded-sm"
                            style={{ backgroundColor: lot.type === "tender" ? "rgba(0,255,179,0.08)" : "rgba(179,71,255,0.1)", color: lot.type === "tender" ? "var(--neon-green)" : "#b347ff", fontSize: "10px" }}>
                            {lot.type === "tender" ? "ТЕНДЕР" : "ОБЪЯВЛЕНИЕ"}
                          </span>
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.3)" }}>#{lot.id}</span>
                          <span className="ai-badge rounded-sm">AI</span>
                        </div>
                        <h3 className="font-ibm font-semibold text-sm mb-1.5" style={{ color: "#e0f4f4" }}>{lot.title}</h3>
                        <div className="flex flex-wrap gap-3 text-xs font-ibm" style={{ color: "rgba(180,220,220,0.45)" }}>
                          <span className="flex items-center gap-1"><Icon name="Building2" size={11} />{lot.seller}</span>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />{lot.region}</span>
                          <span className="flex items-center gap-1"><Icon name="Globe" size={11} />{lot.platform}</span>
                          <span className="flex items-center gap-1"><Icon name="Package" size={11} />{lot.qty}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2 shrink-0">
                        <div className="flex items-start gap-4">
                          <div className="text-right">
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>ЦЕНА</div>
                            <div className="font-orbitron font-bold text-sm" style={{ color: "#e0f4f4" }}>{fmtTon(lot.pricePerTon)}</div>
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.3)" }}>{fmtRub(lot.price)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(179,71,255,0.8)" }}>AI ЦЕНА</div>
                            <div className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-green)" }}>{fmtTon(lot.aiPerTon)}</div>
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(0,255,179,0.4)" }}>{fmtRub(lot.aiPrice)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono-ibm text-xs font-bold ${lot.urgency === "high" ? "urgency-high" : lot.urgency === "medium" ? "urgency-medium" : "urgency-low"}`}>
                            {days <= 0 ? "ИСТЁК" : `${days} ДН`}
                          </span>
                          <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                            style={{ backgroundColor: "rgba(0,255,179,0.08)", color: "var(--neon-green)", border: "1px solid rgba(0,255,179,0.2)" }}>
                            -{pct}%
                          </span>
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>{lot.competitors} конк.</span>
                        </div>
                        <button className="btn-neon rounded-sm"
                          onClick={e => { e.stopPropagation(); setSelected(lot); }}>
                          {lot.type === "tender" ? "ПОДАТЬ СТАВКУ →" : "КУПИТЬ →"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 h-px overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                      <div className="progress-bar-neon h-0.5"
                        style={{ width: `${Math.max(5, Math.min(100, (days / 30) * 100))}%`, background: `linear-gradient(90deg,${col},var(--neon-cyan))` }} />
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center py-16 font-mono-ibm text-sm" style={{ color: "rgba(180,220,220,0.3)" }}>— Лоты не найдены —</div>
              )}
            </div>
          </div>
        )}

        {/* ══ ДЕТАЛИ ЛОТА ══ */}
        {section === "lots" && selected && (
          <div className="animate-fade-in">
            <button className="flex items-center gap-2 font-mono-ibm text-xs mb-6 hover:opacity-60"
              style={{ color: "var(--neon-cyan)" }} onClick={() => setSelected(null)}>
              <Icon name="ArrowLeft" size={14} /> НАЗАД
            </button>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="card-glass rounded-sm p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                      style={{ backgroundColor: `${getCatColor(selected.category)}14`, border: `1px solid ${getCatColor(selected.category)}44`, color: getCatColor(selected.category), fontSize: "10px" }}>
                      {getCatLabel(selected.category)}
                    </span>
                    <span className="font-mono-ibm text-xs px-1.5 py-0.5 rounded-sm"
                      style={{ backgroundColor: selected.type === "tender" ? "rgba(0,255,179,0.08)" : "rgba(179,71,255,0.1)", color: selected.type === "tender" ? "var(--neon-green)" : "#b347ff", fontSize: "10px" }}>
                      {selected.type === "tender" ? "ТЕНДЕР 44-ФЗ/223-ФЗ" : "ОБЪЯВЛЕНИЕ"}
                    </span>
                    <span className="ai-badge rounded-sm">AI-АНАЛИЗ</span>
                  </div>
                  <h2 className="font-ibm font-semibold text-lg mb-4" style={{ color: "#e0f4f4" }}>{selected.title}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Продавец", value: selected.seller, icon: "Building2" },
                      { label: "Регион", value: selected.region, icon: "MapPin" },
                      { label: "Площадка", value: selected.platform, icon: "Globe" },
                      { label: "Объём", value: selected.qty, icon: "Package" },
                      { label: "ГОСТ/ТУ", value: selected.grade, icon: "FileCheck" },
                      { label: "Срок", value: new Date(selected.deadline).toLocaleDateString("ru-RU"), icon: "Calendar" },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-sm"
                        style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--dark-border)" }}>
                        <div className="flex items-center gap-1 mb-1">
                          <Icon name={item.icon as any} size={11} style={{ color: "rgba(0,212,255,0.5)" }} />
                          <span className="font-mono-ibm" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{item.label}</span>
                        </div>
                        <div className="font-ibm text-sm" style={{ color: "#e0f4f4" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-sm p-5" style={{ backgroundColor: "rgba(179,71,255,0.05)", border: "1px solid rgba(179,71,255,0.28)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Cpu" size={16} style={{ color: "#b347ff" }} />
                    <span className="font-orbitron text-sm font-bold" style={{ color: "#b347ff" }}>AI РЕКОМЕНДАЦИЯ</span>
                    <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: "rgba(179,71,255,0.18)", color: "#b347ff" }}>97%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: "ЦЕНА ЛОТА", value: fmtTon(selected.pricePerTon), sub: fmtRub(selected.price), color: "#e0f4f4", hl: false },
                      { label: "AI ЦЕНА/Т", value: fmtTon(selected.aiPerTon), sub: fmtRub(selected.aiPrice), color: "var(--neon-green)", hl: true },
                      { label: "ЭКОНОМИЯ", value: fmtRub(selected.price - selected.aiPrice), sub: `${(((selected.price - selected.aiPrice) / selected.price) * 100).toFixed(1)}%`, color: "var(--neon-cyan)", hl: false },
                      { label: "КОНКУРЕНТОВ", value: String(selected.competitors), sub: "участников", color: "#ffd700", hl: false },
                    ].map(c => (
                      <div key={c.label} className="text-center p-2.5 rounded-sm"
                        style={{ backgroundColor: c.hl ? "rgba(0,255,179,0.05)" : "rgba(0,0,0,0.25)", border: c.hl ? "1px solid rgba(0,255,179,0.18)" : "none" }}>
                        <div className="font-mono-ibm mb-1" style={{ color: c.hl ? "var(--neon-green)" : "rgba(180,220,220,0.4)", fontSize: "9px" }}>{c.label}</div>
                        <div className="font-orbitron font-bold text-sm" style={{ color: c.color }}>{c.value}</div>
                        <div className="font-mono-ibm mt-0.5" style={{ color: "rgba(180,220,220,0.35)", fontSize: "10px" }}>{c.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="font-ibm text-xs p-3 rounded-sm" style={{ backgroundColor: "rgba(179,71,255,0.07)", color: "rgba(220,200,255,0.8)", lineHeight: 1.7 }}>
                    📊 По данным <strong>1 240</strong> аналогичных сделок за 12 мес. оптимальная цена —{" "}
                    <strong style={{ color: "#b347ff" }}>{fmtTon(selected.aiPerTon)}</strong>.
                    Конкуренты давали скидку 5–13%. Шанс победы:{" "}
                    <strong style={{ color: "var(--neon-green)" }}>74%</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card-glass rounded-sm p-5">
                  <div className="font-orbitron font-bold text-sm mb-4" style={{ color: "var(--neon-cyan)" }}>
                    {selected.type === "tender" ? "ПОДАТЬ СТАВКУ" : "ЗАПРОС ЦЕНЫ"}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="font-mono-ibm text-xs block mb-1.5" style={{ color: "rgba(180,220,220,0.4)" }}>ВАША ЦЕНА ЗА ТОННУ (₽)</label>
                      <input type="number" value={bid} onChange={e => setBid(e.target.value)}
                        placeholder={String(selected.aiPerTon)}
                        className="w-full px-3 py-2.5 rounded-sm font-mono-ibm text-sm outline-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "var(--neon-green)" }}
                        onFocus={e => e.target.style.borderColor = "var(--neon-green)"}
                        onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                    </div>
                    {bid && Number(bid) > 0 && (
                      <div className="p-3 rounded-sm text-xs font-ibm" style={{ backgroundColor: "rgba(0,255,179,0.04)", border: "1px solid rgba(0,255,179,0.15)" }}>
                        <div className="flex justify-between mb-1.5">
                          <span style={{ color: "rgba(180,220,220,0.5)" }}>Скидка от прайса:</span>
                          <span style={{ color: "var(--neon-green)" }}>-{(((selected.pricePerTon - Number(bid)) / selected.pricePerTon) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "rgba(180,220,220,0.5)" }}>Vs AI:</span>
                          <span style={{ color: Number(bid) <= selected.aiPerTon ? "var(--neon-green)" : "#ffd700" }}>
                            {Number(bid) <= selected.aiPerTon ? "✓ ОПТИМАЛЬНО" : "⚠ ВЫШЕ AI"}
                          </span>
                        </div>
                      </div>
                    )}
                    <button className="btn-neon-solid w-full rounded-sm"
                      onClick={() => {
                        if (!bid) { setBid(String(selected.aiPerTon)); toast(`AI цена: ${fmtTon(selected.aiPerTon)}`); }
                        else { toast(`${selected.type === "tender" ? "Ставка" : "Запрос"} ${fmtTon(Number(bid))} → ${selected.platform}`); }
                      }}>
                      {bid ? (selected.type === "tender" ? "ПОДАТЬ СТАВКУ" : "ОТПРАВИТЬ ЗАПРОС") : "ПРИМЕНИТЬ AI ЦЕНУ"}
                    </button>
                    <button className="btn-neon w-full rounded-sm" onClick={() => toast("Лот добавлен в отслеживание")}>+ В ОТСЛЕЖИВАНИЕ</button>
                    {selected.type === "board" && (
                      <button className="w-full py-2 rounded-sm font-orbitron text-xs font-bold"
                        style={{ backgroundColor: "rgba(0,212,255,0.12)", color: "var(--neon-cyan)", border: "1px solid rgba(0,212,255,0.25)" }}
                        onClick={() => toast(`Открываю ${selected.platform}`)}>
                        ОТКРЫТЬ НА САЙТЕ ↗
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-glass rounded-sm p-5 text-center">
                  <div className="font-mono-ibm text-xs mb-2" style={{ color: "rgba(180,220,220,0.4)" }}>ОСТАЛОСЬ ДНЕЙ</div>
                  <div className="font-orbitron font-black text-5xl"
                    style={{ color: getDays(selected.deadline) <= 3 ? "var(--neon-orange)" : "var(--neon-green)" }}>
                    {getDays(selected.deadline)}
                  </div>
                  <div className="font-mono-ibm text-xs mt-2" style={{ color: "rgba(180,220,220,0.35)" }}>
                    до {new Date(selected.deadline).toLocaleDateString("ru-RU")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ МОНИТОРИНГ ══ */}
        {section === "monitoring" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-orbitron font-bold text-2xl" style={{ color: "var(--neon-cyan)" }}>МОНИТОРИНГ</h1>
                <p className="font-ibm text-sm mt-1" style={{ color: "rgba(180,220,220,0.5)" }}>Потоки лотов в реальном времени</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-sm"
                style={{ backgroundColor: "rgba(0,255,179,0.06)", border: "1px solid rgba(0,255,179,0.18)" }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--neon-green)", animation: "pulse-neon 1s infinite" }} />
                <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>LIVE</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {SOURCES.map((src, i) => (
                <div key={src.id} className="card-glass rounded-sm p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name={src.icon as any} size={14} style={{ color: "var(--neon-cyan)" }} />
                    <span className="font-ibm text-sm font-medium" style={{ color: "#e0f4f4" }}>{src.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full status-pulse ml-auto" style={{ backgroundColor: "var(--neon-green)" }} />
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Новых сегодня", value: [5, 12, 8][i], color: "var(--neon-green)" },
                      { label: "За неделю", value: [24, 67, 41][i], color: "var(--neon-cyan)" },
                      { label: "Ср. лот", value: [fmtRub(3_200_000), fmtRub(480_000), fmtRub(1_100_000)][i], color: "#ffd700" },
                    ].map(s => (
                      <div key={s.label} className="flex justify-between">
                        <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>{s.label}</span>
                        <span className="font-orbitron font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-neon w-full rounded-sm mt-4 text-xs"
                    onClick={() => { setSourceFilter(src.id); go("lots"); }}>СМОТРЕТЬ →</button>
                </div>
              ))}
            </div>
            <div className="card-glass rounded-sm p-5">
              <div className="font-orbitron text-xs font-bold mb-4" style={{ color: "rgba(180,220,220,0.6)" }}>ЛЕНТА НОВЫХ ПОЗИЦИЙ</div>
              <div className="space-y-1.5">
                {[
                  { time: "15:41", title: "Рулон г/к 2.0×1200мм, 80т", price: 7_200_000, cat: "coil", isNew: true },
                  { time: "14:28", title: "Лист оцинк 0.7×1250×2500, 18т", price: 2_160_000, cat: "sheet_galv", isNew: true },
                  { time: "13:55", title: "Штрипс х/к 0.8×100мм рулон, 6т", price: 594_000, cat: "strip", isNew: false },
                  { time: "12:33", title: "Обёртка упаков. от рулонов б/у, 5т", price: 25_000, cat: "pack", isNew: false },
                  { time: "11:17", title: "Полимер 2с PVDF 0.5мм, 9т", price: 1_350_000, cat: "polymer", isNew: false },
                  { time: "10:04", title: "Обрезь рулонная х/к отход, 15т", price: 270_000, cat: "scrap", isNew: false },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2.5 rounded-sm cursor-pointer"
                    style={{ backgroundColor: item.isNew ? "rgba(0,212,255,0.04)" : "transparent", border: `1px solid ${item.isNew ? "rgba(0,212,255,0.12)" : "transparent"}` }}
                    onClick={() => go("lots")}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-ibm text-xs shrink-0" style={{ color: "rgba(180,220,220,0.3)" }}>{item.time}</span>
                      {item.isNew && <span className="font-orbitron shrink-0 px-1.5 py-0.5 rounded-sm"
                        style={{ backgroundColor: "var(--neon-cyan)", color: "var(--dark-bg)", fontSize: "9px" }}>NEW</span>}
                      <span className="font-mono-ibm text-xs shrink-0 px-1.5 py-0.5 rounded-sm"
                        style={{ backgroundColor: `${getCatColor(item.cat)}12`, color: getCatColor(item.cat), fontSize: "9px" }}>
                        {getCatLabel(item.cat)}
                      </span>
                      <span className="font-ibm text-xs truncate" style={{ color: "#e0f4f4" }}>{item.title}</span>
                    </div>
                    <span className="font-orbitron font-bold text-xs shrink-0" style={{ color: "var(--neon-green)" }}>{fmtRub(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ МОИ СДЕЛКИ ══ */}
        {section === "mydeals" && (
          <div className="animate-fade-in">
            <h1 className="font-orbitron font-bold text-2xl mb-1" style={{ color: "var(--neon-green)" }}>МОИ СДЕЛКИ</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>История заявок и покупок</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Победы", value: "3", icon: "Trophy", color: "var(--neon-green)" },
                { label: "На рассмотрении", value: "1", icon: "Clock", color: "#ffd700" },
                { label: "Проигрыши", value: "1", icon: "X", color: "var(--neon-orange)" },
                { label: "Ср. скидка", value: "10.3%", icon: "TrendingDown", color: "var(--neon-cyan)" },
              ].map((s, i) => (
                <div key={i} className="card-glass rounded-sm p-4 text-center">
                  <Icon name={s.icon as any} size={20} style={{ color: s.color, margin: "0 auto 8px" }} />
                  <div className="font-orbitron font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="font-mono-ibm text-xs mt-1" style={{ color: "rgba(180,220,220,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {MY_DEALS.map((d, i) => (
                <div key={d.id} className="card-glass rounded-sm p-4 animate-fade-in" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)" }}>#{d.id}</span>
                        <span className="font-orbitron text-xs px-2 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: d.status === "won" ? "rgba(0,255,179,0.1)" : d.status === "lost" ? "rgba(255,107,53,0.1)" : "rgba(255,215,0,0.1)",
                            color: d.status === "won" ? "var(--neon-green)" : d.status === "lost" ? "var(--neon-orange)" : "#ffd700",
                            fontSize: "10px",
                          }}>
                          {d.status === "won" ? "✓ ПОБЕДА" : d.status === "lost" ? "✗ ПРОИГРЫШ" : "⌛ НА РАССМОТРЕНИИ"}
                        </span>
                      </div>
                      <div className="font-ibm font-medium text-sm" style={{ color: "#e0f4f4" }}>{d.title}</div>
                      <div className="font-mono-ibm text-xs mt-1" style={{ color: "rgba(180,220,220,0.3)" }}>{d.date}</div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      {[
                        { label: "МОЯ ЦЕНА", value: fmtRub(d.myPrice), color: "var(--neon-green)" },
                        { label: "ПРАЙС", value: fmtRub(d.listPrice), color: "rgba(180,220,220,0.55)" },
                        { label: "СКИДКА", value: `-${d.disc}%`, color: "var(--neon-cyan)" },
                      ].map(c => (
                        <div key={c.label} className="text-right">
                          <div className="font-mono-ibm" style={{ color: "rgba(180,220,220,0.35)", fontSize: "10px" }}>{c.label}</div>
                          <div className="font-orbitron font-bold text-sm" style={{ color: c.color }}>{c.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ АНАЛИТИКА ══ */}
        {section === "analytics" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="font-orbitron font-bold text-2xl mb-1" style={{ color: "var(--neon-cyan)" }}>АНАЛИТИКА</h1>
              <p className="font-ibm text-sm" style={{ color: "rgba(180,220,220,0.5)" }}>Рынок рулонной стали · тренды</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Объём рынка (год)", value: "₽14.8 млрд", change: "+22%", icon: "DollarSign", color: "var(--neon-green)" },
                { label: "Ср. цена х/к (тонна)", value: "88 400 ₽", change: "+4.2%", icon: "TrendingUp", color: "var(--neon-cyan)" },
                { label: "Ср. цена оцинк.", value: "112 600 ₽", change: "+6.8%", icon: "Layers", color: "#ffd700" },
                { label: "Наша доля рынка", value: "1.8%", change: "+0.3%", icon: "PieChart", color: "#b347ff" },
              ].map((kpi, i) => (
                <div key={i} className="card-glass rounded-sm p-4 animate-fade-in" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name={kpi.icon as any} size={13} style={{ color: kpi.color }} />
                    <span className="font-mono-ibm" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{kpi.label}</span>
                  </div>
                  <div className="font-orbitron font-black text-xl" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="font-mono-ibm text-xs mt-1" style={{ color: "var(--neon-green)" }}>↑ {kpi.change}</div>
                </div>
              ))}
            </div>
            <div className="card-glass rounded-sm p-5">
              <div className="font-orbitron text-xs font-bold mb-5" style={{ color: "rgba(180,220,220,0.6)" }}>ОБЪЁМ СДЕЛОК ПО МЕСЯЦАМ (МЛН ₽)</div>
              <div className="flex items-end justify-between gap-2 h-40">
                {MONTHS.map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <div className="font-orbitron text-xs" style={{ color: "var(--neon-cyan)", fontSize: "10px" }}>{VOLS[i]}</div>
                    <div className="chart-bar w-full" style={{ height: `${(VOLS[i] / 3400) * 100}%`, minHeight: "8px" }} />
                    <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{m}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Рулонная сталь", pct: 45, color: "var(--neon-cyan)" },
                { label: "Лист оцинк / х/к", pct: 35, color: "var(--neon-green)" },
                { label: "Прочее (штрипс, отходы)", pct: 20, color: "#ffd700" },
              ].map((item, i) => (
                <div key={i} className="card-glass rounded-sm p-4">
                  <div className="font-ibm text-xs mb-3" style={{ color: "rgba(180,220,220,0.55)" }}>{item.label}</div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>Доля продаж</span>
                    <span className="font-orbitron font-bold text-sm" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}66` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ КОНКУРЕНТЫ ══ */}
        {section === "competitors" && (
          <div className="animate-fade-in">
            <h1 className="font-orbitron font-bold text-2xl mb-1" style={{ color: "var(--neon-orange)" }}>КОНКУРЕНТЫ</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>Активность покупателей на рынке стали</p>
            <div className="space-y-3">
              {COMPETITORS.map((c, i) => (
                <div key={c.name} className="card-glass rounded-sm p-4 animate-fade-in" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center font-orbitron font-black text-sm"
                        style={{
                          backgroundColor: c.threat === "high" ? "rgba(255,107,53,0.12)" : c.threat === "medium" ? "rgba(255,215,0,0.1)" : "rgba(0,255,179,0.08)",
                          color: c.threat === "high" ? "var(--neon-orange)" : c.threat === "medium" ? "#ffd700" : "var(--neon-green)",
                        }}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-ibm font-semibold text-sm" style={{ color: "#e0f4f4" }}>{c.name}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {c.cats.map(cat => (
                            <span key={cat} className="font-mono-ibm px-1.5 py-0.5 rounded-sm"
                              style={{ backgroundColor: `${getCatColor(cat)}12`, color: getCatColor(cat), fontSize: "9px" }}>
                              {getCatLabel(cat)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      {[
                        { label: "Сделок", value: c.deals, color: "var(--neon-cyan)" },
                        { label: "Ср. скидка", value: `${c.avgDisc}%`, color: "var(--neon-green)" },
                        { label: "Активность", value: c.active, color: "rgba(180,220,220,0.55)" },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <div className="font-orbitron font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
                          <div className="font-mono-ibm" style={{ color: "rgba(180,220,220,0.35)", fontSize: "10px" }}>{s.label}</div>
                        </div>
                      ))}
                      <div className="px-2 py-1 rounded-sm font-orbitron"
                        style={{
                          backgroundColor: c.threat === "high" ? "rgba(255,107,53,0.12)" : c.threat === "medium" ? "rgba(255,215,0,0.08)" : "rgba(0,255,179,0.06)",
                          color: c.threat === "high" ? "var(--neon-orange)" : c.threat === "medium" ? "#ffd700" : "var(--neon-green)",
                          fontSize: "10px",
                        }}>
                        {c.threat === "high" ? "⚠ УГРОЗА" : c.threat === "medium" ? "~ СРЕДНЯЯ" : "✓ НИЗКАЯ"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ПОРТФЕЛЬ ══ */}
        {section === "portfolio" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="font-orbitron font-bold text-2xl mb-1" style={{ color: "#b347ff" }}>ПОРТФЕЛЬ</h1>
              <p className="font-ibm text-sm" style={{ color: "rgba(180,220,220,0.5)" }}>Объёмы и категории закупок</p>
            </div>
            <div className="card-glass rounded-sm p-5" style={{ border: "1px solid rgba(179,71,255,0.2)" }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "ИТОГО СДЕЛОК", value: "57", color: "#b347ff" },
                  { label: "ОБЩИЙ ОБЪЁМ", value: "₽98.4М", color: "var(--neon-green)" },
                  { label: "КУПЛЕНО ТОНН", value: "1 240 т", color: "var(--neon-cyan)" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-mono-ibm mb-1" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{s.label}</div>
                    <div className="font-orbitron font-black text-3xl" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { cat: "coil", deals: 21, vol: 38_400_000, tons: 420, growth: 18.4 },
                { cat: "sheet_galv", deals: 16, vol: 28_600_000, tons: 310, growth: 12.2 },
                { cat: "sheet_cold", deals: 12, vol: 22_100_000, tons: 280, growth: -3.1 },
                { cat: "strip", deals: 8, vol: 9_300_000, tons: 110, growth: 9.7 },
              ].map((p, i) => {
                const col = getCatColor(p.cat);
                return (
                  <div key={p.cat} className="card-glass rounded-sm p-4 animate-fade-in" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                    <div className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm mb-3 inline-flex items-center gap-1"
                      style={{ backgroundColor: `${col}14`, border: `1px solid ${col}44`, color: col, fontSize: "10px" }}>
                      <Icon name={getCatIcon(p.cat) as any} size={10} />
                      {getCatLabel(p.cat)}
                    </div>
                    <div className="space-y-2 mb-3">
                      {[
                        { label: "Сделок", value: String(p.deals) },
                        { label: "Объём", value: fmtRub(p.vol) },
                        { label: "Тонн", value: `${p.tons} т` },
                        { label: "Рост", value: `${p.growth > 0 ? "↑" : "↓"} ${Math.abs(p.growth)}%` },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between">
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{item.label}</span>
                          <span className="font-orbitron font-bold text-xs"
                            style={{ color: item.label === "Рост" ? (p.growth > 0 ? "var(--neon-green)" : "var(--neon-orange)") : col }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${(p.vol / 40_000_000) * 100}%`, backgroundColor: col, boxShadow: `0 0 6px ${col}55` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ ПОДДЕРЖКА ══ */}
        {section === "support" && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="font-orbitron font-bold text-2xl mb-1" style={{ color: "var(--neon-cyan)" }}>ПОДДЕРЖКА</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>Помощь по работе с платформой</p>
            <div className="grid gap-3 mb-6">
              {[
                { icon: "BookOpen", title: "Инструкция по закупкам", desc: "Как участвовать в тендерах 44-ФЗ и 223-ФЗ", color: "var(--neon-cyan)" },
                { icon: "MessageSquare", title: "Чат с менеджером", desc: "Помощь по выбору металла и ценообразованию", color: "var(--neon-green)" },
                { icon: "Phone", title: "Горячая линия", desc: "+7 800 555-88-99 · Пн-Пт 9:00–18:00 МСК", color: "#ffd700" },
              ].map((item, i) => (
                <div key={i} className="card-glass rounded-sm p-4 flex items-center gap-4 cursor-pointer"
                  onClick={() => toast(`«${item.title}» будет доступно после настройки`)}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}12`, border: `1px solid ${item.color}2a` }}>
                    <Icon name={item.icon as any} size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-ibm font-semibold text-sm" style={{ color: "#e0f4f4" }}>{item.title}</div>
                    <div className="font-ibm text-xs mt-0.5" style={{ color: "rgba(180,220,220,0.45)" }}>{item.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} style={{ color: "rgba(180,220,220,0.25)", marginLeft: "auto" }} />
                </div>
              ))}
            </div>
            <div className="card-glass rounded-sm p-5">
              <div className="font-orbitron text-xs font-bold mb-4" style={{ color: "rgba(180,220,220,0.55)" }}>НАПИСАТЬ ЗАПРОС</div>
              <div className="space-y-3">
                <input type="text" placeholder="Тема запроса"
                  className="w-full px-3 py-2.5 rounded-sm font-ibm text-sm outline-none"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "#e0f4f4" }}
                  onFocus={e => e.target.style.borderColor = "var(--neon-cyan)"}
                  onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                <textarea placeholder="Опишите ситуацию..." rows={4}
                  className="w-full px-3 py-2.5 rounded-sm font-ibm text-sm outline-none resize-none"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "#e0f4f4" }}
                  onFocus={e => e.target.style.borderColor = "var(--neon-cyan)"}
                  onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                <button className="btn-neon-solid rounded-sm" onClick={() => toast("Запрос отправлен! Ответим в течение 2 часов")}>
                  ОТПРАВИТЬ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ПРОФИЛЬ ══ */}
        {section === "profile" && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="font-orbitron font-bold text-2xl mb-6" style={{ color: "var(--neon-green)" }}>ПРОФИЛЬ</h1>
            <div className="card-glass rounded-sm p-5 mb-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-sm flex items-center justify-center font-orbitron font-black text-xl"
                  style={{ backgroundColor: "rgba(0,212,255,0.08)", border: "2px solid rgba(0,212,255,0.25)", color: "var(--neon-cyan)" }}>МВ</div>
                <div>
                  <div className="font-ibm font-semibold text-lg" style={{ color: "#e0f4f4" }}>Михаил Власов</div>
                  <div className="font-mono-ibm text-xs mt-0.5" style={{ color: "rgba(0,212,255,0.6)" }}>Руководитель отдела снабжения</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--neon-green)" }} />
                    <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>ТАРИФ PRO · до 01.06.2026</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Компания", value: "ООО «СтальТрейд»" },
                  { label: "ИНН", value: "7712345678" },
                  { label: "Email", value: "supply@stalltrade.ru" },
                  { label: "Телефон", value: "+7 499 123-45-67" },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-sm" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--dark-border)" }}>
                    <div className="font-mono-ibm mb-1" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{item.label}</div>
                    <div className="font-ibm text-sm" style={{ color: "#e0f4f4" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glass rounded-sm p-4">
              <div className="font-orbitron text-xs font-bold mb-3" style={{ color: "rgba(180,220,220,0.55)" }}>ОТСЛЕЖИВАЕМЫЕ КАТЕГОРИИ</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.id !== "all").map(cat => (
                  <div key={cat.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm"
                    style={{ backgroundColor: `${cat.color}0e`, border: `1px solid ${cat.color}2a` }}>
                    <Icon name={cat.icon as any} size={11} style={{ color: cat.color }} />
                    <span className="font-ibm text-xs" style={{ color: cat.color }}>{cat.label}</span>
                    <Icon name="X" size={10} style={{ color: "rgba(180,220,220,0.3)", cursor: "pointer" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex"
        style={{ backgroundColor: "rgba(6,10,15,0.97)", borderTop: "1px solid var(--dark-border)" }}>
        {navItems.slice(0, 5).map(item => (
          <button key={item.key} onClick={() => go(item.key)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 relative"
            style={{ color: section === item.key ? "var(--neon-cyan)" : "rgba(180,220,220,0.35)" }}>
            <Icon name={item.icon as any} size={18} />
            <span className="font-ibm" style={{ fontSize: "9px" }}>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-2 right-3 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: "var(--neon-cyan)", color: "#000", fontSize: "8px" }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
