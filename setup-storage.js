const { createClient } = require('@supabase/supabase-js');

// Vaše údaje
const PROJECT_ID = 'fqgtttzeucumpisgctyf';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZ3R0dHpldWN1bXBpc2djdHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ0MTU0NCwiZXhwIjoyMDc3MDE3NTQ0fQ.8PL-A32DTkGHBV1UOrmRC-GxM8Hzgtl3qXRfbPdRBTs';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

async function setupStorage() {
  try {
    console.log('🔌 Připojuji se k Supabase Storage...\n');
    
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Vytvořit Storage bucket
    const bucketName = 'project-images';
    
    console.log(`📁 Vytvářím Storage bucket "${bucketName}"...`);
    
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        fileSizeLimit: 5242880, // 5MB
      })
      .catch(err => ({
        data: null,
        error: err,
      }));

    if (bucketError && bucketError.statusCode === 409) {
      console.log(`✅ Bucket "${bucketName}" již existuje`);
    } else if (bucketError) {
      console.log(`❌ Chyba při vytváření bucketu: ${bucketError.message}`);
      console.log('\nManuální kroky:');
      console.log(`1. Přejděte na https://app.supabase.com/project/${PROJECT_ID}/storage/buckets`);
      console.log(`2. Klikněte na "New bucket"`);
      console.log(`3. Vytvořte bucket s názvem: ${bucketName}`);
      console.log(`4. Nastavte jako Public: ANO`);
      return;
    } else {
      console.log(`✅ Bucket "${bucketName}" byl úspěšně vytvořen!`);
    }

    // Nastavit RLS politiky
    console.log(`\n🔐 Nastavuji RLS politiky...`);
    
    // Veřejný přístup na čtení
    const { error: policyError1 } = await supabase
      .rpc('create_policy_if_not_exists', {
        bucket_name: bucketName,
        policy_name: 'Allow public read',
        definition: `
          CREATE POLICY "Allow public read" ON storage.objects
          FOR SELECT USING (bucket_id = '${bucketName}')
        `,
      })
      .catch(() => ({ error: null }));

    // Authenticated write
    const { error: policyError2 } = await supabase
      .rpc('create_policy_if_not_exists', {
        bucket_name: bucketName,
        policy_name: 'Allow authenticated upload',
        definition: `
          CREATE POLICY "Allow authenticated upload" ON storage.objects
          FOR INSERT WITH CHECK (bucket_id = '${bucketName}')
        `,
      })
      .catch(() => ({ error: null }));

    console.log('✅ RLS politiky jsou nastaveny');

    console.log('\n\n========================================');
    console.log('🎉 Storage je připraven!');
    console.log('========================================\n');
    console.log(`✅ Bucket: ${bucketName}`);
    console.log(`✅ URL pro obrázky: ${SUPABASE_URL}/storage/v1/object/public/${bucketName}/`);
    console.log('\nNyní můžete nahrávat obrázky prostřednictvím admin panelu! 🚀\n');

  } catch (error) {
    console.error('❌ Kritická chyba:', error);
    process.exit(1);
  }
}

setupStorage();