import { AlertTriangle, Info } from "lucide-react";
import { Card, SectionHeader } from "../components/ui";
import { FEATURE_CONTRIBUTIONS, HISTORICAL_INCIDENTS } from "../data/mockData";

export default function RiskAnalysis() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="PR #2841"
        title="Why is this change risky?"
        subtitle="Risk prediction is based on historical engineering signals and dependency evidence — not a guaranteed outcome."
      />
      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Feature Contribution</h2>
        <div className="space-y-3">
          {FEATURE_CONTRIBUTIONS.map((f) => (
            <div key={f.factor}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">{f.factor}</span>
                <span className="font-medium text-slate-300">{f.value}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#1E2430]">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${f.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-white">Historical Evidence</h2>
        <p className="mb-4 mt-1 text-sm text-slate-400">3 similar changes caused production incidents.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {HISTORICAL_INCIDENTS.map((h) => (
            <div key={h.id} className="rounded-lg border border-[#1E2430] p-3.5">
              <div className="text-xs font-medium text-slate-500">{h.id}</div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-rose-300">
                <AlertTriangle size={13} /> {h.outcome}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex items-start gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] p-4 text-xs text-indigo-200">
        <Info size={14} className="mt-0.5 shrink-0" />
        Risk prediction is based on historical engineering signals and dependency evidence — not a guaranteed prediction of outcome.
      </div>
    </div>
  );
}
