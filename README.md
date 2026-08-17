# CodeGuard AI — Change Intelligence Platform

Frontend prototype for **Code Dependency Blast-Radius & Failure Prediction System** (SIH 2026).

> "Understand the impact before the code reaches production."

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts (charts)
- Lucide React (icons)
- Custom SVG dependency-graph visualization (no heavy graph library needed for the demo scale)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/     Reusable UI: Sidebar, Topbar, MobileNav, DependencyGraph,
                   RiskGauge, AnalyzeModal, ui.tsx (Card/Badge/SectionHeader primitives)
  pages/          One file per route (Dashboard, PRAnalysis, GraphPage,
                   RiskAnalysis, Tests, WhatIf, ArchHealth, History, SettingsPage)
  data/           mockData.ts — all demo/seed data lives here
  types/          Shared TypeScript interfaces
  App.tsx         Layout shell + route table
  main.tsx        Entry point (BrowserRouter)
```

## Demo data

All numbers (risk %, blast radius counts, KPI values, incident history) live in
`src/data/mockData.ts` and are illustrative prototype values for the SIH
presentation, not real production metrics.

## Swapping in a real backend

The frontend is structured so mock data can be replaced with live API calls
without touching component code — only `src/data/mockData.ts` (or a new
`src/api/` layer that fetches and shapes data into the same types) needs to
change. Suggested FastAPI-ready endpoints:

```
GET  /api/repositories
GET  /api/pull-requests
POST /api/analyze
GET  /api/dependencies
GET  /api/risk
GET  /api/tests
GET  /api/deployment-advice
POST /api/simulation
GET  /api/history
```

Each page currently imports typed constants from `mockData.ts`; swap those
imports for `fetch`/`react-query` calls that resolve to the same TypeScript
interfaces in `src/types/index.ts` and the UI keeps working unchanged.

## Demo flow (3–5 min presentation)

Dashboard → select PR #2841 → Pull Request Analysis (risk gauge, why-risky
factors, blast radius graph, code diff) → Dependency Graph (full view) →
Risk Analysis (feature contribution + historical evidence) → Test
Recommendations + Deployment Advisor → What-If Simulator (Payment API v1 →
v2) → Architecture Health → History.
