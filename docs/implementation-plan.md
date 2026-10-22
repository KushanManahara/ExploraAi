# ExploraAi — Implementation Plan

**Status:** v4 — approved by the owner on 2026-10-22
**Companion files:** `context/project-context.md` (status and handoff) · `logs/` (dated evidence).
**Public-repo rule:** this repository is public. Account details, budget thresholds, abuse-control limits and third-party domain records are kept in the owner's private operations notes, never here.

**Legend**
- 🟢 Decision (owner-confirmed)
- 🔵 Verified fact (source in `logs/`)
- 💡 Recommendation
- 🟠 Assumption or not yet verified
- 🔴 Open, needs an owner decision

---

## 1. Goal and starting point

**Goal:** a private AI research workspace. Users can:
- upload PDFs (≤ 20 MB, ≤ 100 pages), processed in the background;
- ask questions across papers, with page-level citations;
- get automatic web search, clearly labelled;
- compare papers;
- get an explicit "insufficient evidence" answer when the evidence isn't there;
- delete papers while keeping the chat text, with affected citations marked unavailable.

It also needs persistent private workspaces, reliable background jobs, and usage and cost limits.

**Today** (🔵): a 2024 single-user Streamlit prototype (about 140 lines). No auth, persistence, retrieval, citations, tests or CI. Follow-up questions are broken. 27 of 109 pinned dependencies have known advisories.

🟢 **Approach:** clean rebuild in this repository.
- The prototype is kept unchanged in `legacy/` for reference.
- It is removed only after the new app is verified **and** the owner explicitly approves.
- No legacy code is carried forward.

---

## 2. Architecture

```
Browser ──► Next.js web app (Vercel, functions in Frankfurt)
   │             │
   │             └──► Supabase Auth (Google sign-in; email links when D26 allows)
   ▼
FastAPI API (free host, Frankfurt — D34) ──► Supabase (Frankfurt): Postgres + pgvector,
   │                                Storage (private), Queues (pgmq)
   ├──► Gemini API (paid tier)      answers, embeddings
   └──► Tavily (optional)           web search, query text only
Python worker (free host, Frankfurt — D34) ──► reads jobs, processes PDFs
```

🟢 **Region:** Frankfurt for the database, API and worker (same region, private networking).

**Data flows that leave Frankfurt** (listed in the privacy notice):

| Flow | Data | Where | Control |
|---|---|---|---|
| Gemini API | Paper chunks, questions, answers | 🔵 Google may cache in any country; abuse logs kept 55 days | Paid tier only; not used to improve Google products |
| Tavily | Short search query, never paper text | 🟠 Outside the EU | Optional; user can turn off |
| Sign-in email (only if a compliant no-cost option exists, D26) | Email address, one-time link | Resend: 🔵 sent from Ireland, account data stored in the US | Links single use, short-lived |
| Google sign-in | Basic Google identity | Google | `openid`, `email`, `profile` only |
| CAPTCHA (Cloudflare Turnstile) | Browser signals | Cloudflare | Sign-in forms only |
| Error tracking (Sentry, optional) | Error metadata, no content | EU region if available (🟠) | Personal data off |

**Main flows:**
1. **Upload.** The browser uploads directly to Storage using a short-lived signed URL. The API then creates the job row and queue message in one transaction.
2. **Processing.** The worker validates the file, extracts text per page, checks text quality, chunks, embeds, and commits the results only if the paper still exists.
3. **Ask.** Quota and budget are reserved, then: rewrite the question → hybrid retrieval → optional web search → structured answer → citation check → stream the answer.
4. **Delete.** Mark the paper deleting, cancel its jobs, delete its rows (cascade), delete the file. Citations are kept and marked unavailable.

---

## 3. Data model (Postgres, RLS on every user table)

