import {
  Network, AlertTriangle, Shield, Boxes, Gauge, GitBranch, TestTube2,
  History as HistoryIcon, GitCommitHorizontal,
} from "lucide-react";
import type {
  PullRequestSummary, ArchRiskPoint, Incident, RiskFactor, GraphNode,
  NodeDetail, FeatureContribution, HistoricalIncident, RecommendedTest,
  HistoryRow, HistoryChartPoint, ArchCard,
} from "../types";

/**
 * All data below is illustrative prototype/demo data for the SIH presentation,
 * not a claim of real enterprise performance. In production this module is
 * replaced by calls to the corresponding /api/* endpoints (see README).
 */

export const KPIS = [
  { label: "Repositories", value: "24", trend: "+2 this month", up: true, icon: Boxes },
  { label: "Services Monitored", value: "148", trend: "+6 this month", up: true, icon: Network },
  { label: "High-Risk Changes", value: "12", trend: "+3 vs last week", up: false, icon: AlertTriangle },
  { label: "Incidents Prevented", value: "37", trend: "+9 this quarter", up: true, icon: Shield },
  { label: "Architecture Risk", value: "Medium", trend: "stable", up: null, icon: Gauge },
];

export const RECENT_PRS: PullRequestSummary[] = [
  { id: "#2841", component: "PaymentService", author: "Rahul Sharma", risk: "HIGH", blast: "8 services", status: "Needs Review" },
  { id: "#2838", component: "UserService", author: "Ananya Iyer", risk: "LOW", blast: "2 services", status: "Safe" },
  { id: "#2835", component: "OrderService", author: "Arjun Mehta", risk: "MEDIUM", blast: "5 services", status: "Testing" },
  { id: "#2831", component: "PricingService", author: "Priya Nair", risk: "HIGH", blast: "7 services", status: "Review" },
];

export const ARCH_RISK: ArchRiskPoint[] = [
  { service: "Payment", risk: 82 },
  { service: "Checkout", risk: 74 },
  { service: "Pricing", risk: 68 },
  { service: "Order", risk: 55 },
  { service: "User", risk: 30 },
  { service: "Inventory", risk: 25 },
];

export const INCIDENTS: Incident[] = [
  { name: "Payment timeout", when: "2 days ago", severity: "HIGH", service: "PaymentService" },
  { name: "Checkout regression", when: "5 days ago", severity: "MEDIUM", service: "CheckoutService" },
  { name: "Order API failure", when: "8 days ago", severity: "HIGH", service: "OrderService" },
];

export const RISK_FACTORS: RiskFactor[] = [
  { icon: Network, text: "8 downstream services affected", weight: "Major" },
  { icon: GitBranch, text: "3 external API consumers", weight: "Major" },
  { icon: TestTube2, text: "Test coverage only 48%", weight: "Major" },
  { icon: HistoryIcon, text: "Similar changes caused incidents previously", weight: "Moderate" },
  { icon: Shield, text: "PaymentService lies on a critical transaction path", weight: "Critical" },
];

// Dependency graph nodes laid out on a 400x400 canvas around the changed component (PaymentService).
export const GRAPH_NODES: GraphNode[] = [
  { id: "checkout", name: "CheckoutService", type: "direct", x: 200, y: 40, criticalPath: true },
  { id: "paymentapi", name: "PaymentAPI", type: "direct", x: 313, y: 87 },
  { id: "billing", name: "BillingService", type: "direct", x: 360, y: 200 },
  { id: "order", name: "OrderService", type: "indirect", x: 313, y: 313 },
  { id: "invoicedb", name: "InvoiceDB", type: "indirect", x: 200, y: 360 },
  { id: "notification", name: "NotificationService", type: "indirect", x: 87, y: 313 },
  { id: "analytics", name: "AnalyticsService", type: "indirect", x: 40, y: 200 },
  { id: "mobileapp", name: "MobileApp", type: "external", x: 87, y: 87 },
];

