const { createClient } = require('@supabase/supabase-js');

const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

async function addColumns() {
  try {
    console.log('🔌 Připojuji se k Supabase...');
    
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Přidáme chybějící sloupce
    const alterCommands = [
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS thumbnail_image VARCHAR(500);`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS article_image VARCHAR(500);`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS preview_text TEXT;`,
    ];

    console.log('\n▶️  Přidávám sloupce do tabulky projects...\n');

    for (const cmd of alterCommands) {
      console.log(`Spouštím: ${cmd}`);
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', {
          sql: cmd.trim()
        }).catch(() => {
          return null;
        });

        if (error && error.message?.includes('does not exist')) {
          // exec_sql function doesn't exist - try REST API
          console.log('Pokouším se přes REST API...');
          const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation',
            },
            body: JSON.stringify({ query: cmd.trim() })
          });
          
          if (!response.ok) {
            console.log(`⚠️  Upozornění: ${response.statusText}`);
            const responseText = await response.text();
            console.log(`Response: ${responseText}`);
          } else {
            console.log('✅ OK\n');
          }
        } else if (error) {
          console.log(`⚠️  Chyba: ${error.message}\n`);
        } else {
          console.log('✅ OK\n');
        }
      } catch (err) {
        console.log(`⚠️  ${err.message}\n`);
      }
    }

    console.log('========================================');
    console.log('✅ Migrace dokončena!');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Kritická chyba:', error);
    process.exit(1);
  }
}

addColumns();
