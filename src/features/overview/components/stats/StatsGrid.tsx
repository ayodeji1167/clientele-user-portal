import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { storageKeys } from "@/shared/constants/storage";
import type { StatKey, StatPeriod } from "../../interface";
import { StatCard } from "./StatCard";

const STATS: { key: StatKey; label: string; defaultPeriod: StatPeriod }[] = [
  { key: "unreadInquiries", label: "Unread inquiries", defaultPeriod: "today" },
  {
    key: "activePortals",
    label: "Active portals",
    defaultPeriod: "this_month",
  },
  {
    key: "outstandingPayments",
    label: "Outstanding payments",
    defaultPeriod: "today",
  },
  { key: "totalEarnings", label: "Total earnings", defaultPeriod: "this_week" },
];

// Which values the user chose to hide is a per-browser preference.
function readHidden(): StatKey[] {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.hiddenStats) ?? "[]");
  } catch {
    return [];
  }
}

function writeHidden(keys: StatKey[]) {
  try {
    localStorage.setItem(storageKeys.hiddenStats, JSON.stringify(keys));
  } catch {
    // Storage unavailable — the choice just won't persist.
  }
}

export function StatsGrid() {
  const [hidden, setHidden] = useState<StatKey[]>(readHidden);

  const toggle = (key: StatKey) =>
    setHidden((current) => {
      const next = current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key];
      writeHidden(next);
      return next;
    });

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="0.625rem">
      {STATS.map((stat) => (
        <StatCard
          key={stat.key}
          statKey={stat.key}
          label={stat.label}
          defaultPeriod={stat.defaultPeriod}
          hidden={hidden.includes(stat.key)}
          onToggleHidden={() => toggle(stat.key)}
        />
      ))}
    </SimpleGrid>
  );
}
