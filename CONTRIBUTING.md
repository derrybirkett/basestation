# Contributing

Thank you for helping improve this project! This repo uses Nx + pnpm and follows a lightweight, automation-friendly flow.

## Start Here
- Read: [AGENTS.md](./AGENTS.md) for repository guidelines (structure, commands, testing, PR rules).
- Docs live in `docs/`; framework templates live in `.pip/` (read-only). Update:
  - `docs/activity-log.md` (always)
  - `docs/changelog.md` (if user-facing)

## Quick Start
```bash
pnpm install
pnpm nx serve app         # product app at http://localhost:4200
# or
pnpm nx serve marketing   # marketing at http://localhost:4201
```

## Common Tasks
- Lint: `pnpm nx lint app` (or `marketing`)
- Test: `pnpm nx test app` (Vitest + jsdom)
- Build: `pnpm nx build app`
- Infra (Docker): `pnpm nx run infra:up` | `infra:logs` | `infra:down`

## Branch, Commits, and PRs
- Branch naming: `feat/<short-desc>` (do not commit to `main`).
- Commit format: `<type>: <subject>` using types in AGENTS.md.
- PRs must include: context/purpose, linked issues, screenshots (UI), test plan, and doc updates.

## Code Style
- TypeScript + React 19, Vite.
- Prettier 3 (2 spaces): `pnpm prettier -w .`
- ESLint 9 + Nx boundaries; keep shared logic in `libs/*`.

## Security
- Do not commit secrets. Use local `.env` and Docker Compose overrides.
- Treat `.pip/` as immutable templates; use `docs/` for project-specific docs.

Happy shipping!