| Table | Purpose |
|---|---|
| `papers` | File metadata, status (`pending_upload/queued/processing/ready/ready_with_warnings/needs_ocr/failed/deleting`), `generation` counter |
| `processing_jobs` | **Source of truth for jobs**: status, attempt, lease, error code. Unique `(paper_id, kind, generation)`. |
| `paper_pages`, `chunks` | Page text; chunks with page range, `halfvec` embedding, full-text index |
| `paper_profiles` | Per-paper summary used for comparison |
| `conversations`, `conversation_papers`, `messages` | Chats; message text survives paper deletion |
| `citations` | Paper or web citation. On paper delete: status `unavailable`, snippet cleared, title kept as plain text. |
| `comparisons` | Comparison results |
| `usage_counters` | Per-user daily counts (UTC date) |
| `ai_cost_ledger`, `provider_prices` | Reserve/commit cost records; dated unit prices |
| `app_settings` | Quotas, budgets, model IDs, feature flags (values not published) |

💡 Embeddings: `gemini-embedding-2` at 768 dimensions, compared with 1,536 in M3.

---

## 4. Key behaviours

**Background processing** (🟢 Supabase Queues + durable job records):
- **Idempotent:** a job is claimed with a conditional update, and results are written in one final transaction.
- **Bounded retries:** retryable errors back off, up to 3 attempts by default. Invalid inputs fail immediately.
- **Recovery:** leases and heartbeats; a sweeper re-queues jobs whose worker died; graceful shutdown.
- **Terminal failures:** a user-safe error code, the queue message archived (pgmq has no built-in dead-letter queue), and a Retry button.
- **Deleted papers:** the final commit checks the paper's status and generation, and foreign keys block orphan rows.
- 🔵 Supabase documents `set_vt`, `read_with_poll`, `read_ct`, `archive` and `metrics`. The installed version is checked in M1.

**Scanned PDFs** (🟢):
- Per-page text-quality checks.
- A few unreadable pages → `ready_with_warnings`, with the pages listed.
- Mostly unreadable → `needs_ocr`, never `ready`, and the upload quota is refunded.
- OCR is off behind a feature flag. The future path is Gemini vision on failed pages only, 🟠 about $0.18 per 100 scanned pages.

**Research answers:**
- Hybrid retrieval (vectors + full-text, merged with Reciprocal Rank Fusion).
- Structured output: answer, claims with supporting quotes, insufficient-evidence flag.
- Paper citations show as `[P1 · p.4]`, web citations as `[W1 · domain]`.

**Citation checks:**
- 🟢 Stage 1 at launch: each label exists, belongs to this user and an allowed paper, the page is valid, and the quote fuzzy-matches the source.
- Stage 2 (a claim-support judge) only if evaluation shows it's needed.

**Web search** (🟢 optional):
- Can be switched off for the whole app, and by each user.
- Used only when paper evidence is weak, the question needs recent facts, or the user asks.
- The exact query sent is shown to the user.

**Comparison:** 2–5 ready papers → a matrix of method differences, missing findings and conflicts, with a citation in every cell.

**Insufficient evidence:** shown when retrieval is weak, the model flags it, or too many citations fail. The user is told what was searched and what to try next.

---

## 5. Security and privacy

**Privacy gate** (end of M2, before any real private paper):
1. The Gemini key belongs to a billing-enabled (paid) project. 🔵 The free tier uses content to improve Google products.
2. Terms are re-checked that day and dates recorded.
3. Keys are server-side only, with separate dev and prod keys.
4. An automated test proves no paper text reaches Tavily.
5. Logs hold IDs, counts and error codes only. Never prompts, answers, chunk text, filenames or email addresses.
6. A privacy notice covers the data flows (§2).
7. The service-role key is used only on the servers.

**Application security:**
- JWT verified against Supabase on every request, plus RLS.
- Signed upload URLs; PDF validation with time and memory limits.
- Untrusted-content framing for PDF and web text; no side-effect tools; sanitised markdown.
- CAPTCHA and rate limits on sign-in. Generic sign-in responses (no account enumeration).

