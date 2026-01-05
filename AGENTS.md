# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Nx + pnpm.
- Apps: `apps/app` (product UI), `apps/marketing` (marketing site).
- Libraries: `libs/auth` (shared code). Add new libs for reusable logic.
- Tooling/infra: `tools/infra` (Nx targets for Docker Compose).
- Docs live in `docs/`; framework templates live in `.pip/` (immutable — do not modify).

## Build, Test, and Development Commands
- Install deps: `pnpm install`
- Run dev app: `pnpm nx serve app` (marketing: `pnpm nx serve marketing`)
- Build: `pnpm nx build app` (outputs to `dist/apps/app`)
- Test: `pnpm nx test app` (Vitest + jsdom)
- Lint: `pnpm nx lint app`
- Run many: `pnpm nx run-many -t build,test,lint`
- Dev infra: `pnpm nx run infra:up` | logs: `pnpm nx run infra:logs` | down: `pnpm nx run infra:down`

## Coding Style & Naming Conventions
- Language: TypeScript, React 19, Vite.
- Formatting: Prettier 3 (2‑space indent). Run `pnpm prettier -w .`.
- Linting: ESLint 9 with Nx boundaries; fix issues before PRs.
- Naming: files/folders kebab-case (`user-profile.tsx`); React components PascalCase (`UserProfile`).
- Module boundaries: keep shared logic in `libs/*`; avoid cross‑app imports.

## Testing Guidelines
- Framework: Vitest + @testing-library/react.
- Location/patterns: co‑locate tests with source; use `*.spec.*` or `*.test.*` (see `vite.config.mts`).
- Coverage: v8 provider, output in `coverage/apps/<name>`.
- Run all tests: `pnpm nx run-many -t test`.

## Commit & Pull Request Guidelines
- Commit format: `<type>: <subject>` (≤50 chars). Types: `feat, fix, docs, style, refactor, perf, test, chore`.
- Branching: `feat/<short-desc>` (don’t commit to `main`).
- PRs must include: purpose, linked issues, screenshots for UI, test plan, and updates to `docs/activity-log.md` (+ `docs/changelog.md` if user‑facing).

## Security & Configuration Tips
- Keep secrets out of Git; prefer local `.env` files and Docker Compose overrides.
- Ensure Docker is running before `infra:*` targets.
- Treat `.pip/` as read‑only; project docs belong in `docs/`.

