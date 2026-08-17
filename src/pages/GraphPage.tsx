import { useState } from "react";
import { Card, SectionHeader } from "../components/ui";
import { DependencyGraph, GraphLegend, NodeDetailPanel, GraphEmptyState } from "../components/DependencyGraph";

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="PR #2841 · PaymentService"
        title="Dependency Graph"
        subtitle="Direct, indirect, and external relationships discovered from static analysis and call-graph tracing."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <DependencyGraph onSelect={setSelectedNode} selected={selectedNode} />
          <div className="mt-3">
            <GraphLegend />
          </div>
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg border border-[#1E2430] px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700">
              View Full Graph
            </button>
            <button className="rounded-lg border border-[#1E2430] px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700">
              Trace Dependency
            </button>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Blast Radius</h3>
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
          {selectedNode ? <NodeDetailPanel name={selectedNode} onClose={() => setSelectedNode(null)} /> : <GraphEmptyState />}
        </div>
      </div>
    </div>
  );
}
