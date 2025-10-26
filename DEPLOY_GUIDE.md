# 🚀 Průvodce Deploymentem LanCraft Webu

## ✅ Co jsme vytvořili

Moderní, responzivní Next.js web s těmito sekcemi:

### 🎨 Sekce Webu
1. **Header/Navigace** - Sticky header s responzivním menu
2. **Hero Slideshow** - Automatický slideshow s úvodními sekcemi
3. **Naše Projekty** - Grid layout se 4 projektovými kartami
4. **Pronájem Techniky** - Popis služeb s ikonami
5. **Naši Klienti** - Carousel s logy klientů
6. **Footer** - Kontaktní informace a sociální sítě

### ✨ Vlastnosti
- ✅ Moderní animace (Framer Motion)
- ✅ Responzivní design (mobile, tablet, desktop)
- ✅ Gradient text a glow efekty
- ✅ Smooth scroll animace
- ✅ TypeScript pro lepší vývojářský zážitek
- ✅ SEO optimalizace
- ✅ Tailwind CSS styling

---

## 🏃 Spuštění Projektu Lokálně

### 1. Instalace (pokud ještě není hotová)
```bash
cd d:\lancraft\lancraft-web
npm install
```

### 2. Vývoj
```bash
npm run dev
```
Web poběží na **http://localhost:3000**

### 3. Build pro produkci
```bash
npm run build
npm start
```

---

## 🌐 Deployment na Vercelu

### 1. Příprava Repositáře
```bash
# Inicializujte Git (pokud ještě není)
git init
git add .
git commit -m "Initial commit - LanCraft website"

# Pushněte na GitHub
git remote add origin https://github.com/YOUR_USERNAME/lancraft-web.git
git branch -M main
git push -u origin main
```

### 2. Vercel Setup (webové rozhraní)
1. Jděte na **https://vercel.com**
2. Přihlaste se s GitHub účtem
3. Klikněte na **"New Project"**
4. Vyberte **lancraft-web** repository
5. Vercel automaticky detekuje Next.js

### 3. Konfigurace v Vercelu
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Framework: Next.js (auto-detected)
```

### 4. Environment Variables (v Vercel dashboard)
```
NEXT_PUBLIC_SITE_URL=https://vaš-domain.vercel.app
```

### 5. Deploy
Klikněte na "Deploy" - Vercel bude buildovat a deployovat

---

## 📱 Personalizace

### Změna Barev
Upravte `tailwind.config.js`:
```js
colors: {
  secondary: '#FF6B35',  // Primary orange
  accent: '#FFD700',     // Gold
}
```

### Změna Textu
Všechny texty jsou přímo v komponentách:
- `src/components/Header.tsx` - Navigace
- `src/components/HeroSection.tsx` - Hero slideshow
- `src/components/ProjectsSection.tsx` - Projekty
- `src/components/Footer.tsx` - Footer

### Přidání Nové Sekce
1. Vytvořte nový soubor `src/components/NewSection.tsx`
2. Importujte jej v `src/app/page.tsx`
3. Přidejte do hlavní stránky

---

## 🔧 Struktura Projektu

```
src/
├── app/
│   ├── layout.tsx      # Hlavní layout (header, footer wrapper)
│   ├── page.tsx        # Domovská stránka (skládá sekce)
│   └── globals.css     # Globální styly a animace
├── components/
│   ├── Header.tsx      # Navigační header
│   ├── HeroSection.tsx # Hero slideshow
│   ├── ProjectsSection.tsx
│   ├── RentalSection.tsx
│   ├── ClientsSection.tsx
│   └── Footer.tsx
└── hooks/
    └── useInView.ts    # Custom hook pro scroll animace
```

---

## 🎬 Animace

Všechny animace jsou v Framer Motion. Příklady:

```tsx
// Fade in animace
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// Slide up
<motion.div initial={{ y: 30 }} animate={{ y: 0 }}>

// Hover effect
<motion.button whileHover={{ scale: 1.05 }}>
```

---

## 📊 Performance Tips

1. **Images** - Next.js Image optimization je automatický
2. **CSS** - Tailwind purges nepoužitý CSS
3. **Code Splitting** - Next.js dělí kód automaticky
4. **Lazy Loading** - Komponenty se loadují podle potřeby

---

## 🐛 Troubleshooting

### Port 3000 je obsazený
```bash
npm run dev -- -p 3001
```

### Clear cache
```bash
# Smažte .next folder
rm -r .next
npm run build
```

### Build error
```bash
# Reinstalujte dependencies
rm -r node_modules package-lock.json
npm install
npm run build
```

---

## 📈 SEO Optimalizace

- ✅ Meta tags v `layout.tsx`
- ✅ Open Graph tags pro sociální sítě
- ✅ Semantic HTML
- ✅ Alt texty na obrázcích
- ✅ Structured data ready

---

## 🔒 Bezpečnost

- ✅ Next.js bezpečnostní headers
- ✅ CORS konfigurace
- ✅ Environment variables pro secrets
- ✅ XSS ochrana v React

---

## 📞 Kontakt & Support

Pokud máte nějaké dotazy nebo problémy:
1. Zkontrolujte logs: `npm run dev`
2. Podívejte se na Next.js dokumentaci: https://nextjs.org/docs
3. Kontaktujte support: support@lancraft.cz

---

## 🚀 Další Kroky

1. **Obsah**: Napište popis vašich služeb
2. **SEO**: Optimalizujte meta descriptions
3. **Analytics**: Přidejte Google Analytics
4. **Forms**: Implementujte kontaktní formulář
5. **Email**: Nastavte email notifications

---

**Hotovo! Váš web je připraven k deploymentu!** ✨