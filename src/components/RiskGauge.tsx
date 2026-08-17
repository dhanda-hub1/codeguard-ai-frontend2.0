import { RISK } from "./ui";

export function RiskGauge({ percent = 84 }: { percent?: number }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const color = percent >= 75 ? RISK.HIGH.hex : percent >= 45 ? RISK.MEDIUM.hex : RISK.LOW.hex;
  const label = percent >= 75 ? "High Risk" : percent >= 45 ? "Medium Risk" : "Low Risk";

  return (
    <div className="relative flex h-[168px] w-[168px] items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1E2430" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 900ms ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-semibold text-white tabular-nums">{percent}%</span>
        <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}
