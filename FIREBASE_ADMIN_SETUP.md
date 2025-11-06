# 🔐 Firebase Admin SDK Setup

Firebase Admin SDK je potřeba pro **server-side operace** jako upload souborů do Storage.

---

## 🚀 Pro Development (Lokální)

Pro lokální vývoj **NENÍ** nutné nastavovat Service Account. Aplikace použije Application Default Credentials.

**Stačí mít v `.env.local`:**
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lancraft-agency
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lancraft-agency.firebasestorage.app
```

---

## 🌐 Pro Production (Vercel)

Pro produkci na Vercelu **DOPORUČUJEME** nastavit Service Account pro lepší bezpečnost.

### Krok 1: Vygenerujte Service Account Key

1. Jděte do Firebase Console: https://console.firebase.google.com/project/lancraft-agency/settings/serviceaccounts/adminsdk
2. Klikněte na záložku **"Service accounts"**
3. Klikněte **"Generate new private key"**
4. Potvrzení → Stáhne se JSON soubor

### Krok 2: Připravte JSON pro Environment Variable

Otevřete stažený JSON soubor. Vypadá nějak takto:

```json
{
  "type": "service_account",
  "project_id": "lancraft-agency",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@lancraft-agency.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Zkopírujte celý obsah jako JEDNU ŘÁDKU** (bez mezer mezi řádky).

### Krok 3: Přidejte do Vercel Environment Variables

1. Jděte na Vercel Dashboard: https://vercel.com/dashboard
2. Vyberte váš projekt
3. Jděte do **Settings** → **Environment Variables**
4. Přidejte novou proměnnou:
   - **Name:** `FIREBASE_SERVICE_ACCOUNT`
   - **Value:** Celý JSON jako jedna řádka
   - **Environment:** Production, Preview, Development (všechny)
5. Klikněte **Save**

### Krok 4: Redeploy

Po přidání environment variable musíte redeploy aplikaci:
1. Jděte do **Deployments**
2. Klikněte na poslední deployment
3. Klikněte **"Redeploy"**

---

## 🔍 Jak to funguje?

### Development (bez Service Account):
```typescript
// src/lib/firebase-admin.ts
app = initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});
```
- Používá Application Default Credentials
- Funguje pro lokální vývoj
- **Méně bezpečné** pro produkci

### Production (se Service Account):
```typescript
// src/lib/firebase-admin.ts
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});
```
- Používá Service Account credentials
- **Doporučeno** pro produkci
- Plná kontrola nad oprávněními

---

## ⚠️ Bezpečnost

### ✅ DO:
- Používejte Service Account v produkci
- Nikdy necommitujte Service Account JSON do gitu
- Používejte Environment Variables
- Pravidelně rotujte Service Account keys

### ❌ DON'T:
- Necommitujte `.env.local` do gitu (je v `.gitignore`)
- Nesdílejte Service Account JSON veřejně
- Neukládejte Service Account JSON v kódu

---

## 🧪 Testování

### Lokální test:
```bash
npm run dev
```
1. Přihlaste se do admin panelu
2. Vytvořte projekt
3. Nahrajte obrázek
4. Mělo by fungovat bez Service Account

### Production test:
1. Deploy na Vercel
2. Přidejte `FIREBASE_SERVICE_ACCOUNT` environment variable
3. Redeploy
4. Otestujte upload obrázku

---

## 🐛 Troubleshooting

### Chyba: "User does not have permission to access"
**Řešení:**
- Zkontrolujte Storage Rules v Firebase Console
- Ujistěte se, že používáte Admin SDK (ne client SDK)
- Pro produkci přidejte Service Account

### Chyba: "Failed to parse private key"
**Řešení:**
- Ujistěte se, že JSON je na JEDNÉ ŘÁDCE
- Zkontrolujte, že JSON je validní
- Zkopírujte celý obsah včetně `{` a `}`

### Chyba: "Could not load the default credentials"
**Řešení:**
- Pro development: Není potřeba Service Account
- Pro production: Přidejte `FIREBASE_SERVICE_ACCOUNT` na Vercelu

---

## 📚 Další informace

- **Firebase Admin SDK dokumentace**: https://firebase.google.com/docs/admin/setup
- **Vercel Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Firebase Service Accounts**: https://firebase.google.com/docs/admin/setup#initialize-sdk

---

## ✅ Checklist

### Development:
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID` v `.env.local`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` v `.env.local`
- [ ] `npm run dev` funguje
- [ ] Upload obrázku funguje

### Production:
- [ ] Service Account JSON vygenerován
- [ ] `FIREBASE_SERVICE_ACCOUNT` přidán na Vercel
- [ ] Aplikace redeployed
- [ ] Upload obrázku funguje v produkci

---

**Hotovo! Vaše aplikace je připravena pro upload souborů! 🚀**

