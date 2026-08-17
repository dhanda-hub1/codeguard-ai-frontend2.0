import React from "react";
import type { RiskLevel, TestPriority, TestStatus } from "../types";

export const RISK: Record<RiskLevel, { text: string; bg: string; ring: string; dot: string; hex: string }> = {
  LOW: { text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "ring-emerald-400/30", dot: "bg-emerald-400", hex: "#34D399" },
  MEDIUM: { text: "text-amber-400", bg: "bg-amber-400/10", ring: "ring-amber-400/30", dot: "bg-amber-400", hex: "#F5A623" },
  HIGH: { text: "text-rose-400", bg: "bg-rose-400/10", ring: "ring-rose-400/30", dot: "bg-rose-400", hex: "#F0553F" },
  CRITICAL: { text: "text-red-300", bg: "bg-red-900/40", ring: "ring-red-700/40", dot: "bg-red-700", hex: "#8C1F2B" },
};

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#1E2430] bg-[#10141D]/80 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const r = RISK[level] ?? RISK.LOW;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${r.text} ${r.bg} ${r.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
      {level}
    </span>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        {eyebrow && <div className="mb-1 text-xs font-medium uppercase tracking-wider text-indigo-400">{eyebrow}</div>}
        <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PriorityPill({ p }: { p: TestPriority }) {
  const map: Record<TestPriority, RiskLevel> = { Critical: "CRITICAL", High: "HIGH", Medium: "MEDIUM", Low: "LOW" };
  const r = RISK[map[p]];
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${r.text} ${r.bg} ring-1 ${r.ring}`}>{p}</span>;
}

export function StatusTag({ status }: { status: TestStatus }) {
  const styles: Record<TestStatus, string> = {
    Recommended: "text-slate-300 bg-slate-500/10 ring-slate-500/30",
    Running: "text-indigo-300 bg-indigo-500/10 ring-indigo-500/30",
    Passed: "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30",
    Failed: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  };
  return <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${styles[status]}`}>{status}</span>;
}
