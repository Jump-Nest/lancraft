# 🎨 Průvodce Customizací

## 1. Změna Barev & Designu

### Primární Barvy
Úprava: `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      primary: '#000000',    // Černá
      secondary: '#FF6B35',  // Oranžová (ZMĚNA TADY)
      accent: '#FFD700',     // Zlatá (ZMĚNA TADY)
      dark: '#1a1a1a',
    },
  },
},
```

### Gradient Text
V `globals.css`:
```css
.gradient-text {
  background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
}
```

---

## 2. Změna Textu & Obsahu

### Header Navigace
`src/components/Header.tsx`:
```tsx
const navItems = [
  { name: 'Úvod', href: '#hero' },
  { name: 'Naše projekty', href: '#projects' },
  // PŘIDEJTE NOVÉ POLOŽKY TADY
];
```

### Hero Slideshow
`src/components/HeroSection.tsx`:
```tsx
const slides = [
  {
    title: 'Váš Titul',
    image: '/path/to/image.jpg',
    description: 'Váš popis',
  },
  // PŘIDEJTE NOVÉ SLAJDY
];
```

### Projekty
`src/components/ProjectsSection.tsx`:
```tsx
const projects = [
  {
    title: 'Projekt 1',
    description: 'Popis projektu',
    image: '/path/image.jpg',
    tag: 'Kategorie',
  },
  // PŘIDEJTE NOVÉ PROJEKTY
];
```

### Klienti
`src/components/ClientsSection.tsx`:
```tsx
const clients = [
  {
    name: 'Klient 1',
    logo: '/path/logo.png',
  },
  // PŘIDEJTE NOVÉ KLIENTY
];
```

---

## 3. Změna Fontů

V `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=VAŠE_FONT:wght@300;400;600;700;800&display=swap');
```

V `tailwind.config.js`:
```js
fontFamily: {
  sans: ['Vaše Font', 'sans-serif'],
  display: ['Vaše Display Font', 'sans-serif'],
},
```

---

## 4. Přidání Nových Obrázků

1. Zkopírujte obrázek do `public/` složky
2. V kódu použijte relativní cestu:
   ```tsx
   <Image src="/nova-fotka.jpg" alt="Popis" />
   ```

---

## 5. Úprava Animací

### Zpomalení Animace
`src/components/HeroSection.tsx`:
```tsx
transition={{ duration: 0.8 }}  // ZMĚŇTE NA 1.2, 1.5 atd
```

### Vypnutí Animace
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0 }}  // 0 = bez animace
```

### Nová Animace
```tsx
<motion.div
  initial={{ opacity: 0, rotate: -10 }}
  animate={{ opacity: 1, rotate: 0 }}
  transition={{ duration: 0.5 }}
>
  Váš obsah
</motion.div>
```

---

## 6. Změna Logo

1. Nahraďte: `public/designs/lclogotranswhite.png`
2. V `src/components/Header.tsx`:
   ```tsx
   <Image src="/designs/vaše-logo.png" alt="Logo" width={40} height={40} />
   ```

---

## 7. Změna Kontaktních Údajů

`src/components/Footer.tsx`:
```tsx
// Sociální sítě
const socialLinks = [
  { icon: HiFacebook, href: 'https://facebook.com/lancraft', name: 'Facebook' },
  // ZMĚŇTE ODKAZY
];

// Kategorie v footeru
const footerLinks = {
  Služby: ['Vaše služba 1', 'Vaše služba 2'],
  // ZMĚŇTE OBSAH
};
```

---

## 8. Změna Breakpointů (Responsive Design)

V `tailwind.config.js`:
```js
// Tailwind již má výchozí breakpointy:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
```

V komponentách:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  // 1 sloupec na mobile, 2 na tablet, 4 na desktop
</div>
```

---

## 9. Přidání Nové Sekce

1. Vytvořte `src/components/MojeNovaSekce.tsx`:
```tsx
'use client';

export default function MojeNovaSekce() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold">Moje Nová Sekce</h2>
        {/* Váš obsah */}
      </div>
    </section>
  );
}
```

2. Importujte v `src/app/page.tsx`:
```tsx
import MojeNovaSekce from '@/components/MojeNovaSekce';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <MojeNovaSekce />  {/* PŘIDEJTE TADY */}
      <ProjectsSection />
      {/* ... */}
    </main>
  );
}
```

---

## 10. Shadow & Effects

Tailwind Shadow:
```html
<div class="shadow-lg">      <!-- Velký stín -->
<div class="shadow-xl">      <!-- Velmi velký stín -->
<div class="drop-shadow">    <!-- Drop shadow efekt -->
```

Glow efekt (v `globals.css`):
```css
.glow-effect {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}
```

---

## ⚡ Quick Tips

1. **Rychlá změna barvy**: Upravte `secondary: '#FF6B35'` v tailwind.config.js
2. **Vyšší zásah**: Zvětšete padding: `py-20` → `py-32`
3. **Silnější text**: `font-semibold` → `font-bold`
4. **Vícecsloupý layout**: `grid-cols-2` → `grid-cols-3` / `grid-cols-4`
5. **Skrytí na mobilu**: Přidejte `hidden md:block` (skrytý na mobilu, viditelný od tablet)

---

## 🎯 Nejčastěji Upravované Věci

1. ✏️ Nadpisy - `src/app/page.tsx`
2. 🖼️ Obrázky - kopírovat do `public/`
3. 🎨 Barvy - `tailwind.config.js`
4. 📝 Texty - jednotlivé komponenty
5. ⚙️ Animace - `transition={{ duration: X }}`

---

## 💡 Resources

- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Next.js: https://nextjs.org/docs
- React Icons: https://react-icons.github.io/react-icons/

---

Hodně štěstí s customizací! 🚀