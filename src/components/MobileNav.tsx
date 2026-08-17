import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./navConfig";

export function MobileNav() {
  return (
    <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-b border-[#1E2430] bg-[#0B0E14] px-3 py-2 md:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                isActive ? "bg-indigo-500/15 text-indigo-300" : "text-slate-500 hover:text-slate-300"
              }`
            }
          >
            <Icon size={13} />
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
}
