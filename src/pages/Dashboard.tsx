import { useNavigate } from "react-router-dom";
import { Plus, ChevronRight, TrendingUp, TrendingDown, FileWarning } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";
import { Card, SectionHeader, RiskBadge, RISK } from "../components/ui";
import { KPIS, RECENT_PRS, INCIDENTS, ARCH_RISK } from "../data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Overview"
        title="Software Change Intelligence"
        subtitle="Analyze code changes, understand their blast radius, and prevent production failures before they reach customers."
        action={
          <button
            onClick={() => navigate("/pr")}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-3.5 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            <Plus size={15} /> Analyze New Change
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/10">
                  <Icon size={15} className="text-indigo-400" />
                </div>
                {k.up !== null && (
                  <span className={`flex items-center gap-0.5 text-[11px] font-medium ${k.up ? "text-emerald-400" : "text-rose-400"}`}>
                    {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  </span>
                )}
              </div>
              <div className="text-2xl font-semibold tabular-nums text-white">{k.value}</div>
              <div className="mt-1 text-xs text-slate-500">{k.label}</div>
              <div className="mt-1 text-[11px] text-slate-600">{k.trend}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Pull Requests</h2>
            <button onClick={() => navigate("/pr")} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#1E2430] text-[11px] uppercase tracking-wider text-slate-600">
                  <th className="pb-2 font-medium">PR</th>
                  <th className="pb-2 font-medium">Component</th>
                  <th className="pb-2 font-medium">Author</th>
                  <th className="pb-2 font-medium">Risk</th>
                  <th className="pb-2 font-medium">Blast Radius</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_PRS.map((pr) => (
                  <tr
                    key={pr.id}
                    onClick={() => navigate("/pr")}
                    className="cursor-pointer border-b border-[#1E2430]/60 last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="py-2.5 font-medium text-slate-200">{pr.id}</td>
                    <td className="py-2.5 text-slate-400">{pr.component}</td>
                    <td className="py-2.5 text-slate-400">{pr.author}</td>
                    <td className="py-2.5">
                      <RiskBadge level={pr.risk} />
                    </td>
                    <td className="py-2.5 text-slate-400">{pr.blast}</td>
                    <td className="py-2.5 text-slate-500">{pr.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Recent Incidents</h2>
          <div className="space-y-3">
            {INCIDENTS.map((inc) => (
              <div key={inc.name} className="flex items-start gap-3 rounded-lg border border-[#1E2430] p-3">
                <div className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md ${RISK[inc.severity].bg}`}>
                  <FileWarning size={13} className={RISK[inc.severity].text} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm text-slate-200">{inc.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {inc.service} · {inc.when}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="mb-1 text-sm font-semibold text-white">Architecture Risk Overview</h2>
        <p className="mb-4 text-xs text-slate-500">Composite risk score by service, based on dependency load, coverage, and incident history.</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ARCH_RISK} margin={{ left: -20, right: 8, top: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#1E2430" />
              <XAxis dataKey="service" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={{ stroke: "#1E2430" }} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#10141D", border: "1px solid #1E2430", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#E2E8F0" }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
                {ARCH_RISK.map((entry, i) => (
                  <Cell key={i} fill={entry.risk >= 70 ? RISK.HIGH.hex : entry.risk >= 45 ? RISK.MEDIUM.hex : RISK.LOW.hex} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
