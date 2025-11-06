# 🔥 Firebase Setup - LanCraft Web

Tento projekt nyní používá **Firebase** místo Supabase pro databázi a storage.

---

## 📋 Co potřebujete

1. **Firebase účet** (zdarma) - https://console.firebase.google.com/
2. **Firebase projekt** s Firestore Database a Storage

---

## 🚀 Krok za krokem setup

### 1️⃣ Vytvoření Firebase projektu

1. Jděte na https://console.firebase.google.com/
2. Klikněte na **"Add project"** (Přidat projekt)
3. Zadejte název projektu (např. "lancraft-web")
4. Můžete vypnout Google Analytics (není potřeba pro tento projekt)
5. Klikněte na **"Create project"**

### 2️⃣ Nastavení Firestore Database

1. V levém menu klikněte na **"Firestore Database"**
2. Klikněte na **"Create database"**
3. Vyberte **"Start in production mode"** (později nastavíme pravidla)
4. Vyberte lokaci (např. `europe-west3` pro Evropu)
5. Klikněte na **"Enable"**

#### Nastavení Security Rules

Po vytvoření databáze nastavte pravidla:

1. Klikněte na záložku **"Rules"**
2. Nahraďte obsah tímto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projekty - čtení pro všechny, zápis pouze pro autentifikované
    match /projects/{projectId} {
      allow read: if true;
      allow write: if false; // Zápis pouze přes API s admin heslem
    }
  }
}
```

3. Klikněte na **"Publish"**

### 3️⃣ Nastavení Firebase Storage

1. V levém menu klikněte na **"Storage"**
2. Klikněte na **"Get started"**
3. Vyberte **"Start in production mode"**
4. Použijte stejnou lokaci jako u Firestore
5. Klikněte na **"Done"**

#### Nastavení Storage Rules

1. Klikněte na záložku **"Rules"**
2. Nahraďte obsah tímto:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /project-images/{imageId} {
      allow read: if true;
      allow write: if false; // Upload pouze přes API s admin heslem
    }
  }
}
```

3. Klikněte na **"Publish"**

### 4️⃣ Získání Firebase konfigurace

1. V levém menu klikněte na ikonu **ozubeného kola** ⚙️ a vyberte **"Project settings"**
2. Scrollujte dolů na sekci **"Your apps"**
3. Klikněte na ikonu **"</>"** (Web app)
4. Zadejte název aplikace (např. "lancraft-web")
5. **NEZAŠKRTÁVEJTE** "Also set up Firebase Hosting"
6. Klikněte na **"Register app"**
7. Zkopírujte hodnoty z `firebaseConfig` objektu

### 5️⃣ Konfigurace .env.local

Otevřete soubor `.env.local` v kořenovém adresáři projektu a vyplňte Firebase hodnoty:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Authentication
ADMIN_PASSWORD=admin123
```

**⚠️ DŮLEŽITÉ:** Změňte `ADMIN_PASSWORD` na silné heslo!

### 6️⃣ Spuštění aplikace

```bash
npm run dev
```

Aplikace poběží na http://localhost:3000

---

## 📊 Struktura Firestore Database

### Collection: `projects`

Každý dokument má následující strukturu:

```javascript
{
  id: "auto-generated-id",           // Automaticky generované ID
  title: "Název projektu",           // String
  description: "HTML obsah článku",  // String (HTML z TipTap editoru)
  category: "gaming",                // String: "gaming" | "corporate" | "other"
  image: "https://...",              // String (URL) - hlavní obrázek
  thumbnail_image: "https://...",    // String (URL) - náhledový obrázek
  article_image: "https://...",      // String (URL) - obrázek v článku
  preview_text: "Krátký popis",      // String - preview text
  created_at: Timestamp,             // Firestore Timestamp
  updated_at: Timestamp              // Firestore Timestamp
}
```

---

## 🖼️ Firebase Storage struktura

Všechny obrázky se ukládají do složky:

```
project-images/
  ├── 1234567890-abc123.jpg
  ├── 1234567890-def456.png
  └── ...
```

Formát názvu souboru: `{timestamp}-{random}.{extension}`

---

## 🔐 Bezpečnost

- **Firestore**: Čtení je veřejné, zápis pouze přes API s admin heslem
- **Storage**: Čtení je veřejné, nahrávání pouze přes API s admin heslem
- **Admin API**: Všechny write operace vyžadují Bearer token (base64 encoded admin heslo)

---

## 🛠️ Migrace dat ze Supabase (volitelné)

Pokud máte existující data v Supabase, můžete je exportovat a importovat do Firebase:

### Export ze Supabase

1. Jděte do Supabase Dashboard
2. SQL Editor
3. Spusťte:

```sql
SELECT * FROM projects;
```

4. Exportujte jako CSV nebo JSON

### Import do Firebase

Můžete použít Firebase Admin SDK nebo ručně přidat dokumenty přes Firebase Console:

1. Firestore Database → Start collection
2. Collection ID: `projects`
3. Přidejte dokumenty ručně nebo použijte skript

---

## 📝 API Endpoints

Všechny API endpointy zůstávají stejné:

- `GET /api/projects` - Získat všechny projekty
- `POST /api/projects` - Vytvořit nový projekt (vyžaduje auth)
- `GET /api/projects/[id]` - Získat jeden projekt
- `PUT /api/projects/[id]` - Aktualizovat projekt (vyžaduje auth)
- `DELETE /api/projects/[id]` - Smazat projekt (vyžaduje auth)
- `POST /api/upload` - Nahrát obrázek (vyžaduje auth)

---

## ❓ Časté problémy

### Chyba: "Missing Firebase environment variables"

- Zkontrolujte, že máte všechny proměnné v `.env.local`
- Restartujte dev server (`npm run dev`)

### Chyba: "Permission denied" při zápisu

- Zkontrolujte Security Rules v Firestore a Storage
- Ujistěte se, že používáte správný admin token

### Obrázky se nenačítají

- Zkontrolujte, že máte `firebasestorage.googleapis.com` v `next.config.js`
- Zkontrolujte Storage Rules

---

## 🎉 Hotovo!

Váš projekt nyní běží na Firebase! 🚀

Pro přístup do admin panelu:
- http://localhost:3000/admin/login
- Heslo: hodnota z `ADMIN_PASSWORD` v `.env.local`

