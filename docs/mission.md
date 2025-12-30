# Mission: basestation

## Who It Serves
- **Primary user**: Developers who want their GitHub activity turned into actionable information

## Problem We Solve
Developers have plenty of data (repos, issues, PRs, reviews, activity), but it’s scattered and hard to
turn into meaning, insights, and next actions.

## Solution Overview
Basestation gathers a user’s data sources into a hub, then serves that data back as information.

We’ll evolve in phases:
1. **Gather**: connect sources and ingest data
2. **Study**: summarize, highlight patterns, and extract meaning
3. **Guide** (later): use information to help users achieve their goals

**Differentiator**: Connect data and use AI chat to turn data into useful information (info over data).

**First wedge**: GitHub-first. Sign in with GitHub, connect the GitHub integration, and surface a small
dashboard widget (repos) as the first “information” surface.

## Project Type
Web application

## Why It Matters (Vision & Outcomes)
- **Vision (12–24 months)**: A personal “information base” where a developer can understand what’s
  happening across their tools, what changed, and what to do next.
- **Outcomes**:
  1. Users can connect a source quickly and see meaningful summaries/widgets.
  2. Users can ask questions about their data and get reliable, grounded answers.
  3. The system can gradually recommend next actions toward user-defined goals.
- **Success metrics (initial)**:
  - Time to first value (TTFV): < 5 minutes from sign-in to seeing a GitHub repos widget
  - Activation: 50%+ of signed-in users connect GitHub integration
  - Engagement: 30%+ weekly return rate (early stage)
  - Insight quality: <define a simple rating prompt later>

## Non-Goals
- Multi-user teams / org admin (initially)
- Billing and pricing (initially)
- Full “BI dashboards” or arbitrary analytics builder
- Supporting many integrations at once before the first one is solid

## Current Status
- **Lifecycle stage**: Early build
- **Next milestone**: v0.2.0 — GitHub sign-in + GitHub integration toggle + dashboard repos widget
