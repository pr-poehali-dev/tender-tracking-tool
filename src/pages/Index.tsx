/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const OKPD_CODES = [
  { code: "24.45.40", label: "Вольфрам / Молибден / Кобальт", short: "W·Mo·Co" },
  { code: "23.19.14", label: "Твёрдые сплавы (пластины, вставки)", short: "HM-INSERT" },
  { code: "28.41.33", label: "Режущий инструмент из ТС", short: "CUT-TOOL" },
];

const TENDERS = [
  {
    id: "TN-2024-089423",
    title: "Пластины твёрдосплавные сменные CNMG 120408",
    customer: "АО «Уралмашзавод»",
    okpd: "23.19.14",
    price: 4850000,
    deadline: "2026-03-07",
    region: "Свердловская обл.",
    urgency: "high",
    competitors: 3,
    aiPrice: 4120000,
    savings: 730000,
    platform: "Росэлторг",
    nmc: 4850000,
  },
  {
    id: "TN-2024-091107",
    title: "Вольфрамовые заготовки для электродов ВА-1А",
    customer: "ПАО «Газпром Трансгаз»",
    okpd: "24.45.40",
    price: 12300000,
    deadline: "2026-03-10",
    region: "ХМАО-Югра",
    urgency: "high",
    competitors: 2,
    aiPrice: 10950000,
    savings: 1350000,
    platform: "ЕИС Закупки",
    nmc: 12300000,
  },
  {
    id: "TN-2024-087654",
    title: "Фрезы концевые из быстрорежущей стали Р6М5",
    customer: "ФГУП «Авангард»",
    okpd: "28.41.33",
    price: 1760000,
    deadline: "2026-03-14",
    region: "Санкт-Петербург",
    urgency: "medium",
    competitors: 5,
    aiPrice: 1540000,
    savings: 220000,
    platform: "Сбербанк-АСТ",
    nmc: 1760000,
  },
  {
    id: "TN-2024-092001",
    title: "Твёрдосплавные пластины для токарной обработки ТТ20К9",
    customer: "ОАО «Тяжпрессмаш»",
    okpd: "23.19.14",
    price: 3100000,
    deadline: "2026-03-18",
    region: "Рязанская обл.",
    urgency: "medium",
    competitors: 4,
    aiPrice: 2760000,
    savings: 340000,
    platform: "Росэлторг",
    nmc: 3100000,
  },
  {
    id: "TN-2024-088912",
    title: "Молибденовые прутки для высокотемпературных печей",
    customer: "АО «Вяртсиля»",
    okpd: "24.45.40",
    price: 8900000,
    deadline: "2026-03-22",
    region: "Карелия",
    urgency: "low",
    competitors: 2,
    aiPrice: 7980000,
    savings: 920000,
    platform: "ЕИС Закупки",
    nmc: 8900000,
  },
  {
    id: "TN-2024-086543",
    title: "Вставки твёрдосплавные для буровых коронок ВК8",
    customer: "ПАО «АЛРОСА»",
    okpd: "23.19.14",
    price: 21500000,
    deadline: "2026-03-25",
    region: "Якутия",
    urgency: "low",
    competitors: 3,
    aiPrice: 19200000,
    savings: 2300000,
    platform: "ЕИС Закупки",
    nmc: 21500000,
  },
];

const MY_BIDS = [
  { id: "TN-2024-081234", title: "Пластины VCGT 160404 ВК8", myPrice: 1850000, nmc: 2100000, status: "won", date: "2026-02-15", savings: 11.9 },
  { id: "TN-2024-079876", title: "Фрезы твёрдосплавные D=16мм", myPrice: 3200000, nmc: 3600000, status: "won", date: "2026-02-08", savings: 11.1 },
  { id: "TN-2024-078321", title: "Электроды вольфрамовые ЭВЛ ⌀4мм", myPrice: 980000, nmc: 1050000, status: "lost", date: "2026-01-29", savings: 6.7 },
  { id: "TN-2024-077102", title: "Кобальтовый порошок ПК-1У", myPrice: 5400000, nmc: 5700000, status: "review", date: "2026-02-22", savings: 5.3 },
  { id: "TN-2024-076540", title: "Твёрдосплавные сверла ВК6 L=200", myPrice: 2100000, nmc: 2350000, status: "won", date: "2026-01-20", savings: 10.6 },
];

const COMPETITORS = [
  { name: "Металлокомплект-М", wins: 47, avgDiscount: 8.2, lastActivity: "сегодня", threat: "high", okpd: ["23.19.14", "28.41.33"] },
  { name: "ВольфрамГрупп", wins: 31, avgDiscount: 12.4, lastActivity: "вчера", threat: "high", okpd: ["24.45.40"] },
  { name: "СплавПром", wins: 23, avgDiscount: 6.8, lastActivity: "3 дня назад", threat: "medium", okpd: ["23.19.14"] },
  { name: "Тулметалл", wins: 19, avgDiscount: 9.1, lastActivity: "5 дней назад", threat: "medium", okpd: ["28.41.33", "23.19.14"] },
  { name: "ИнструментПлюс", wins: 12, avgDiscount: 5.3, lastActivity: "неделю назад", threat: "low", okpd: ["28.41.33"] },
];

