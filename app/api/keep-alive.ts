// app/api/keep-alive.ts
//
// Vercel Cron target. Pings Supabase once a day so the free-tier project does
// not auto-pause after ~7 days of inactivity (which silently breaks the chat
// retrieval RPC with "Retrieval error: TypeError: fetch failed").
//
// Scheduled in app/vercel.json -> "crons". Any authenticated request to the
// Supabase REST API counts as activity, so even an error response (e.g. an
// unexpected table name) still keeps the project warm — we only need the round
// trip to land.
import type { IncomingMessage, ServerResponse } from 'http';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, reason: 'missing Supabase env vars' }));
    return;
  }

  try {
    const supabase = createClient(url, key);
    // Cheapest possible round trip: HEAD count on the documents table. The
    // request reaching Supabase is what resets the inactivity timer; the exact
    // result does not matter.
    const { error } = await supabase
      .from('documents')
      .select('id', { count: 'exact', head: true });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, pinged: true, supabaseError: error?.message ?? null }));
  } catch (err) {
    // Even a thrown fetch error means we attempted the round trip. Report it but
    // do not fail loudly — the cron's only job is to touch Supabase.
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, pinged: false, error: String(err) }));
  }
}
