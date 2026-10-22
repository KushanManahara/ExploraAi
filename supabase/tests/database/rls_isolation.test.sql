-- supabase/tests/database/rls_isolation.test.sql
-- M1 ACCEPTANCE: USER A CAN NEVER READ OR WRITE USER B'S DATA THROUGH THE DATA API ROLES,
-- SERVER-ONLY TABLES ARE CLOSED TO CLIENTS, AND PAPER DELETION KEEPS CHAT TEXT BUT MARKS CITATIONS UNAVAILABLE.
-- RUN WITH: supabase test db

begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

-- FIXTURES (AS THE DATABASE OWNER, WHICH BYPASSES RLS) ----------------------------------------------
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'user-a@example.test'),
  ('00000000-0000-0000-0000-00000000000b', 'user-b@example.test');

select is((select count(*)::int from public.profiles), 2, 'a profile is created automatically for each new user');

insert into public.papers (id, user_id, filename, storage_path, sha256, size_bytes, page_count, status) values
  ('10000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-00000000000a', 'a.pdf', 'a/a.pdf', repeat('a', 64), 1000, 3, 'ready'),
  ('10000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-00000000000b', 'b.pdf', 'b/b.pdf', repeat('b', 64), 1000, 3, 'ready');

insert into public.conversations (id, user_id, title) values
  ('20000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-00000000000a', 'A chat'),
  ('20000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-00000000000b', 'B chat');

insert into public.messages (id, conversation_id, user_id, role, content) values
  ('30000000-0000-0000-0000-00000000000a', '20000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-00000000000a', 'assistant', 'Answer for A [P1]'),
  ('30000000-0000-0000-0000-00000000000b', '20000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-00000000000b', 'assistant', 'Answer for B [P1]');

insert into public.citations (message_id, user_id, label, kind, paper_id, page_number, snippet, paper_title_snapshot) values
  ('30000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-00000000000a', 'P1', 'paper', '10000000-0000-0000-0000-00000000000a', 2, 'A snippet', 'Paper A'),
  ('30000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-00000000000b', 'P1', 'paper', '10000000-0000-0000-0000-00000000000b', 2, 'B snippet', 'Paper B');

insert into public.usage_counters (user_id, usage_date, action, count) values
  ('00000000-0000-0000-0000-00000000000a', current_date, 'research_prompt', 1),
  ('00000000-0000-0000-0000-00000000000b', current_date, 'research_prompt', 1);

insert into public.ai_cost_ledger (user_id, provider, action, estimated_usd) values
  ('00000000-0000-0000-0000-00000000000a', 'gemini', 'research_prompt', 0.01);
insert into public.app_settings (key, value) values ('ai_budget_monthly_usd', '0'::jsonb);

-- CONSTRAINTS ENFORCE THE PLAN'S LIMITS --------------------------------------------------------------
select throws_ok(
  $$insert into public.papers (user_id, filename, storage_path, sha256, size_bytes)
    values ('00000000-0000-0000-0000-00000000000a', 'big.pdf', 'a/big.pdf', repeat('c', 64), 20 * 1024 * 1024 + 1)$$,
  '23514', null, 'papers over 20 MB are rejected');
select throws_ok(
  $$insert into public.papers (user_id, filename, storage_path, sha256, size_bytes, page_count)
    values ('00000000-0000-0000-0000-00000000000a', 'long.pdf', 'a/long.pdf', repeat('d', 64), 1000, 101)$$,
  '23514', null, 'papers over 100 pages are rejected');
select throws_ok(
  $$insert into public.comparisons (user_id, paper_ids, result)
    values ('00000000-0000-0000-0000-00000000000a', array['10000000-0000-0000-0000-00000000000a']::uuid[], '{}'::jsonb)$$,
  '23514', null, 'a comparison needs at least 2 papers');

-- AS USER A (SIGNED-IN DATA API ROLE) ----------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);

select is((select count(*)::int from public.papers), 1, 'A sees exactly one paper');
select is((select user_id from public.papers limit 1), '00000000-0000-0000-0000-00000000000a'::uuid, 'the paper A sees is A''s own');
select is((select count(*)::int from public.messages), 1, 'A sees only A''s messages');
select is((select count(*)::int from public.citations), 1, 'A sees only A''s citations');
select is((select count(*)::int from public.usage_counters), 1, 'A sees only A''s usage');
select is((select count(*)::int from public.profiles), 1, 'A sees only A''s profile');
select is((select count(*)::int from public.papers where user_id = '00000000-0000-0000-0000-00000000000b'), 0,
  'A cannot read B''s paper even when asking for it directly');

select throws_ok(
  $$insert into public.papers (user_id, filename, storage_path, sha256, size_bytes)
    values ('00000000-0000-0000-0000-00000000000a', 'x.pdf', 'a/x.pdf', repeat('e', 64), 10)$$,
  '42501', null, 'A cannot insert papers through the Data API (writes go through the API)');
select throws_ok(
  $$update public.usage_counters set count = 0$$,
  '42501', null, 'A cannot reset quota counters');
select throws_ok(
  $$delete from public.papers$$,
  '42501', null, 'A cannot delete papers directly (deletion must go through the API)');
select throws_ok(
  $$select * from public.ai_cost_ledger$$,
  '42501', null, 'A cannot read the AI cost ledger');
select throws_ok(
  $$select * from public.app_settings$$,
  '42501', null, 'A cannot read app settings (budget values are private)');
select throws_ok(
  $$select * from public.provider_prices$$,
  '42501', null, 'A cannot read provider prices');
select is((select count(*)::int from storage.objects), 0, 'A has no direct access to stored files');

-- AS AN ANONYMOUS VISITOR ----------------------------------------------------------------------------
reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$select * from public.papers$$, '42501', null, 'anonymous visitors cannot read papers');
select throws_ok($$select * from public.messages$$, '42501', null, 'anonymous visitors cannot read messages');

-- PAPER DELETION (AS THE SERVER) ---------------------------------------------------------------------
reset role;
delete from public.papers where id = '10000000-0000-0000-0000-00000000000a';

select is((select count(*)::int from public.messages where id = '30000000-0000-0000-0000-00000000000a'), 1,
  'deleting a paper keeps the chat message');
select is((select status from public.citations where message_id = '30000000-0000-0000-0000-00000000000a'), 'unavailable',
  'the citation to the deleted paper is marked unavailable');
select ok((select snippet is null and paper_id is null and paper_title_snapshot = 'Paper A'
             from public.citations where message_id = '30000000-0000-0000-0000-00000000000a'),
  'its snippet and link are removed, the title is kept as plain text');
select is((select status from public.citations where message_id = '30000000-0000-0000-0000-00000000000b'), 'valid',
  'B''s citation is untouched');

select * from finish();
rollback;
