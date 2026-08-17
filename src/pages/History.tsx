import { CheckCircle2, XCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, SectionHeader, RiskBadge } from "../components/ui";
import { HISTORY_ROWS, HISTORY_CHART } from "../data/mockData";
import type { RiskLevel } from "../types";

export default function History() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Evaluation" title="Prediction History" subtitle="How past risk predictions compared against actual production outcomes." />
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#1E2430] text-[11px] uppercase tracking-wider text-slate-600">
                <th className="pb-2 font-medium">Change</th>
                <th className="pb-2 font-medium">Predicted Risk</th>
                <th className="pb-2 font-medium">Actual Outcome</th>
                <th className="pb-2 font-medium">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY_ROWS.map((r) => (
                <tr key={r.change} className="border-b border-[#1E2430]/60 last:border-0">
                  <td className="py-2.5 font-medium text-slate-200">{r.change}</td>
                  <td className="py-2.5">
                    <RiskBadge level={r.predicted.toUpperCase() as RiskLevel} />
                  </td>
                  <td className="py-2.5 text-slate-400">{r.actual}</td>
                  <td className="py-2.5">
                    {r.accurate === null ? (
                      <span className="text-slate-600">—</span>
                    ) : r.accurate ? (
                      <CheckCircle2 size={15} className="text-emerald-400" />
                    ) : (
                      <XCircle size={15} className="text-rose-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Predicted Risk vs. Actual Failures</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORY_CHART} margin={{ left: -20, right: 8 }}>
              <CartesianGrid vertical={false} stroke="#1E2430" />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={{ stroke: "#1E2430" }} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#10141D", border: "1px solid #1E2430", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
              <Line type="monotone" dataKey="predicted" stroke="#6C7BFF" strokeWidth={2} dot={false} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#F0553F" strokeWidth={2} dot={false} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
