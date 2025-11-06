# ✅ Firebase Setup Checklist

Použijte tento checklist pro dokončení migrace z Supabase na Firebase.

---

## 📋 Před spuštěním aplikace

### 1. Firebase Projekt
- [ ] Vytvořen Firebase projekt na https://console.firebase.google.com/
- [ ] Firestore Database je aktivní
- [ ] Firebase Storage je aktivní
- [ ] Firestore Rules jsou nastaveny (zkopírovat z `firestore.rules`)
- [ ] Storage Rules jsou nastaveny (zkopírovat z `storage.rules`)

### 2. Environment Variables
- [ ] Otevřen soubor `.env.local`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] Vyplněn `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] Změněno `ADMIN_PASSWORD` na silné heslo

### 3. Závislosti
- [ ] Spuštěn `npm install` (Firebase SDK je již nainstalován)
- [ ] Ověřeno, že `@supabase/supabase-js` není v `package.json`
- [ ] Ověřeno, že `firebase` je v `package.json`

---

## 🚀 Spuštění

### 4. Testování
- [ ] Spuštěn `npm run dev`
- [ ] Aplikace běží na http://localhost:3000
- [ ] Žádné chyby v konzoli
- [ ] Přihlášení do admin panelu funguje (http://localhost:3000/admin/login)
- [ ] Vytvoření nového projektu funguje
- [ ] Upload obrázku funguje
- [ ] Editace projektu funguje
- [ ] Smazání projektu funguje
- [ ] Projekty se zobrazují na homepage

---

## 🔍 Kontrola

### 5. Firebase Console
- [ ] V Firestore Database je vidět kolekce `projects`
- [ ] V Storage je vidět složka `project-images`
- [ ] Obrázky v Storage jsou veřejně přístupné

### 6. Kód
- [ ] Žádné importy z `@supabase/supabase-js` v kódu
- [ ] Všechny API routes používají Firebase
- [ ] `next.config.js` má správnou image domain

---

## 📊 Migrace dat (volitelné)

### 7. Pokud máte existující data v Supabase
- [ ] Exportována data z Supabase
- [ ] Importována data do Firebase
- [ ] Ověřeno, že všechna data jsou v Firestore
- [ ] Ověřeno, že všechny obrázky jsou v Firebase Storage

---

## 🎉 Hotovo!

Pokud máte všechny body zaškrtnuté, vaše aplikace je plně funkční s Firebase! 🚀

---

## ❓ Problémy?

Pokud narazíte na problém, zkontrolujte:

1. **Firebase Console** - jsou všechny služby aktivní?
2. **Environment Variables** - jsou všechny správně vyplněné?
3. **Firebase Rules** - jsou správně nastavené?
4. **Browser Console** - jsou tam nějaké chyby?
5. **Terminal** - jsou tam nějaké chyby při spuštění?

Pro detailní návod viz **FIREBASE_SETUP.md**.

