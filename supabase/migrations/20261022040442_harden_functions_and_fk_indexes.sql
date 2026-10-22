-- supabase/migrations/20261022040442_harden_functions_and_fk_indexes.sql
-- FIXES FROM THE HOSTED PROJECT'S SECURITY AND PERFORMANCE ADVISORS (2026-10-22).
--
-- 1. THE TWO SECURITY DEFINER TRIGGER FUNCTIONS WERE CALLABLE THROUGH THE DATA API (/rest/v1/rpc/...)
--    BY anon AND authenticated, BECAUSE POSTGRES GRANTS EXECUTE TO PUBLIC BY DEFAULT.
--    THEY ARE ONLY MEANT TO RUN AS TRIGGERS. TRIGGERS DO NOT NEED EXECUTE AT FIRE TIME, SO REVOKING IS SAFE.
-- 2. COVERING INDEXES FOR FOREIGN KEYS THAT HAD NONE (FASTER DELETES AND JOINS).

revoke execute on function public.handle_new_user()            from public, anon, authenticated;
revoke execute on function public.mark_citations_unavailable() from public, anon, authenticated;
revoke execute on function public.set_updated_at()             from public, anon, authenticated;

create index app_settings_updated_by_idx       on public.app_settings (updated_by);
create index citations_chunk_idx               on public.citations (chunk_id);
create index comparisons_conversation_idx      on public.comparisons (conversation_id);
create index conversation_papers_paper_idx     on public.conversation_papers (paper_id);
