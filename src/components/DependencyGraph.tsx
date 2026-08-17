import { X, Info } from "lucide-react";
import { GRAPH_NODES, NODE_COLORS, NODE_DETAILS } from "../data/mockData";
import { Card } from "./ui";

const CENTER_NAME = "PaymentService";

export function DependencyGraph({
  onSelect,
  selected,
}: {
  onSelect: (name: string) => void;
  selected: string | null;
}) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 400 400" className="h-auto max-h-[420px] w-full">
        {GRAPH_NODES.map((n) => {
          const color = n.criticalPath ? NODE_COLORS.critical : NODE_COLORS[n.type];
          return (
            <line
              key={`edge-${n.id}`}
              x1="200"
              y1="200"
              x2={n.x}
              y2={n.y}
              stroke={color}
              strokeWidth={n.criticalPath ? 2.5 : 1.5}
              strokeDasharray={n.criticalPath ? "0" : "4 3"}
              opacity={0.7}
            />
          );
        })}

        {/* center node — the changed component */}
        <g onClick={() => onSelect(CENTER_NAME)} className="cursor-pointer">
          <circle
            cx="200"
            cy="200"
            r="26"
            fill="#0B0E14"
            stroke={NODE_COLORS.center}
            strokeWidth="3"
            className={selected === CENTER_NAME ? "drop-shadow-[0_0_10px_rgba(108,123,255,0.7)]" : ""}
          />
          <circle cx="200" cy="200" r="26" fill={NODE_COLORS.center} opacity="0.18" />
        </g>
        <text x="200" y="238" textAnchor="middle" fontSize="10" fill="#E2E8F0" fontWeight="600">
          {CENTER_NAME}
        </text>

        {GRAPH_NODES.map((n) => {
          const color = n.criticalPath ? NODE_COLORS.critical : NODE_COLORS[n.type];
          const isSel = selected === n.name;
          return (
            <g key={n.id} onClick={() => onSelect(n.name)} className="cursor-pointer">
              <circle cx={n.x} cy={n.y} r="16" fill="#0B0E14" stroke={color} strokeWidth={isSel ? 3 : 2} />
              <circle cx={n.x} cy={n.y} r="16" fill={color} opacity="0.16" />
            </g>
          );
        })}
        {GRAPH_NODES.map((n) => (
          <text
            key={`label-${n.id}`}
            x={n.x}
            y={n.y + (n.y < 200 ? -24 : 32)}
            textAnchor="middle"
            fontSize="9"
            fill="#94A3B8"
          >
            {n.name}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function GraphLegend() {
  const items = [
    { label: "Changed", color: NODE_COLORS.center },
    { label: "Direct Impact", color: NODE_COLORS.direct },
    { label: "Indirect Impact", color: NODE_COLORS.indirect },
    { label: "External Impact", color: NODE_COLORS.external },
    { label: "Critical Path", color: NODE_COLORS.critical },
  ];
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: it.color }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

export function NodeDetailPanel({ name, onClose }: { name: string | null; onClose: () => void }) {
  if (!name) return null;
  const d = NODE_DETAILS[name];
  if (!d) return null;
  const rows: [string, string | number][] = [
    ["Type", d.type],
    ["Owner", d.owner],
    ["Criticality", d.criticality],
    ["Dependents", d.dependents],
    ["Test Coverage", d.coverage],
    ["Historical Failure Rate", d.failureRate],
  ];
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{name}</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-xs">
            <dt className="text-slate-500">{k}</dt>
            <dd className="font-medium text-slate-200">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export function GraphEmptyState() {
  return (
    <Card className="p-5 text-xs text-slate-500">
      <Info size={14} className="mb-1.5 text-slate-600" />
      Tap a node in the graph to inspect ownership, coverage, and criticality.
    </Card>
  );
}