**Public repository and supply chain** (🔵 the repo is public; 🔵 Trivy CVE-2026-33634):
- Never commit secrets. `.env.example` files hold variable names only.
- Every GitHub Action is pinned to a full commit SHA.
- CI runs with read-only permissions and no secrets.
- Trivy is installed only from a verified release (checksum); never v0.69.4–0.69.6; never mutable `trivy-action` / `setup-trivy` tags.
- Each document is reviewed for sensitive detail before it is committed.

---

## 6. Cost controls

🟢 A monthly app-wide AI cap, a daily app-wide cap and a per-user monthly cap (values set by the owner, kept private). Gemini and Tavily are tracked separately. Infrastructure costs are separate.

**Enforcement:**
- Reserve the worst-case cost before every paid call, record the actual cost after, release the difference. This happens in one transaction with the quota counter.
- **Fail closed:** refuse paid calls when the ledger can't be written, a price is missing, or totals can't be read. If a provider omits usage data, charge the worst case. Never auto-release a crashed reservation.
- **Soft stop:** pause uploads and comparisons. **Hard stop:** pause all paid AI with a clear message. Reading past chats always works.
- Quotas per user per day (🟢, configurable): 10 prompts, 5 web searches, 3 uploads, 3 comparisons. Reset at 00:00 UTC.
- **Provider backstops** (secondary):
  - a small manually topped-up Gemini prepay balance (🔵 keys stop at $0);
  - an AI Studio spend cap (🔵 experimental);
  - Tavily on its free credits only.
- A manual weekly comparison of ledger vs provider spend during the beta.

**Estimated cost per action** (🔵 prices 2026-10-22; 🟠 token counts measured in M3):

| Action | `gemini-3.5-flash-lite` | `gemini-3.8-flash` now / from 2027-01-01 |
|---|---|---|
| Research prompt | ~$0.009 | ~$0.016 / ~$0.031 |
| Upload (typical 20 pages / max 100) | ~$0.015 / ~$0.045 | same |
| Comparison (3 papers) | ~$0.017 | ~$0.029 / ~$0.059 |
| Typical user per month | ~$0.37 | ~$0.61 / ~$1.13 |

💡 Default answer model: `gemini-3.5-flash-lite`, confirmed in M3.

---

## 7. Hosting and accounts

🟢 **D33 (2026-10-22): free options only.** Every infrastructure service uses a free plan. The only accepted cost is the Gemini API (still capped, §5). Commercial use is not assumed. Nothing paid is created without a new owner decision.

| | Beta (free only, D33) | Before any commercial use (needs a new decision) |
|---|---|---|
| Web | Vercel Hobby, $0 (🔵 non-commercial only) | Vercel Pro, $20/seat |
| API + worker | Free web service (🔴 host to be chosen; see `logs/2026-10-22-m1-cloud.md`) | Paid always-on instances |
| Data | Supabase Free, $0 (🔵 pauses after 1 week without activity, no automatic backups, 500 MB database, 1 GB storage) | Supabase Pro, $25 |
| Email | Resend Free, $0 (only if D26 allows) | Resend or AWS SES |
| AI | Gemini API, pay as you go, capped (§5) | Same |
| **Total infrastructure** | **$0/month** (Gemini usage only) | ~$84–169/month |

🟠 Free-plan trade-offs accepted for the beta: cold starts, a paused database after a quiet week, and no automatic backups. Mitigation: a manual schema-and-data export before risky changes, and the queue's durable job records so work survives restarts.

🟢 Owner-controlled accounts for the beta, with 2FA, scoped keys, spend caps where available, and no autoscaling. Details are in the private notes.

🟢 **Sign-in:** Google sign-in first. Email links are added from the approved subdomain `exploraai.gimhara.com` only when a policy-compliant, no-cost option exists: no extra accounts to get around quotas, and no shared quota (D26). AWS SES is considered only after its expected costs are presented and approved. 🔵 Resend may withdraw its free tier without notice.

