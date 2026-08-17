import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { Card, SectionHeader, RISK } from "../components/ui";
import { RiskGauge } from "../components/RiskGauge";
import { ARCH_CARDS, ARCH_RISK } from "../data/mockData";

export default function ArchHealth() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="System" title="Architecture Health" subtitle="Structural signals across the service graph — connectivity, criticality, and coverage." />
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-6">
          <RiskGauge percent={72} />
          <div>
            <div className="text-sm font-medium text-slate-200">Architecture Health Score</div>
            <div className="mt-1 text-xs text-amber-400">Needs Attention</div>
            <p className="mt-2 max-w-sm text-xs text-slate-500">
              PaymentService concentrates dependents and change frequency, forming a structural bottleneck across checkout and billing flows.
            </p>
          </div>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ARCH_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label} className="p-4">
              <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/10">
                <Icon size={15} className="text-indigo-400" />
              </div>
              <div className="text-xs text-slate-500">{c.label}</div>
              <div className="mt-0.5 text-sm font-medium text-slate-200">{c.value}</div>
            </Card>
          );
        })}
      </div>
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Service Risk Distribution</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ARCH_RISK} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} stroke="#1E2430" />
              <XAxis type="number" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="service" type="category" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: "#10141D", border: "1px solid #1E2430", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="risk" radius={[0, 6, 6, 0]}>
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
