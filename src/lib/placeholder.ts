/**
 * A config value counts as an unfilled placeholder when it's either still
 * wrapped in square brackets (our convention throughout site.ts, e.g.
 * "[CURRENT APP VERSION]") or one of a small set of human-readable
 * pre-launch phrases ("Coming Soon", "To Be Confirmed", "Not Yet Released")
 * used in place of raw brackets for fields shown directly to visitors, like
 * the Quick App Information grid. Components use this to avoid turning an
 * unfilled placeholder into something that looks like a working link, a
 * copyable code, or a verified fact.
 */
const SOFT_PLACEHOLDER_PHRASES = [
  'coming soon',
  'to be confirmed',
  'not yet released',
  'to be announced',
  'not yet available',
  'information not yet available',
  'tbd',
  'tba',
];

export function isPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return true;
  return SOFT_PLACEHOLDER_PHRASES.includes(trimmed.toLowerCase());
}