---

## 8. Design system and brand

- 🟢 The Claude Design system is the source of truth.
  - 🔵 P0 snapshot in `design/claude-design/` (commit `bddf81f`, 107 files + manifest, checksums verified).
  - It stays unchanged unless a change is approved.
- 🔵 Standalone Claude Design closes on 2026-12-14. 🔴 Owner actions: migrate the design system in Claude, export the project zip, and save any chats you need.
- 🟢 New ExploraAi wordmark and icon. 2–3 options are prepared in M1 for review; the portfolio wordmark is not used.
- Tokens and fonts are copied unchanged into the app. Components are rebuilt as accessible versions. Only the app components needed are added. Scroll choreography, WebGL and orbit motion are dropped.
- 🔵 Source issue: each font family ships one file under several weight names. Fixed in M8.

---

## 9. Technology

| Area | Choice |
|---|---|
| Web | Next.js + TypeScript (strict), Node.js 24 LTS, pnpm, Tailwind mapped to design tokens, Radix-style accessible primitives |
| API / worker | Python 3.14, FastAPI, Pydantic, async psycopg, uv |
| Data | Supabase Postgres, pgvector (`halfvec`), full-text search, Storage, Queues, Auth |
| PDF | `pypdfium2` (permissive licence); no PyMuPDF unless AGPL is accepted |
| AI | Gemini paid tier: `gemini-3.5-flash-lite` (default), `gemini-embedding-2` |
| Quality | Ruff, mypy, pytest; ESLint, Prettier, `tsc`, Vitest |
| CI / security | GitHub Actions (🔵 free for public repos), SHA-pinned; Trivy from a verified release |

---

## 10. Milestones and approval gates

Every milestone: scoped changes only; checks run; report exact commits, changed files, test results, costs and open issues. **Each gate needs explicit owner approval.** Commits and pushes happen only when approved.

| # | Deliverables | Acceptance criteria | Gate |
|---|---|---|---|
| **P0** ✅ | Design-system snapshot | 107/107 checksums match; commit touches only `design/claude-design/` | 🟢 Fully approved 2026-10-22 |
| **M0a** ✅ | Read-only readiness audit | Findings in `logs/`; no repo or service changes | Done 2026-10-22 |
| **Docs** | Commit these 4 documents (after redaction review) | Final file list and public summary shown before commit | 🟢 Approved and committed 2026-10-22 |
| **M0b** | Foundations (§10.1) | CI green; legacy checksums match; secret scan clean; $0 | 🟢 Approved; **step by step, approval before each commit and push** |
| **GH** | GitHub security settings (§10.2) | Availability checked first; unavailable or paid items shown to the owner; settings match the approved list | 🟢 Approved after the availability check |
| **Before M1** | Accounts, subscriptions, DNS records, prices re-checked that day | Each item approved individually | 🔴 Approval |
| **M1** | Supabase (Frankfurt), schema + RLS, Auth, JWT checks, pgmq version check; brand options | RLS tests prove user isolation; sign-in works | 🔴 Approval |
| **M2** | Upload, worker pipeline, text-quality checks, retries, deletion | Scanned PDF → `needs_ocr`; worker crash loses or duplicates nothing; delete mid-processing leaves nothing; **privacy gate passed** | 🔴 Approval |
| **M3** | Hybrid retrieval, evaluation set (~10 papers / 100 questions), model bake-off, measured costs | Recall@10 ≥ 0.85; costs measured and recorded | 🔴 Approval |
| **M4** | Grounded Q&A, follow-ups, Stage 1 citations, insufficient evidence, streaming | ≥ 95% of shown citations verified; ≥ 90% correct on insufficient-evidence cases | 🔴 Approval |
| **M5** | Optional web search | No paper text sent (tested); app works with search off | 🔴 Approval |
| **M6** | Comparison | Reviewer confirms conflicts and gaps on test set | 🔴 Approval |
| **M7** | Quotas, budget caps, fail-closed ledger | Parallel tests can't exceed limits; UTC reset tested | 🔴 Approval |
| **M8** | UI on the design system, chosen brand, accessibility (WCAG 2.1 AA) | Visual review; keyboard and screen-reader checks | 🔴 Approval |
| **M9** | Deploy beta, monitoring, backups, privacy notice, runbook | End-to-end verified; rollback tested | 🔴 Approval |
| **Legacy removal** | Delete `legacy/` | After M9 verification | 🔴 Explicit approval |

