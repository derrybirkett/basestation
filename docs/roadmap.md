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

### v0.2.0 — Real navigation + account basics

**Goal**: turn the app shell into a usable surface with minimal routing.

**In scope**:
- Add routes/pages for **Profile** and **Settings** (so the user menu is real)
- Basic “session” display + sign-out works reliably
- Marketing → App handoff remains clear (CTA to app)

**Out of scope**:
- Billing, teams, permissions
- Deep settings (only placeholders where needed)

**Definition of done**:
- UI routes exist and are reachable from the user menu
- Unit tests updated for the new routes

---

### v0.3.0 — First data source (MVP)

**Goal**: connect one real data source end-to-end and show the data in the app.

**In scope (pick one)**:
- Google (Gmail/Calendar/Drive), GitHub, or a CSV import

**Deliverables**:
- A provider adapter boundary (new `libs/data-*` or similar) to avoid hard-coding a single source
- Minimal data model for “items” we can list/search
- A simple UI: connect source → see imported items

**Definition of done**:
- One-click “connect” flow in UI (even if developer-mode initially)
- Data is visible in the product surface
- Tests cover adapter and UI happy path

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

- **Auth provider**: pick a provider (or keep local for longer) before investing deeply.
- **Data model**: “hub” can grow quickly; keep the first source intentionally narrow.
- **Privacy/security**: connecting personal accounts demands explicit security posture early.
