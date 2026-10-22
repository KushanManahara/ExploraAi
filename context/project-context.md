# ExploraAi — Project context

Last updated: 2026-10-22. Keep this short.
Authoritative plan: `docs/implementation-plan.md`. Evidence: `logs/`.
**This repo is public.** Budget values, account details and third-party DNS details live in the owner's private operations notes (D32), never here.

## Status
- Plan v4 and the four documents approved and committed (2026-10-22).
- P0 done: commit `bddf81f`, only `design/claude-design/` (107 files + `MANIFEST.md`), checksums verified. 🟢 Fully approved 2026-10-22. Design assets stay unchanged.
- M0a (read-only audit) done 2026-10-22. Findings in `logs/2026-10-21-audit.md`.
- M0b steps 1–6 done 2026-10-22 (legacy move, skeleton, tooling, CI, Trivy, README/SECURITY/LICENSE). Record: `logs/2026-10-22-m0b-foundations.md`. Pushed (`5be90e2`); first GitHub CI run green (all 3 jobs).
- M1 local part done 2026-10-22: full schema migration, RLS (read-own-rows only; writes via API/worker), 24 pgTAP isolation tests passing, pgmq 1.5.1 confirmed locally, database CI job. Record: `logs/2026-10-22-m1-local-database.md`.
- Tool versions in use: TypeScript 6.0.3 (typescript-eslint limit), ESLint 10, pnpm 10.28.0, Trivy v0.76.0.
- Open review items: `httpx` deprecation warning (kept by owner decision); `braces` CVE-2026-93687 exception expires 2026-11-22.
- M1 cloud part started 2026-10-22: hosted Supabase project on the **Free** plan in Frankfurt; schema applied; pgmq 1.5.1 confirmed there; advisor warnings fixed (26/26 tests). Local migration files renamed to the hosted versions. Record: `logs/2026-10-22-m1-cloud.md`.
- API sign-in check done 2026-10-22: Supabase JWTs verified against the project's public keys (ES256), fail-closed; `GET /me` protected. Record: `logs/2026-10-22-m1-cloud.md`.
- No DNS changes, GitHub setting changes or spending.

## Next
1. GitHub security settings: secret scanning + push protection already on. Remaining items must be clicked by the owner (this session's proxy blocks settings writes); checklist in `logs/2026-10-22-m0b-foundations.md` ("GitHub security settings").
2. Google sign-in: owner creates a Google OAuth client; then Supabase Auth settings.
3. Brand options for review (last M1 item).
4. M2: upload + processing, with the worker running inside the API service (D34).

## Confirmed decisions
- Clean rebuild. Prototype kept unchanged in `legacy/` until the owner approves removal.
- **D33: free options only.** All infrastructure on free plans; Gemini API cost (capped) is the only accepted cost. Supabase Free trade-offs accepted (pauses after a quiet week, no backups, 500 MB DB, 1 GB storage).
- Frankfurt for the database, API and worker. Vercel functions in `fra1`.
- AI cost caps (monthly, daily, per user) enforced server-side and fail-closed. Infrastructure costs separate. Values are private.
- Quotas: 10 prompts / 5 web searches / 3 uploads / 3 comparisons per user per day, reset 00:00 UTC.
- Paid Gemini only for private papers. Tavily optional, query text only.
- Scanned PDFs → `needs_ocr`, never `ready`. OCR flag off.
- Supabase Queues + durable job records.
- Google sign-in first. Email links via `exploraai.gimhara.com` (D24) only with a policy-compliant, no-cost option: no extra accounts, no shared quota (D26). Resend Free preferred, no paid upgrades (D25). AWS SES only after its costs are presented and approved.
- M0a / M0b split (D27). Public repo with sensitive details kept out (D29). GitHub settings approved, applied only after an availability check (D30). Trivy report-only on `legacy/` once verified (D31).
- The Claude Design system is the source of truth. New ExploraAi brand (options in M1).
- Licence: MIT for original project code only, `Copyright (c) 2024-2026 Kushan Manahara`. Branding, portfolio text, screenshots and third-party assets are excluded; fonts keep their own licences. Added in M0b (D28).
- Private notes kept by the owner outside the repo (D32).
- Minor defaults approved: components considered for the design system after M8; manual retries don't use upload quota.
- **D34:** API + worker on one Render Free web service (Frankfurt), worker as an in-process background loop.
- Launch defaults approved: polling, Tailwind, no production prompt tracing, no dark mode, new Supabase project, Flash-Lite, web search on with notice, 10 papers per question / 5 per comparison.

## Open
- No owner decisions open.
- Never access or modify the existing Resend setup on the owner's domain.

## Owner actions with deadlines
- Before 2026-12-14: migrate the design system in Claude, export the project zip, and save any chats you need.

## Rules for future sessions
- Plain English. Plan before code.
- **Working rule (owner, 2026-10-22): don't ask for routine steps** (commits, pushes, local checks, docs updates). Go ahead and report. **Ask only for owner decisions:** anything that costs money, deployments or new cloud resources, DNS or external account/settings changes, architecture changes, and plan or security exceptions.
- Git writes only from the main session. Re-verify every delegated result.
- Never commit secrets or private operational values.
- Pin GitHub Actions to commit SHAs. Install Trivy only from a verified release (🔵 CVE-2026-33634; avoid v0.69.4–0.69.6).
- Versions: Node.js 24 LTS, Python 3.14.
- Re-check before 2026-11-22 whether `braces` has a fix (Trivy exception expires then and CI will block).
- Mark facts, decisions, assumptions and open questions clearly.