### 10.1 M0b — foundations (proposed)
Planned commits, each pushed only after approval:
1. **Legacy move:** `git mv` the prototype files into `legacy/` unchanged, verified against the M0a checksums, plus `legacy/NOTICE.md`.
2. **Skeleton:**
   - `apps/web`, `apps/api`, `apps/worker`, `packages/core`, `supabase/migrations/`.
   - A health endpoint, a placeholder page and one test each.
   - No features.
3. **Tooling:** linters, formatters, type checks, tests; pinned versions; root `.gitignore`; `.env.example` (variable names only).
4. **CI** (`.github/workflows/ci.yml`):
   - lint, typecheck and test jobs;
   - `permissions: contents: read`, no secrets;
   - actions pinned to commit SHAs.
5. **Trivy:**
   - Filesystem scan (vulnerabilities, secrets, misconfigurations), failing on HIGH or CRITICAL in new code.
   - `legacy/` report-only (🟢 D31, once the scanner and its installation are verified).
   - The release version and checksum are recorded in the M0b log.
6. **Docs:** new `README.md`, `SECURITY.md` and the standard MIT `LICENSE` with `Copyright (c) 2024-2026 Kushan Manahara` (🟢 D28). A clear scope note: MIT covers original project code only. Personal branding assets, portfolio text, screenshots and third-party assets (including everything in `design/claude-design/`) are excluded. Each font keeps its original licence.

Out of scope for M0b: GitHub settings (separate GH step), cloud resources, DNS, dependency bots.

### 10.2 GitHub security settings (🟢 D30: approved, applied only after an availability check; not applied yet)

