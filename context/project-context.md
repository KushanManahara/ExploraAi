# ExploraAi — Project context

Last updated: 2026-10-22. Keep this short.
Authoritative plan: `docs/implementation-plan.md`. Evidence: `logs/`.
**This repo is public.** Budget values, account details and third-party DNS details live in the owner's private operations notes (D32), never here.

## Status
- Plan v4 and the four documents approved and committed (2026-10-22).
- P0 done: commit `bddf81f`, only `design/claude-design/` (107 files + `MANIFEST.md`), checksums verified. 🟢 Fully approved 2026-10-22. Design assets stay unchanged.
- M0a (read-only audit) done 2026-10-22. Findings in `logs/2026-10-21-audit.md`.
- No cloud resources, DNS changes, GitHub setting changes or spending.

## Next
1. M0b foundations (approved), **one step at a time, with approval before each commit and push**.
2. GitHub security settings (approved after an availability check; unavailable or paid items go to the owner first).
3. "Before M1": accounts, subscriptions, DNS records (each needs approval).

## Confirmed decisions
- Clean rebuild. Prototype kept unchanged in `legacy/` until the owner approves removal.
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
- Launch defaults approved: Render API, polling, Tailwind, no production prompt tracing, no dark mode, new Supabase project, Flash-Lite, web search on with notice, 10 papers per question / 5 per comparison.

## Open
- No owner decisions open. Every next step needs its own approval.
- Never access or modify the existing Resend setup on the owner's domain.

## Owner actions with deadlines
- Before 2026-12-14: migrate the design system in Claude, export the project zip, and save any chats you need.

## Rules for future sessions
- Plain English. Plan before code. Explicit approval for commits, pushes, settings, resources, DNS and spending.
- Git writes only from the main session. Re-verify every delegated result.
- Never commit secrets or private operational values.
- Pin GitHub Actions to commit SHAs. Install Trivy only from a verified release (🔵 CVE-2026-33634; avoid v0.69.4–0.69.6).
- Versions: Node.js 24 LTS, Python 3.14.
- Mark facts, decisions, assumptions and open questions clearly.
