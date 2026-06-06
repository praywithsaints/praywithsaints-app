import { Prayer } from './types';

// Traditional English texts of the prayers used in the Holy Rosary.
// Each entry is keyed by a stable id so screens can reference them directly.

export const PRAYERS: Record<string, Prayer> = {
  signOfTheCross: {
    id: 'signOfTheCross',
    title: { en: 'The Sign of the Cross' },
    text: {
      en: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    },
  },

  apostlesCreed: {
    id: 'apostlesCreed',
    title: { en: "The Apostles' Creed" },
    text: {
      en:
        'I believe in God, the Father almighty, Creator of heaven and earth, ' +
        'and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, ' +
        'born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; ' +
        'he descended into hell; on the third day he rose again from the dead; ' +
        'he ascended into heaven, and is seated at the right hand of God the Father almighty; ' +
        'from there he will come to judge the living and the dead.\n\n' +
        'I believe in the Holy Spirit, the holy catholic Church, the communion of saints, ' +
        'the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
    },
  },

  ourFather: {
    id: 'ourFather',
    title: { en: 'The Our Father' },
    text: {
      en:
        'Our Father, who art in heaven, hallowed be thy name; ' +
        'thy kingdom come; thy will be done on earth as it is in heaven. ' +
        'Give us this day our daily bread; and forgive us our trespasses, ' +
        'as we forgive those who trespass against us; ' +
        'and lead us not into temptation, but deliver us from evil. Amen.',
    },
  },

  hailMary: {
    id: 'hailMary',
    title: { en: 'The Hail Mary' },
    note: { en: 'Pray three times' },
    text: {
      en:
        'Hail Mary, full of grace, the Lord is with thee; ' +
        'blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. ' +
        'Holy Mary, Mother of God, pray for us sinners, ' +
        'now and at the hour of our death. Amen.',
    },
  },

  gloryBe: {
    id: 'gloryBe',
    title: { en: 'The Glory Be' },
    text: {
      en:
        'Glory be to the Father, and to the Son, and to the Holy Spirit. ' +
        'As it was in the beginning, is now, and ever shall be, world without end. Amen.',
    },
  },

  fatimaPrayer: {
    id: 'fatimaPrayer',
    title: { en: 'The Fatima Prayer' },
    text: {
      en:
        'O my Jesus, forgive us our sins, save us from the fires of hell, ' +
        'lead all souls to heaven, especially those in most need of thy mercy. Amen.',
    },
  },

  hailHolyQueen: {
    id: 'hailHolyQueen',
    title: { en: 'Hail, Holy Queen' },
    text: {
      en:
        'Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. ' +
        'To thee do we cry, poor banished children of Eve. ' +
        'To thee do we send up our sighs, mourning and weeping in this valley of tears. ' +
        'Turn then, most gracious Advocate, thine eyes of mercy toward us, ' +
        'and after this our exile show unto us the blessed fruit of thy womb, Jesus. ' +
        'O clement, O loving, O sweet Virgin Mary.\n\n' +
        'V. Pray for us, O holy Mother of God.\n' +
        'R. That we may be made worthy of the promises of Christ.',
    },
  },

  letUsPrayRosary: {
    id: 'letUsPrayRosary',
    title: { en: 'Let Us Pray' },
    text: {
      en:
        'O God, whose only-begotten Son, by his life, death, and resurrection, ' +
        'has purchased for us the rewards of eternal life: grant, we beseech thee, ' +
        'that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, ' +
        'we may imitate what they contain and obtain what they promise, ' +
        'through the same Christ our Lord. Amen.',
    },
  },

  litanyOfLoreto: {
    id: 'litanyOfLoreto',
    title: { en: 'Litany of the Blessed Virgin Mary' },
    note: { en: 'Litany of Loreto' },
    text: {
      en:
        'Lord, have mercy. — Lord, have mercy.\n' +
        'Christ, have mercy. — Christ, have mercy.\n' +
        'Lord, have mercy. — Lord, have mercy.\n' +
        'Christ, hear us. — Christ, graciously hear us.\n\n' +
        'God the Father of heaven, — have mercy on us.\n' +
        'God the Son, Redeemer of the world, — have mercy on us.\n' +
        'God the Holy Spirit, — have mercy on us.\n' +
        'Holy Trinity, one God, — have mercy on us.\n\n' +
        'Holy Mary, — pray for us.\n' +
        'Holy Mother of God, — pray for us.\n' +
        'Holy Virgin of virgins, — pray for us.\n' +
        'Mother of Christ, — pray for us.\n' +
        'Mother of the Church, — pray for us.\n' +
        'Mother of divine grace, — pray for us.\n' +
        'Mother most pure, — pray for us.\n' +
        'Mother most chaste, — pray for us.\n' +
        'Mother inviolate, — pray for us.\n' +
        'Mother undefiled, — pray for us.\n' +
        'Mother most amiable, — pray for us.\n' +
        'Mother most admirable, — pray for us.\n' +
        'Mother of good counsel, — pray for us.\n' +
        'Mother of our Creator, — pray for us.\n' +
        'Mother of our Saviour, — pray for us.\n' +
        'Virgin most prudent, — pray for us.\n' +
        'Virgin most venerable, — pray for us.\n' +
        'Virgin most renowned, — pray for us.\n' +
        'Virgin most powerful, — pray for us.\n' +
        'Virgin most merciful, — pray for us.\n' +
        'Virgin most faithful, — pray for us.\n' +
        'Mirror of justice, — pray for us.\n' +
        'Seat of wisdom, — pray for us.\n' +
        'Cause of our joy, — pray for us.\n' +
        'Spiritual vessel, — pray for us.\n' +
        'Vessel of honour, — pray for us.\n' +
        'Singular vessel of devotion, — pray for us.\n' +
        'Mystical rose, — pray for us.\n' +
        'Tower of David, — pray for us.\n' +
        'Tower of ivory, — pray for us.\n' +
        'House of gold, — pray for us.\n' +
        'Ark of the covenant, — pray for us.\n' +
        'Gate of heaven, — pray for us.\n' +
        'Morning star, — pray for us.\n' +
        'Health of the sick, — pray for us.\n' +
        'Refuge of sinners, — pray for us.\n' +
        'Comforter of the afflicted, — pray for us.\n' +
        'Help of Christians, — pray for us.\n' +
        'Queen of angels, — pray for us.\n' +
        'Queen of patriarchs, — pray for us.\n' +
        'Queen of prophets, — pray for us.\n' +
        'Queen of apostles, — pray for us.\n' +
        'Queen of martyrs, — pray for us.\n' +
        'Queen of confessors, — pray for us.\n' +
        'Queen of virgins, — pray for us.\n' +
        'Queen of all saints, — pray for us.\n' +
        'Queen conceived without original sin, — pray for us.\n' +
        'Queen assumed into heaven, — pray for us.\n' +
        'Queen of the most holy Rosary, — pray for us.\n' +
        'Queen of families, — pray for us.\n' +
        'Queen of peace, — pray for us.\n\n' +
        'Lamb of God, who takest away the sins of the world, — spare us, O Lord.\n' +
        'Lamb of God, who takest away the sins of the world, — graciously hear us, O Lord.\n' +
        'Lamb of God, who takest away the sins of the world, — have mercy on us.\n\n' +
        'V. Pray for us, O holy Mother of God.\n' +
        'R. That we may be made worthy of the promises of Christ.',
    },
  },

  letUsPrayLitany: {
    id: 'letUsPrayLitany',
    title: { en: 'Let Us Pray' },
    text: {
      en:
        'Grant, we beseech thee, O Lord God, that we thy servants may enjoy perpetual health ' +
        'of mind and body; and by the glorious intercession of the Blessed Mary, ever Virgin, ' +
        'may be delivered from present sorrow, and obtain eternal joy. ' +
        'Through Christ our Lord. Amen.',
    },
  },

  memorare: {
    id: 'memorare',
    title: { en: 'The Memorare' },
    text: {
      en:
        'Remember, O most gracious Virgin Mary, that never was it known ' +
        'that anyone who fled to thy protection, implored thy help, or sought thy intercession, ' +
        'was left unaided. Inspired by this confidence, I fly unto thee, ' +
        'O Virgin of virgins, my Mother; to thee do I come, before thee I stand, sinful and sorrowful. ' +
        'O Mother of the Word Incarnate, despise not my petitions, ' +
        'but in thy mercy hear and answer me. Amen.',
    },
  },

  intentionsOfHolyFather: {
    id: 'intentionsOfHolyFather',
    title: { en: 'For the Intentions of the Holy Father' },
    note: { en: 'Pray one Our Father, one Hail Mary, and one Glory Be' },
    text: {
      en:
        'For the intentions of the Holy Father, and to obtain the indulgences ' +
        'granted to those who pray the Rosary, we pray:\n\n' +
        'Our Father…\nHail Mary…\nGlory Be…',
    },
  },
};
