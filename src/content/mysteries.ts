import { MysterySet, MysterySetId } from './types';

// The four sets of mysteries of the Rosary, each with five mysteries.

export const MYSTERY_SETS: Record<MysterySetId, MysterySet> = {
  joyful: {
    id: 'joyful',
    name: { en: 'Joyful Mysteries' },
    traditionalDays: { en: 'Mondays & Saturdays' },
    mysteries: [
      {
        index: 1,
        title: { en: 'The Annunciation' },
        meditation: {
          en: 'The angel Gabriel announces to Mary that she will conceive the Son of God. (Luke 1:26–38)',
        },
      },
      {
        index: 2,
        title: { en: 'The Visitation' },
        meditation: {
          en: 'Mary visits her cousin Elizabeth, who greets her as the Mother of the Lord. (Luke 1:39–56)',
        },
      },
      {
        index: 3,
        title: { en: 'The Nativity' },
        meditation: { en: 'Jesus is born in Bethlehem and laid in a manger. (Luke 2:1–20)' },
      },
      {
        index: 4,
        title: { en: 'The Presentation in the Temple' },
        meditation: {
          en: 'Mary and Joseph present the infant Jesus in the Temple. (Luke 2:22–38)',
        },
      },
      {
        index: 5,
        title: { en: 'The Finding in the Temple' },
        meditation: {
          en: 'After three days, Jesus is found teaching in the Temple. (Luke 2:41–52)',
        },
      },
    ],
  },

  sorrowful: {
    id: 'sorrowful',
    name: { en: 'Sorrowful Mysteries' },
    traditionalDays: { en: 'Tuesdays & Fridays' },
    mysteries: [
      {
        index: 1,
        title: { en: 'The Agony in the Garden' },
        meditation: { en: 'Jesus prays in Gethsemane as his Passion begins. (Matthew 26:36–46)' },
      },
      {
        index: 2,
        title: { en: 'The Scourging at the Pillar' },
        meditation: { en: 'Jesus is bound and cruelly scourged. (John 19:1)' },
      },
      {
        index: 3,
        title: { en: 'The Crowning with Thorns' },
        meditation: { en: 'A crown of thorns is pressed upon the head of Jesus. (Matthew 27:27–31)' },
      },
      {
        index: 4,
        title: { en: 'The Carrying of the Cross' },
        meditation: { en: 'Jesus carries his cross to Calvary. (John 19:17)' },
      },
      {
        index: 5,
        title: { en: 'The Crucifixion' },
        meditation: { en: 'Jesus is crucified and dies for our salvation. (Luke 23:33–46)' },
      },
    ],
  },

  glorious: {
    id: 'glorious',
    name: { en: 'Glorious Mysteries' },
    traditionalDays: { en: 'Sundays & Wednesdays' },
    mysteries: [
      {
        index: 1,
        title: { en: 'The Resurrection' },
        meditation: { en: 'Jesus rises from the dead on the third day. (Matthew 28:1–10)' },
      },
      {
        index: 2,
        title: { en: 'The Ascension' },
        meditation: { en: 'Jesus ascends into heaven forty days after the Resurrection. (Acts 1:6–11)' },
      },
      {
        index: 3,
        title: { en: 'The Descent of the Holy Spirit' },
        meditation: {
          en: 'The Holy Spirit descends upon the apostles at Pentecost. (Acts 2:1–13)',
        },
      },
      {
        index: 4,
        title: { en: 'The Assumption of Mary' },
        meditation: { en: 'Mary is assumed body and soul into heavenly glory.' },
      },
      {
        index: 5,
        title: { en: 'The Coronation of Mary' },
        meditation: { en: 'Mary is crowned Queen of Heaven and Earth.' },
      },
    ],
  },

  luminous: {
    id: 'luminous',
    name: { en: 'Luminous Mysteries' },
    traditionalDays: { en: 'Thursdays' },
    mysteries: [
      {
        index: 1,
        title: { en: 'The Baptism in the Jordan' },
        meditation: { en: 'Jesus is baptized by John in the Jordan. (Matthew 3:13–17)' },
      },
      {
        index: 2,
        title: { en: 'The Wedding at Cana' },
        meditation: { en: 'Jesus performs his first miracle at Mary’s request. (John 2:1–11)' },
      },
      {
        index: 3,
        title: { en: 'The Proclamation of the Kingdom' },
        meditation: {
          en: 'Jesus proclaims the Kingdom of God and calls all to conversion. (Mark 1:14–15)',
        },
      },
      {
        index: 4,
        title: { en: 'The Transfiguration' },
        meditation: { en: 'Jesus is transfigured in glory on the mountain. (Matthew 17:1–8)' },
      },
      {
        index: 5,
        title: { en: 'The Institution of the Eucharist' },
        meditation: { en: 'Jesus institutes the Eucharist at the Last Supper. (Matthew 26:26–29)' },
      },
    ],
  },
};

export const MYSTERY_SET_ORDER: MysterySetId[] = ['joyful', 'sorrowful', 'glorious', 'luminous'];

/**
 * The mystery set traditionally prayed on a given weekday.
 *   Sun: Glorious, Mon: Joyful, Tue: Sorrowful, Wed: Glorious,
 *   Thu: Luminous, Fri: Sorrowful, Sat: Joyful
 * @param day result of Date.getDay() (0 = Sunday … 6 = Saturday)
 */
export function defaultMysterySetForDay(day: number): MysterySetId {
  const byDay: MysterySetId[] = [
    'glorious', // Sunday
    'joyful', // Monday
    'sorrowful', // Tuesday
    'glorious', // Wednesday
    'luminous', // Thursday
    'sorrowful', // Friday
    'joyful', // Saturday
  ];
  return byDay[day] ?? 'joyful';
}
