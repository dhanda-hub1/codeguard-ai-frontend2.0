import { Card, SectionHeader } from "../components/ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Configuration" title="Settings" subtitle="Prototype configuration for the SIH demo environment." />
      <Card className="divide-y divide-[#1E2430]">
        {[
          ["Connected repositories", "24 repositories synced"],
          ["Risk model version", "blast-radius-predictor v2.3"],
          ["Notification channel", "Slack #eng-releases"],
          ["Default analysis mode", "Full Analysis"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between px-5 py-4 text-sm">
            <span className="text-slate-400">{k}</span>
            <span className="font-medium text-slate-200">{v}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
