# 📝 Changelog

## [2.0.0] - 2025-11-06

### 🔥 BREAKING CHANGES
- **Migrace z Supabase na Firebase**
  - Databáze: PostgreSQL (Supabase) → Firestore (Firebase)
  - Storage: Supabase Storage → Firebase Storage
  - Všechny Supabase závislosti odstraněny

### ✨ Přidáno
- Firebase SDK integrace
- Firestore Database pro projekty
- Firebase Storage pro obrázky
- Firestore Security Rules (`firestore.rules`)
- Storage Security Rules (`storage.rules`)
- Firestore indexy (`firestore.indexes.json`)
- Kompletní dokumentace:
  - `FIREBASE_SETUP.md` - Návod na nastavení Firebase
  - `MIGRATION_SUMMARY.md` - Shrnutí migrace
  - `CHECKLIST.md` - Kontrolní seznam pro setup

### 🔄 Změněno
- API routes přepsány na Firebase:
  - `src/app/api/projects/route.ts` - GET a POST
  - `src/app/api/projects/[id]/route.ts` - GET, PUT, DELETE
  - `src/app/api/upload/route.ts` - Upload obrázků
- `src/lib/firebase.ts` - Nový Firebase client (nahradil `supabase.ts`)
- `.env.local` - Firebase environment variables
- `next.config.js` - Image domain změněna na Firebase Storage
- `README.md` - Aktualizována dokumentace
- `REDAKCE_SETUP.md` - Aktualizován na Firebase
- `SETUP_COMPLETE.md` - Aktualizován na Firebase

### 🗑️ Odstraněno
- `@supabase/supabase-js` balíček
- `src/lib/supabase.ts`
- `setup-supabase.js`
- `setup-storage.js`
- `add-columns.js`
- `test-schema.js`
- `test-schema-file.js`
- `supabase-setup.sql`
- `fix-image-columns.js`
- `fix-image-columns.sql`
- `migrate.js`
- `src/app/api/migrate/route.ts`

### 🔐 Bezpečnost
- Firestore Security Rules - čtení veřejné, zápis pouze přes API
- Storage Security Rules - čtení veřejné, upload pouze přes API
- Admin autentifikace zůstává stejná (heslo v .env.local)

### 📊 Databázová struktura
- ID projektů: `number` (Supabase) → `string` (Firebase)
- Timestamps: PostgreSQL TIMESTAMP → Firestore Timestamp
- Kolekce: `projects` (stejný název jako tabulka)

### ⚠️ Poznámky pro upgrade
1. Vytvořte Firebase projekt
2. Nastavte Firestore Database a Storage
3. Zkopírujte Firebase config do `.env.local`
4. Nastavte Security Rules
5. (Volitelně) Migrujte existující data ze Supabase

Detailní návod viz **FIREBASE_SETUP.md**

---

## [1.0.0] - 2024

### ✨ Počáteční release
- Next.js 15 aplikace
- Supabase integrace
- Admin panel s TipTap editorem
- Image upload s kompresí
- Responzivní design
- Framer Motion animace

