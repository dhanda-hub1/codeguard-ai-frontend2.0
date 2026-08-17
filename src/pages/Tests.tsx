import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Card, SectionHeader, RiskBadge, PriorityPill, StatusTag } from "../components/ui";
import { TESTS, DEPLOY_STAGES, DEPLOY_RECOMMENDED } from "../data/mockData";
import type { TestStatus } from "../types";

export default function Tests() {
  const [running, setRunning] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="PR #2841"
        title="Recommended Tests"
        subtitle="12 tests recommended for this change, prioritized by relevance to the modified dependency path."
      />

      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <div className="text-2xl font-semibold text-white">72%</div>
          <div className="text-xs text-slate-500">Estimated test-suite reduction</div>
        </div>
        <p className="max-w-md text-xs text-slate-500">
          Prioritize relevant tests instead of executing the entire suite. This is a recommendation, not a guarantee that other tests are unnecessary.
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {TESTS.map((t) => {
          const status: TestStatus = running[t.name] ? "Running" : t.status;
          return (
            <Card key={t.name} className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-medium text-slate-100">{t.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {t.type} · {t.component}
                  </div>
                </div>
                <PriorityPill p={t.priority} />
              </div>
              <p className="mb-3 text-xs text-slate-400">{t.reason}</p>
              <div className="flex items-center justify-between">
                <StatusTag status={status} />
                <button
                  onClick={() => setRunning((s) => ({ ...s, [t.name]: true }))}
                  className="flex items-center gap-1 rounded-md border border-[#1E2430] px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-700"
                >
                  <Play size={11} /> Run Test
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <SectionHeader title="Deployment Recommendation" subtitle="AI provides decision support. Final deployment approval remains with engineering teams." />
        <div className="mb-5 flex items-center gap-3">
          <span className="text-xs text-slate-500">Risk Level</span>
          <RiskBadge level="HIGH" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended Strategy</h3>
            <ol className="space-y-2 text-sm text-slate-300">
              {[
                "Run relevant integration tests",
                "Validate in staging",
                "Confirm downstream service owners",
                "Deploy using controlled/canary rollout",
                "Enable enhanced monitoring",
                "Keep rollback ready",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-500/10 text-[10px] font-semibold text-indigo-400">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Deployment Pipeline</h3>
            <div className="flex flex-col gap-1.5">
              {DEPLOY_STAGES.map((s, i) => {
                const rec = DEPLOY_RECOMMENDED.has(s);
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium ${
                        rec ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300" : "border-[#1E2430] text-slate-400"
                      }`}
                    >
                      {s}
                    </div>
                    {i < DEPLOY_STAGES.length - 1 && <ArrowRight size={13} className="shrink-0 rotate-90 text-slate-700" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
