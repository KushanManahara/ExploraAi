-- supabase/migrations/20261022000100_initial_schema.sql
-- INITIAL SCHEMA (PLAN §3). SECURITY MODEL:
--   - ROW LEVEL SECURITY ON EVERY TABLE.
--   - SIGNED-IN USERS MAY ONLY *READ* THEIR OWN ROWS THROUGH THE DATA API.
--   - ALL WRITES GO THROUGH THE API / WORKER (SERVICE ROLE), WHICH ALSO FILTERS BY USER (FIRST LINE OF DEFENCE).
--   - QUOTAS, COST LEDGER, PRICES AND APP SETTINGS ARE NEVER WRITABLE (AND MOSTLY NOT READABLE) BY USERS.

-- EXTENSIONS ----------------------------------------------------------------------------------------
create extension if not exists vector with schema extensions;  -- PGVECTOR (halfvec EMBEDDINGS)
create extension if not exists pgmq;                            -- SUPABASE QUEUES

-- SHARED HELPERS ------------------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- PROFILES ------------------------------------------------------------------------------------------
create table public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  plan       text not null default 'beta' check (plan in ('beta')),
  created_at timestamptz not null default now()
);

-- CREATE A PROFILE AUTOMATICALLY WHEN A USER SIGNS UP.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- PAPERS --------------------------------------------------------------------------------------------
create table public.papers (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  title        text check (char_length(title) <= 500),
  filename     text not null check (char_length(filename) between 1 and 255),
  storage_path text not null unique,
  sha256       text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  size_bytes   integer not null check (size_bytes > 0 and size_bytes <= 20 * 1024 * 1024),
  page_count   integer check (page_count between 1 and 100),
  status       text not null default 'pending_upload' check (status in (
                 'pending_upload', 'queued', 'processing', 'ready',
                 'ready_with_warnings', 'needs_ocr', 'failed', 'deleting')),
  generation   integer not null default 0 check (generation >= 0),
  text_quality jsonb,
  error_code   text check (char_length(error_code) <= 100),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, sha256)
);
create index papers_user_id_idx on public.papers (user_id);
create trigger papers_set_updated_at before update on public.papers
  for each row execute function public.set_updated_at();

-- PROCESSING JOBS (SOURCE OF TRUTH; THE PGMQ MESSAGE CARRIES ONLY THE JOB ID) -------------------------
create table public.processing_jobs (
  id                uuid primary key default gen_random_uuid(),
  paper_id          uuid not null references public.papers (id) on delete cascade,
  user_id           uuid not null references auth.users (id) on delete cascade,
  kind              text not null check (kind in ('process_paper')),
  generation        integer not null check (generation >= 0),
  status            text not null default 'queued' check (status in (
                      'queued', 'running', 'retry_wait', 'succeeded', 'failed', 'cancelled')),
  attempt           integer not null default 0 check (attempt >= 0),
  max_attempts      integer not null default 3 check (max_attempts between 1 and 10),
  lease_owner       text,
  lease_expires_at  timestamptz,
  next_attempt_at   timestamptz,
  last_error_code   text check (char_length(last_error_code) <= 100),
  last_error_detail text check (char_length(last_error_detail) <= 2000),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (paper_id, kind, generation)
);
create index processing_jobs_status_idx on public.processing_jobs (status, next_attempt_at);
create index processing_jobs_user_id_idx on public.processing_jobs (user_id);
create trigger processing_jobs_set_updated_at before update on public.processing_jobs
  for each row execute function public.set_updated_at();

-- PAGES AND CHUNKS ----------------------------------------------------------------------------------
create table public.paper_pages (
  paper_id          uuid not null references public.papers (id) on delete cascade,
  page_number       integer not null check (page_number between 1 and 100),
  user_id           uuid not null references auth.users (id) on delete cascade,
  text              text not null,
  char_count        integer not null check (char_count >= 0),
  quality           text not null check (quality in ('ok', 'low_text', 'no_text', 'garbled')),
  extraction_method text not null default 'text' check (extraction_method in ('text', 'ocr')),
  primary key (paper_id, page_number)
);
create index paper_pages_user_id_idx on public.paper_pages (user_id);

create table public.chunks (
  id              uuid primary key default gen_random_uuid(),
  paper_id        uuid not null references public.papers (id) on delete cascade,
  user_id         uuid not null references auth.users (id) on delete cascade,
  ordinal         integer not null check (ordinal >= 0),
  page_start      integer not null check (page_start between 1 and 100),
  page_end        integer not null check (page_end between 1 and 100),
  text            text not null,
  token_count     integer not null check (token_count > 0),
  -- 768 DIMENSIONS TO START (PLAN §3); THE MODEL IS STORED PER CHUNK SO A RE-EMBED CAN BE TRACKED.
  embedding       extensions.halfvec(768),
  embedding_model text,
  tsv             tsvector generated always as (to_tsvector('english', text)) stored,
  unique (paper_id, ordinal),
  check (page_end >= page_start)
);
create index chunks_user_paper_idx on public.chunks (user_id, paper_id);
create index chunks_tsv_idx on public.chunks using gin (tsv);
create index chunks_embedding_idx on public.chunks
  using hnsw (embedding extensions.halfvec_cosine_ops);

