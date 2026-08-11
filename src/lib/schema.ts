import { siteConfig } from '@/config/site';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleMeta {
  headline: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  url: string;
}

const absoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();

// Stable @id anchors so every entity on the site can reference the same
// Organization/WebSite node instead of restating it (and disagreeing) on
// every page.
const ORG_ID = `${siteConfig.siteUrl}/#organization`;
const WEBSITE_ID = `${siteConfig.siteUrl}/#website`;
const pageWebPageId = (pathname: string) => `${absoluteUrl(pathname)}#webpage`;
const pageBreadcrumbId = (pathname: string) => `${absoluteUrl(pathname)}#breadcrumb`;

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icons/icon-512.png'),
      width: 512,
      height: 512,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * One WebPage entity per page, tied back to the WebSite and (when present)
 * to that page's own BreadcrumbList — this is what lets the other entities
 * on the page reference something stable instead of duplicating data.
 */
export function buildWebPageSchema(options: {
  pathname: string;
  name: string;
  description: string;
  hasBreadcrumb: boolean;
  datePublished?: string;
  dateModified?: string;
}) {
  const { pathname, name, description, hasBreadcrumb, datePublished, dateModified } = options;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageWebPageId(pathname),
    url: absoluteUrl(pathname),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    ...(hasBreadcrumb ? { breadcrumb: { '@id': pageBreadcrumbId(pathname) } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const currentPath = items[items.length - 1]?.href ?? '/';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': pageBreadcrumbId(currentPath),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildFaqSchema(items: FaqItem[], pathname: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pathname)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildArticleSchema(meta: ArticleMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(meta.url)}#article`,
    headline: meta.headline,
    description: meta.description,
    datePublished: meta.publishedTime,
    dateModified: meta.modifiedTime ?? meta.publishedTime,
    inLanguage: 'en',
    image: absoluteUrl(siteConfig.ogImage.url),
    author: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: meta.author ?? siteConfig.siteName,
    },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': pageWebPageId(meta.url) },
    mainEntityOfPage: { '@id': pageWebPageId(meta.url) },
  };
}

/**
 * SoftwareApplication schema is only meaningful once real, confirmed app
 * facts exist — emitting it with placeholder version/size data would be
 * exactly the "misleading structured data" the project brief warns against.
 * Returns null until `siteConfig.verified.appData` is flipped to true.
 */
export function buildSoftwareApplicationSchema() {
  if (!siteConfig.verified.appData) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.siteUrl}/#software`,
    name: siteConfig.appName,
    applicationCategory: siteConfig.category,
    operatingSystem: 'Android',
    softwareVersion: siteConfig.appVersion,
    fileSize: siteConfig.fileSize,
    publisher: siteConfig.verified.publisher
      ? { '@type': 'Organization', name: siteConfig.publisher }
      : undefined,
  };
}
