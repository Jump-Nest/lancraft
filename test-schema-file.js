const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

async function testSchema() {
  let output = 'Starting test...\n';
  
  try {
    output += 'Creating Supabase client...\n';
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    output += 'Testing SELECT query...\n';
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) {
      output += `❌ Error: ${error.message}\n`;
      output += `Full error: ${JSON.stringify(error, null, 2)}\n`;
    } else {
      output += '✅ SELECT works\n';
      if (data && data.length > 0) {
        output += `Sample record: ${JSON.stringify(data[0], null, 2)}\n`;
      }
    }

    output += '\n\nTesting INSERT with new columns...\n';
    const { data: insertData, error: insertError } = await supabase
      .from('projects')
      .insert([{
        title: 'Test Project',
        description: 'Test Description',
        category: 'test',
        image: null,
        thumbnail_image: null,
        article_image: null,
        preview_text: null
      }])
      .select();

    if (insertError) {
      output += `❌ Insert Error: ${insertError.message}\n`;
      output += `Full error: ${JSON.stringify(insertError, null, 2)}\n`;
    } else {
      output += '✅ INSERT works\n';
      output += `Inserted: ${JSON.stringify(insertData, null, 2)}\n`;
    }
  } catch (err) {
    output += `❌ Exception: ${err.message}\n`;
    output += `Stack: ${err.stack}\n`;
  }

  fs.writeFileSync('test-output.txt', output);
  console.log('Output written to test-output.txt');
}

testSchema();
