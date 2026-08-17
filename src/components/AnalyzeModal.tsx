import { useCallback, useEffect, useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { ANALYSIS_STEPS } from "../data/mockData";

type Phase = "form" | "processing";

export function AnalyzeModal({
  open,
  onClose,
  onComplete,
}: {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [mode, setMode] = useState("Full Analysis");
  const [phase, setPhase] = useState<Phase>("form");
  const [stepIdx, setStepIdx] = useState(0);

  const start = useCallback(() => {
    setPhase("processing");
    setStepIdx(0);
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase("form");
      setStepIdx(0);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "processing") return;
    if (stepIdx >= ANALYSIS_STEPS.length) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIdx((i) => i + 1), 350);
    return () => clearTimeout(t);
  }, [phase, stepIdx, onComplete]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[#1E2430] bg-[#10141D] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{phase === "form" ? "Analyze Change" : "Running Analysis"}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300" aria-label="Close">
            <X size={17} />
          </button>
        </div>

        {phase === "form" && (
          <div className="space-y-4">
            {[
              ["Repository", "Enterprise-Shop"],
              ["Branch", "feature/payment-v2"],
              ["Commit / PR", "#2841"],
            ].map(([k, v]) => (
              <div key={k}>
                <label className="text-[11px] uppercase tracking-wider text-slate-600">{k}</label>
                <div className="mt-1 rounded-lg border border-[#1E2430] bg-[#0B0E14] px-3 py-2 text-sm text-slate-200">{v}</div>
              </div>
            ))}
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-slate-600">Analysis Type</label>
              <div className="space-y-2">
                {["Full Analysis", "Dependency Only", "Risk Prediction"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm ${
                      mode === m ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "border-[#1E2430] text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className={`h-3.5 w-3.5 rounded-full border-2 ${mode === m ? "border-indigo-400 bg-indigo-400" : "border-slate-600"}`} />
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={start}
              className="w-full rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 py-2.5 text-sm font-medium text-white hover:brightness-110"
            >
              Start Analysis
            </button>
          </div>
        )}

        {phase === "processing" && (
          <div className="space-y-2">
            {ANALYSIS_STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2.5 text-sm">
                {i < stepIdx ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : i === stepIdx ? (
                  <Loader2 size={16} className="animate-spin text-indigo-400" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-slate-700" />
                )}
                <span className={i <= stepIdx ? "text-slate-200" : "text-slate-600"}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
