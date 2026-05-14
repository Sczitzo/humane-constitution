-- supabase/migrations/001_rag.sql
-- Run this in the Supabase SQL editor (free tier: Dashboard > SQL Editor)

create extension if not exists vector;

create table if not exists documents (
  id        bigserial primary key,
  content   text        not null,
  source    text        not null,
  chunk_idx integer     not null,
  embedding vector(768)
);

-- IVFFlat index — tune lists=100 after ingestion
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Semantic search RPC used by the chat API
create or replace function match_documents(
  query_embedding vector(768),
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