| Area | Setting | Proposed value |
|---|---|---|
| Account | Two-factor authentication on the owner account | On (owner) |
| Advanced Security | Secret scanning | On (🔵 automatic and free for public repos) |
| | Secret Protection → **Push protection** | Enable (🟠 confirm it's offered at no cost in the settings page) |
| | Private vulnerability reporting | Enable (🔵 available to public-repo owners) |
| | Dependency graph / Dependabot alerts | On (alerts only; automatic update PRs deferred) |
| Actions → General | Actions permissions | "Allow OWNER, and select non-OWNER, actions and reusable workflows" → allow GitHub-created actions + an explicit allow-list (for example `astral-sh/setup-uv`, `pnpm/action-setup`), decided in M0b |
| | "Require actions to be pinned to a full-length commit SHA" | On |
| | Workflow permissions | Read repository contents and packages (read-only) |
| | "Allow GitHub Actions to create and approve pull requests" | Off (default for personal repos) |
| | Fork pull request workflows (public repo) | "Require approval for all external contributors" |
| Branch rules for `master` (ruleset, or classic branch protection if rulesets aren't offered — 🟠 confirm on Free) | Require a pull request before merging | On, 0 required approvals (single maintainer) |
| | Require status checks to pass | On, once the CI jobs from M0b exist |
| | Block force pushes · Restrict deletions | On |
| | Require linear history · Require signed commits | Off (adds friction without clear benefit now) |

---

## 11. Top risks

| Risk | Mitigation |
|---|---|
| AI spend above estimates (thinking tokens, long papers) | Worst-case reservations, fail-closed ledger, hard stops, M3 measurements |
| Gemini price doubling on 2027-01-01 | Flash-Lite default; dated price table |
| Supply-chain attack via CI tools (🔵 Trivy 2026) | SHA pinning, verified installs, secret-free CI |
| Public repo leaks operational detail | Private ops notes; review each doc before commit; push protection |
| Content processed outside the EU (Gemini, Tavily, Resend) | Disclosed; paid Gemini; query-only Tavily; user toggle |
| Shared or withdrawn email free tier | 🟢 D26: no extra accounts, no shared quota; Google-only sign-in until a compliant no-cost option exists; SES only after cost approval |
| Claude Design closure 2026-12-14 | P0 done; owner migration and export |
| Scanned PDFs | Clear `needs_ocr`; OCR flag ready |
| Prompt injection from PDFs or web | Untrusted framing, no side-effect tools, citation checks |
| Delegated agents exceeding scope (happened in P0) | Git writes only from the main session; every delegated result re-verified |

---

## 12. Decisions

**Confirmed (🟢):**
- Rebuild with `legacy/` kept until approved removal.
- Frankfurt region.
- AI caps enforced server-side and fail-closed; infrastructure costs separate.
- Owner-controlled accounts with safeguards.
- Google sign-in; email links when D26 allows.
- `exploraai.gimhara.com` (D24). Resend Free preferred, no paid upgrades (D25).
- **D26:** no extra accounts to get around quotas, no shared quota. Google-only sign-in for the first release unless a compliant, no-cost email option exists. AWS SES only after expected costs are presented and approved.
- M0a / M0b split (D27).
- Public repo, with sensitive details kept out (D29).
- Trivy report-only on `legacy/` once verified (D31).
- Paid Gemini; optional Tavily; `needs_ocr` with OCR flag off.
- Queue design; design system as source of truth; quotas 10/5/3/3, reset 00:00 UTC.
- Staged citation checks; comparison and web search at launch.
- **Documents** approved for commit after the final review (2026-10-22).
- **D28 — licence:** MIT for original project code only, `Copyright (c) 2024-2026 Kushan Manahara`. Excluded: personal branding assets, portfolio text, screenshots and third-party assets. Fonts keep their original licences. The exclusions are documented in M0b. The owner keeps the right to license their own code.
- **D30 — GitHub security:** apply §10.2 after verifying which features the current plan offers. Any unavailable or paid setting is shown to the owner first. Protections are never weakened to work around a limitation.
- **D32 — private notes:** kept by the owner in a private location, never in this repository.
- **M0b** approved, run one step at a time. Changes are reported, and approval is waited for, before every commit and every push.
- **P0** fully approved (2026-10-22); the preserved design assets are unchanged.
- **Minor defaults:** new app components are considered for the design system after M8; manual retries of failed jobs don't use upload quota.
- **D33 — free options only (2026-10-22):** every infrastructure service on a free plan; Gemini API cost (capped) is the only accepted cost. Hosted Supabase project created on the Free plan in Frankfurt.
- **Working rule (2026-10-22):** routine steps (commits, pushes, checks, docs) go ahead without asking; only owner decisions (cost, deployment, architecture, external settings, exceptions) wait for approval. This replaces the step-by-step approval rule for M0b.
- **Launch defaults:** API host to be re-chosen under D33; polling for job status; Tailwind; no production prompt tracing; no dark mode at launch; a new Supabase project; Flash-Lite as the default answer model; web search on by default with a clear notice; at most 10 papers per question and 5 per comparison.

**Open (🔴):** D34 — free host and shape for the API and worker (see `logs/2026-10-22-m1-cloud.md`).

**Owner actions (not decisions):** migrate the design system in Claude and export the project zip before 2026-12-14 (§8). Save the private operations notes.

**Still to verify before the relevant milestone:** see `logs/2026-10-21-audit.md` §11 (for example the safe Trivy release, the installed pgmq version, push protection availability, and ruleset availability on GitHub Free).
