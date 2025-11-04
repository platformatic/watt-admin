# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Test/Lint Commands
```bash
# Development
npm run dev                     # Start development server (wattpm)
npm run build                   # Build for production
npm run start                   # Start in production mode
npm run clean                   # Remove build artifacts (web/*/dist)
npm run typecheck               # Type-check backend and frontend TypeScript

# Testing
npm run test                    # Run all tests (CLI, E2E, backend, frontend)
npm run test:cli                # Run CLI tests only
npm run test:backend            # Run backend tests only
npm run test:frontend           # Run frontend tests only (Vitest)
npm run test:e2e                # Run Playwright E2E tests
npm run test:e2e:ui             # Run Playwright with UI mode

# Running single test files
node --test test/path/to/file.test.ts                       # CLI test
node --test web/backend/path/to/file.test.ts                # Backend test
cd web/frontend && vitest run path/to/file.test.ts          # Frontend test

# Linting
npm run lint                    # Lint all code
npm run lint:fix                # Fix linting issues automatically

# Client generation (OpenAPI)
npm run client:openapi          # Generate OpenAPI spec from backend
npm run client:generate         # Generate frontend client from OpenAPI using massimo
```

## Project Architecture

### High-Level Structure
This is a **Platformatic Watt monorepo** containing a CLI tool and full-stack admin dashboard for monitoring Platformatic runtimes. The project uses Platformatic's microservices architecture with three main applications orchestrated by wattpm:

1. **Backend** (web/backend): Fastify service providing REST APIs and WebSocket endpoints
2. **Composer** (web/composer): Platformatic Gateway that routes requests and proxies between frontend/backend
3. **Frontend** (web/frontend): React + Vite SPA with real-time monitoring UI

### CLI Tool (cli.js)
- **Purpose**: Discovers and connects to running Platformatic runtimes using `@platformatic/control`
- **Entry point**: `cli.js` (executable, can be installed globally as `watt-admin`)
- **Key features**:
  - Auto-discovers runtimes via `RuntimeApiClient`
  - Interactive runtime selection with `@inquirer/prompts`
  - Launches admin dashboard against selected runtime
  - Supports flags: `--port`, `--record`, `--profile` (cpu/heap)
- **Recording mode**: Can capture metrics/flamegraphs and generate offline HTML bundles

### Wattpm Configuration (watt.json)
Defines the multi-app structure:
- **Entrypoint**: `composer` (gateway on port 4042 by default)
- **Backend**: `/api` prefix, TypeScript with `--import=amaro/strip`
- **Frontend**: `/` prefix (root path)
- **Composer**: Routes between backend API and frontend assets

### Backend Architecture (web/backend)
- **Framework**: Fastify with `@fastify/type-provider-json-schema-to-ts` for type-safe routes
- **Main routes**:
  - `routes/root.ts`: Core API endpoints (`/runtimes`, `/runtimes/:pid/services`, `/record/:pid`)
  - `routes/ws.ts`: WebSocket endpoint for live log streaming (`/runtimes/:pid/logs/ws`)
  - `routes/metrics.ts`: Metrics proxy endpoints
  - `routes/proxy.ts`: Generic proxy to runtime services
- **Plugins**:
  - `plugins/metrics.ts`: Interval-based metrics collection using `RuntimeApiClient`
  - `plugins/websocket.ts`: WebSocket server setup
- **Key utilities**:
  - `utils/runtimes.ts`: Runtime discovery and PID management
  - `utils/metrics.ts`: Metrics fetching and aggregation
  - `utils/states.ts`: State machine for recording modes
- **Testing**: Node.js test runner with `--experimental-test-module-mocks`

### Frontend Architecture (web/frontend)
- **Framework**: React 19 with TypeScript, React Router v7 (HashRouter)
- **Build tool**: Vite with `vite-plugin-singlefile` (generates single-file HTML for offline mode)
- **State management**: Zustand (`useAdminStore.ts`)
- **Key state**: `runtimePid`, `mode` (live/load), `record` (start/stop), navigation breadcrumbs
- **Main routes**:
  - `/` (HOME_PATH): Application details overview
  - `/services` (POD_SERVICES_PATH): Service metrics charts
  - `/logs` (POD_LOGS_PATH): Real-time service logs
  - `/flamegraph` (POD_FLAMEGRAPH_PATH): CPU/heap flamegraph visualization
- **Components structure**:
  - `components/application/`: App overview, metrics display
  - `components/services/`: Service charts, logs, flamegraphs
  - `components/application-logs/`: Log filtering and display
  - `layout/`: Navigation, header, containers
- **Real-time data**: WebSocket connection via `react-use-websocket` for live logs
- **Testing**: Vitest for unit tests, Playwright for E2E tests

### API Communication
- **Backend client**: Auto-generated from OpenAPI spec using `massimo-cli` (stored in `web/frontend/src/client/`)
- **Generation flow**:
  1. Backend exposes OpenAPI via Fastify
  2. `npm run client:openapi` extracts spec to `web/backend/openapi.json`
  3. `npm run client:generate` creates TypeScript client with types
- **RuntimeApiClient**: Used by backend to communicate with target Platformatic runtimes

### Recording/Offline Mode
- **Purpose**: Capture runtime metrics/profiling data for offline analysis
- **Flow**:
  1. Start recording: CLI flag `--record --profile cpu|heap`
  2. Backend calls `startApplicationProfiling` on all applications
  3. Collects metrics at intervals (defined in MS_WAITING constant)
  4. On SIGINT: Stops profiling, saves .pb files, embeds data in HTML bundle
  5. Opens standalone HTML with embedded metrics/flamegraph data in `window.LOADED_JSON`

## Code Style Guidelines
- **Formatting**: neostandard via ESLint (strict mode, TypeScript enabled)
- **TypeScript**:
  - Explicit types for function params and returns
  - Use interface/type for complex structures
  - Backend uses `JsonSchemaToTsProvider` for route typing
- **Imports**: Group related imports, alphabetize within groups
- **Naming**: camelCase for variables/functions, PascalCase for components/classes/interfaces/types
- **Error Handling**:
  - Backend: Use `fastify.log` for logging, try/catch for async
  - Frontend: Error boundaries with `use-error-boundary`
- **React**:
  - Functional components with hooks only
  - Return type `React.ReactElement` for components
  - Use Zustand for global state
- **Testing**:
  - Backend/CLI: Node.js test module (`--test` flag)
  - Frontend: Vitest for unit, Playwright for E2E
  - Test files use `.test.ts` extension

## Important Development Notes
- **TypeScript transpilation**: Backend uses `amaro/strip` for fast TypeScript stripping (no type checking at runtime)
- **Module mocking**: Tests use `--experimental-test-module-mocks` flag
- **Hot reload**: Both frontend and backend support watch mode in dev
- **Build artifacts**: Always in `web/*/dist` directories
- **Environment**: Uses `.env` file (copy from `.env.sample`)
- **Platformatic versions**: All Platformatic packages use same version (3.15.0+)
