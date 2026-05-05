# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Mithaq AI (`artifacts/mithaq-ai`)
- **Type**: React + Vite (react-vite)
- **Preview path**: `/`
- **Language/direction**: Arabic RTL
- **Font**: Cairo (Google Fonts)
- **Theme**: Dark navy + cyan accent
- **Description**: Multi-agent contract compliance system for Saudi Labor Law 2025 (hackathon demo)

#### Key files
- `src/data/mockData.ts` — all demo/mock data (compliance report, agents, architecture nodes, analysis steps)
- `src/lib/analyzeContract.ts` — `analyzeContract()` function; currently returns mock data. Replace body with real API call when backend is ready.
- `src/components/HeroSection.tsx` — landing hero with logo placeholder, title, subtitle, CTA
- `src/components/UploadSection.tsx` — PDF drag-and-drop upload + animated analysis steps simulation
- `src/components/AgentsSection.tsx` — 3 agent cards (Audit, Drafting, Supervisor)
- `src/components/ArchitectureSection.tsx` — visual flow diagram of the multi-agent pipeline
- `src/components/ResultsSection.tsx` — compliance score circles, results table, action buttons
- `src/pages/Home.tsx` — main page orchestrating all sections

#### Logo
- Drop your logo at `public/logo.png` then replace the placeholder in `HeroSection.tsx` with `<img src="/logo.png" alt="Mithaq AI" />`

#### Future AI integration
- See comments in `src/lib/analyzeContract.ts` for the API connection point
- Action button TODOs in `ResultsSection.tsx` mark where download/send APIs connect
