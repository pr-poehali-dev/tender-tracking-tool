/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";
import { TENDERS, MY_BIDS, OKPD_CODES, fmtRub, getDaysLeft, Tender, Section } from "./data";

interface SectionTendersProps {
  activeSection: Section;
  selectedTender: Tender | null;
  filterOkpd: string;
  filterUrgency: string;
  bidAmount: string;
  time: Date;
  setSelectedTender: (t: Tender | null) => void;
  setFilterOkpd: (v: string) => void;
  setFilterUrgency: (v: string) => void;
  setBidAmount: (v: string) => void;
  showNotif: (msg: string) => void;
  goTo: (s: Section) => void;
}

export default function SectionTenders({
  activeSection,
  selectedTender,
  filterOkpd,
  filterUrgency,
  bidAmount,
  time,
  setSelectedTender,
  setFilterOkpd,
  setFilterUrgency,
  setBidAmount,
  showNotif,
  goTo,
}: SectionTendersProps) {
  const filteredTenders = TENDERS.filter(t => {
    if (filterOkpd !== "all" && t.okpd !== filterOkpd) return false;
    if (filterUrgency !== "all" && t.urgency !== filterUrgency) return false;
    return true;
  });

  return (
    <>
      {/* ======= ТЕНДЕРЫ: СПИСОК ======= */}
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

      {/* ======= ТЕНДЕРЫ: ДЕТАЛИ ======= */}
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

            {/* Right col */}
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
    </>
  );
}
