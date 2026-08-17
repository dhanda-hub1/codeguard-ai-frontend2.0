import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Card } from "../components/ui";
import { RiskGauge } from "../components/RiskGauge";
import { DependencyGraph, GraphLegend, NodeDetailPanel, GraphEmptyState } from "../components/DependencyGraph";
import { RISK_FACTORS } from "../data/mockData";

export default function PRAnalysis() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium text-indigo-400">
            <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-emerald-400 ring-1 ring-emerald-400/30">Analysis Complete</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Pull Request #2841</h1>
          <p className="mt-0.5 text-sm text-slate-400">Payment Service API Refactor</p>
        </div>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Repository", "Enterprise-Shop"],
            ["Branch", "feature/payment-v2"],
            ["Author", "Rahul Sharma"],
            ["Files changed", "7"],
            ["Lines added", "+184"],
            ["Lines deleted", "-62"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] uppercase tracking-wider text-slate-600">{k}</div>
              <div className="mt-1 font-medium text-slate-200">{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-white">Change Risk</h2>
          <div className="flex justify-center py-2">
            <RiskGauge percent={84} />
          </div>
          <button
            onClick={() => navigate("/risk")}
            className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-[#1E2430] py-2 text-xs text-slate-300 hover:border-slate-700"
          >
            Explain this score <ArrowRight size={13} />
          </button>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-1 text-sm font-semibold text-white">Why is this change risky?</h2>
          <p className="mb-4 text-xs text-slate-500">Top contributing factors, ranked by influence on the prediction.</p>
          <div className="space-y-2.5">
            {RISK_FACTORS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.text} className="flex items-center gap-3 rounded-lg border border-[#1E2430] px-3 py-2.5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-rose-400/10">
                    <Icon size={14} className="text-rose-400" />
                  </div>
                  <span className="flex-1 text-sm text-slate-300">{f.text}</span>
                  <span className="text-[11px] text-slate-600">{f.weight}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Blast Radius</h2>
            <button onClick={() => navigate("/graph")} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
              View full graph <ArrowRight size={13} />
            </button>
          </div>
          <DependencyGraph onSelect={setSelectedNode} selected={selectedNode} />
          <div className="mt-2">
            <GraphLegend />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Impact Summary</h3>
            <dl className="space-y-2 text-sm">
              {[
                ["Directly affected", "3"],
                ["Indirectly affected", "5"],
                ["External consumers", "3"],
                ["Critical paths", "1"],
                ["Affected APIs", "11"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-200">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          {selectedNode ? (
            <NodeDetailPanel name={selectedNode} onClose={() => setSelectedNode(null)} />
          ) : (
            <GraphEmptyState />
          )}
        </div>
      </div>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">payment_service.py</h2>
          <span className="text-xs text-slate-600">7 files changed</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg border border-[#1E2430] font-mono text-[13px] lg:col-span-2">
            <div className="flex items-center gap-3 bg-rose-500/[0.08] px-4 py-2 text-rose-300">
              <span className="select-none text-rose-600">−</span> def calculate_payment(amount):
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/[0.08] px-4 py-2 text-emerald-300">
              <span className="select-none text-emerald-600">+</span> def calculate_payment(amount, currency, tax):
            </div>
          </div>
          <div className="rounded-lg border border-[#1E2430] p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-indigo-400">
              <Info size={12} /> AI Change Summary
            </div>
            <p className="text-sm text-slate-300">
              Payment calculation logic and API parameters were modified. The change affects downstream checkout and billing workflows.
            </p>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
          View full diff <ArrowRight size={13} />
        </button>
      </Card>
    </div>
  );
}
