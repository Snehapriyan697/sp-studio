-- Run this script in the Supabase SQL Editor.
-- Keep the Supabase service-role key on the server only.

create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 10 and 4000),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant all on public.contact_messages to service_role;

create table if not exists public.contact_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null,
  request_count integer not null default 0
);
alter table public.contact_rate_limits enable row level security;
revoke all on public.contact_rate_limits from anon, authenticated;
grant all on public.contact_rate_limits to service_role;

create or replace function public.check_contact_rate_limit(
  ip_hash text, max_requests integer default 4, window_seconds integer default 3600
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare current_window public.contact_rate_limits%rowtype;
begin
  insert into public.contact_rate_limits as limits (ip_hash, window_started_at, request_count)
  values (check_contact_rate_limit.ip_hash, now(), 1)
  on conflict (ip_hash) do update
    set window_started_at = case
      when limits.window_started_at < now() - make_interval(secs => window_seconds) then now()
      else limits.window_started_at end,
    request_count = case
      when limits.window_started_at < now() - make_interval(secs => window_seconds) then 1
      else limits.request_count + 1 end
  returning * into current_window;
  return current_window.request_count <= max_requests;
end;
$$;
revoke all on function public.check_contact_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_contact_rate_limit(text, integer, integer) to service_role;
