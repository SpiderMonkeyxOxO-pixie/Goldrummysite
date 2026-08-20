/**
 * Central site configuration.
 *
 * Every page and component reads app facts, contact details and the APK
 * link from here — update this ONE file before launch instead of hunting
 * through pages. Fields still holding bracketed text (e.g.
 * "[COMPANY OR PUBLISHER]") or pre-launch status phrases ("Coming Soon",
 * "To Be Confirmed", "Not Yet Released" — see src/lib/placeholder.ts) are
 * unverified placeholders on purpose: nothing in this project invents a
 * version number, file size, download count or publisher name. Replace each
 * one with the real, confirmed detail — and only then flip the matching flag
 * in `verified` below to reveal the UI that depends on it (the publisher
 * row, extra game categories, referral features, payment options, and the
 * SoftwareApplication schema).
 */

export const siteConfig = {
  // Brand identity for this informational project (not the app itself).
  siteName: 'Gold Rummy',
  tagline: 'Independent Gold Rummy APK information & download guide',
  domain: 'goldrummy.site',
  siteUrl: 'https://goldrummy.site',
  locale: 'en_IN',

  // Default social-share image, used on every page unless overridden.
  // Regenerate from scripts/og-source.svg via `node scripts/generate-images.mjs`.
  ogImage: {
    url: '/og/default.png',
    width: 1200,
    height: 630,
    alt: 'Gold Rummy — independent Gold Rummy APK information and download guide',
  },

  // The application this site is about.
  appName: 'Gold Rummy',

  // Quick App Information table — see src/components/AppInfoTable.astro.
  // Pre-launch status text until each is confirmed with an official source
  // (see src/lib/placeholder.ts — these phrases are recognized as "pending"
  // the same way a bracketed placeholder is).
  appVersion: 'Coming Soon',
  fileType: 'APK',
  minAndroid: 'To Be Confirmed',
  fileSize: '35 MB',
  lastUpdated: 'Not Yet Released',
  category: 'Card & Rummy Game',
  language: 'English & Hindi',
  publisher: '[COMPANY OR PUBLISHER]',

  // Download.
  apkUrl: '/downloads/goldrummy_JLX7LRP2YTG.apk',

  // Shown as the primary action in place of a direct download link while
  // apkUrl above is still unconfirmed — a real, working destination instead
  // of a dead link, clearly labelled as a different site (not Gold Rummy
  // release news) so the CTA never implies more than it delivers.
  meanwhile: {
    label: 'Explore Other Rummy Apps',
    url: 'https://goldrummy20.com/?code=JLX7LRP2YTG&t=1787111858',
  },

  // Promotions.
  promoCode: 'Not Yet Available',

  // This website's own contact channel (NOT the app's account/payment
  // support — the copy is careful to keep that distinction explicit).
  contactEmail: 'Goldrummysupport@gmail.com',
  telegramUsername: '@OfficialGoldRummyChannel',

  // Compliance facts — kept as placeholders; never asserted without a source.
  legalAge: 'To Be Confirmed',
  // Summary form of the fuller, sourced paragraph on the homepage's About
  // section — update both together if either changes.
  supportedLocations: 'Most Indian states where real-money games of skill are permitted',
  restrictedLocations: 'Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim and Telangana (Tamil Nadu subject to additional restrictions)',

  // Granular verification gates. Every one defaults to false. Flip only the
  // ones you have confirmed with an official source — each gates a specific
  // "only if verified" requirement called out in the project brief.
  verified: {
    publisher: false,
    additionalGameCategories: false,
    referralFeatures: false,
    paymentOptions: false,
    appData: false, // gates SoftwareApplication structured data as a whole
  },

  social: {
    telegram: 'https://t.me/OfficialGoldRummyChannel',
  },
} as const;

export type SiteConfig = typeof siteConfig;
