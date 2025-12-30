# basestation

One place to pull all data sources into a hub.

## Problem

Too many digital accounts; logging in and out to get all my info and make it useful.

## Solution

Web application that one place to pull all data sources into a hub.

**What makes it different**: Connect data and use AI chat to turn data into useful information (info over data).

## Documentation

This project uses `.pip` as an immutable template (genome):
- `.pip/` - Framework templates and guides (DO NOT MODIFY)
- `docs/` - This project's actual documentation

### Project Documentation
- [Mission](./docs/mission.md) - Project purpose and vision
- [Activity Log](./docs/activity-log.md) - Historical record of changes
- [Changelog](./docs/changelog.md) - User-facing release notes

### Framework Documentation  
- [.pip Framework](./.pip/README.md) - Framework overview
- [Using .pip as Genome](./.pip/docs/using-pip-as-genome.md) - Detailed usage guide
- [Fragment System](./.pip/docs/fragments-guide.md) - Infrastructure scaffolding

## Getting Started

```bash
pnpm install

# Start local dev infrastructure (Docker Compose)
pnpm nx run infra:up

# Start the product app surface
pnpm nx serve app

# Start the marketing surface
pnpm nx serve marketing
```

## Status

✅ **v0.1.0** - Initial product surfaces + auth gating (2025-12-30)

---

**Primary User**: Digital nomads  
**Project Type**: Web application
