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

## Step 4 — CI workflow (this step)

### Changes
- `.github/workflows/ci.yml` with two jobs on `ubuntu-24.04` (15-minute timeout each), running on pushes to `master` and `claude/**` and on pull requests:
  - **python:** `uv sync --locked`, `ruff check`, `ruff format --check`, strict `mypy`, `pytest`.
  - **web:** `pnpm install --frozen-lockfile`, ESLint, `tsc --noEmit`, Prettier check, Vitest, `next build`.
- `.github/ci/uv-requirements.txt`: uv 0.11.32 pinned by SHA-256 (PyPI manylinux x86_64 wheel), installed with `--require-hashes --only-binary=:all:`.

### Security choices
- Workflow-wide `permissions: contents: read`. No secrets used. Caching off, including `setup-node`'s automatic package-manager cache (`package-manager-cache: false`), to avoid cache poisoning.
- **Only GitHub-authored actions**, each pinned to a full commit SHA. Each was checked by cloning the release tag and confirming that HEAD equals the pinned SHA, and by reading its `action.yml`:
  - `actions/checkout` v7.0.1 → `3d3c42e5aac5ba805825da76410c181273ba90b1` (`persist-credentials: false`, so the token isn't left in the checkout)
  - `actions/setup-python` v7.1.0 → `6d4fd22b20465ccc0f7354476588e8df7c9ca0e0`
  - `actions/setup-node` v7.1.0 → `949feb2413d6458794dcd2491c4babbbce0c15c1`
  - All three run on `node24`.
- **No third-party actions.**
  - pnpm comes from Corepack, which is bundled with Node 24 and enforces the `packageManager` integrity hash.
  - uv comes from PyPI with a hash check.
  - This keeps the CI supply chain to GitHub's own actions plus hash-verified downloads (lesson from CVE-2026-33634).
- No `${{ }}` expressions inside `run:` commands (no injection path). Versions come from `.python-version` and `.node-version`.

### Validation (local, no GitHub run yet)
| Check | Result |
|---|---|
| YAML parse (Ruby Psych) | Valid after one fix: the `pip install … --only-binary=:all: …` line needed quoting (`: ` inside a plain YAML value) |
| Every `uses:` pinned to a 40-character SHA with a version comment | Yes |
| Python job dry run (fresh tree copy, fresh venv, hash-pinned uv) | All steps passed |
| Web job dry run (fresh copy, Corepack-provided pnpm 10.28.0, frozen lockfile) | All steps passed |
| Corepack with a deliberately wrong hash | Refused ("Mismatch hashes"); the computed real hash equals the pinned one |
| pip with a deliberately wrong uv hash | Refused; the computed real hash equals the pinned one |

- The first real CI run happened at the Step 6 push. Result in "Push and first CI run" at the end of this log.
- Trivy security scanning is Step 5.

### Cost
- $0. GitHub Actions is free on standard runners for public repositories.

## Step 5 — Trivy security scanning (this step)

### Scanner selection and verification
- 🔵 Latest release: **v0.76.1** (2026-10-21). The malicious v0.69.4–v0.69.6 tags no longer exist in the repository.
- **Chosen: v0.76.0** (released 2026-10-14). v0.76.1 only backports dependency bumps (AWS, Docker and common groups) and has no changes to Trivy itself, so the older release gives 8 days of public soak time.
- Verification of the v0.76.0 Linux x64 tarball:
  1. SHA-256 `e24b1c51293c1b15e4ba8d45bbc7891ba053f90278ec2698f3562c993e145fe7` matches the release `checksums.txt`.
  2. **Sigstore signature verified with cosign v3.1.4** (cosign binary checked against its own release checksums).
     - Identity required: `^https://github.com/aquasecurity/trivy/.github/workflows/[^@]+@refs/tags/v0.76.0$`
     - Issuer required: `https://token.actions.githubusercontent.com`
     - Result: "Verified OK", with a Rekor transparency-log entry.
     - v0.76.1 was verified the same way (signer `reusable-release.yaml@refs/tags/v0.76.1`).
- CI downloads the tarball and checks it against the **pinned SHA-256** of that verified file, so it gets exactly these bytes or fails.

### CI `security` job (no secrets, read-only token)
1. Install Trivy (pinned version and SHA-256, `sha256sum --check --strict`).
2. **New code, blocking:**
   - Vulnerabilities, **including dev dependencies** (the CI runs those tools), plus misconfigurations.
   - Fails on HIGH or CRITICAL. Skips `legacy/` and `design/`. Uses `.trivyignore.yaml`.
3. **Secret scan of the entire repository, blocking:** includes `legacy/` and `design/`, and uses `trivy-secret.yaml` (see below).
4. **`legacy/`, report-only** (D31): HIGH and CRITICAL listed, never blocks.

All Trivy calls use `--skip-version-check --disable-telemetry`. 🔵 Trivy sends anonymous usage data to Aqua unless telemetry is disabled.

### Finding and exception (for owner review)
- 🔵 **CVE-2026-93687**, `braces` 3.0.3, HIGH (CVSS 7.5): denial of service from deeply nested brace patterns. Published 2026-09-18. **No fixed version.**
- Path: dev-only, `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`. Not in the production app.
- The patterns come from our own lint config, so the realistic risk is low.
- Handled with a **narrow, expiring exception** in `.trivyignore.yaml`: this CVE, purl `pkg:npm/braces@3.0.3` only, `expired_at: 2026-11-22`, with a written justification. Dev dependencies stay blocking for any other finding.
- Tested: with the exception file removed, the gate fails. With an expiry date in the past, the gate fails.

### Secret-scan gap found and fixed
- Planting fake GitHub tokens showed that Trivy's **built-in allow rules skip** Markdown files, test files, `examples` paths and `.env.example` files. Those are exactly where this public repo is most likely to leak a key: the docs and logs, the tests and the templates.
- `trivy-secret.yaml` turns off the `markdown`, `tests` and `examples` allow rules. Rule IDs were read from Trivy v0.76.0 source (`pkg/fanal/secret/builtin-allow-rules.go`).
- Probe: before the fix, 3 of 14 planted tokens were detected; after, **14 of 14**.
- The strict scan of the real repository reports **no secrets and no false positives**.

### Validation
| Check | Result |
|---|---|
| YAML parse; all `uses:` pinned to SHAs | Valid; yes |
| Security job from a **cold cache** (fresh tree copy, steps run one shell each, as on GitHub) | All 4 steps pass, including the vulnerability-DB download |
| New-code scan | 0 HIGH/CRITICAL (1 suppressed by the documented exception) |
| Whole-repo strict secret scan | 0 findings |
| `legacy/` report | 108 HIGH/CRITICAL (6 CRITICAL) across 18 packages, shown and not blocking |
| Negative: exception removed | Gate fails (exit 1) |
| Negative: fake tokens in `docs/implementation-plan.md` and `apps/api/.env.example` | Secret gate fails (exit 1), both files reported |
| Misconfiguration scanner | No supported config files yet (no Dockerfile or IaC). Trivy doesn't analyse GitHub workflow files. |

### Cost
- $0. Trivy and its vulnerability database are free. No external resources, settings or services changed.

## Step 6 — README, security policy and licence (this step)

### Changes
- `README.md` (new root README): purpose, early-development status, repository layout, requirements, set-up and check commands (the same as CI), links to the plan, context and logs, and short security and licensing notes. No private operational details.
- `SECURITY.md`:
  - private reporting through GitHub's "Report a vulnerability", with a no-details fallback issue until that's enabled in the GH settings step;
  - what to include, with no guaranteed response times (single maintainer);
  - scope (`legacy/` frozen, not patched);
  - a summary of the repository's protections.
- `LICENSE`: the **standard, unmodified MIT text** with `Copyright (c) 2024-2026 Kushan Manahara`, so licence detection works.
- `LICENSING.md`: the scope note.
  - MIT applies only to original project code, including `legacy/`.
  - Excluded: everything in `design/claude-design/` (personal branding, portfolio text, UI kit, screenshot).
  - Fonts keep the **SIL Open Font License 1.1**. 🔵 Verified 2026-10-22 from `google/fonts` (`ofl/familjengrotesk`, `ofl/splinesansmono`: METADATA `license: "OFL"`, `OFL.txt` copyright lines).
  - Third-party dependencies keep their own licences.
- `context/project-context.md`: status updated to M0b steps 1–6, open review items, next steps.

### Notes
- The root README was missing between Step 1 and Step 6. That's why the push was held until now: published history moves from the old README straight to this one.

## Push and first CI run
- **Push:** 6 commits (`d4eeec8`, `f765d07`, `62b3635`, `09c14ed`, `542d622`, `5be90e2`) to `claude/sharp-ride-8yerle`, moving the branch from `9edb334` to `5be90e2`. Only the designated branch was used.
- **First CI run:** GitHub Actions run #1 (`39717137795`) on `5be90e2`: **success**.

| Job | Result |
|---|---|
| Python (ruff, ruff format, mypy strict, pytest) | Success |
| Web (eslint, tsc, prettier, vitest, next build) | Success |
| Security (Trivy: verified install, new-code gate, whole-repo secret scan, legacy report) | Success |

- Hosted runners behaved as the local dry runs predicted. No fixes were needed.
- **M0b is complete.**
