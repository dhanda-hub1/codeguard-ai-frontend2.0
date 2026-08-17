import { Boxes, GitBranch, ChevronDown, Search, Bell, Plus } from "lucide-react";

export function Topbar({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <header className="flex items-center gap-3 border-b border-[#1E2430] bg-[#0B0E14]/90 px-4 py-3 backdrop-blur-sm md:px-6">
      <button className="flex items-center gap-2 rounded-lg border border-[#1E2430] bg-[#10141D] px-3 py-1.5 text-sm text-slate-300 hover:border-slate-700">
        <Boxes size={14} className="text-slate-500" />
        Enterprise-Shop
        <ChevronDown size={14} className="text-slate-600" />
      </button>
      <button className="hidden items-center gap-2 rounded-lg border border-[#1E2430] bg-[#10141D] px-3 py-1.5 text-sm text-slate-300 hover:border-slate-700 sm:flex">
        <GitBranch size={14} className="text-slate-500" />
        feature/payment-v2
        <ChevronDown size={14} className="text-slate-600" />
      </button>
      <div className="relative ml-1 hidden max-w-sm flex-1 items-center lg:flex">
        <Search size={14} className="pointer-events-none absolute left-3 text-slate-600" />
        <input
          placeholder="Search pull requests, services..."
          className="w-full rounded-lg border border-[#1E2430] bg-[#10141D] py-1.5 pl-9 pr-3 text-sm text-slate-300 outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="h-6 w-px bg-[#1E2430]" />
        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-semibold text-slate-300">
          RS
        </div>
        <button
          onClick={onAnalyze}
          className="ml-1 flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-3 py-1.5 text-sm font-medium text-white shadow-lg shadow-indigo-950/50 hover:brightness-110"
        >
          <Plus size={15} /> Analyze Change
        </button>
      </div>
    </header>
  );
}
