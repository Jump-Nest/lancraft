# LanCraft - Redakční Systém Setup

## 📋 Přehled

Kompletní systém pro správu projektů v sekci "Naše projekty" s:
- **Rich Text Editor** pro psaní článků s formátováním
- **Image Upload** s automatickou kompresí (75% kvalita, max 500 KB)
- **Supabase Storage** pro bezpečné ukládání obrázků
- **Admin Dashboard** pro snadnou správu obsahu

---

## 🚀 Instalace

### 1️⃣ Přidejte balíčky

```bash
npm install react-quill browser-image-compression
```

### 2️⃣ Nastavení Supabase

#### A) Přihlašte se do Supabase

Jděte na https://supabase.com a přihlašte se do svého projektu.

#### B) Spusťte SQL Setup

1. V Supabase klikněte na **SQL Editor**
2. Klikněte **+ New Query**
3. Zkopírujte obsah souboru `supabase-setup.sql` z tohoto projektu
4. Vložte do editoru a klikněte **Run** (Ctrl+Enter)

```sql
-- Toto se spustí automaticky
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(1000),
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### C) Vytvořte Storage Bucket

1. V Supabase menu klikněte **Storage**
2. Klikněte **Create a new bucket**
3. Pojmenujte: `project-images` (důležité!)
4. Vyberte **Public** (aby byly obrázky veřejně dostupné)
5. Klikněte **Create bucket**

#### D) Nastavte Row Level Security (RLS)

```sql
-- Veřejný přístup k čtení
CREATE POLICY "Allow public to read projects" ON projects
  FOR SELECT USING (true);