export const NODE_DETAILS: Record<string, NodeDetail> = {
  PaymentService: { type: "Microservice", owner: "Payments Team", criticality: "Critical", dependents: 8, coverage: "48%", failureRate: "18%" },
  CheckoutService: { type: "Microservice", owner: "Checkout Team", criticality: "Critical", dependents: 6, coverage: "61%", failureRate: "11%" },
  PaymentAPI: { type: "Public API", owner: "Payments Team", criticality: "Critical", dependents: 11, coverage: "55%", failureRate: "9%" },
  BillingService: { type: "Microservice", owner: "Finance Eng", criticality: "High", dependents: 4, coverage: "58%", failureRate: "7%" },
  OrderService: { type: "Microservice", owner: "Commerce Team", criticality: "High", dependents: 9, coverage: "66%", failureRate: "6%" },
  InvoiceDB: { type: "Datastore", owner: "Finance Eng", criticality: "Medium", dependents: 3, coverage: "—", failureRate: "3%" },
  NotificationService: { type: "Microservice", owner: "Platform Team", criticality: "Low", dependents: 5, coverage: "72%", failureRate: "2%" },
  AnalyticsService: { type: "Microservice", owner: "Data Team", criticality: "Low", dependents: 4, coverage: "80%", failureRate: "1%" },
  MobileApp: { type: "Client Application", owner: "Mobile Team", criticality: "High", dependents: 0, coverage: "—", failureRate: "4%" },
};

export const NODE_COLORS: Record<string, string> = {
  direct: "#F5A623",
  indirect: "#E8D34A",
  external: "#A970FF",
  center: "#6C7BFF",
  critical: "#F0553F",
};

export const FEATURE_CONTRIBUTIONS: FeatureContribution[] = [
  { factor: "Historical failure rate", value: 88 },
  { factor: "Dependency count", value: 79 },
  { factor: "Test coverage", value: 63 },
  { factor: "Criticality", value: 71 },
  { factor: "External consumers", value: 54 },
  { factor: "Recent change frequency", value: 38 },
];

export const HISTORICAL_INCIDENTS: HistoricalIncident[] = [
  { id: "#2712", outcome: "Checkout failure" },
  { id: "#2498", outcome: "Payment timeout" },
  { id: "#2381", outcome: "Billing regression" },
];

export const TESTS: RecommendedTest[] = [
  { name: "PaymentIntegrationTest", type: "Integration", component: "PaymentService", priority: "Critical", reason: "Directly connected to modified PaymentService.", status: "Recommended" },
  { name: "CheckoutFlowTest", type: "End-to-End", component: "CheckoutService", priority: "High", reason: "Critical checkout path is affected.", status: "Recommended" },
  { name: "PaymentAPITest", type: "API", component: "PaymentAPI", priority: "High", reason: "Payment API contract was modified.", status: "Passed" },
  { name: "BillingReconciliationTest", type: "Integration", component: "BillingService", priority: "Medium", reason: "Downstream billing calculations depend on payment output.", status: "Running" },
  { name: "InvoiceGenerationTest", type: "Regression", component: "InvoiceDB", priority: "Medium", reason: "Invoice writes are triggered after payment confirmation.", status: "Recommended" },
  { name: "MobileCheckoutSmokeTest", type: "Smoke", component: "MobileApp", priority: "Low", reason: "Mobile client consumes the modified payment contract.", status: "Failed" },
];

export const DEPLOY_STAGES = ["Code", "CI Tests", "Integration Tests", "Staging", "Canary", "Production"];
export const DEPLOY_RECOMMENDED = new Set(["Integration Tests", "Staging", "Canary"]);

export const HISTORY_ROWS: HistoryRow[] = [
  { change: "PR #2841", predicted: "High", actual: "Pending", accurate: null },
  { change: "PR #2828", predicted: "Medium", actual: "No failure", accurate: true },
  { change: "PR #2812", predicted: "High", actual: "Regression", accurate: true },
  { change: "PR #2799", predicted: "Low", actual: "No failure", accurate: true },
  { change: "PR #2780", predicted: "Medium", actual: "Regression", accurate: false },
];

export const HISTORY_CHART: HistoryChartPoint[] = [
  { month: "Mar", predicted: 4, actual: 3 },
  { month: "Apr", predicted: 6, actual: 5 },
  { month: "May", predicted: 5, actual: 2 },
  { month: "Jun", predicted: 8, actual: 6 },
  { month: "Jul", predicted: 7, actual: 4 },
  { month: "Aug", predicted: 9, actual: 5 },
];

export const ARCH_CARDS: ArchCard[] = [
  { label: "Most Connected Service", value: "PaymentService", icon: Network },
  { label: "Critical Dependency", value: "Checkout → Payment", icon: GitBranch },
  { label: "Potential Single Point of Failure", value: "PaymentService", icon: AlertTriangle },
  { label: "Highest Change Frequency", value: "OrderService", icon: GitCommitHorizontal },
  { label: "Lowest Test Coverage", value: "PaymentService — 48%", icon: TestTube2 },
];

export const ANALYSIS_STEPS = [
  "Repository loaded", "Code parsed", "Dependencies discovered", "Dependency graph created",
  "Changed components identified", "Blast radius calculated", "Risk predicted",
  "Tests selected", "Deployment advice generated",
];