create table public.paper_profiles (
  paper_id   uuid primary key references public.papers (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  profile    jsonb not null,
  created_at timestamptz not null default now()
);
create index paper_profiles_user_id_idx on public.paper_profiles (user_id);

-- CONVERSATIONS, MESSAGES, CITATIONS ----------------------------------------------------------------
create table public.conversations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  title      text check (char_length(title) <= 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index conversations_user_id_idx on public.conversations (user_id);
create trigger conversations_set_updated_at before update on public.conversations
  for each row execute function public.set_updated_at();

create table public.conversation_papers (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  -- SET NULL: THE CHAT SURVIVES WHEN A PAPER IS DELETED.
  paper_id        uuid references public.papers (id) on delete set null,
  user_id         uuid not null references auth.users (id) on delete cascade,
  unique (conversation_id, paper_id)
);
create index conversation_papers_user_id_idx on public.conversation_papers (user_id);

create table public.messages (
  id                    uuid primary key default gen_random_uuid(),
  conversation_id       uuid not null references public.conversations (id) on delete cascade,
  user_id               uuid not null references auth.users (id) on delete cascade,
  role                  text not null check (role in ('user', 'assistant')),
  content               text not null,
  status                text not null default 'complete' check (status in (
                          'pending', 'streaming', 'complete', 'failed')),
  model                 text,
  tokens_in             integer check (tokens_in >= 0),
  tokens_out            integer check (tokens_out >= 0),
  tokens_thinking       integer check (tokens_thinking >= 0),
  insufficient_evidence boolean not null default false,
  web_search_used       boolean not null default false,
  created_at            timestamptz not null default now()
);
create index messages_conversation_idx on public.messages (conversation_id, created_at);
create index messages_user_id_idx on public.messages (user_id);

create table public.citations (
  id                   uuid primary key default gen_random_uuid(),
  message_id           uuid not null references public.messages (id) on delete cascade,
  user_id              uuid not null references auth.users (id) on delete cascade,
  label                text not null check (label ~ '^[PW][0-9]{1,3}$'),
  kind                 text not null check (kind in ('paper', 'web')),
  paper_id             uuid references public.papers (id) on delete set null,
  chunk_id             uuid references public.chunks (id) on delete set null,
  page_number          integer check (page_number between 1 and 100),
  snippet              text check (char_length(snippet) <= 2000),
  url                  text check (char_length(url) <= 2048),
  web_title            text check (char_length(web_title) <= 500),
  paper_title_snapshot text check (char_length(paper_title_snapshot) <= 500),
  status               text not null default 'valid' check (status in ('valid', 'unverified', 'unavailable')),
  created_at           timestamptz not null default now(),
  check (kind <> 'web' or url is not null),
  check (kind <> 'paper' or paper_title_snapshot is not null)
);
create index citations_message_idx on public.citations (message_id);
create index citations_paper_idx on public.citations (paper_id);
create index citations_user_id_idx on public.citations (user_id);

-- WHEN A PAPER IS DELETED: KEEP ITS CITATIONS, MARK THEM UNAVAILABLE AND REMOVE THE SNIPPET.
-- (THE FOREIGN KEYS THEN SET paper_id / chunk_id TO NULL; MESSAGE TEXT IS UNTOUCHED.)
create or replace function public.mark_citations_unavailable()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.citations
     set status = 'unavailable', snippet = null
   where paper_id = old.id;
  return old;
end;
$$;

create trigger papers_mark_citations_unavailable
  before delete on public.papers
  for each row execute function public.mark_citations_unavailable();

create table public.comparisons (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  conversation_id uuid references public.conversations (id) on delete set null,
  paper_ids       uuid[] not null check (cardinality(paper_ids) between 2 and 5),
  result          jsonb not null,
  created_at      timestamptz not null default now()
);
create index comparisons_user_id_idx on public.comparisons (user_id);

-- QUOTAS AND COST CONTROL (SERVER-ONLY WRITES) ------------------------------------------------------
create table public.usage_counters (
  user_id    uuid not null references auth.users (id) on delete cascade,
  usage_date date not null,  -- UTC DATE: QUOTAS RESET AT 00:00 UTC
  action     text not null check (action in ('research_prompt', 'web_search', 'upload', 'comparison')),
  count      integer not null default 0 check (count >= 0),
  primary key (user_id, usage_date, action)
);

create table public.ai_cost_ledger (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users (id) on delete set null,
  provider        text not null check (provider in ('gemini', 'tavily')),
  action          text not null check (char_length(action) <= 50),
  model           text check (char_length(model) <= 100),
  tokens_in       integer check (tokens_in >= 0),
  tokens_out      integer check (tokens_out >= 0),
  tokens_thinking integer check (tokens_thinking >= 0),
  credits         integer check (credits >= 0),
  estimated_usd   numeric(12, 6) not null check (estimated_usd >= 0),
  actual_usd      numeric(12, 6) check (actual_usd >= 0),
  status          text not null default 'reserved' check (status in ('reserved', 'committed', 'released')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index ai_cost_ledger_created_idx on public.ai_cost_ledger (created_at);
create index ai_cost_ledger_user_created_idx on public.ai_cost_ledger (user_id, created_at);
create trigger ai_cost_ledger_set_updated_at before update on public.ai_cost_ledger
  for each row execute function public.set_updated_at();

create table public.provider_prices (
  provider       text not null check (provider in ('gemini', 'tavily')),
  model          text not null,
  unit           text not null check (unit in ('input_token', 'output_token', 'thinking_token', 'credit')),
  usd_per_unit   numeric(18, 12) not null check (usd_per_unit > 0),
  effective_from date not null,
  primary key (provider, model, unit, effective_from)
);

create table public.app_settings (
  key        text primary key check (char_length(key) <= 100),
  value      jsonb not null,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);
create trigger app_settings_set_updated_at before update on public.app_settings
  for each row execute function public.set_updated_at();

-- ROW LEVEL SECURITY --------------------------------------------------------------------------------
alter table public.profiles            enable row level security;
alter table public.papers              enable row level security;
alter table public.processing_jobs     enable row level security;
alter table public.paper_pages         enable row level security;
alter table public.chunks              enable row level security;
alter table public.paper_profiles      enable row level security;
alter table public.conversations       enable row level security;
alter table public.conversation_papers enable row level security;
alter table public.messages            enable row level security;
alter table public.citations           enable row level security;
alter table public.comparisons         enable row level security;
alter table public.usage_counters      enable row level security;
alter table public.ai_cost_ledger      enable row level security;
alter table public.provider_prices     enable row level security;
alter table public.app_settings        enable row level security;

-- READ-OWN-ROWS POLICIES FOR SIGNED-IN USERS. NO INSERT/UPDATE/DELETE POLICIES EXIST, SO THE DATA API
-- CANNOT WRITE ANYTHING; (select auth.uid()) IS WRAPPED SO POSTGRES EVALUATES IT ONCE PER QUERY.
create policy "read own profile" on public.profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own papers" on public.papers
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own jobs" on public.processing_jobs
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own pages" on public.paper_pages
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own chunks" on public.chunks
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own paper profiles" on public.paper_profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own conversations" on public.conversations
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own conversation papers" on public.conversation_papers
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own messages" on public.messages
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own citations" on public.citations
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own comparisons" on public.comparisons
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own usage" on public.usage_counters
  for select to authenticated using (user_id = (select auth.uid()));

-- SERVER-ONLY TABLES: NO POLICIES, AND NO TABLE PRIVILEGES FOR CLIENT ROLES AT ALL.
revoke all on public.ai_cost_ledger  from anon, authenticated;
revoke all on public.provider_prices from anon, authenticated;
revoke all on public.app_settings    from anon, authenticated;

-- ANONYMOUS VISITORS GET NOTHING FROM ANY USER TABLE.
revoke all on public.profiles, public.papers, public.processing_jobs, public.paper_pages, public.chunks,
  public.paper_profiles, public.conversations, public.conversation_papers, public.messages,
  public.citations, public.comparisons, public.usage_counters
  from anon;

-- SIGNED-IN USERS: READ-ONLY PRIVILEGES (RLS THEN LIMITS ROWS TO THEIR OWN).
revoke insert, update, delete, truncate, references, trigger on public.profiles, public.papers,
  public.processing_jobs, public.paper_pages, public.chunks, public.paper_profiles, public.conversations,
  public.conversation_papers, public.messages, public.citations, public.comparisons, public.usage_counters
  from authenticated;

-- STORAGE: PRIVATE BUCKET FOR PDFS. NO POLICIES ON storage.objects, SO CLIENTS HAVE NO DIRECT ACCESS;
-- UPLOADS AND DOWNLOADS USE SHORT-LIVED SIGNED URLS ISSUED BY THE API.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('papers', 'papers', false, 20 * 1024 * 1024, array['application/pdf'])
on conflict (id) do nothing;

-- QUEUE FOR PAPER PROCESSING (SUPABASE QUEUES / PGMQ). THE WORKER READS IT OVER A DIRECT DB CONNECTION.
select pgmq.create('paper_processing');
