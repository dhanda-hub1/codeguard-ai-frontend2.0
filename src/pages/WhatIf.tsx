import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import { Card, SectionHeader } from "../components/ui";
import { DependencyGraph, GraphLegend } from "../components/DependencyGraph";

export default function WhatIf() {
  const [scenario, setScenario] = useState(false);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScenario(true);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Simulator" title="What-If Impact Simulator" subtitle="What happens if a dependency changes or fails?" />
      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["Component", "PaymentService"],
            ["Scenario", "API Version Change"],
            ["Current", "v1"],
            ["Proposed", "v2"],
          ].map(([k, v]) => (
            <div key={k}>
              <label className="text-[11px] uppercase tracking-wider text-slate-600">{k}</label>
              <div className="mt-1 flex items-center justify-between rounded-lg border border-[#1E2430] bg-[#0B0E14] px-3 py-2 text-sm text-slate-200">
                {v} <ChevronDown size={14} className="text-slate-600" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={run}
          disabled={loading}
          className="mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-70"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <SlidersHorizontal size={15} />}
          {loading ? "Simulating..." : "Simulate Impact"}
        </button>
      </Card>

      {scenario && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["6", "Internal consumers"],
              ["2", "External consumers"],
              ["4", "Integration tests"],
              ["1", "Critical checkout path"],
            ].map(([v, l]) => (
              <Card key={l} className="p-4 text-center">
                <div className="text-2xl font-semibold text-white">{v}</div>
                <div className="mt-1 text-xs text-slate-500">{l}</div>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5 lg:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-white">Predicted Impact Graph</h3>
              <DependencyGraph onSelect={() => {}} selected={null} />
              <div className="mt-2">
                <GraphLegend />
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">Suggested Migration</h3>
              <ol className="space-y-2.5 text-sm text-slate-300">
                {["Introduce v2", "Keep v1 temporarily", "Migrate consumers", "Validate production traffic", "Deprecate v1"].map((s, i) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-500/10 text-[10px] font-semibold text-indigo-400">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
