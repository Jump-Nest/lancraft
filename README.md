# LanCraft - Modern Gaming Event Agency Website

Profesionální website pro agenturu LanCraft vybavený moderními animacemi a responzivním designem.

## 🚀 Technologie

- **Next.js 15** - React framework pro produkci
- **Firebase** - Firestore Database + Storage
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animace a interakce
- **React Icons** - Ikonové sady
- **TypeScript** - Typová bezpečnost
- **TipTap** - Rich text editor pro admin panel

## 📋 Vlastnosti

### Frontend:
- ✨ Moderní design s gradientem a animacemi
- 📱 Plně responzivní pro všechna zařízení
- 🎨 Sekce:
  - Hero slideshow (Úvod)
  - Naše projekty (grid layout)
  - Pronájem techniky
  - Naši klienti (carousel)
  - Footer s kontaktem
- 🎯 Optimalizovaný pro vyhledávače (SEO)
- ⚡ Rychlý výkon
- 🌙 Tmavý, moderní design

### Admin Panel:
- 🔐 Zabezpečený admin panel s heslem
- ✏️ Rich text editor pro psaní článků
- 🖼️ Drag & drop upload obrázků s automatickou kompresí
- 📊 Správa projektů (CRUD operace)
- 🔥 Firebase Firestore pro databázi
- 📦 Firebase Storage pro obrázky

## 🏗️ Struktura Projektu

```
lancraft-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Hlavní layout
│   │   ├── page.tsx         # Domovská stránka
│   │   └── globals.css      # Globální styly
│   ├── components/
│   │   ├── Header.tsx       # Navigační header
│   │   ├── HeroSection.tsx  # Hero slideshow
│   │   ├── ProjectsSection.tsx
│   │   ├── RentalSection.tsx
│   │   ├── ClientsSection.tsx
│   │   └── Footer.tsx
│   └── hooks/
│       └── useInView.ts     # Custom hook pro animations
├── public/
│   ├── designs/             # Design fotky
│   └── LC WEB podklady/      # Fotky jednotlivých sekcí
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🚀 Spuštění

### ⚠️ DŮLEŽITÉ: Firebase Setup
Před spuštěním aplikace musíte nastavit Firebase! Následujte návod v **FIREBASE_SETUP.md**.

**Rychlý checklist:**
1. Vytvořte Firebase projekt
2. Nastavte Firestore Database a Storage
3. Zkopírujte Firebase config do `.env.local`
4. Nastavte Security Rules

Detailní návod: **FIREBASE_SETUP.md** | Checklist: **CHECKLIST.md**

### Instalace
```bash
npm install
```

### Konfigurace
Vyplňte Firebase credentials v `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
ADMIN_PASSWORD=your-strong-password
```

### Vývoj
```bash
npm run dev
```
- Web: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

### Build pro produkci
```bash
npm run build
npm start
```

## 📦 Deployment na Vercelu

1. **Příprava:**
   - Ujistěte se, že máte projekt na GitHubu
   - Pushněte všechny soubory do repositáře

2. **Vercel Setup:**
   - Přejděte na [vercel.com](https://vercel.com)
   - Klikněte na "New Project"
   - Importujte váš GitHub repository
   - Vercel automaticky detekuje Next.js projekt

3. **Konfigurace:**
   - Framework: Next.js (auto-detekováno)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Env Variables** (pokud jsou potřebné):
   - Přidejte v Vercel dashboard pod "Settings > Environment Variables"

5. **Deploy:**
   - Klikněte na "Deploy"
   - Vercel automaticky builduje a deployuje váš web

## 🎨 Personalizace

### Barvy
Upravte v `tailwind.config.js`:
```js
colors: {
  primary: '#000000',
  secondary: '#FF6B35',  // Orange
  accent: '#FFD700',     // Gold
}
```

### Fonty
Upravte v `globals.css` importy Google Fonts

### Obrázky
Všechny obrázky jsou v:
- `/designs` - Design mockupy
- `/LC WEB podklady` - Fotky sekcí

## 📱 Responzivní Body

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎬 Animace

Všechny animace používají Framer Motion:
- **Scroll animations** - Prvky se objevují při scrollování
- **Hover effects** - Interaktivní efekty na hover
- **Staggered animations** - Postupné animace prvků
- **Smooth transitions** - Hladké přechody

## 📊 Performance

- Next.js Image optimization
- CSS purging a minification
- Automatic code splitting
- SEO-friendly meta tags

## 🔐 Best Practices

- TypeScript pro type safety
- Mobile-first design
- Accessibility considerations
- Clean, maintainable code

## 📞 Kontakt

LanCraft - Agentura pro herní a esportové eventy

---

Vytvořeno s ❤️ pro gaming komunitu