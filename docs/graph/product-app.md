# Product App

> Copied from `.pip/graph/product-app.md` — customize for basestation.

## Core Flows

### Auth: GitHub Sign-In
- Provider: GitHub OAuth
- Login: “Continue with GitHub”
- Session: single-device session to start (expand later)
- Security (initial): least-privilege scopes, revoke/disconnect, basic rate limiting

### Logged-in App: Key Journeys
- Onboarding: welcome + “connect GitHub” prompt

#### Primary job-to-be-done 1: Connect GitHub and see repos
- Steps:
  1. Sign in with GitHub
  2. Enable the GitHub integration in Marketplace (only integration for now)
  3. See “Repos” widget on dashboard with basic repo list
- Entry points:
  - Dashboard CTA (“Connect GitHub”)
  - Marketplace page (“Enable GitHub”)
- Success criteria:
  - Time to first value: < 5 minutes
  - Repo widget loads with non-empty state (or a clear empty/error state)
- Key surfaces:
  - Dashboard
  - Marketplace

#### Primary job-to-be-done 2 (next): Ask questions about GitHub data
- Examples:
  - “What did I work on this week?”
  - “Which repos have the most open PRs?”
- Entry points: Chat panel
- Success criteria: answer is grounded in fetched data; clear citations/links (phase)
- Key surfaces: Chat

### Main Sections
- Dashboard (widgets: repos first)
- Marketplace (list of integrations; GitHub first)
- Settings (profile, basic security, disconnect GitHub)

## Accessibility & Performance
- A11y: keyboard nav, contrast, ARIA, focus order
- Perf: TTI, LCP, FID budgets, code-splitting

## Telemetry
- Events (initial): GitHub sign-in success/fail, enable integration, repos widget viewed
- Dashboards: activation (sign-in → enable integration → widget view), retention
