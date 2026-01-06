# Favicon - Zlatá Koruna LanCraft

## Soubory

- `favicon.svg` - SVG verze faviconu (zlatá koruna na černém pozadí)
- `apple-touch-icon.svg` - SVG verze pro Apple zařízení
- `generate-favicon.html` - HTML nástroj pro generování PNG/ICO

## Jak vygenerovat favicon.ico

### Metoda 1: Použít online konvertor (DOPORUČENO)

1. Otevřete `public/generate-favicon.html` v prohlížeči
2. Klikněte na tlačítko "Download favicon.ico"
3. Stáhne se `favicon.png`
4. Jděte na https://convertio.co/png-ico/ nebo https://favicon.io/
5. Nahrajte `favicon.png`
6. Stáhněte `favicon.ico`
7. Uložte `favicon.ico` do složky `public/`

### Metoda 2: Použít SVG přímo

Moderní prohlížeče podporují SVG favicony, takže `favicon.svg` by měl fungovat automaticky.

### Metoda 3: Použít existující nástroj

Pokud máte ImageMagick nainstalovaný:

```bash
# Nejdřív vygenerujte PNG z HTML souboru
# Pak použijte ImageMagick
convert favicon.png -define icon:auto-resize=32,16 favicon.ico
```

## Aktuální stav

- ✅ SVG favicon vytvořen
- ✅ Apple touch icon vytvořen  
- ✅ Layout.tsx nakonfigurován
- ⏳ favicon.ico - potřebuje být vygenerován (viz instrukce výše)

## Design

Favicon zobrazuje zlatou korunu (barva #FACC15) na černém pozadí (#000000):
- Tři vrcholy s drahokamy
- Dekorativní diamanty na těle koruny
- Zlaté zvýraznění (#FDE047)
- Stíny pro hloubku

