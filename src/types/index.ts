export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type NodeType = "direct" | "indirect" | "external";

export interface PullRequestSummary {
  id: string;
  component: string;
  author: string;
  risk: RiskLevel;
  blast: string;
  status: string;
}

export interface ArchRiskPoint {
  service: string;
  risk: number;
}

export interface Incident {
  name: string;
  when: string;
  severity: RiskLevel;
  service: string;
}

export interface RiskFactor {
  icon: React.ElementType;
  text: string;
  weight: "Critical" | "Major" | "Moderate";
}

export interface GraphNode {
  id: string;
  name: string;
  type: NodeType;
  x: number;
  y: number;
  criticalPath?: boolean;
}

export interface NodeDetail {
  type: string;
  owner: string;
  criticality: string;
  dependents: number | string;
  coverage: string;
  failureRate: string;
}

export interface FeatureContribution {
  factor: string;
  value: number;
}

export interface HistoricalIncident {
  id: string;
  outcome: string;
}

export type TestPriority = "Critical" | "High" | "Medium" | "Low";
export type TestStatus = "Recommended" | "Running" | "Passed" | "Failed";

export interface RecommendedTest {
  name: string;
  type: string;
  component: string;
  priority: TestPriority;
  reason: string;
  status: TestStatus;
}

export interface HistoryRow {
  change: string;
  predicted: "Low" | "Medium" | "High";
  actual: string;
  accurate: boolean | null;
}

export interface HistoryChartPoint {
  month: string;
  predicted: number;
  actual: number;
}

export interface ArchCard {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ElementType;
}
