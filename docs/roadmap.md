# Roadmap

This roadmap translates our mission into small, shippable milestones.

## Current State

- **Current release**: v0.1.0 (2025-12-30)
- **What exists**: product + marketing surfaces, auth seam, auth-gated app shell, basic UI styling
- **What’s missing**: real user journeys, real data sources, real persistence, real auth provider

## Principles

- **Ship small**: milestones should be 1–2 weeks of work.
- **Human-in-the-loop**: agents propose and implement; product decisions stay explicit.
- **Keep seams**: prefer adapter boundaries (`libs/auth`, future data adapters) over hard vendor lock-in.
- **Document as we go**: update `docs/activity-log.md` + `docs/changelog.md` as part of wrap-up.

## Milestones

### M0 — Define outcomes (next)

**Goal**: replace placeholders in `docs/mission.md` with concrete outcomes and success metrics.

**Deliverables**:
- Mission outcomes and non-goals are written (1–3 each)
- Next milestone date/objective set

**Success metrics** (examples; pick real numbers):
- Time-to-first-value (TTFV): < 10 minutes
- Weekly active usage: <target>
- Connected sources per user: <target>

---

### v0.2.0 — GitHub sign-in + first integration + repos widget

**Goal**: deliver the first end-to-end “data → information” loop for developers.

**In scope**:
- Sign in with GitHub (as the first auth provider)
- Marketplace contains 1 integration: GitHub
- User can enable/disable GitHub integration
- Dashboard shows a basic “Repos” widget
- Profile/Settings pages exist (even if minimal) so the user menu is real

**Out of scope**:
- Billing, teams, permissions
- Multiple integrations
- Deep analytics, complex search

**Definition of done**:
- A new user can: sign in → enable GitHub → see repos widget
- Clear empty/error states
- Unit tests cover the core UI flow

---

### v0.3.0 — GitHub ingestion + persistence (MVP)

**Goal**: make the GitHub integration robust enough to build on.

**Deliverables**:
- A GitHub data adapter boundary (new `libs/github` or `libs/integrations/github`)
- Minimal persistence for fetched entities (repos first)
- “Refresh” behavior and a basic “last synced” indicator

**Definition of done**:
- Repos widget can load from persisted data and refresh from GitHub
- Tests cover adapter + persistence boundary

---

### v0.4.0 — Chat over imported data (thin slice)

**Goal**: make the chat panel do something real with the imported dataset.

**Deliverables**:
- A single “ask” flow that answers questions over the imported data set
- Guardrails for empty/error states

**Out of scope**:
- Complex agent workflows, tool plugins, multi-source joins

---

### v1.0.0 — Real auth provider + security posture (target)

**Goal**: swap local auth placeholder for a production-grade provider behind `libs/auth`.

**Deliverables**:
- Real auth provider integration via the existing adapter seam
- Session handling, logout, and basic security review checklist
- Documented threat model and security assumptions

## Risks / Open Decisions

- **Auth provider**: GitHub-first is a strong wedge, but it narrows the initial audience.
- **Data model**: “hub” can grow quickly; keep the first source intentionally narrow.
- **Privacy/security**: connecting personal accounts demands explicit security posture early.
