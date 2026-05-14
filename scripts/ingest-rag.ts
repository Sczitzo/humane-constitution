// Usage: NODE_PATH=../app/node_modules npx tsx --tsconfig ../app/tsconfig.json ingest-rag.ts
// Run from the scripts/ directory.

import fs from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { embed } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Load scripts/.env manually
const envPath = join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  }
} else {
  console.warn('No scripts/.env found — expecting env vars already set');
}

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !GOOGLE_API_KEY) {
  console.error('Missing required env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, GOOGLE_GENERATIVE_AI_API_KEY');
  process.exit(1);
}

const google = createGoogleGenerativeAI({ apiKey: GOOGLE_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const DOCS_ROOT = join(__dirname, '..', 'docs');
const CHUNK_WORDS = 400;
const CHUNK_OVERLAP = 50;

function collectMdFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function chunkText(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + CHUNK_WORDS, words.length);
    const chunk = words.slice(start, end).join(' ').trim();
    if (chunk) chunks.push(chunk);
    if (end === words.length) break;
    start += CHUNK_WORDS - CHUNK_OVERLAP;
  }
  return chunks;
}

async function embedText(chunk: string): Promise<number[]> {
  const result = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: chunk,
  });
  return result.embedding;
}

async function main() {
  const files = collectMdFiles(DOCS_ROOT);
  console.log(`Found ${files.length} markdown files`);

  const { error: deleteError } = await supabase.from('documents').delete().neq('id', 0);
  if (deleteError) {
    console.error('Failed to clear documents:', deleteError.message);
    process.exit(1);
  }
  console.log('Cleared existing documents\n');

  let totalChunks = 0;

  for (const filePath of files) {
    const source = filePath.replace(DOCS_ROOT + '/', '');
    const text = fs.readFileSync(filePath, 'utf8');
    const chunks = chunkText(text);

    const rows: { content: string; source: string; chunk_idx: number; embedding: number[] }[] = [];
    for (let i = 0; i < chunks.length; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 250)); // rate limit
      const embedding = await embedText(chunks[i]);
      rows.push({ content: chunks[i], source, chunk_idx: i, embedding });
    }

    const { error } = await supabase.from('documents').insert(rows);
    if (error) {
      console.error(`  ✗ ${source}: ${error.message}`);
    } else {
      console.log(`  ✓ ${source}: ${rows.length} chunk(s)`);
      totalChunks += rows.length;
    }
  }

  console.log(`\nDone. ${totalChunks} chunks from ${files.length} files.`);
}

main().catch(err => { console.error(err); process.exit(1); });
