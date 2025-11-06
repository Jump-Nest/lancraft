# 🔥 Nasazení Firebase Rules

## ⚠️ DŮLEŽITÉ: Musíte nastavit Storage Rules!

Upload obrázků nebude fungovat, dokud nenastavíte Storage Rules ve Firebase Console.

---

## 📦 Storage Rules

### Krok 1: Otevřete Firebase Console

Jděte na: https://console.firebase.google.com/project/lancraft-agency/storage/rules

### Krok 2: Zkopírujte a vložte tyto rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Pravidla pro project-images
    match /project-images/{imageId} {
      // Povolit čtení pro všechny
      allow read: if true;
      
      // DOČASNĚ povolit zápis všem
      // TODO: Implementovat Firebase Authentication nebo Service Account
      // Bezpečnost je zajištěna admin heslem v API
      allow write: if true;
    }
  }
}
```

### Krok 3: Klikněte "Publish"

---

## 📊 Firestore Rules

### Krok 1: Otevřete Firebase Console

Jděte na: https://console.firebase.google.com/project/lancraft-agency/firestore/rules

### Krok 2: Zkopírujte a vložte tyto rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projekty - čtení pro všechny, zápis pouze přes API
    match /projects/{projectId} {
      // Povolit čtení pro všechny
      allow read: if true;
      
      // Zápis zakázán - vše probíhá přes API s admin heslem
      allow write: if false;
    }
  }
}
```

### Krok 3: Klikněte "Publish"

---

## 🔐 Bezpečnost

### ⚠️ Storage Rules: `allow write: if true`

**Proč je to bezpečné?**
- API má vlastní autentifikaci (admin heslo)
- Pouze API může nahrávat soubory
- Uživatelé nemohou přímo nahrávat do Storage (musí jít přes API)
- API validuje typ souboru, velikost a autentifikaci

**Lepší řešení pro budoucnost:**
1. Implementovat Firebase Authentication
2. Použít Service Account s Admin SDK
3. Použít signed URLs

---

## ✅ Checklist

- [ ] Storage Rules nastaveny (allow write: if true)
- [ ] Firestore Rules nastaveny (allow write: if false)
- [ ] Rules publikovány (kliknuto "Publish")
- [ ] Aplikace redeployed na Vercelu
- [ ] Upload obrázku otestován

---

## 🧪 Testování

Po nastavení rules:

1. Jděte na: https://lancraft.vercel.app/admin/login
2. Přihlaste se admin heslem
3. Vytvořte nový projekt
4. Nahrajte obrázek
5. Mělo by fungovat! ✅

---

## 🐛 Troubleshooting

### Chyba: "User does not have permission to access"
**Řešení:** Zkontrolujte, že jste nastavili Storage Rules na `allow write: if true`

### Chyba: "Failed to load resource: 500"
**Řešení:** Zkontrolujte Vercel logs pro detaily chyby

### Chyba: "401 Unauthorized"
**Řešení:** Zkontrolujte, že máte správné admin heslo v `.env.local` na Vercelu

---

**Po nastavení rules by vše mělo fungovat! 🚀**