const PORTFOLIO = [
  { category: "Вольфрам/Молибден/Кобальт", code: "24.45.40", volume: 45200000, contracts: 12, growth: 23.4, color: "#00ffb3" },
  { category: "Твёрдые сплавы (пластины)", code: "23.19.14", volume: 78600000, contracts: 28, growth: 18.7, color: "#00d4ff" },
  { category: "Режущий инструмент", code: "28.41.33", volume: 31400000, contracts: 17, growth: -5.2, color: "#ffd700" },
];

const ANALYTICS_MONTHS = ["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"];
const ANALYTICS_VOLUMES = [28, 35, 31, 42, 38, 52];

const fmtRub = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} млн ₽`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} тыс ₽`;
  return `${n} ₽`;
};

const getDaysLeft = (deadline: string) => {
  const d = new Date(deadline);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

type Section = "tenders" | "monitoring" | "bids" | "analytics" | "competitors" | "support" | "profile" | "portfolio";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("tenders");
  const [selectedTender, setSelectedTender] = useState<typeof TENDERS[0] | null>(null);
  const [filterOkpd, setFilterOkpd] = useState<string>("all");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredTenders = TENDERS.filter(t => {
    if (filterOkpd !== "all" && t.okpd !== filterOkpd) return false;
    if (filterUrgency !== "all" && t.urgency !== filterUrgency) return false;
    return true;
  });

  const navItems: { key: Section; label: string; icon: string; badge?: number }[] = [
    { key: "tenders", label: "Тендеры", icon: "FileText", badge: 6 },
    { key: "monitoring", label: "Мониторинг", icon: "Activity" },
    { key: "bids", label: "Мои ставки", icon: "Target", badge: 1 },
    { key: "analytics", label: "Аналитика", icon: "BarChart2" },
    { key: "competitors", label: "Конкуренты", icon: "Users" },
    { key: "portfolio", label: "Портфель", icon: "Briefcase" },
    { key: "support", label: "Поддержка", icon: "MessageSquare" },
    { key: "profile", label: "Профиль", icon: "User" },
  ];

  const goTo = (s: Section) => { setActiveSection(s); setSelectedTender(null); setBidAmount(""); };

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: "var(--dark-bg)", color: "#e0f4f4" }}>
      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="scan-line absolute w-full h-32 opacity-20" />
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in card-glass neon-border px-5 py-3 text-sm font-ibm"
          style={{ color: "var(--neon-green)" }}>
          ⬡ {notification}
        </div>
      )}

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-40 h-7 flex items-center overflow-hidden"
        style={{ backgroundColor: "rgba(0,255,179,0.06)", borderBottom: "1px solid rgba(0,255,179,0.12)" }}>
        <div className="ticker-wrap flex-1">
          <div className="ticker-content font-mono-ibm text-xs" style={{ color: "rgba(0,255,179,0.7)" }}>
            &nbsp;&nbsp;&nbsp;⬡ ТН-2024-089423 · CNMG 120408 · НМЦ 4 850 000 ₽ · СРОК: 7 МАР&nbsp;&nbsp;&nbsp;
            ⬡ ТН-2024-091107 · ВОЛЬФРАМ ВА-1А · НМЦ 12 300 000 ₽ · СРОК: 10 МАР&nbsp;&nbsp;&nbsp;
            ⬡ ТН-2024-087654 · ФРЕЗЫ Р6М5 · НМЦ 1 760 000 ₽ · СРОК: 14 МАР&nbsp;&nbsp;&nbsp;
            ⬡ AI-РЕКОМЕНДАЦИЯ: СНИЗИТЬ НА 12% → ШАНС ПОБЕДЫ +67%&nbsp;&nbsp;&nbsp;
            ⬡ КОНКУРЕНТ МЕТАЛЛОКОМПЛЕКТ-М АКТИВЕН СЕГОДНЯ&nbsp;&nbsp;&nbsp;
            ⬡ НОВЫЕ ЗАКУПКИ: +3 ЗА ПОСЛЕДНИЕ 2 ЧАСА
          </div>
        </div>
        <div className="px-3 font-mono-ibm text-xs shrink-0" style={{ color: "var(--neon-cyan)" }}>
          {time.toLocaleTimeString("ru-RU")}
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-7 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 h-14"
        style={{ backgroundColor: "rgba(6,10,15,0.96)", borderBottom: "1px solid var(--dark-border)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center"
            style={{ border: "2px solid var(--neon-green)", boxShadow: "0 0 12px rgba(0,255,179,0.3)" }}>
            <span className="font-orbitron font-black text-xs" style={{ color: "var(--neon-green)" }}>TA</span>
          </div>
          <div>
            <div className="font-orbitron font-bold text-sm tracking-widest" style={{ color: "var(--neon-green)" }}>
              TENDER<span style={{ color: "var(--neon-cyan)" }}>ALLOY</span>
            </div>
            <div className="font-mono-ibm text-xs hidden md:block" style={{ color: "rgba(0,255,179,0.4)" }}>
              СПЕЦСПЛАВЫ · ТЕНДЕР-ТРЕКЕР v2.4
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map(item => (
            <button key={item.key} onClick={() => goTo(item.key)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-ibm font-medium transition-all duration-200 rounded-sm"
              style={{
                color: activeSection === item.key ? "var(--neon-green)" : "rgba(180,220,220,0.55)",
                backgroundColor: activeSection === item.key ? "rgba(0,255,179,0.08)" : "transparent",
                border: activeSection === item.key ? "1px solid rgba(0,255,179,0.22)" : "1px solid transparent",
              }}>
              <Icon name={item.icon as any} size={12} />
              {item.label}
              {item.badge && (
                <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: "var(--neon-orange)", color: "#000", fontSize: "9px" }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-sm"
            style={{ backgroundColor: "rgba(0,255,179,0.06)", border: "1px solid rgba(0,255,179,0.18)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--neon-green)", animation: "pulse-neon 2s infinite" }} />
            <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>ONLINE</span>
          </div>
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-orbitron font-bold text-xs"
            style={{ backgroundColor: "rgba(0,212,255,0.12)", color: "var(--neon-cyan)", border: "1px solid rgba(0,212,255,0.25)" }}>
            АК
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-28 px-4 md:px-8 pb-24 md:pb-10 max-w-7xl mx-auto relative z-10">

        {/* ======= ТЕНДЕРЫ ======= */}
        {activeSection === "tenders" && !selectedTender && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="font-orbitron font-bold text-2xl tracking-wide" style={{ color: "var(--neon-green)" }}>
                  АКТИВНЫЕ ТЕНДЕРЫ
                </h1>
                <p className="font-ibm text-sm mt-1" style={{ color: "rgba(180,220,220,0.5)" }}>
                  {filteredTenders.length} закупок найдено · обновлено {time.toLocaleTimeString("ru-RU")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={filterOkpd} onChange={e => setFilterOkpd(e.target.value)}
                  className="font-mono-ibm text-xs px-3 py-2 rounded-sm outline-none"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "var(--neon-cyan)" }}>
                  <option value="all">Все ОКПД2</option>
                  {OKPD_CODES.map(o => <option key={o.code} value={o.code}>{o.code} — {o.short}</option>)}
                </select>
                <select value={filterUrgency} onChange={e => setFilterUrgency(e.target.value)}
                  className="font-mono-ibm text-xs px-3 py-2 rounded-sm outline-none"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "var(--neon-cyan)" }}>
                  <option value="all">Все сроки</option>
                  <option value="high">Срочные ≤7 дней</option>
                  <option value="medium">8–14 дней</option>
                  <option value="low">15+ дней</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTenders.map((tender, i) => {
                const days = getDaysLeft(tender.deadline);
                const pct = (((tender.price - tender.aiPrice) / tender.price) * 100).toFixed(1);
                return (
                  <div key={tender.id}
                    className="card-glass rounded-sm p-4 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                    onClick={() => setSelectedTender(tender)}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="tag-okpd">{tender.okpd}</span>
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)" }}>#{tender.id}</span>
                          <span className="ai-badge rounded-sm">AI</span>
                        </div>
                        <h3 className="font-ibm font-semibold text-sm mb-1.5" style={{ color: "#e0f4f4" }}>{tender.title}</h3>
                        <div className="flex flex-wrap gap-3 text-xs font-ibm" style={{ color: "rgba(180,220,220,0.45)" }}>
                          <span className="flex items-center gap-1"><Icon name="Building2" size={11} />{tender.customer}</span>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />{tender.region}</span>
                          <span className="flex items-center gap-1"><Icon name="Globe" size={11} />{tender.platform}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2 shrink-0">
                        <div className="flex items-start gap-4">
                          <div className="text-right">
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>НМЦ</div>
                            <div className="font-orbitron font-bold text-sm" style={{ color: "#e0f4f4" }}>{fmtRub(tender.price)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono-ibm text-xs" style={{ color: "rgba(179,71,255,0.8)" }}>AI ЦЕНА</div>
                            <div className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-green)" }}>{fmtRub(tender.aiPrice)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono-ibm text-xs font-bold ${tender.urgency === "high" ? "urgency-high" : tender.urgency === "medium" ? "urgency-medium" : "urgency-low"}`}>
                            {days <= 0 ? "ИСТЁК" : `${days} ДН`}
                          </span>
                          <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                            style={{ backgroundColor: "rgba(0,255,179,0.08)", color: "var(--neon-green)", border: "1px solid rgba(0,255,179,0.2)" }}>
                            -{pct}%
                          </span>
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>
                            {tender.competitors} конк.
                          </span>
                        </div>
                        <button className="btn-neon rounded-sm"
                          onClick={e => { e.stopPropagation(); setSelectedTender(tender); }}>
                          УЧАСТВОВАТЬ →
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 h-px overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                      <div className="progress-bar-neon h-0.5"
                        style={{ width: `${Math.max(5, Math.min(100, (days / 30) * 100))}%` }} />
                    </div>
                  </div>
                );
              })}
              {filteredTenders.length === 0 && (
                <div className="text-center py-16 font-mono-ibm text-sm" style={{ color: "rgba(180,220,220,0.3)" }}>
                  — Тендеры не найдены по заданным фильтрам —
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======= ДЕТАЛИ ТЕНДЕРА ======= */}
        {activeSection === "tenders" && selectedTender && (
          <div className="animate-fade-in">
            <button className="flex items-center gap-2 font-mono-ibm text-xs mb-6 transition-opacity hover:opacity-60"
              style={{ color: "var(--neon-cyan)" }}
              onClick={() => setSelectedTender(null)}>
              <Icon name="ArrowLeft" size={14} /> НАЗАД
            </button>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="card-glass rounded-sm p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="tag-okpd">{selectedTender.okpd}</span>
                    <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)" }}>#{selectedTender.id}</span>
                    <span className="ai-badge rounded-sm">AI-АНАЛИЗ АКТИВЕН</span>
                  </div>
                  <h2 className="font-ibm font-semibold text-lg mb-4" style={{ color: "#e0f4f4" }}>{selectedTender.title}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Заказчик", value: selectedTender.customer, icon: "Building2" },
                      { label: "Регион", value: selectedTender.region, icon: "MapPin" },
                      { label: "Площадка", value: selectedTender.platform, icon: "Globe" },
                      { label: "Срок подачи", value: new Date(selectedTender.deadline).toLocaleDateString("ru-RU"), icon: "Calendar" },
                      { label: "Конкурентов", value: `${selectedTender.competitors} участника`, icon: "Users" },
                      { label: "ОКПД2", value: selectedTender.okpd, icon: "Tag" },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-sm"
                        style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--dark-border)" }}>
                        <div className="flex items-center gap-1 mb-1">
                          <Icon name={item.icon as any} size={11} style={{ color: "rgba(0,212,255,0.5)" }} />
                          <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>{item.label}</span>
                        </div>
                        <div className="font-ibm text-sm" style={{ color: "#e0f4f4" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Block */}
                <div className="rounded-sm p-5"
                  style={{ backgroundColor: "rgba(179,71,255,0.05)", border: "1px solid rgba(179,71,255,0.28)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Cpu" size={16} style={{ color: "#b347ff" }} />
                    <span className="font-orbitron text-sm font-bold" style={{ color: "#b347ff" }}>AI РЕКОМЕНДАЦИЯ</span>
                    <span className="font-mono-ibm text-xs px-2 py-0.5 rounded-sm"
                      style={{ backgroundColor: "rgba(179,71,255,0.18)", color: "#b347ff" }}>95% точность</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "НМЦ", value: fmtRub(selectedTender.nmc), color: "#e0f4f4" },
                      { label: "AI ЦЕНА", value: fmtRub(selectedTender.aiPrice), color: "var(--neon-green)", highlight: true },
                      { label: "ЭКОНОМИЯ", value: fmtRub(selectedTender.savings), color: "var(--neon-cyan)" },
                    ].map(c => (
                      <div key={c.label} className="text-center p-3 rounded-sm"
                        style={{ backgroundColor: c.highlight ? "rgba(0,255,179,0.05)" : "rgba(0,0,0,0.25)", border: c.highlight ? "1px solid rgba(0,255,179,0.18)" : "none" }}>
                        <div className="font-mono-ibm text-xs mb-1" style={{ color: c.highlight ? "var(--neon-green)" : "rgba(180,220,220,0.4)" }}>{c.label}</div>
                        <div className="font-orbitron font-bold text-sm" style={{ color: c.color }}>{c.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="font-ibm text-xs p-3 rounded-sm"
                    style={{ backgroundColor: "rgba(179,71,255,0.07)", color: "rgba(220,200,255,0.8)", lineHeight: 1.7 }}>
                    📊 По данным <strong>847</strong> аналогичных закупок за 12 мес. оптимальная ставка —{" "}
                    <strong style={{ color: "#b347ff" }}>{fmtRub(selectedTender.aiPrice)}</strong>{" "}
                    ({(((selectedTender.price - selectedTender.aiPrice) / selectedTender.price) * 100).toFixed(1)}% ниже НМЦ).
                    Конкуренты давали скидку 6–15%. Вероятность победы:{" "}
                    <strong style={{ color: "var(--neon-green)" }}>72%</strong>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div className="card-glass rounded-sm p-5">
                  <div className="font-orbitron font-bold text-sm mb-4" style={{ color: "var(--neon-cyan)" }}>ПОДАТЬ СТАВКУ</div>
                  <div className="space-y-3">
                    <div>
                      <label className="font-mono-ibm text-xs block mb-1.5" style={{ color: "rgba(180,220,220,0.4)" }}>
                        ВАША ЦЕНА (₽)
                      </label>
                      <input type="number" value={bidAmount}
                        onChange={e => setBidAmount(e.target.value)}
                        placeholder={String(selectedTender.aiPrice)}
                        className="w-full px-3 py-2.5 rounded-sm font-mono-ibm text-sm outline-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "var(--neon-green)" }}
                        onFocus={e => e.target.style.borderColor = "var(--neon-green)"}
                        onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                    </div>
                    {bidAmount && Number(bidAmount) > 0 && (
                      <div className="p-3 rounded-sm text-xs font-ibm"
                        style={{ backgroundColor: "rgba(0,255,179,0.04)", border: "1px solid rgba(0,255,179,0.15)" }}>
                        <div className="flex justify-between mb-1.5">
                          <span style={{ color: "rgba(180,220,220,0.5)" }}>Скидка от НМЦ:</span>
                          <span style={{ color: "var(--neon-green)" }}>
                            -{(((selectedTender.price - Number(bidAmount)) / selectedTender.price) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "rgba(180,220,220,0.5)" }}>Vs AI цена:</span>
                          <span style={{ color: Number(bidAmount) <= selectedTender.aiPrice ? "var(--neon-green)" : "#ffd700" }}>
                            {Number(bidAmount) <= selectedTender.aiPrice ? "✓ ОПТИМАЛЬНО" : "⚠ ВЫШЕ AI"}
                          </span>
                        </div>
                      </div>
                    )}
                    <button className="btn-neon-solid w-full rounded-sm"
                      onClick={() => {
                        if (!bidAmount) {
                          setBidAmount(String(selectedTender.aiPrice));
                          showNotif(`AI цена применена: ${fmtRub(selectedTender.aiPrice)}`);
                        } else {
                          showNotif(`Ставка ${fmtRub(Number(bidAmount))} отправлена на ${selectedTender.platform}`);
                        }
                      }}>
                      {bidAmount ? "ПОДАТЬ СТАВКУ" : "ПРИМЕНИТЬ AI ЦЕНУ"}
                    </button>
                    <button className="btn-neon w-full rounded-sm"
                      onClick={() => showNotif("Тендер добавлен в отслеживание")}>
                      + В ОТСЛЕЖИВАНИЕ
                    </button>
                  </div>
                </div>

                <div className="card-glass rounded-sm p-5 text-center">
                  <div className="font-mono-ibm text-xs mb-2" style={{ color: "rgba(180,220,220,0.4)" }}>ОСТАЛОСЬ ДНЕЙ</div>
                  <div className="font-orbitron font-black text-5xl"
                    style={{ color: getDaysLeft(selectedTender.deadline) <= 3 ? "var(--neon-orange)" : "var(--neon-green)" }}>
                    {getDaysLeft(selectedTender.deadline)}
                  </div>
                  <div className="font-mono-ibm text-xs mt-2" style={{ color: "rgba(180,220,220,0.35)" }}>
                    до {new Date(selectedTender.deadline).toLocaleDateString("ru-RU")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======= МОНИТОРИНГ ======= */}
        {activeSection === "monitoring" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-orbitron font-bold text-2xl tracking-wide" style={{ color: "var(--neon-cyan)" }}>МОНИТОРИНГ</h1>
                <p className="font-ibm text-sm mt-1" style={{ color: "rgba(180,220,220,0.5)" }}>Потоки закупок в реальном времени</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-sm"
                style={{ backgroundColor: "rgba(0,255,179,0.06)", border: "1px solid rgba(0,255,179,0.18)" }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--neon-green)", animation: "pulse-neon 1s infinite" }} />
                <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>LIVE · AUTO</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {OKPD_CODES.map((okpd, i) => (
                <div key={okpd.code} className="card-glass rounded-sm p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-okpd">{okpd.code}</span>
                    <div className="w-2 h-2 rounded-full status-pulse" style={{ backgroundColor: "var(--neon-green)" }} />
                  </div>
                  <div className="font-ibm text-xs mb-4" style={{ color: "rgba(180,220,220,0.55)" }}>{okpd.label}</div>
                  <div className="space-y-2">
                    {[
                      { label: "Новых сегодня", value: [3, 2, 4][i], color: "var(--neon-green)" },
                      { label: "За неделю", value: [18, 24, 31][i], color: "var(--neon-cyan)" },
                      { label: "Средняя НМЦ", value: [fmtRub(8_500_000), fmtRub(4_200_000), fmtRub(2_800_000)][i], color: "#ffd700" },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center">
                        <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>{stat.label}</span>
                        <span className="font-orbitron font-bold text-sm" style={{ color: stat.color }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-neon w-full rounded-sm mt-4 text-xs"
                    onClick={() => { setFilterOkpd(okpd.code); goTo("tenders"); }}>
                    СМОТРЕТЬ →
                  </button>
                </div>
              ))}
            </div>

            <div className="card-glass rounded-sm p-5">
              <div className="font-orbitron text-xs font-bold mb-4" style={{ color: "rgba(180,220,220,0.6)" }}>ЛЕНТА НОВЫХ ЗАКУПОК</div>
              <div className="space-y-1.5">
                {[
                  { time: "14:32", id: "ТН-094512", title: "Резцы токарные ВК8 MCLNR 2525M12", price: 890000, okpd: "28.41.33", isNew: true },
                  { time: "13:17", id: "ТН-094389", title: "Пластины TNMG 160404 твёрдый сплав", price: 2340000, okpd: "23.19.14", isNew: true },
                  { time: "12:50", id: "ТН-094201", title: "Кобальтовые аноды для гальваники", price: 4700000, okpd: "24.45.40", isNew: false },
                  { time: "11:33", id: "ТН-093987", title: "Сверла ВК6 набор 42 позиции", price: 1200000, okpd: "28.41.33", isNew: false },
                  { time: "10:15", id: "ТН-093654", title: "Заготовки молибденовые ⌀80мм", price: 3500000, okpd: "24.45.40", isNew: false },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2.5 rounded-sm cursor-pointer"
                    style={{ backgroundColor: item.isNew ? "rgba(0,255,179,0.04)" : "transparent", border: `1px solid ${item.isNew ? "rgba(0,255,179,0.12)" : "transparent"}` }}
                    onClick={() => goTo("tenders")}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-ibm text-xs shrink-0" style={{ color: "rgba(180,220,220,0.3)" }}>{item.time}</span>
                      {item.isNew && <span className="font-orbitron shrink-0 px-1.5 py-0.5 rounded-sm"
                        style={{ backgroundColor: "var(--neon-green)", color: "var(--dark-bg)", fontSize: "9px" }}>NEW</span>}
                      <span className="tag-okpd shrink-0">{item.okpd}</span>
                      <span className="font-ibm text-xs truncate" style={{ color: "#e0f4f4" }}>{item.title}</span>
                    </div>
                    <span className="font-orbitron font-bold text-xs shrink-0" style={{ color: "var(--neon-cyan)" }}>{fmtRub(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======= МОИ СТАВКИ ======= */}
        {activeSection === "bids" && (
          <div className="animate-fade-in">
            <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-1" style={{ color: "var(--neon-green)" }}>МОИ СТАВКИ</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>История участия и текущие заявки</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Победы", value: "3", icon: "Trophy", color: "var(--neon-green)" },
                { label: "На рассмотрении", value: "1", icon: "Clock", color: "#ffd700" },
                { label: "Проигрыши", value: "1", icon: "X", color: "var(--neon-orange)" },
                { label: "Ср. скидка", value: "11.2%", icon: "TrendingDown", color: "var(--neon-cyan)" },
              ].map((s, i) => (
                <div key={i} className="card-glass rounded-sm p-4 text-center">
                  <Icon name={s.icon as any} size={20} style={{ color: s.color, margin: "0 auto 8px" }} />
                  <div className="font-orbitron font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="font-mono-ibm text-xs mt-1" style={{ color: "rgba(180,220,220,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {MY_BIDS.map((bid, i) => (
                <div key={bid.id} className="card-glass rounded-sm p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)" }}>#{bid.id}</span>
                        <span className="font-orbitron text-xs px-2 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: bid.status === "won" ? "rgba(0,255,179,0.12)" : bid.status === "lost" ? "rgba(255,107,53,0.12)" : "rgba(255,215,0,0.12)",
                            color: bid.status === "won" ? "var(--neon-green)" : bid.status === "lost" ? "var(--neon-orange)" : "#ffd700",
                            fontSize: "10px",
                          }}>
                          {bid.status === "won" ? "✓ ПОБЕДА" : bid.status === "lost" ? "✗ ПРОИГРЫШ" : "⌛ НА РАССМОТРЕНИИ"}
                        </span>
                      </div>
                      <div className="font-ibm font-medium text-sm" style={{ color: "#e0f4f4" }}>{bid.title}</div>
                      <div className="font-mono-ibm text-xs mt-1" style={{ color: "rgba(180,220,220,0.3)" }}>{bid.date}</div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      {[
                        { label: "МОЯ СТАВКА", value: fmtRub(bid.myPrice), color: "var(--neon-green)" },
                        { label: "НМЦ", value: fmtRub(bid.nmc), color: "rgba(180,220,220,0.6)" },
                        { label: "СКИДКА", value: `-${bid.savings}%`, color: "var(--neon-cyan)" },
                      ].map(c => (
                        <div key={c.label} className="text-right">
                          <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)", fontSize: "10px" }}>{c.label}</div>
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

        {/* ======= АНАЛИТИКА ======= */}
        {activeSection === "analytics" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-1" style={{ color: "var(--neon-cyan)" }}>АНАЛИТИКА</h1>
              <p className="font-ibm text-sm" style={{ color: "rgba(180,220,220,0.5)" }}>Рынок спецсплавов · тренды и прогнозы</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Объём рынка (год)", value: "₽4.2 млрд", change: "+18%", icon: "DollarSign", color: "var(--neon-green)" },
                { label: "Ср. скидка победит.", value: "9.8%", change: "+1.2%", icon: "Percent", color: "var(--neon-cyan)" },
                { label: "Конкурентов всего", value: "247", change: "+34", icon: "Users", color: "#ffd700" },
                { label: "Наша доля рынка", value: "2.3%", change: "+0.4%", icon: "PieChart", color: "#b347ff" },
              ].map((kpi, i) => (
                <div key={i} className="card-glass rounded-sm p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name={kpi.icon as any} size={13} style={{ color: kpi.color }} />
                    <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{kpi.label}</span>
                  </div>
                  <div className="font-orbitron font-black text-xl" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="font-mono-ibm text-xs mt-1" style={{ color: "var(--neon-green)" }}>↑ {kpi.change}</div>
                </div>
              ))}
            </div>

            <div className="card-glass rounded-sm p-5">
              <div className="font-orbitron text-xs font-bold mb-5" style={{ color: "rgba(180,220,220,0.6)" }}>
                ОБЪЁМ ЗАКУПОК ПО МЕСЯЦАМ (МЛН ₽)
              </div>
              <div className="flex items-end justify-between gap-2 h-36">
                {ANALYTICS_MONTHS.map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="font-orbitron text-xs" style={{ color: "var(--neon-cyan)", fontSize: "10px" }}>
                      {ANALYTICS_VOLUMES[i]}
                    </div>
                    <div className="chart-bar w-full"
                      style={{ height: `${(ANALYTICS_VOLUMES[i] / 55) * 100}%`, minHeight: "8px" }} />
                    <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{month}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {OKPD_CODES.map((okpd, i) => {
                const pcts = [29, 50, 21];
                return (
                  <div key={okpd.code} className="card-glass rounded-sm p-4">
                    <span className="tag-okpd mb-3 inline-block">{okpd.code}</span>
                    <div className="font-ibm text-xs mb-3" style={{ color: "rgba(180,220,220,0.55)" }}>{okpd.label}</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>Доля рынка</span>
                      <span className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-green)" }}>{pcts[i]}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                      <div className="progress-bar-neon h-full" style={{ width: `${pcts[i]}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======= КОНКУРЕНТЫ ======= */}
        {activeSection === "competitors" && (
          <div className="animate-fade-in">
            <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-1" style={{ color: "var(--neon-orange)" }}>КОНКУРЕНТЫ</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>Активность участников рынка спецсплавов</p>
            <div className="space-y-3">
              {COMPETITORS.map((comp, i) => (
                <div key={comp.name} className="card-glass rounded-sm p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center font-orbitron font-black text-sm"
                        style={{
                          backgroundColor: comp.threat === "high" ? "rgba(255,107,53,0.12)" : comp.threat === "medium" ? "rgba(255,215,0,0.12)" : "rgba(0,255,179,0.08)",
                          color: comp.threat === "high" ? "var(--neon-orange)" : comp.threat === "medium" ? "#ffd700" : "var(--neon-green)",
                          border: `1px solid ${comp.threat === "high" ? "rgba(255,107,53,0.25)" : comp.threat === "medium" ? "rgba(255,215,0,0.25)" : "rgba(0,255,179,0.18)"}`,
                        }}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-ibm font-semibold text-sm" style={{ color: "#e0f4f4" }}>{comp.name}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {comp.okpd.map(code => <span key={code} className="tag-okpd">{code}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      {[
                        { label: "Победы", value: comp.wins, color: "var(--neon-cyan)" },
                        { label: "Ср. скидка", value: `${comp.avgDiscount}%`, color: "var(--neon-green)" },
                        { label: "Активность", value: comp.lastActivity, color: "rgba(180,220,220,0.55)" },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <div className="font-orbitron font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
                          <div className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.35)", fontSize: "10px" }}>{s.label}</div>
                        </div>
                      ))}
                      <div className="px-2 py-1 rounded-sm font-orbitron text-xs"
                        style={{
                          backgroundColor: comp.threat === "high" ? "rgba(255,107,53,0.12)" : comp.threat === "medium" ? "rgba(255,215,0,0.08)" : "rgba(0,255,179,0.06)",
                          color: comp.threat === "high" ? "var(--neon-orange)" : comp.threat === "medium" ? "#ffd700" : "var(--neon-green)",
                          fontSize: "10px",
                        }}>
                        {comp.threat === "high" ? "⚠ УГРОЗА" : comp.threat === "medium" ? "~ СРЕДНЯЯ" : "✓ НИЗКАЯ"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======= ПОРТФЕЛЬ ======= */}
        {activeSection === "portfolio" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-1" style={{ color: "#b347ff" }}>ПОРТФЕЛЬ</h1>
              <p className="font-ibm text-sm" style={{ color: "rgba(180,220,220,0.5)" }}>Объёмы и результаты по категориям</p>
            </div>
            <div className="card-glass rounded-sm p-5" style={{ border: "1px solid rgba(179,71,255,0.2)" }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "ИТОГО КОНТРАКТОВ", value: "57", color: "#b347ff" },
                  { label: "ОБЩИЙ ОБЪЁМ", value: "₽155.2М", color: "var(--neon-green)" },
                  { label: "СРЕДНИЙ РОСТ", value: "+12.3%", color: "var(--neon-cyan)" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-mono-ibm text-xs mb-2" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{s.label}</div>
                    <div className="font-orbitron font-black text-3xl" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {PORTFOLIO.map((p, i) => (
                <div key={p.code} className="card-glass rounded-sm p-5 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                  <span className="tag-okpd mb-2 inline-block">{p.code}</span>
                  <div className="font-ibm text-sm font-medium mb-4" style={{ color: "#e0f4f4" }}>{p.category}</div>
                  <div className="space-y-2.5 mb-3">
                    {[
                      { label: "Объём", value: fmtRub(p.volume) },
                      { label: "Контрактов", value: String(p.contracts) },
                      { label: "Рост", value: `${p.growth > 0 ? "↑" : "↓"} ${Math.abs(p.growth)}%` },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between">
                        <span className="font-mono-ibm text-xs" style={{ color: "rgba(180,220,220,0.4)" }}>{item.label}</span>
                        <span className="font-orbitron font-bold text-sm"
                          style={{ color: item.label === "Рост" ? (p.growth > 0 ? "var(--neon-green)" : "var(--neon-orange)") : p.color }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--dark-border)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${(p.volume / 80_000_000) * 100}%`, backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}55` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======= ПОДДЕРЖКА ======= */}
        {activeSection === "support" && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-1" style={{ color: "var(--neon-cyan)" }}>ПОДДЕРЖКА</h1>
            <p className="font-ibm text-sm mb-6" style={{ color: "rgba(180,220,220,0.5)" }}>Помощь по платформе и тендерным вопросам</p>
            <div className="grid gap-3 mb-6">
              {[
                { icon: "BookOpen", title: "База знаний", desc: "Инструкции по участию в тендерах, работе с ЭТП", color: "var(--neon-cyan)" },
                { icon: "MessageSquare", title: "Чат с экспертом", desc: "Консультация по ОКПД2 и ценообразованию", color: "var(--neon-green)" },
                { icon: "Phone", title: "Горячая линия", desc: "+7 800 555-01-02 · Пн-Пт 9:00–18:00 МСК", color: "#ffd700" },
              ].map((item, i) => (
                <div key={i} className="card-glass rounded-sm p-4 flex items-center gap-4 cursor-pointer"
                  onClick={() => showNotif(`Раздел "${item.title}" откроется после настройки`)}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}14`, border: `1px solid ${item.color}30` }}>
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
                <input type="text" placeholder="Тема вопроса"
                  className="w-full px-3 py-2.5 rounded-sm font-ibm text-sm outline-none"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "#e0f4f4" }}
                  onFocus={e => e.target.style.borderColor = "var(--neon-cyan)"}
                  onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                <textarea placeholder="Опишите вашу ситуацию..." rows={4}
                  className="w-full px-3 py-2.5 rounded-sm font-ibm text-sm outline-none resize-none"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid var(--dark-border)", color: "#e0f4f4" }}
                  onFocus={e => e.target.style.borderColor = "var(--neon-cyan)"}
                  onBlur={e => e.target.style.borderColor = "var(--dark-border)"} />
                <button className="btn-neon-solid rounded-sm"
                  onClick={() => showNotif("Запрос отправлен! Ответим в течение 2 часов")}>
                  ОТПРАВИТЬ ЗАПРОС
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======= ПРОФИЛЬ ======= */}
        {activeSection === "profile" && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="font-orbitron font-bold text-2xl tracking-wide mb-6" style={{ color: "var(--neon-green)" }}>ПРОФИЛЬ</h1>
            <div className="card-glass rounded-sm p-5 mb-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-sm flex items-center justify-center font-orbitron font-black text-xl"
                  style={{ backgroundColor: "rgba(0,255,179,0.08)", border: "2px solid rgba(0,255,179,0.25)", color: "var(--neon-green)" }}>
                  АК
                </div>
                <div>
                  <div className="font-ibm font-semibold text-lg" style={{ color: "#e0f4f4" }}>Алексей Кузнецов</div>
                  <div className="font-mono-ibm text-xs mt-0.5" style={{ color: "rgba(0,212,255,0.6)" }}>Руководитель тендерного отдела</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--neon-green)" }} />
                    <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>ТАРИФ PRO · до 01.06.2026</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Компания", value: "ООО «СплавТрейд»" },
                  { label: "ИНН", value: "7704123456" },
                  { label: "Email", value: "tender@splavtrade.ru" },
                  { label: "Телефон", value: "+7 495 123-45-67" },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-sm"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--dark-border)" }}>
                    <div className="font-mono-ibm text-xs mb-1" style={{ color: "rgba(180,220,220,0.4)", fontSize: "10px" }}>{item.label}</div>
                    <div className="font-ibm text-sm" style={{ color: "#e0f4f4" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glass rounded-sm p-4">
              <div className="font-orbitron text-xs font-bold mb-3" style={{ color: "rgba(180,220,220,0.55)" }}>ОТСЛЕЖИВАЕМЫЕ КОДЫ ОКПД2</div>
              <div className="flex flex-wrap gap-2">
                {OKPD_CODES.map(o => (
                  <div key={o.code} className="flex items-center gap-2 px-3 py-2 rounded-sm"
                    style={{ backgroundColor: "rgba(0,255,179,0.05)", border: "1px solid rgba(0,255,179,0.18)" }}>
                    <span className="font-mono-ibm text-xs" style={{ color: "var(--neon-green)" }}>{o.code}</span>
                    <span className="font-ibm text-xs" style={{ color: "rgba(180,220,220,0.55)" }}>{o.short}</span>
                    <Icon name="X" size={11} style={{ color: "rgba(180,220,220,0.3)", cursor: "pointer" }} />
                  </div>
                ))}
                <button className="px-3 py-2 rounded-sm font-mono-ibm text-xs"
                  style={{ backgroundColor: "transparent", border: "1px dashed var(--dark-border)", color: "rgba(180,220,220,0.35)" }}
                  onClick={() => showNotif("Добавление ОКПД2 будет настроено")}>
                  + ДОБАВИТЬ
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex"
        style={{ backgroundColor: "rgba(6,10,15,0.97)", borderTop: "1px solid var(--dark-border)" }}>
        {navItems.slice(0, 5).map(item => (
          <button key={item.key} onClick={() => goTo(item.key)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 relative"
            style={{ color: activeSection === item.key ? "var(--neon-green)" : "rgba(180,220,220,0.35)" }}>
            <Icon name={item.icon as any} size={18} />
            <span className="font-ibm" style={{ fontSize: "9px" }}>{item.label}</span>
            {item.badge && (
              <span className="absolute top-2 right-3 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: "var(--neon-orange)", color: "#000", fontSize: "8px" }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}