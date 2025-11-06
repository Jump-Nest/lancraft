# 🔧 Oprava CORS problému

## ❌ Problém:
```
Access to image at 'https://firebasestorage.googleapis.com/...' has been blocked by CORS policy
```

Obrázky se nahrávají, ale nelze je zobrazit kvůli CORS policy.

---

## ✅ Řešení: Nastavit CORS pro Firebase Storage

### Metoda 1: Pomocí Google Cloud Console (DOPORUČENO)

#### Krok 1: Nainstalujte Google Cloud SDK

**Windows:**
1. Stáhněte: https://cloud.google.com/sdk/docs/install
2. Spusťte instalátor
3. Restartujte terminál

**Nebo použijte Cloud Shell** (bez instalace):
https://console.cloud.google.com/storage/browser?project=lancraft-agency

#### Krok 2: Přihlaste se

```bash
gcloud auth login
```

#### Krok 3: Nastavte projekt

```bash
gcloud config set project lancraft-agency
```

#### Krok 4: Aplikujte CORS konfiguraci

```bash
gcloud storage buckets update gs://lancraft-agency.firebasestorage.app --cors-file=cors.json
```

**Nebo použijte gsutil:**
```bash
gsutil cors set cors.json gs://lancraft-agency.firebasestorage.app
```

---

### Metoda 2: Pomocí Google Cloud Console (Web UI)

#### Krok 1: Otevřete Google Cloud Storage

https://console.cloud.google.com/storage/browser?project=lancraft-agency

#### Krok 2: Najděte váš bucket

Klikněte na: `lancraft-agency.firebasestorage.app`

#### Krok 3: Otevřete "Permissions" tab

1. Klikněte na záložku **"Permissions"**
2. Klikněte na **"Add principal"**
3. V poli "New principals" zadejte: `allUsers`
4. V poli "Role" vyberte: **"Storage Object Viewer"**
5. Klikněte **"Save"**

#### Krok 4: Nastavte CORS

1. Klikněte na záložku **"Configuration"**
2. Najděte sekci **"CORS"**
3. Klikněte **"Edit CORS configuration"**
4. Vložte:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
```

5. Klikněte **"Save"**

---

### Metoda 3: Pomocí Firebase CLI (Alternativa)

#### Krok 1: Nainstalujte Firebase CLI

```bash
npm install -g firebase-tools
```

#### Krok 2: Přihlaste se

```bash
firebase login
```

#### Krok 3: Použijte gsutil přes Firebase

```bash
firebase open storage
```

Pak postupujte podle Metody 2.

---

## 🧪 Ověření

Po nastavení CORS:

1. **Počkejte 1-2 minuty** (propagace změn)
2. **Obnovte stránku** (Ctrl+F5)
3. **Obrázky by se měly zobrazit** ✅

---

## 🔍 Testování CORS

Otevřete konzoli prohlížeče a zkuste:

```javascript
fetch('https://firebasestorage.googleapis.com/v0/b/lancraft-agency.firebasestorage.app/o/project-images%2F1762440178136-y7idi.png?alt=media&token=fde8ba97-efe0-4921-b9e5-58b55e241ef6')
  .then(r => console.log('CORS OK:', r.status))
  .catch(e => console.error('CORS Error:', e));
```

Pokud vidíte `CORS OK: 200`, je vše v pořádku! ✅

---

## 🐛 Troubleshooting

### Chyba: "gcloud: command not found"
**Řešení:** Nainstalujte Google Cloud SDK nebo použijte Cloud Shell

### Chyba: "Permission denied"
**Řešení:** Ujistěte se, že jste přihlášeni správným Google účtem (vlastník projektu)

### CORS stále nefunguje
**Řešení:** 
1. Počkejte 5 minut (propagace)
2. Vymažte cache prohlížeče (Ctrl+Shift+Delete)
3. Zkuste incognito režim
4. Zkontrolujte, že jste aplikovali CORS na správný bucket

---

## 📚 Další informace

- **Google Cloud Storage CORS**: https://cloud.google.com/storage/docs/configuring-cors
- **Firebase Storage CORS**: https://firebase.google.com/docs/storage/web/download-files#cors_configuration
- **gsutil cors dokumentace**: https://cloud.google.com/storage/docs/gsutil/commands/cors

---

## ✅ Checklist

- [ ] Google Cloud SDK nainstalován (nebo použit Cloud Shell)
- [ ] Přihlášen k projektu `lancraft-agency`
- [ ] CORS konfigurace aplikována
- [ ] Počkáno 1-2 minuty
- [ ] Stránka obnovena (Ctrl+F5)
- [ ] Obrázky se zobrazují ✅

---

**Po nastavení CORS by vše mělo fungovat! 🚀**

