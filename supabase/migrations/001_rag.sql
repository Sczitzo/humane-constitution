-- supabase/migrations/001_rag.sql
-- Run this in the Supabase SQL editor (free tier: Dashboard > SQL Editor)
-- Uses gemini-embedding-001 (3072 dims). No IVFFlat index — exact search is
-- fast enough for ~1000 chunks and avoids the 2000-dim index limit.

create extension if not exists vector;

create table if not exists documents (
  id        bigserial primary key,
  content   text        not null,
  source    text        not null,
  chunk_idx integer     not null,
  embedding vector(3072)
);

-- Semantic search RPC used by the chat API
create or replace function match_documents(
  query_embedding vector(3072),
  match_threshold float,
  match_count     int
)
returns table (
  id         bigint,
  content    text,
  source     text,
  similarity float
)
language sql stable as $$
  select
    id,
    content,
    source,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
