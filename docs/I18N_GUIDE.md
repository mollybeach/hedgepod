# 🌍 HedgePod Internationalization (i18n) Guide

## 📋 Overview

HedgePod now supports **10 languages** using `next-intl`:

1. 🇬🇧 **English** (en) - Default
2. 🇨🇳 **Chinese** (zh)
3. 🇪🇸 **Spanish** (es)
4. 🇸🇦 **Arabic** (ar)
5. 🇧🇷 **Portuguese** (pt)
6. 🇮🇩 **Indonesian** (id)
7. 🇫🇷 **French** (fr)
8. 🇯🇵 **Japanese** (ja)
9. 🇷🇺 **Russian** (ru)
10. 🇩🇪 **German** (de)

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── page.tsx           # Home page
│   │   ├── portfolio/
│   │   ├── agents/
│   │   └── about/
│   ├── layout.tsx             # Root layout
│   └── globals.css
├── i18n/
│   ├── request.ts             # i18n configuration
│   └── messages/              # Translation files
│       ├── en.json            # English (complete)
│       ├── es.json            # Spanish (complete)
│       ├── zh.json            # Chinese (complete)
│       ├── fr.json            # French (template)
│       ├── de.json            # German (template)
│       ├── pt.json            # Portuguese (template)
│       ├── ja.json            # Japanese (template)
│       ├── ru.json            # Russian (template)
│       ├── ar.json            # Arabic (template)
│       └── id.json            # Indonesian (template)
├── components/
│   └── LanguageSwitcher.tsx   # Language selector dropdown
└── middleware.ts              # Automatic locale detection
```

---

## 🚀 How It Works

### 1. **Automatic Language Detection**

The middleware (`middleware.ts`) automatically detects the user's preferred language from:
- Browser settings (`Accept-Language` header)
- URL locale prefix (e.g., `/es/portfolio`)
- Previously selected language (stored in cookie)

### 2. **URL Structure**

- **Default (English)**: `https://hedgepod.app/` or `https://hedgepod.app/en/`
- **Spanish**: `https://hedgepod.app/es/`
- **Chinese**: `https://hedgepod.app/zh/`
- **French**: `https://hedgepod.app/fr/`

### 3. **Language Switcher**

The `LanguageSwitcher` component (top-right in navigation) allows users to change languages on the fly.

---

## 💻 Using Translations in Components

### Basic Usage

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('appName')}</h1>
      <p>{t('tagline')}</p>
      <button>{t('getStarted')}</button>
    </div>
  );
}
```

### Nested Translations

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations('features');

  return (
    <div>
      <h2>{t('title')}</h2>
      <div>
        <h3>{t('crossChain.title')}</h3>
        <p>{t('crossChain.description')}</p>
      </div>
    </div>
  );
}
```

### Multiple Namespaces

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function HomePage() {
  const tCommon = useTranslations('common');
  const tHero = useTranslations('hero');
  const tFeatures = useTranslations('features');

  return (
    <div>
      <h1>{tHero('title')}</h1>
      <p>{tHero('subtitle')}</p>
      <button>{tCommon('getStarted')}</button>
    </div>
  );
}
```

---

## 📝 Translation File Structure

`i18n/messages/en.json`:

```json
{
  "common": {
    "appName": "HedgePod Agent",
    "tagline": "Autonomous cross-chain DeFi...",
    "getStarted": "Get Started",
    "connect": "Connect Wallet"
  },
  "hero": {
    "title": "Your AI-Powered Cross-Chain Hedge Fund",
    "subtitle": "Deposit once. AI agents automatically rebalance..."
  },
  "features": {
    "title": "Why HedgePod?",
    "crossChain": {
      "title": "Cross-Chain Magic",
      "description": "Deposit on any chain, withdraw on any chain."
    }
  }
}
```

---

## 🔧 How to Update Pages

### Before (Hardcoded English):

```tsx
export function Portfolio() {
  return (
    <div>
      <h1>Your Portfolio</h1>
      <p>Total Value: $10,000</p>
      <button>Withdraw</button>
    </div>
  );
}
```

### After (With i18n):

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function Portfolio() {
  const t = useTranslations('portfolio');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('totalValue')}: $10,000</p>
      <button>{t('withdraw')}</button>
    </div>
  );
}
```

---

## 🌐 Adding New Translations

### 1. Update the Translation File

Edit `i18n/messages/es.json` (or any language):

```json
{
  "portfolio": {
    "title": "Tu Portafolio",
    "totalValue": "Valor Total",
    "withdraw": "Retirar"
  }
}
```

### 2. Use in Components

```tsx
const t = useTranslations('portfolio');
// Automatically uses Spanish if user is on /es/portfolio
```

---

## ✅ Current Translation Status

| Language | Code | Status | Completeness |
|----------|------|--------|--------------|
| English | `en` | ✅ Complete | 100% |
| Spanish | `es` | ✅ Complete | 100% |
| Chinese | `zh` | ✅ Complete | 100% |
| French | `fr` | ⚠️ Template | 0% (English fallback) |
| German | `de` | ⚠️ Template | 0% (English fallback) |
| Portuguese | `pt` | ⚠️ Template | 0% (English fallback) |
| Japanese | `ja` | ⚠️ Template | 0% (English fallback) |
| Russian | `ru` | ⚠️ Template | 0% (English fallback) |
| Arabic | `ar` | ⚠️ Template | 0% (English fallback) |
| Indonesian | `id` | ⚠️ Template | 0% (English fallback) |

**Note**: For production, hire professional translators for remaining languages.

---

## 🔥 Next Steps

### 1. **Update Remaining Pages**

Convert hardcoded text to use `useTranslations()`:

- ✅ `components/Navigation.tsx` - Done
- ⏳ `app/[locale]/page.tsx` - Home page
- ⏳ `app/[locale]/portfolio/page.tsx`
- ⏳ `app/[locale]/agents/page.tsx`
- ⏳ `app/[locale]/about/page.tsx`

### 2. **Professional Translation**

For remaining 7 languages, use services like:
- **Lokalise** - https://lokalise.com/
- **Crowdin** - https://crowdin.com/
- **OneSky** - https://www.oneskyapp.com/

### 3. **Test Each Language**

```bash
# Start dev server
npm run dev

# Visit each locale
http://localhost:3000/en/
http://localhost:3000/es/
http://localhost:3000/zh/
http://localhost:3000/fr/
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'i18n/messages/xx.json'"

**Solution**: Ensure all 10 JSON files exist in `i18n/messages/` folder.

### Issue: "Text not translating"

**Solution**: 
1. Check if you're using `'use client';` directive (required for `useTranslations`)
2. Verify the translation key exists in the JSON file
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Issue: "Wrong language showing"

**Solution**:
1. Check browser language settings
2. Use the Language Switcher dropdown to manually select
3. Clear cookies and reload

---

## 📚 Resources

- **next-intl Docs**: https://next-intl-docs.vercel.app/
- **Next.js i18n Routing**: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- **ISO 639-1 Language Codes**: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

---

## 🎉 Result

Your HedgePod app now supports **10 languages** with:
- ✅ Automatic language detection
- ✅ Manual language switcher
- ✅ SEO-friendly URLs (`/es/portfolio`, `/zh/agents`)
- ✅ No page reloads when switching languages
- ✅ Animal Crossing-themed dropdown
- ✅ Persistent language selection (cookie-based)

**Test it now:**

```bash
cd frontend
npm run dev
# Visit http://localhost:3000
# Click the language dropdown in top-right corner
```

---

**Built with ❤️ for 23M World App users worldwide! 🌍🦔**

