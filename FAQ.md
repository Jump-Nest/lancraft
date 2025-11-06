# ❓ Často kladené otázky (FAQ)

## 🔥 Firebase

### Proč Firebase místo Supabase?
Firebase nabízí:
- ✅ Lepší škálovatelnost
- ✅ Realtime updates (pokud budete chtít v budoucnu)
- ✅ Jednodušší integrace s Google službami
- ✅ Offline podpora
- ✅ Větší komunita a dokumentace

### Je Firebase zdarma?
Ano! Firebase má **Spark Plan (Free tier)**, který zahrnuje:
- Firestore: 1 GB storage, 50K reads/day, 20K writes/day
- Storage: 5 GB storage, 1 GB download/day
- Pro malé až střední weby je to více než dost!

### Co když překročím free limit?
Firebase vás upozorní emailem. Můžete:
1. Upgradovat na **Blaze Plan** (pay-as-you-go)
2. Optimalizovat dotazy
3. Přidat caching

---

## 🔐 Bezpečnost

### Je admin panel bezpečný?
Ano! Bezpečnost je zajištěna na několika úrovních:
1. **Admin heslo** v `.env.local` (nikdy se necommituje do gitu)
2. **Bearer token** autentifikace v API
3. **Firestore Rules** - zápis zakázán přímo do databáze
4. **Storage Rules** - upload zakázán přímo do storage

### Jak změním admin heslo?
1. Otevřete `.env.local`
2. Změňte hodnotu `ADMIN_PASSWORD`
3. Restartujte dev server
4. Přihlaste se novým heslem

### Můžu mít více adminů?
Aktuálně je podporován pouze jeden admin účet. Pro více adminů byste museli:
1. Implementovat Firebase Authentication
2. Vytvořit uživatelskou tabulku
3. Upravit API routes

---

## 📊 Databáze

### Jak vypadá struktura databáze?
```javascript
Collection: projects
Document ID: auto-generated string
{
  title: string,
  description: string (HTML),
  category: "gaming" | "corporate" | "other",
  image: string (URL),
  thumbnail_image: string (URL),
  article_image: string (URL),
  preview_text: string,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Můžu přidat další pole?
Ano! Firestore je NoSQL databáze, takže můžete přidat pole kdykoliv:
1. Upravte API route (např. `src/app/api/projects/route.ts`)
2. Přidejte pole do `addDoc()` nebo `updateDoc()`
3. Upravte frontend komponenty

### Jak migruji data ze Supabase?
Viz **FIREBASE_SETUP.md** sekce "Migrace dat ze Supabase".

---

## 🖼️ Obrázky

### Kde se ukládají obrázky?
V **Firebase Storage** ve složce `project-images/`.

### Jaká je maximální velikost obrázku?
- **Upload limit**: 5 MB (nastaveno v API)
- **Automatická komprese**: Obrázky se komprimují na 85% kvalitu a max 500 KB
- **Progress bar**: Vidíte průběh komprese v reálném čase

### Podporované formáty?
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

### Jak změním kompresi?
Upravte `src/components/admin/ImageUpload.tsx`:
```typescript
const options = {
  maxSizeMB: 0.5,        // Max velikost (0.5 = 500 KB)
  maxWidthOrHeight: 1920, // Max rozměr
  useWebWorker: true,
  quality: 0.85,         // Kvalita (0.85 = 85%)
  initialQuality: 0.85,  // Počáteční kvalita
  onProgress: (progress) => {
    setCompressionProgress(progress); // Progress bar
  },
};
```

---

## 🎨 Customizace

### Jak změním barvy?
Upravte `tailwind.config.js`:
```javascript
colors: {
  primary: '#000000',
  secondary: '#FF6B35',  // Změňte tuto barvu
  accent: '#FFD700',     // Změňte tuto barvu
}
```

### Jak přidám novou sekci?
1. Vytvořte komponentu v `src/components/`
2. Importujte ji do `src/app/page.tsx`
3. Přidejte do navigace v `src/components/Header.tsx`

### Kde najdu více informací?
Viz **CUSTOMIZATION.md** pro detailní návod.

---

## 🚀 Deployment

### Jak nasadím na Vercel?
1. Pushněte kód na GitHub
2. Jděte na https://vercel.com
3. Importujte repository
4. Přidejte environment variables
5. Deploy!

Detailní návod viz **DEPLOY_GUIDE.md**.

### Musím nastavit něco speciálního pro Firebase?
Ne! Firebase funguje automaticky. Jen nezapomeňte:
1. Přidat environment variables na Vercelu
2. Nastavit Firebase Rules
3. Povolit doménu v Firebase Console (pokud je to potřeba)

---

## 🐛 Řešení problémů

### Chyba: "Missing Firebase environment variables"
**Řešení:**
1. Zkontrolujte `.env.local` - jsou všechny proměnné vyplněné?
2. Restartujte dev server (`Ctrl+C` a `npm run dev`)
3. Zkontrolujte, že názvy proměnných začínají `NEXT_PUBLIC_`

### Chyba: "Permission denied" při zápisu
**Řešení:**
1. Zkontrolujte Firestore Rules v Firebase Console
2. Ujistěte se, že používáte správný admin token
3. Zkontrolujte, že `ADMIN_PASSWORD` je správně nastaveno

### Obrázky se nenačítají
**Řešení:**
1. Zkontrolujte Storage Rules v Firebase Console
2. Zkontrolujte `next.config.js` - je tam `firebasestorage.googleapis.com`?
3. Zkontrolujte URL obrázku v databázi

### Build error: "Module not found"
**Řešení:**
1. Smažte `node_modules` a `package-lock.json`
2. Spusťte `npm install`
3. Zkontrolujte, že `firebase` je v `package.json`

### Projekty se nezobrazují na homepage
**Řešení:**
1. Zkontrolujte Firebase Console - jsou tam nějaké projekty?
2. Otevřete Browser Console - jsou tam chyby?
3. Zkontrolujte API route `/api/projects` - vrací data?

---

## 📚 Další zdroje

- **Firebase dokumentace**: https://firebase.google.com/docs
- **Next.js dokumentace**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TipTap editor**: https://tiptap.dev/docs

---

## 💡 Tipy a triky

### Optimalizace výkonu
1. Používejte indexy v Firestore (viz `firestore.indexes.json`)
2. Cachujte data na frontendu
3. Používejte Next.js Image component pro obrázky

### Bezpečnost
1. Nikdy necommitujte `.env.local` do gitu
2. Používejte silné admin heslo
3. Pravidelně kontrolujte Firebase Security Rules

### Vývoj
1. Používejte Firebase Emulator pro lokální testování
2. Nastavte ESLint a Prettier
3. Používejte TypeScript pro type safety

---

## 📞 Potřebujete pomoc?

Pokud jste nenašli odpověď na svou otázku:
1. Zkontrolujte **FIREBASE_SETUP.md**
2. Zkontrolujte **MIGRATION_SUMMARY.md**
3. Zkontrolujte Firebase Console logs
4. Kontaktujte vývojáře

