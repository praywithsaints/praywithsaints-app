// Network layer for daily, date-changing content.
//
//  - Daily Readings  → Universalis (JSONP feed, free for personal use)
//  - Today's Reflection → Evangelizo publication API (daily commentary)
//
// Both return HTML fragments, so we strip tags / decode entities for plain-text
// display. All functions throw on failure; screens handle the error state.

/** Liturgical region used for the readings feed. */
const UNIVERSALIS_REGION = 'Asia.India';

export interface Reading {
  label: string; // e.g. "First Reading"
  heading?: string; // short summary line
  source?: string; // scripture reference
  text: string;
}

export interface DailyReadings {
  date: string; // e.g. "Saturday 6 June 2026"
  day: string; // liturgical day, e.g. "Saturday of week 9 in Ordinary Time"
  readings: Reading[];
}

export interface Reflection {
  dateDisplayed: string;
  liturgicTitle: string;
  title: string;
  text: string;
  author?: string; // e.g. "Youssef Bousnaya (c.869–979), Syrian monk"
  source?: string; // the cited work
}

/** Strip HTML tags and decode the common entities these feeds emit. */
function htmlToText(input: unknown): string {
  // Feeds occasionally return objects/numbers for a field; guard so a bad field
  // can't throw "x.replace is not a function".
  if (typeof input !== 'string' || !input) return '';
  let s = input
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '');

  // Numeric entities → characters.
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
  s = s.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));

  // Named entities.
  const named: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&rsquo;': '’',
    '&lsquo;': '‘',
    '&ldquo;': '“',
    '&rdquo;': '”',
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
  };
  s = s.replace(/&[a-z]+;/gi, (m) => named[m.toLowerCase()] ?? m);

  return s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** "YYYYMMDD" (Universalis) */
function ymdCompact(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

/** "YYYY-MM-DD" (Evangelizo) */
function ymdDashed(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Fetch and parse the day's Mass readings from Universalis. */
export async function fetchDailyReadings(date: Date = new Date()): Promise<DailyReadings> {
  const url = `https://universalis.com/${UNIVERSALIS_REGION}/${ymdCompact(date)}/jsonpmass.js`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Readings request failed (${res.status})`);

  const raw = await res.text();
  // Response is JSONP: universalisCallback({ ... });
  const start = raw.indexOf('(');
  const end = raw.lastIndexOf(')');
  if (start === -1 || end === -1) throw new Error('Unexpected readings format');
  const data = JSON.parse(raw.slice(start + 1, end));

  const order: { key: string; label: string }[] = [
    { key: 'Mass_R1', label: 'First Reading' },
    { key: 'Mass_Ps', label: 'Responsorial Psalm' },
    { key: 'Mass_R2', label: 'Second Reading' },
    { key: 'Mass_GA', label: 'Gospel Acclamation' },
    { key: 'Mass_G', label: 'Gospel' },
  ];

  const readings: Reading[] = [];
  for (const { key, label } of order) {
    const r = data[key];
    if (r && r.text) {
      readings.push({
        label,
        heading: r.heading ? htmlToText(r.heading) : undefined,
        source: r.source ? htmlToText(r.source) : undefined,
        text: htmlToText(r.text),
      });
    }
  }

  return {
    date: htmlToText(data.date ?? ''),
    day: htmlToText(data.day ?? ''),
    readings,
  };
}

/** Fetch the day's reflection/commentary and liturgical title from Evangelizo. */
export async function fetchReflection(date: Date = new Date()): Promise<Reflection> {
  const dateStr = ymdDashed(date);
  const base = `https://publication.evangelizo.ws/AM/days/${dateStr}`;

  const [dayRes, commentaryRes] = await Promise.all([
    fetch(base),
    fetch(`${base}/commentary`),
  ]);
  if (!commentaryRes.ok) throw new Error(`Reflection request failed (${commentaryRes.status})`);

  const commentary = (await commentaryRes.json())?.data ?? {};
  let dayData: any = {};
  if (dayRes.ok) {
    try {
      dayData = (await dayRes.json())?.data ?? {};
    } catch {
      dayData = {};
    }
  }

  // `author` may be a string or an object { name, short_description }.
  const a = commentary.author;
  let author: string | undefined;
  if (typeof a === 'string') {
    author = htmlToText(a);
  } else if (a && typeof a === 'object') {
    const parts = [htmlToText(a.name), htmlToText(a.short_description)].filter(Boolean);
    author = parts.join(', ') || undefined;
  }

  return {
    dateDisplayed: typeof dayData.date_displayed === 'string' ? dayData.date_displayed : dateStr,
    liturgicTitle: typeof dayData.liturgic_title === 'string' ? dayData.liturgic_title : '',
    title: htmlToText(commentary.title) || 'Reflection',
    text: htmlToText(commentary.description),
    author,
    source: htmlToText(commentary.source) || undefined,
  };
}
