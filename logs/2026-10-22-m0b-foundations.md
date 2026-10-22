# 2026-10-22 — M0b foundations log

Milestone M0b (plan §10.1), run one step at a time with owner approval before each commit and push. **No pushes until Step 6** (owner decision), so the public repository has a root README before the legacy move is published.

## Step 1 — legacy move (commit `d4eeec8`, local)
- `README.md`, `__init__.py`, `app.py`, `main.py`, `markdown_utils.py` and `requirements.txt` moved into `legacy/` with `git mv`. Git records all six as pure renames (100% similarity).
- All 7 baseline files matched the M0a SHA-256 fingerprints before and after the move.
- Added `legacy/NOTICE.md` (frozen, not built or deployed).
- Added `legacy/.gitignore`, a byte-identical copy of the original root `.gitignore`. The root file was kept in place so `.env` and `venv` stayed ignored until Step 3.

## Step 2 — skeleton (commit `f765d07`, local)
- Added `packages/core` (shared health helper), `apps/api` (FastAPI `GET /health`), `apps/worker` (health-check entry point) and `apps/web` (Next.js, placeholder page, `/api/health`).
- Added `supabase/migrations/` (empty), a uv workspace, a pnpm workspace and both lockfiles.
- Results: 4 pytest + 1 Vitest passed; `next build` passed.
- **Toolchain** (installed only inside the session container):
  - Python 3.14.6 via uv.
  - Node.js 24.22.1 LTS from nodejs.org, checked against the official `SHASUMS256.txt`. The GPG signature was not checked.
- Next.js rewrote `apps/web/tsconfig.json` during the build (added `allowJs` and one include path). It does this on every build, so its version is kept.

## Step 3 — tooling (this step)

### Changes
- **Root `.gitignore`** replaces the original prototype rules, which are preserved in `legacy/.gitignore`.
  - Blocks `.env` and `.env.*`, but allows `.env.example`.
  - Covers Python and Node build output and caches.
  - Checked: `.env`, `apps/api/.env` and `apps/web/.env.local` are ignored; `apps/api/.env.example` is tracked.
- **Package-manager pins:**
  - `packageManager: pnpm@10.28.0+sha512.<hash>`, with the integrity hash taken from the npm registry.
  - `engines` set to Node `>=24 <25` and pnpm `10.28.0`; `.npmrc` sets `engine-strict=true`.
  - uv pinned with `required-version = ">=0.11.32,<0.12"`.
- **Python tooling** (root `pyproject.toml`):
  - Ruff 0.17.1 for linting and formatting. Rules: F, E, W, I, UP, B, SIM, S (security), RUF. Excludes `legacy/` and `design/`.
  - Strict mypy 2.4.0, covering the tests as well.
  - pytest 9.1.1.
- **Web tooling** (`apps/web`):
  - ESLint 10.13.0 with `eslint-config-next` 16.4.2 (Core Web Vitals + TypeScript rules), failing on any warning.
  - Prettier 3.9.10 (print width 100).
  - `tsc --noEmit`, plus the existing Vitest.
- **Other files:**
  - Root scripts: `lint`, `typecheck`, `format`, `format:check`, `test`, `build`.
  - `.editorconfig`, with `legacy/` and `design/` left alone.
  - `.env.example` for the API, worker and web, listing **variable names only**.

### Decisions taken in this step (for owner review)
1. **TypeScript 7.0.2 → 6.0.3.**
   - 🔵 `typescript-eslint` 8.72.0 (published 2026-10-21) supports TypeScript `>=4.8.4 <6.1.0`. `eslint-config-next` needs it for its TypeScript rules.
   - 6.0.3 is the newest supported version, and `next build` passes with it.
   - Revisit when `typescript-eslint` supports TypeScript 7.
2. **ESLint 10.13.0, not 9.**
   - 🔵 ESLint 9 reached end of life on 2026-08-06 and gets no security fixes.
   - `eslint-plugin-react`, `eslint-plugin-import` and `eslint-plugin-jsx-a11y` still declare peer ranges ending at ESLint 9.
   - Tested on ESLint 10: all six plugins load, 86 rules are active, and probe code triggered rules from every plugin. Probe rules: `@typescript-eslint/no-explicit-any`, `react-hooks/rules-of-hooks`, `@next/next/no-img-element`, `jsx-a11y/alt-text`, `react/jsx-key`, `import/no-anonymous-default-export`.
   - The peer warning is allowed in `pnpm-workspace.yaml` for those three plugins only. Remove the exception once they declare ESLint 10 support.
3. **pnpm stays on 10.28.0.** 12.14.0 is available but is two major versions newer; upgrading is a separate decision.
4. **`apps/web/tsconfig.json` is excluded from Prettier.** Next.js owns its formatting and rewrites it on build.

### Open item: `httpx` deprecation (owner decision: keep for now)
- Starlette's test client warns: *"Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead."*
- 🔵 `httpx2` 2.16.0 is published by the Pydantic organisation, authored by the original `httpx` author, and listed in Starlette 1.9.0's optional dependencies.
- In Step 2, switching to it was blocked by the session's permission policy (new third-party package). The owner decided to keep `httpx==0.28.1` for now.
- Effect today: one warning in the test output; all tests pass.
- To revisit when Starlette removes `httpx` support, or on owner approval.

### Check results (Step 3)
| Check | Result |
|---|---|
| `ruff check .` | All checks passed |
| `ruff format --check .` | 14 files already formatted |
| `mypy` (strict) | No issues in 10 source files |
| `pytest` | 4 passed (1 `httpx` deprecation warning) |
| `pnpm lint` (ESLint 10, `--max-warnings=0`) | Passed |
| `pnpm typecheck` (TypeScript 6.0.3) | Passed |
| `pnpm format:check` (Prettier) | Passed |
| `pnpm test` (Vitest) | 1 passed |
| `pnpm build` (`next build`) | Passed |
| Peer-dependency warnings after the scoped rule | None |
| `legacy/` | 7/7 fingerprints match, 0 changed lines |
| `design/` | 107/107 checksums match, 0 changed lines |

### Cost
- $0. No external resources, settings or services changed.
