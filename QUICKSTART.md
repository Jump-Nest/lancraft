# ⚡ Quick Start Guide

Rychlý návod pro spuštění LanCraft webu s Firebase.

---

## 📦 1. Instalace

```bash
npm install
```

---

## 🔥 2. Firebase Setup (5 minut)

### A) Vytvořte Firebase projekt
1. Jděte na https://console.firebase.google.com/
2. Klikněte **"Add project"**
3. Zadejte název (např. "lancraft-web")
4. Vypněte Google Analytics (není potřeba)
5. Klikněte **"Create project"**

### B) Aktivujte Firestore Database
1. V levém menu → **"Firestore Database"**
2. Klikněte **"Create database"**
3. Vyberte **"Start in production mode"**
4. Vyberte lokaci (např. `europe-west3`)
5. Klikněte **"Enable"**

### C) Aktivujte Firebase Storage
1. V levém menu → **"Storage"**
2. Klikněte **"Get started"**
3. Vyberte **"Start in production mode"**
4. Použijte stejnou lokaci jako u Firestore
5. Klikněte **"Done"**

### D) Získejte Firebase Config
1. Klikněte na ikonu **⚙️** → **"Project settings"**
2. Scrollujte dolů na **"Your apps"**
3. Klikněte na **"</>"** (Web app)
4. Zadejte název (např. "lancraft-web")
5. Klikněte **"Register app"**
6. Zkopírujte hodnoty z `firebaseConfig`

---

## 🔐 3. Nastavte Security Rules

### Firestore Rules
1. Firestore Database → **Rules**
2. Zkopírujte obsah souboru `firestore.rules`
3. Vložte a klikněte **"Publish"**

### Storage Rules
1. Storage → **Rules**
2. Zkopírujte obsah souboru `storage.rules`
3. Vložte a klikněte **"Publish"**

---

## ⚙️ 4. Konfigurace .env.local

Vytvořte/upravte soubor `.env.local` v kořenovém adresáři:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Authentication
ADMIN_PASSWORD=your-strong-password-here
```

**⚠️ DŮLEŽITÉ:** Změňte `ADMIN_PASSWORD` na silné heslo!

---

## 🚀 5. Spuštění

```bash
npm run dev
```

Aplikace poběží na:
- **Web**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

---

## ✅ 6. Test

1. Otevřete http://localhost:3000 - měli byste vidět homepage
2. Jděte na http://localhost:3000/admin/login
3. Přihlaste se heslem z `.env.local`
4. Vytvořte testovací projekt
5. Nahrajte obrázek
6. Zkontrolujte, že se projekt zobrazuje na homepage

---

## 🎉 Hotovo!

Váš web je připraven! 🚀

---

## 📚 Další kroky

- **Přidání obsahu**: Přihlaste se do admin panelu a přidejte projekty
- **Customizace**: Viz `CUSTOMIZATION.md` pro úpravu designu
- **Deployment**: Viz `DEPLOY_GUIDE.md` pro nasazení na Vercel

---

## ❓ Problémy?

### Chyba: "Missing Firebase environment variables"
- Zkontrolujte `.env.local` - jsou všechny proměnné vyplněné?
- Restartujte dev server (`Ctrl+C` a znovu `npm run dev`)

### Chyba: "Permission denied"
- Zkontrolujte Security Rules v Firebase Console
- Ujistěte se, že jste je správně zkopírovali

### Obrázky se nenačítají
- Zkontrolujte Storage Rules
- Zkontrolujte, že máte `firebasestorage.googleapis.com` v `next.config.js`

### Další pomoc
- Detailní návod: **FIREBASE_SETUP.md**
- Checklist: **CHECKLIST.md**
- Shrnutí změn: **MIGRATION_SUMMARY.md**

---

## 📞 Kontakt

Pro další pomoc nebo otázky kontaktujte vývojáře.

