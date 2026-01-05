# Changelog

All notable changes to basestation are documented here.

## Unreleased

### Added
- Agentic workflow playbook (`docs/agentic.md`)
- Roadmap (`docs/roadmap.md`)
- Minimal GitHub OAuth backend + repos API (`apps/api`)
- Local env template for OAuth testing (`.envrc.example`)
- Contributor guidelines (`CONTRIBUTING.md`) and agent repo guidance (`AGENTS.md`)
- Scheduled genome update PR automation for `.pip` (`.github/workflows/genome-update.yml`)
- Safe `.pip` defaults via `.piprc` (`PIP_MODE=propose`, `PIP_ACTION_MODE=confirm`)

### Changed
- Updated mission and product graph to a GitHub-first wedge (sign-in → enable integration → repos widget)
- Repos widget can show “Connect GitHub” and fetch real repos via the backend (dev-proxied through Vite)
- Bumped `.pip` submodule to include first-class `.piprc` + execution modes

## 2025-12-30 — v0.1.0

### Added
- Marketing surface app (`apps/marketing`)
- Auth boundary library seam (`libs/auth`)
- Product surface graph docs (`docs/graph/*`)
- Landing page with sign-in entry point
- Auth-gated app surface with top-right user menu (Profile/Settings/Logout)

### Changed
- Product app surface moved from `web/` to `apps/app/`
- Added minimal Base UI styling for input/button
- Removed legacy `web/` leftovers

## 2025-12-30 — Project Bootstrap

### Added
- Initial mission + docs scaffold
- Nx workspace baseline
- Docker dev infrastructure targets (Postgres + n8n)
