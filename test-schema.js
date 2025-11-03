const { createClient } = require('@supabase/supabase-js');

const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

async function testSchema() {
  console.log('Connecting to Supabase...\n');
  
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Try to fetch existing data
  console.log('Testing SELECT query...');
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(1);

  if (error) {
    console.log('❌ Error:', error.message);
    console.log('Full error:', JSON.stringify(error, null, 2));
  } else {
    console.log('✅ SELECT works');
    if (data && data.length > 0) {
      console.log('Sample record:', JSON.stringify(data[0], null, 2));
    }
  }

  // Try to insert with new columns
  console.log('\n\nTesting INSERT with new columns...');
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
    console.log('❌ Insert Error:', insertError.message);
    console.log('Full error:', JSON.stringify(insertError, null, 2));
  } else {
    console.log('✅ INSERT works');
    console.log('Inserted:', JSON.stringify(insertData, null, 2));
  }
}

testSchema().catch(console.error);
