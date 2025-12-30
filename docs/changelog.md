# Changelog

All notable changes to basestation are documented here.

## Unreleased

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