-- Grant oprávnění
GRANT SELECT ON projects TO anon, authenticated;
```

Spusťte v SQL Editoru.

### 3️⃣ Konfigurujte Environment Proměnné

Upravte `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi... (viz Settings > API > Anon Key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (viz Settings > API > Service Role Key)

# Admin Authentication
ADMIN_PASSWORD=admin123
```

**Kde najít klíče:**
- Supabase Dashboard → Settings → API
- Project URL → NEXT_PUBLIC_SUPABASE_URL
- Anon Key → NEXT_PUBLIC_SUPABASE_ANON_KEY
- Service Role Key → SUPABASE_SERVICE_ROLE_KEY

### 4️⃣ Spusťte aplikaci

```bash
npm run dev
```

Jděte na: **http://localhost:3000/admin/login**

Přihlaste se heslem z `ADMIN_PASSWORD` (výchozí: `admin123`)

---

## 📝 Užívání Admin Panelu

### Přihlášení

1. Jděte na http://localhost:3000/admin/login (nebo vaší domain/admin/login)
2. Zadejte heslo (z .env.local `ADMIN_PASSWORD`)
3. Klikněte **Přihlásit se**

### Tvoření Projektu

1. Klikněte **+ Nový projekt** (zelené tlačítko)
2. Vyplňte **Název**
3. Vyberte **Kategorii**
4. Napište **Popis** (je to Rich Text Editor):
   - Používejte **Bold**, *Italic*, <u>Underline</u>
   - Vytvářejte **Nadpisy** (H1, H2)
   - Vytvářejte **Seznamy** (odrážky, číslované)
   - Přidávejte **Citace** a kód
5. **Uploadujte Obrázek**:
   - Drag-n-drop soubor do boxu NEBO klikněte na něj
   - Obrázek se automaticky **zkomprimuje** (75% kvalita)
   - Bude nahrán na Supabase Storage
6. Klikněte **Vytvořit projekt**

### Editace Projektu

1. V seznamu projektů klikněte na projekt
2. Formulář se naplní daty
3. Proveďte změny
4. Klikněte **Uložit změny**

### Smazání Projektu

1. V seznamu projektů klikněte na tlačítko smaž (koš)
2. Potvrďte smazání
3. Projekt je smazaný

---

## 🖼️ Image Upload Details

### Kompresi
- **Maximální velikost**: 500 KB po kompresi
- **Kvalita**: 75% (je stále velmi dobrá pro web)
- **Maximální rozměry**: 1920x1920 px
- **Formáty**: JPG, PNG, WebP, GIF

### Uložení
- Obrázky se ukládají do Supabase Storage bucketu `project-images`
- Automaticky se vygeneruje veřejná URL
- URL se uloží v databázi v poli `image`

### Preview
- Během uploadu vidíte náhled
- Můžete kliknutím na X náhled smazat a uploadovat jiný obrázek

---

## 🔐 Bezpečnost

### Ověřování
- Všechny write operace (vytvoření, editace, smazání) vyžadují správné heslo
- Heslo se enkóduje do Base64 a odesílá v `Authorization` headeru
- Čtení (GET) je veřejně dostupné

### Supabase Security
- **Row Level Security (RLS)** je povoleno na tabulce `projects`
- Veřejný přístup je nastaven jen na SELECT
- Write operace vyžadují autentifikaci
- Service Role Key se používá jen na serveru (nikdy na klientovi)

### Doporučení po Setupu

⚠️ **DŮLEŽITÉ BEZPEČNOSTNÍ KROKU:**

1. Po spuštění v produkci změňte `ADMIN_PASSWORD` na silné heslo
2. V Supabase resetujte **Service Role Key**:
   - Jděte na **Settings → API → Service Role Key**
   - Klikněte **Regenerate**
   - Tím zajistíte, že starý klíč (který znáte) už nebude platný
3. Uložte nový klíč do `.env.local` (na Vercel do settings)

---

## 🧪 Testování Lokálně

```bash
# 1. Spustit dev server
npm run dev

# 2. Jít na login
http://localhost:3000/admin/login

# 3. Přihlásit se s heslem (výchozí: admin123)

# 4. Vytvořit projekt
- Název: "Test Projekt"
- Kategorie: "OFFLINE EVENTY"
- Popis: "Toto je test"
- Obrázek: Uploadujte JPG/PNG

# 5. Projekt by měl být vidět na http://localhost:3000
```

---

## 🚀 Deployment na Vercel

### 1️⃣ Pushněte kód na GitHub

```bash
git add .
git commit -m "Add CMS system"
git push origin main
```

### 2️⃣ Na Vercel

1. Jděte na https://vercel.com
2. Importujte repository
3. Poklikněte **Environment Variables**
4. Přidejte všechny proměnné z `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
5. Klikněte **Deploy**

### 3️⃣ Po Deployu

- Admin panel: `https://yoursite.com/admin/login`
- Heslo: `ADMIN_PASSWORD` z Vercel settings
- Veřejný web: `https://yoursite.com` (ukazuje projekty z databáze)

---

## 🐛 Troubleshooting

### "Chyba: Unauthorized"
- ✅ Zkontrolujte, že jste se přihlásili správně
- ✅ Zkontrolujte `ADMIN_PASSWORD` v `.env.local`
- ✅ Refreshněte stránku (localStorage cache)

### "Chyba: Soubor je příliš velký"
- ✅ Obrázek je větší než 5 MB
- ✅ Zkuste menší obrázek (max 1920x1920)

### "Obrázek se nenahrál"
- ✅ Zkontrolujte, že Storage bucket `project-images` existuje a je **Public**
- ✅ Zkontrolujte `SUPABASE_SERVICE_ROLE_KEY` v `.env.local`

### "Projekty se nenačítají"
- ✅ Zkontrolujte SQL setup - tabulka `projects` musí existovat
- ✅ Zkontrolujte RLS policies
- ✅ V browseru otevřete DevTools (F12) a podívejte se na Network → Network tab

### "Quill editor se nezobrazuje"
- ✅ Zkontrolujte, že balíčky jsou nainstalované: `npm install react-quill`
- ✅ Restartujte dev server: `npm run dev`

---

## 📚 Soubory Projektu

```
src/
├── app/
│   ├── api/
│   │   ├── projects/
│   │   │   ├── route.ts (GET all, POST new)
│   │   │   └── [id]/route.ts (GET, PUT, DELETE)
│   │   ├── admin/
│   │   │   └── login/route.ts (POST login)
│   │   └── upload/route.ts (POST image upload)
│   └── admin/
│       ├── login/page.tsx (Login stránka)
│       ├── dashboard/page.tsx (Admin dashboard)
│       └── layout.tsx (Admin wrapper)
├── components/
│   ├── admin/
│   │   ├── ProjectForm.tsx (Form s editorem + image upload)
│   │   ├── ProjectList.tsx (Seznam projektů)
│   │   └── ImageUpload.tsx (Drag-n-drop upload s kompresí)
│   └── ProjectsSection.tsx (Veřejný seznam projektů)
└── lib/
    ├── auth-context.tsx (Auth state management)
    └── supabase.ts (Supabase client)

supabase-setup.sql (SQL setup script)
REDAKCE_SETUP.md (Tento soubor)
```

---

## 🎯 API Dokumentace

### GET /api/projects
Vrátí seznam všech projektů (veřejně dostupné).

**Odpověď:**
```json
[
  {
    "id": 1,
    "title": "Herní turnaj",
    "description": "<h2>Popis</h2><p>Detaily...</p>",
    "image": "https://storage.url/project-images/123.webp",
    "category": "offline",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### POST /api/projects
Vytvoří nový projekt (vyžaduje `Authorization` header).

**Headers:**
```
Authorization: Bearer <base64_encoded_password>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Nový projekt",
  "description": "<p>HTML popis</p>",
  "image": "https://storage.url/...",
  "category": "online"
}
```

### PUT /api/projects/[id]
Upraví projekt (vyžaduje auth).

### DELETE /api/projects/[id]
Smaže projekt (vyžaduje auth).

### POST /api/upload
Nahraje obrázek na Supabase Storage a vrátí URL.

**Headers:**
```
Authorization: Bearer <base64_encoded_password>
Content-Type: multipart/form-data
```

**Body:**
```
file: <File object>
```

**Odpověď:**
```json
{
  "url": "https://storage.url/project-images/123.webp"
}
```

### POST /api/admin/login
Přihlášení a získání tokenu.

**Body:**
```json
{
  "password": "admin123"
}
```

**Odpověď:**
```json
{
  "token": "YWRtaW4xMjM=" (base64 encoded password)
}
```

---

## 💡 Tipy a Triky

### 1. Backup obsahu
- Obsah je uložen v Supabase - automaticky se zálohuje
- Pravidelně si stahujte SQL exports z Supabase

### 2. SEO popis
- Rich text editor uchová veškeré HTML formátování
- Pokud přidáte na veřejnou stránku popis (`<div dangerouslySetInnerHTML={{__html: project.description}}>`), bude SEO-friendly

### 3. Více editorů
- Systém je zatím pro jednoho editora (jedno heslo)
- Pokud potřebujete více lidí s různými právy, přihlášením do kódu přidejte role-based access control

### 4. Stažení obrázků
- Obrázky se ukládají do Supabase Storage
- Máte možnost je přeposlat CDN (např. Cloudflare)
- Vercel integruje Supabase Storage automaticky

---

## 📞 Support

Pokud máte problém, zkontrolujte:
1. Console v DevTools (F12)
2. Network tab - jakou chybu vrací API?
3. Supabase dashboard - existují data v tabulce?
4. `.env.local` - jsou všechny proměnné správně?

---

**Hotovo! 🎉 Teď máte plně funkční redakční systém.**

Pokud máte dotazy, podívejte se na kód - je komentovaný a snadný k pochopení.