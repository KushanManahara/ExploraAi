# ExploraAi

An AI research workspace for your own papers. Upload research PDFs, ask questions across them, and get answers grounded in the text, with page-level citations you can check. Compare papers to find missing findings, conflicting results and differences in methodology. An optional web search fills gaps, always labelled separately from evidence in your papers. When the evidence isn't there, it says so.

> **Status: early development.** The project is being rebuilt from a 2024 prototype. Right now the repository holds the foundations only: project skeleton, tooling, CI and security scanning. There's no usable app or hosted version yet.

## Repository layout

| Path | What it is |
|---|---|
| `apps/web` | Next.js web app (TypeScript) |
| `apps/api` | FastAPI service (Python) |
| `apps/worker` | Background worker for paper processing (Python) |
| `packages/core` | Shared Python code |
| `supabase/migrations` | Database migrations (added in the next milestone) |
| `docs/` | Implementation plan: architecture, milestones, decisions |
| `context/` | Short project status and handoff notes |
| `logs/` | Dated audit and milestone records |
| `design/claude-design/` | Reference snapshot of the design system (not MIT-licensed, see [Licensing](#licensing)) |
| `legacy/` | Frozen 2024 prototype, kept for reference only; not built or deployed |

## Development

### Requirements
- **Node.js 24 LTS** with Corepack. Corepack provides the pinned pnpm version and checks its integrity hash.
- **Python 3.14** and **uv** 0.11.x.

### Set up
```sh
corepack enable
pnpm install --frozen-lockfile
uv sync --all-packages --locked
```

### Checks (the same ones CI runs)
```sh
# Python
uv run ruff check .
uv run ruff format --check .
uv run mypy
uv run pytest

# Web
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm build
```

## Plan and status
- [Implementation plan](docs/implementation-plan.md): goals, architecture, milestones and decisions.
- [Project context](context/project-context.md): current status and next steps.
- [Logs](logs/): dated audit findings and milestone records.

## Security
Please report vulnerabilities privately. See [SECURITY.md](SECURITY.md).

## Licensing
The original project code is released under the [MIT License](LICENSE). Personal branding, portfolio content, screenshots and third-party assets, including everything in `design/claude-design/`, are **excluded**, and the fonts keep their own licence. See [LICENSING.md](LICENSING.md) for details.
