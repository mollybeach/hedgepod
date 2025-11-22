import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// All 19 languages supported by World Coin
export const locales = [
  'en', 'zh', 'es', 'ar', 'pt', 'id', 'fr', 'ja', 'ru', 'de',
  'hi', 'ko', 'pl', 'ca', 'ms', 'th', 'zh-TW', 'nl', 'es-419'
] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文 (简体)',
  es: 'Español',
  ar: 'العربية',
  pt: 'Português',
  id: 'Bahasa Indonesia',
  fr: 'Français',
  ja: '日本語',
  ru: 'Русский',
  de: 'Deutsch',
  hi: 'हिन्दी',
  ko: '한국어',
  pl: 'Polski',
  ca: 'Català',
  ms: 'Bahasa Melayu',
  th: 'ไทย',
  'zh-TW': '中文 (繁體)',
  nl: 'Nederlands',
  'es-419': 'Español (América Latina)',
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

