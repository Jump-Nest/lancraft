import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing Supabase config' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Run migrations
    const migrations = [
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS thumbnail_image VARCHAR(500);`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS article_image VARCHAR(500);`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS preview_text TEXT;`,
    ];

    const results = [];

    for (const migration of migrations) {
      console.log(`Running: ${migration}`);
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: migration }).catch(() => ({ data: null, error: { message: 'exec_sql not available' } }));
        
        if (error && error.message === 'exec_sql not available') {
          // Try alternative method - use raw SQL via REST
          console.log('Trying alternative SQL execution method...');
          
          const response = await fetch(`${supabaseUrl}/rest/v1/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Content-Type': 'application/json',
              'Content-Profile': 'public',
            },
            body: JSON.stringify({ query: migration }),
          });

          results.push({
            sql: migration,
            status: response.ok ? 'success' : 'failed',
            statusCode: response.status,
          });
        } else if (error) {
          results.push({
            sql: migration,
            status: 'error',
            error: error.message,
          });
        } else {
          results.push({
            sql: migration,
            status: 'success',
          });
        }
      } catch (err: any) {
        results.push({
          sql: migration,
          status: 'error',
          error: err.message,
        });
      }
    }

    console.log('Migration results:', results);
    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    console.error('Migration error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
