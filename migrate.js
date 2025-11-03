const https = require('https');

const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';

// Execute SQL using Supabase REST API
async function executeSql(sql) {
  return new Promise((resolve, reject) => {
    const hostname = `${PROJECT_ID}.supabase.co`;
    
    const body = JSON.stringify({ query: sql });
    
    const options = {
      hostname: hostname,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (data) {
          console.log(`Response: ${data}`);
        }
        resolve({ statusCode: res.statusCode, data: data });
      });
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(e);
    });

    console.log(`\nExecuting SQL:\n${sql}\n`);
    req.write(body);
    req.end();
  });
}

async function migrate() {
  console.log('Starting migration...\n');
  
  const commands = [
    `ALTER TABLE IF EXISTS projects ADD COLUMN IF NOT EXISTS thumbnail_image VARCHAR(500);`,
    `ALTER TABLE IF EXISTS projects ADD COLUMN IF NOT EXISTS article_image VARCHAR(500);`,
    `ALTER TABLE IF EXISTS projects ADD COLUMN IF NOT EXISTS preview_text TEXT;`,
  ];

  for (const cmd of commands) {
    try {
      await executeSql(cmd);
      await new Promise(r => setTimeout(r, 500)); // Small delay between commands
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }
  
  console.log('\n✅ Migration complete!');
}

migrate();
