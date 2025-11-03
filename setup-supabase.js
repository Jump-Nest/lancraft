const { createClient } = require('@supabase/supabase-js');

// Vaše údaje
const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

async function setupSupabase() {
  try {
    console.log('🔌 Připojuji se k Supabase...');
    
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // SQL příkazy pro vytvoření tabulky
    const SQL = `
      -- Vytvoření tabulky projects
      CREATE TABLE IF NOT EXISTS projects (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(500),
        thumbnail_image VARCHAR(500),
        article_image VARCHAR(500),
        preview_text TEXT,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Nastavit RLS
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

      -- Политики
      DROP POLICY IF EXISTS "Allow public to read projects" ON projects;
      CREATE POLICY "Allow public to read projects" ON projects
        FOR SELECT USING (true);

      -- Grant oprávnění
      GRANT SELECT ON projects TO anon, authenticated;
    `;

    // Spustit SQL - rozdělíme na jednotlivé příkazy
    const commands = SQL.split(';').filter(cmd => cmd.trim());

    for (const cmd of commands) {
      if (cmd.trim()) {
        console.log(`\n▶️  Spouštím: ${cmd.substring(0, 50)}...`);
        
        try {
          const { data, error } = await supabase.rpc('exec_sql', {
            sql: cmd.trim()
          }).catch(() => {
            // Fallback - pokud rpc nefunguje, zkusíme jinak
            return null;
          });

          if (error && error.message.includes('does not exist')) {
            // exec_sql neexistuje - zkusíme alternativu
            console.log('ℹ️  Spustím SQL přes REST API...');
            const response = await fetch(`${SUPABASE_URL}/rest/v1/sql`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: cmd.trim() })
            });

            if (!response.ok) {
              console.log(`⚠️  Upozornění: ${response.statusText}`);
            } else {
              console.log('✅ OK');
            }
          } else if (error) {
            console.log(`⚠️  Chyba: ${error.message}`);
          } else {
            console.log('✅ OK');
          }
        } catch (err) {
          console.log(`⚠️  ${err.message}`);
        }
      }
    }

    console.log('\n\n========================================');
    console.log('🎉 Setup je hotov!');
    console.log('========================================\n');

    // Ověřit, že tabulka existuje
    const { data: tableInfo, error: tableError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (!tableError) {
      console.log('✅ Tabulka "projects" existuje a je přístupná!');
      console.log('\nDalší kroky:');
      console.log('1. Aktualizujte .env.local:');
      console.log(`   NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}`);
      console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY=<vaš anon key>`);
      console.log(`   SUPABASE_SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}`);
      console.log('\n2. Resetujte Service Role Key v Supabase!');
      console.log('   (Settings → API → Regenerate Service Role Key)');
      console.log('\n3. Spusťte npm run dev');
    } else {
      console.log('⚠️  Chyba: Tabulka není přístupná');
      console.log(`   Error: ${tableError.message}`);
    }

  } catch (error) {
    console.error('❌ Kritická chyba:', error);
    process.exit(1);
  }
}

setupSupabase();