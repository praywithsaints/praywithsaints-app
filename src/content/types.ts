// Content type definitions.
//
// Everything user-facing is stored as a LocalizedString: a map from locale code
// to text. Only "en" is populated today, but the shape lets us add languages
// later without touching components — just add another key (e.g. "ml", "la").

export type Locale = 'en';

export const DEFAULT_LOCALE: Locale = 'en';

/** A piece of text available in one or more languages. */
export type LocalizedString = Partial<Record<Locale, string>> & {
  en: string; // English is always present as the fallback.
};

/** Resolve a localized string for the active locale, falling back to English. */
export function t(value: LocalizedString, locale: Locale = DEFAULT_LOCALE): string {
  return value[locale] ?? value.en;
}

/** A single prayer with a title and body text. */
export interface Prayer {
  id: string;
  title: LocalizedString;
  /** Body of the prayer. Blank lines separate stanzas. */
  text: LocalizedString;
  /** Optional note shown under the title, e.g. "Pray three times". */
  note?: LocalizedString;
}

/** One of the five mysteries within a set. */
export interface Mystery {
  index: number; // 1..5
  title: LocalizedString;
  /** Short meditation / scripture reference for the decade. */
  meditation: LocalizedString;
}

export type MysterySetId = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

/** A full set of five mysteries (Joyful, Sorrowful, Glorious, Luminous). */
export interface MysterySet {
  id: MysterySetId;
  name: LocalizedString;
  /** Days this set is traditionally prayed, used for the hint text. */
  traditionalDays: LocalizedString;
  mysteries: Mystery[];
}
