import { useState, useEffect } from "react";
import { Section, Tender } from "@/components/tender/data";
import AppShell from "@/components/tender/AppShell";
import SectionTenders from "@/components/tender/SectionTenders";
import SectionDashboard from "@/components/tender/SectionDashboard";

const NAV_ITEMS: { key: Section; label: string; icon: string; badge?: number }[] = [
  { key: "tenders", label: "Тендеры", icon: "FileText", badge: 6 },
  { key: "monitoring", label: "Мониторинг", icon: "Activity" },
  { key: "bids", label: "Мои ставки", icon: "Target", badge: 1 },
  { key: "analytics", label: "Аналитика", icon: "BarChart2" },
  { key: "competitors", label: "Конкуренты", icon: "Users" },
  { key: "portfolio", label: "Портфель", icon: "Briefcase" },
  { key: "support", label: "Поддержка", icon: "MessageSquare" },
  { key: "profile", label: "Профиль", icon: "User" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("tenders");
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
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

  const goTo = (s: Section) => {
    setActiveSection(s);
    setSelectedTender(null);
    setBidAmount("");
  };

  return (
    <AppShell
      activeSection={activeSection}
      notification={notification}
      time={time}
      navItems={NAV_ITEMS}
      goTo={goTo}
    >
      <SectionTenders
        activeSection={activeSection}
        selectedTender={selectedTender}
        filterOkpd={filterOkpd}
        filterUrgency={filterUrgency}
        bidAmount={bidAmount}
        time={time}
        setSelectedTender={setSelectedTender}
        setFilterOkpd={setFilterOkpd}
        setFilterUrgency={setFilterUrgency}
        setBidAmount={setBidAmount}
        showNotif={showNotif}
        goTo={goTo}
      />
      <SectionDashboard
        activeSection={activeSection}
        showNotif={showNotif}
      />
    </AppShell>
  );
}
