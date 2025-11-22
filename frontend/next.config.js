// TEMPORARILY DISABLED - Re-enable when restoring i18n
// const withNextIntl = require('next-intl/plugin')(
//   './i18n/request.ts'
// );

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
            '@react-native-async-storage/async-storage': false
        };
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
}

// Export plain config without i18n wrapper
module.exports = nextConfig;
// module.exports = withNextIntl(nextConfig); // Re-enable this line when restoring i18n