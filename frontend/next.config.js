const withNextIntl = require('next-intl/plugin')(
  // Specify the path to the request config
  './i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
}

module.exports = withNextIntl(nextConfig);
