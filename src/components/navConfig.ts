import {
  LayoutDashboard, GitPullRequest, Network, AlertTriangle, TestTube2,
  SlidersHorizontal, Activity, History as HistoryIcon, Settings,
} from "lucide-react";
import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", path: "/", label: "Dashboard", icon: LayoutDashboard },
  { id: "pr", path: "/pr", label: "Pull Request Analysis", icon: GitPullRequest },
  { id: "graph", path: "/graph", label: "Dependency Graph", icon: Network },
  { id: "risk", path: "/risk", label: "Risk Analysis", icon: AlertTriangle },
  { id: "tests", path: "/tests", label: "Test Recommendations", icon: TestTube2 },
  { id: "whatif", path: "/whatif", label: "What-If Simulator", icon: SlidersHorizontal },
  { id: "arch", path: "/architecture", label: "Architecture Health", icon: Activity },
  { id: "history", path: "/history", label: "History", icon: HistoryIcon },
  { id: "settings", path: "/settings", label: "Settings", icon: Settings },
];
