/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Icon from "@/components/ui/icon";
import { Section } from "./data";

interface NavItem {
  key: Section;
  label: string;
  icon: string;
  badge?: number;
}

interface AppShellProps {
  children: React.ReactNode;
  activeSection: Section;
  notification: string | null;
  time: Date;
  navItems: NavItem[];
  goTo: (s: Section) => void;
}

export default function AppShell({ children, activeSection, notification, time, navItems, goTo }: AppShellProps) {
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
        {children}
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
