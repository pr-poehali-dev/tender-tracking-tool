export const OKPD_CODES = [
  { code: "24.45.40", label: "Вольфрам / Молибден / Кобальт", short: "W·Mo·Co" },
  { code: "23.19.14", label: "Твёрдые сплавы (пластины, вставки)", short: "HM-INSERT" },
  { code: "28.41.33", label: "Режущий инструмент из ТС", short: "CUT-TOOL" },
];

export const TENDERS = [
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

export const MY_BIDS = [
  { id: "TN-2024-081234", title: "Пластины VCGT 160404 ВК8", myPrice: 1850000, nmc: 2100000, status: "won", date: "2026-02-15", savings: 11.9 },
  { id: "TN-2024-079876", title: "Фрезы твёрдосплавные D=16мм", myPrice: 3200000, nmc: 3600000, status: "won", date: "2026-02-08", savings: 11.1 },
  { id: "TN-2024-078321", title: "Электроды вольфрамовые ЭВЛ ⌀4мм", myPrice: 980000, nmc: 1050000, status: "lost", date: "2026-01-29", savings: 6.7 },
  { id: "TN-2024-077102", title: "Кобальтовый порошок ПК-1У", myPrice: 5400000, nmc: 5700000, status: "review", date: "2026-02-22", savings: 5.3 },
  { id: "TN-2024-076540", title: "Твёрдосплавные сверла ВК6 L=200", myPrice: 2100000, nmc: 2350000, status: "won", date: "2026-01-20", savings: 10.6 },
];

export const COMPETITORS = [
  { name: "Металлокомплект-М", wins: 47, avgDiscount: 8.2, lastActivity: "сегодня", threat: "high", okpd: ["23.19.14", "28.41.33"] },
  { name: "ВольфрамГрупп", wins: 31, avgDiscount: 12.4, lastActivity: "вчера", threat: "high", okpd: ["24.45.40"] },
  { name: "СплавПром", wins: 23, avgDiscount: 6.8, lastActivity: "3 дня назад", threat: "medium", okpd: ["23.19.14"] },
  { name: "Тулметалл", wins: 19, avgDiscount: 9.1, lastActivity: "5 дней назад", threat: "medium", okpd: ["28.41.33", "23.19.14"] },
  { name: "ИнструментПлюс", wins: 12, avgDiscount: 5.3, lastActivity: "неделю назад", threat: "low", okpd: ["28.41.33"] },
];

export const PORTFOLIO = [
  { category: "Вольфрам/Молибден/Кобальт", code: "24.45.40", volume: 45200000, contracts: 12, growth: 23.4, color: "#00ffb3" },
  { category: "Твёрдые сплавы (пластины)", code: "23.19.14", volume: 78600000, contracts: 28, growth: 18.7, color: "#00d4ff" },
  { category: "Режущий инструмент", code: "28.41.33", volume: 31400000, contracts: 17, growth: -5.2, color: "#ffd700" },
];

export const ANALYTICS_MONTHS = ["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"];
export const ANALYTICS_VOLUMES = [28, 35, 31, 42, 38, 52];

export const fmtRub = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} млн ₽`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} тыс ₽`;
  return `${n} ₽`;
};

export const getDaysLeft = (deadline: string) => {
  const d = new Date(deadline);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export type Section = "tenders" | "monitoring" | "bids" | "analytics" | "competitors" | "support" | "profile" | "portfolio";

export type Tender = typeof TENDERS[0];
