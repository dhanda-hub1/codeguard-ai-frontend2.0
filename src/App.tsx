import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { Topbar } from "./components/Topbar";
import { AnalyzeModal } from "./components/AnalyzeModal";
import Dashboard from "./pages/Dashboard";
import PRAnalysis from "./pages/PRAnalysis";
import GraphPage from "./pages/GraphPage";
import RiskAnalysis from "./pages/RiskAnalysis";
import Tests from "./pages/Tests";
import WhatIf from "./pages/WhatIf";
import ArchHealth from "./pages/ArchHealth";
import History from "./pages/History";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0B0E14] text-slate-200">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onAnalyze={() => setModalOpen(true)} />
        <MobileNav />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
          <div className="mx-auto max-w-6xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pr" element={<PRAnalysis />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/risk" element={<RiskAnalysis />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/whatif" element={<WhatIf />} />
              <Route path="/architecture" element={<ArchHealth />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
      <AnalyzeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={() => {
          setModalOpen(false);
          navigate("/pr");
        }}
      />
    </div>
  );
}
