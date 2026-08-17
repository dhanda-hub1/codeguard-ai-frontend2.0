import { NavLink } from "react-router-dom";
import { Shield } from "lucide-react";
import { NAV_ITEMS } from "./navConfig";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-[#1E2430] bg-[#0B0E14] md:flex">
      <div>
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
            <Shield size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight text-white">CodeGuard AI</div>
            <div className="truncate text-[11px] text-slate-500">Change Intelligence Platform</div>
          </div>
        </div>
        <nav className="mt-2 space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-indigo-500/10 text-indigo-300" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} className={isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
                    <span className="truncate">{item.label}</span>
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-[#1E2430] px-5 py-4">
        <div className="text-[11px] font-medium text-slate-600">SIH 2026 Prototype</div>
      </div>
    </aside>
  );
}
