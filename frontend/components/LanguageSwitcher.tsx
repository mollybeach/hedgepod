'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { localeNames, type Locale } from '../i18n/request';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Get the pathname without the locale prefix
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    
    // Navigate to the new locale
    const newPath = newLocale === 'en' 
      ? `/${pathWithoutLocale}` 
      : `/${newLocale}/${pathWithoutLocale}`;
    
    router.push(newPath || '/');
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-green-600 text-cream-50 px-4 py-2 pr-8 rounded-full border-3 border-brown-600 shadow-ac text-sm font-display cursor-pointer hover:bg-green-500 transition-colors"
        aria-label="Select Language"
      >
        {Object.entries(localeNames).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cream-50">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

