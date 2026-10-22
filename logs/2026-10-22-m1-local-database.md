# 2026-10-22 — M1 (local part): schema, row-level security and database CI

M1 (plan §10) is split by cost:
- **Local, free (this log):** schema, RLS, isolation tests, queue check, CI.
- **Cloud (owner decision):** creating the hosted Supabase project in Frankfurt, then Auth, the API's JWT check and brand options.

No cloud resources were created and nothing was spent.

## Local toolchain
- **Supabase CLI 2.121.0**, downloaded from the official release. Its SHA-256 `4b481189…fcf275f` matches the release `checksums.txt`.
- **Local Docker daemon**, started inside the session container. It's local only and not part of the repository.
- **Local stack:** Postgres, Auth, REST, Storage, gateway and mail test server. Studio, imgproxy, analytics, edge functions, realtime and pooler are excluded.

## Changes
- `supabase/config.toml` (new, from `supabase init`), adjusted to the plan:
  - `project_id = "exploraai"`;
  - storage limit `20MiB`;
  - magic-link OTP expiry `600` s (10 minutes);
  - Realtime off (D9: polling);
  - S3 protocol, vector buckets, edge runtime and analytics off.
  - It contains only `env(...)` references, no secret values.
- `supabase/.gitignore` (new, from `supabase init`).
- `supabase/migrations/20261022000100_initial_schema.sql`, the full data model from plan §3:
  - **Tables:** `profiles`, `papers`, `processing_jobs`, `paper_pages`, `chunks` (`halfvec(768)` + HNSW cosine index, generated `tsvector` + GIN index, embedding model stored per chunk), `paper_profiles`, `conversations`, `conversation_papers`, `messages`, `citations`, `comparisons`, `usage_counters`, `ai_cost_ledger`, `provider_prices`, `app_settings`.
  - **Constraints from the plan:** PDF ≤ 20 MB, ≤ 100 pages, paper status values, 2–5 papers per comparison, citation label format, web citations need a URL, `(user_id, sha256)` unique, `(paper_id, kind, generation)` unique for job idempotency.
  - **Triggers:** automatic profile on sign-up; `updated_at`; **on paper delete, citations are marked `unavailable` and their snippet cleared**. Foreign keys then null the paper and chunk links, and messages stay.
  - **Security model:** RLS on every table.
    - Signed-in users get **read-own-rows** policies only, and their insert, update and delete privileges are revoked.
    - `anon` has no access to user tables.
    - `ai_cost_ledger`, `provider_prices` and `app_settings` have **no client privileges at all**.
    - All writes go through the API or worker (service role), which also filters by user.
  - **Storage:** private bucket `papers` (PDF only, 20 MiB), with no client policies, so access is through API-issued signed URLs only.
  - **Queue:** `pgmq.create('paper_processing')`.
- `supabase/migrations/.gitkeep` removed (the folder now has a real migration).
- `supabase/tests/database/rls_isolation.test.sql`: 24 pgTAP tests (below).
- `.github/workflows/ci.yml`: new **database** job.
  - Same security rules as the other jobs: read-only token, no secrets, pinned checkout.
  - Installs the Supabase CLI pinned by SHA-256, runs `supabase db start` (migrations applied to an empty database), then `supabase test db`.

## Verified locally
| Check | Result |
|---|---|
| Migration applies to an empty database (`supabase db reset`, and again with `supabase db start`, database only) | Applied cleanly |
| 🔵 **pgmq version** (open item from the plan) | **1.5.1**, with `send`, `send_batch`, `read`, `read_with_poll`, `set_vt`, `archive`, `delete`, `pop`, `metrics`, `metrics_all` all present. Local image; re-confirm on the cloud project. |
| pgvector | 0.8.2 (`halfvec` supported) |
| Postgres | 17.11 (local image `supabase/postgres:17.11.0.004`) |
| Queue `paper_processing` | Exists |
| Bucket `papers` | Private, 20,971,520 bytes, `application/pdf` only |
| `supabase test db` | **24/24 passed** |
| Trivy new-code gate / strict secret gate over the new files | Both pass |

The 24 tests cover:
- automatic profile creation;
- rejection of >20 MB, >100 pages and 1-paper comparisons;
- user A sees only their own papers, messages, citations, usage and profile, and gets nothing when asking for B's paper by ID;
- A can't insert papers, reset quota counters or delete papers, and can't read the cost ledger, app settings or provider prices; A sees no storage objects;
- anonymous visitors can't read papers or messages;
- paper deletion keeps the message, marks the citation `unavailable`, removes the snippet and link but keeps the title, and leaves B's citation untouched.

## Still to do in M1 (needs owner decisions first)
- Create the hosted Supabase project in Frankfurt. It's a cost decision: a free development project vs. Pro.
- Apply the migration there and re-confirm the pgmq and pgvector versions.
- Configure Auth: Google sign-in first (D26).
- The API's JWT verification against the project's signing keys.
- Brand options for review.
