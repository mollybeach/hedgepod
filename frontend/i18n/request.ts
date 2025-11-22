import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Top 10 languages by internet users
export const locales = ['en', 'zh', 'es', 'ar', 'pt', 'id', 'fr', 'ja', 'ru', 'de'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ar: 'العربية',
  pt: 'Português',
  id: 'Bahasa Indonesia',
  fr: 'Français',
  ja: '日本語',
  ru: 'Русский',
  de: 'Deutsch',
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

