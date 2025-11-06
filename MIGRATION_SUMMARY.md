# 🔄 Migrace z Supabase na Firebase - Shrnutí

## ✅ Co bylo provedeno

### 1. Instalace Firebase SDK
- ✅ Nainstalován balíček `firebase`
- ✅ Odstraněn balíček `@supabase/supabase-js`

### 2. Vytvořené soubory

#### Nové Firebase soubory:
- ✅ `src/lib/firebase.ts` - Firebase inicializace a konfigurace
- ✅ `FIREBASE_SETUP.md` - Kompletní návod na nastavení Firebase
- ✅ `firestore.rules` - Firestore Security Rules
- ✅ `storage.rules` - Firebase Storage Rules
- ✅ `firestore.indexes.json` - Firestore indexy pro optimalizaci

### 3. Upravené soubory

#### API Routes (přepsány na Firebase):
- ✅ `src/app/api/projects/route.ts` - GET a POST endpointy
- ✅ `src/app/api/projects/[id]/route.ts` - GET, PUT, DELETE endpointy
- ✅ `src/app/api/upload/route.ts` - Upload obrázků do Firebase Storage

#### Konfigurační soubory:
- ✅ `.env.local` - Přidány Firebase environment variables
- ✅ `next.config.js` - Změněna image domain na Firebase Storage
- ✅ `REDAKCE_SETUP.md` - Aktualizována dokumentace

### 4. Smazané soubory

#### Supabase soubory (již nepotřebné):
- ✅ `src/lib/supabase.ts`
- ✅ `setup-supabase.js`
- ✅ `setup-storage.js`
- ✅ `add-columns.js`
- ✅ `test-schema.js`
- ✅ `test-schema-file.js`
- ✅ `supabase-setup.sql`
- ✅ `fix-image-columns.js`
- ✅ `fix-image-columns.sql`
- ✅ `migrate.js`
- ✅ `src/app/api/migrate/route.ts`

---

## 🔧 Co je potřeba udělat

### 1. Nastavit Firebase projekt

Následujte návod v **FIREBASE_SETUP.md**:

1. Vytvořte Firebase projekt na https://console.firebase.google.com/
2. Nastavte Firestore Database
3. Nastavte Firebase Storage
4. Zkopírujte Firebase konfiguraci

### 2. Aktualizovat .env.local

Vyplňte Firebase credentials v `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. Nastavit Firebase Security Rules

#### Firestore Rules:
Zkopírujte obsah `firestore.rules` do Firebase Console:
- Firestore Database → Rules → Vložte a publikujte

#### Storage Rules:
Zkopírujte obsah `storage.rules` do Firebase Console:
- Storage → Rules → Vložte a publikujte

### 4. (Volitelné) Migrovat existující data

Pokud máte data v Supabase:

1. Exportujte data z Supabase (SQL Editor → Export)
2. Importujte do Firebase pomocí Firebase Console nebo skriptu

---

## 📊 Změny v databázové struktuře

### Supabase (PostgreSQL) → Firebase (Firestore)

#### Před (Supabase):
```sql
Table: projects
- id: BIGSERIAL (auto-increment number)
- title: VARCHAR(255)
- description: TEXT
- image: VARCHAR(500)
- thumbnail_image: VARCHAR(500)
- article_image: VARCHAR(500)
- preview_text: TEXT
- category: VARCHAR(50)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### Po (Firebase):
```javascript
Collection: projects
Document ID: auto-generated string
{
  title: string,
  description: string,
  image: string | null,
  thumbnail_image: string | null,
  article_image: string | null,
  preview_text: string | null,
  category: string,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Hlavní rozdíl:** ID je nyní string (auto-generovaný) místo čísla.

---

## 🔐 Bezpečnost

### Supabase:
- Row Level Security (RLS)
- Service Role Key pro admin operace

### Firebase:
- Firestore Security Rules
- Storage Security Rules
- Admin operace přes API s heslem (stejné jako předtím)

**Bezpečnostní model zůstává stejný:**
- Čtení je veřejné
- Zápis pouze přes API s admin heslem

---

## 🚀 API Endpointy

**Žádné změny v API!** Všechny endpointy fungují stejně:

- `GET /api/projects` - Získat všechny projekty
- `POST /api/projects` - Vytvořit projekt (auth required)
- `GET /api/projects/[id]` - Získat jeden projekt
- `PUT /api/projects/[id]` - Aktualizovat projekt (auth required)
- `DELETE /api/projects/[id]` - Smazat projekt (auth required)
- `POST /api/upload` - Nahrát obrázek (auth required)

---

## 📝 Poznámky

### Výhody Firebase:
- ✅ Realtime updates (pokud budete chtít v budoucnu)
- ✅ Lepší škálovatelnost
- ✅ Jednodušší integrace s dalšími Google službami
- ✅ Offline podpora (pokud budete chtít)

### Co zůstalo stejné:
- ✅ Admin autentifikace (heslo v .env.local)
- ✅ API endpointy
- ✅ Frontend komponenty
- ✅ Image upload s kompresí
- ✅ Rich text editor (TipTap)

---

## ❓ Časté otázky

### Musím migrovat existující data?
Ne, pokud nemáte žádná data v Supabase. Pokud ano, viz sekce "Migrovat existující data" výše.

### Funguje to stejně jako předtím?
Ano! API endpointy a frontend zůstávají stejné. Změnil se pouze backend (databáze).

### Co když chci zpět na Supabase?
Všechny Supabase soubory byly smazány, ale můžete je obnovit z git historie.

---

## 🎉 Hotovo!

Po dokončení kroků výše bude váš projekt plně funkční s Firebase! 🚀

Pro další pomoc viz **FIREBASE_SETUP.md**.

