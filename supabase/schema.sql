-- Supabase Database Schema for J. Abhiram Portfolio
-- Run this in your Supabase Dashboard: SQL Editor -> New Query

-- 1. Create table for contact form messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now(),
  is_read boolean not null default false
);

-- 2. Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- 3. Policy: Allow visitors (anon role) to insert new contact messages
drop policy if exists "Allow anonymous message submission" on public.contact_messages;
create policy "Allow anonymous message submission"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- 4. Policy: Only authenticated users (you) or service role can view/read messages
drop policy if exists "Allow owners to view contact messages" on public.contact_messages;
create policy "Allow owners to view contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- 5. Optional: Helpful comments on columns
comment on table public.contact_messages is 'Stores incoming contact requests from the portfolio contact form.';
comment on column public.contact_messages.name is 'Name of the sender.';
comment on column public.contact_messages.email is 'Email address of the sender.';
comment on column public.contact_messages.message is 'Message body.';
comment on column public.contact_messages.is_read is 'Flag indicating if message has been reviewed.';
