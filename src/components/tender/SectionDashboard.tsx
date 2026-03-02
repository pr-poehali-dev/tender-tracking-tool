/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";
import { OKPD_CODES, COMPETITORS, PORTFOLIO, ANALYTICS_MONTHS, ANALYTICS_VOLUMES, fmtRub, Section } from "./data";

interface SectionDashboardProps {
  activeSection: Section;
  showNotif: (msg: string) => void;
}

export default function SectionDashboard({ activeSection, showNotif }: SectionDashboardProps) {
  return (
    <>
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
    </>
  );
}
