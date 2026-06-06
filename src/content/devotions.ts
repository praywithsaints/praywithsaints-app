// Static devotional content for the drawer sections.
//
// Each devotion is a title + intro + an ordered list of blocks. Blocks render
// as either a section heading, a muted note/instruction, or a prayer card.
// Text is English-first; the rendering layer can be wrapped for localization
// later (the Rosary content already uses the LocalizedString pattern).

export type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'note'; text: string }
  | { kind: 'prayer'; title: string; note?: string; text: string };

export interface Devotion {
  title: string;
  intro?: string;
  blocks: Block[];
}

const VERSICLE =
  'V. We adore You, O Christ, and we praise You.\n' +
  'R. Because by Your holy cross You have redeemed the world.';

export const DEVOTIONS: Record<string, Devotion> = {
  // ──────────────────────────────────────────── General Prayers
  prayers: {
    title: 'Prayers',
    intro: 'A collection of everyday Catholic prayers.',
    blocks: [
      {
        kind: 'prayer',
        title: 'The Sign of the Cross',
        text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
      },
      {
        kind: 'prayer',
        title: 'The Our Father',
        text:
          'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
      },
      {
        kind: 'prayer',
        title: 'The Hail Mary',
        text:
          'Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      },
      {
        kind: 'prayer',
        title: 'The Glory Be',
        text:
          'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Act of Contrition',
        text:
          'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Act of Faith',
        text:
          'O my God, I firmly believe that You are one God in three divine Persons, Father, Son, and Holy Spirit. I believe that Your divine Son became man and died for our sins, and that He will come to judge the living and the dead. I believe these and all the truths which the holy Catholic Church teaches, because You have revealed them, who can neither deceive nor be deceived. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Act of Hope',
        text:
          'O my God, relying on Your almighty power and infinite mercy and promises, I hope to obtain pardon of my sins, the help of Your grace, and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Act of Love',
        text:
          'O my God, I love You above all things, with my whole heart and soul, because You are all-good and worthy of all love. I love my neighbour as myself for the love of You. I forgive all who have injured me, and ask pardon of all whom I have injured. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Come, Holy Spirit',
        text:
          'Come, Holy Spirit, fill the hearts of Your faithful and kindle in them the fire of Your love.\n\nV. Send forth Your Spirit and they shall be created.\nR. And You shall renew the face of the earth.\n\nO God, who by the light of the Holy Spirit did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise and ever rejoice in His consolation. Through Christ our Lord. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Prayer to Your Guardian Angel',
        text:
          'Angel of God, my guardian dear, to whom God’s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Morning Offering',
        text:
          'O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day, in union with the Holy Sacrifice of the Mass throughout the world. I offer them for all the intentions of Your Sacred Heart. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Grace Before Meals',
        text:
          'Bless us, O Lord, and these Thy gifts, which we are about to receive from Thy bounty, through Christ our Lord. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Grace After Meals',
        text:
          'We give Thee thanks, almighty God, for all Thy benefits, who livest and reignest, world without end. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Eternal Rest',
        note: 'For the faithful departed',
        text:
          'Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace. Amen.',
      },
    ],
  },

  // ──────────────────────────────────────────── Chaplet of Divine Mercy
  divineMercy: {
    title: 'Chaplet of Divine Mercy',
    intro: 'Prayed on ordinary Rosary beads. Best said at the Hour of Mercy (3 p.m.).',
    blocks: [
      { kind: 'heading', text: 'Opening Prayers' },
      {
        kind: 'prayer',
        title: 'The Sign of the Cross',
        text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Optional Opening Prayer',
        text:
          'You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.\n\n(Repeat three times) O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You.',
      },
      { kind: 'prayer', title: 'Our Father', text: 'Our Father, who art in heaven…' },
      { kind: 'prayer', title: 'Hail Mary', text: 'Hail Mary, full of grace…' },
      {
        kind: 'prayer',
        title: 'The Apostles’ Creed',
        text:
          'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord…',
      },
      { kind: 'heading', text: 'On the Our Father beads (before each decade)' },
      {
        kind: 'prayer',
        title: 'Eternal Father',
        text:
          'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
      },
      { kind: 'heading', text: 'On the ten Hail Mary beads' },
      {
        kind: 'prayer',
        title: 'For the sake of His sorrowful Passion',
        note: 'Pray ten times',
        text:
          'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      },
      { kind: 'note', text: 'Repeat the Eternal Father and the ten prayers for all five decades.' },
      { kind: 'heading', text: 'Concluding Prayers' },
      {
        kind: 'prayer',
        title: 'Holy God',
        note: 'Pray three times',
        text:
          'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.',
      },
      {
        kind: 'prayer',
        title: 'Closing Prayer',
        text:
          'Eternal God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself. Amen.',
      },
    ],
  },

  // ──────────────────────────────────────────── Way of the Cross
  wayOfTheCross: {
    title: 'Way of the Cross',
    intro: 'The fourteen Stations. At each station, genuflect and pray the versicle, then meditate.',
    blocks: [
      {
        kind: 'prayer',
        title: 'Opening Prayer',
        text:
          'My Lord Jesus Christ, You walked the way of sorrow to Calvary for love of me. Grant that I may accompany You on this holy way with a contrite and loving heart. Amen.',
      },
      { kind: 'note', text: 'At each station: ' + VERSICLE.replace(/\n/g, ' ') },
      {
        kind: 'prayer',
        title: 'First Station — Jesus is Condemned to Death',
        text: VERSICLE + '\n\nPilate, against his own conscience, condemns the innocent Jesus to die. Help me to accept God’s will even when it is unjust in the eyes of the world.',
      },
      {
        kind: 'prayer',
        title: 'Second Station — Jesus Takes Up His Cross',
        text: VERSICLE + '\n\nJesus embraces the heavy cross with love. Teach me to carry my daily crosses without complaint.',
      },
      {
        kind: 'prayer',
        title: 'Third Station — Jesus Falls the First Time',
        text: VERSICLE + '\n\nWorn out, Jesus falls beneath the weight of the cross. When I fall through sin, help me rise again at once.',
      },
      {
        kind: 'prayer',
        title: 'Fourth Station — Jesus Meets His Mother',
        text: VERSICLE + '\n\nMary meets her suffering Son, their hearts united in sorrow. May I find comfort in her motherly love.',
      },
      {
        kind: 'prayer',
        title: 'Fifth Station — Simon of Cyrene Helps Jesus',
        text: VERSICLE + '\n\nSimon is compelled to carry the cross. Let me willingly help others bear their burdens.',
      },
      {
        kind: 'prayer',
        title: 'Sixth Station — Veronica Wipes the Face of Jesus',
        text: VERSICLE + '\n\nVeronica offers a small act of love and receives the image of His face. May I serve You in the suffering around me.',
      },
      {
        kind: 'prayer',
        title: 'Seventh Station — Jesus Falls the Second Time',
        text: VERSICLE + '\n\nAgain Jesus falls. When I fall back into old sins, give me the courage to begin again.',
      },
      {
        kind: 'prayer',
        title: 'Eighth Station — Jesus Meets the Women of Jerusalem',
        text: VERSICLE + '\n\nJesus consoles the weeping women and calls them to repentance. Move my heart to true sorrow for sin.',
      },
      {
        kind: 'prayer',
        title: 'Ninth Station — Jesus Falls the Third Time',
        text: VERSICLE + '\n\nExhausted, Jesus falls a third time yet rises to finish His work. Strengthen me to persevere to the end.',
      },
      {
        kind: 'prayer',
        title: 'Tenth Station — Jesus is Stripped of His Garments',
        text: VERSICLE + '\n\nJesus is stripped and humiliated before all. Free me from attachment to comfort and vanity.',
      },
      {
        kind: 'prayer',
        title: 'Eleventh Station — Jesus is Nailed to the Cross',
        text: VERSICLE + '\n\nThe hands and feet of Jesus are nailed to the wood. Nail my heart to Your love and Your will.',
      },
      {
        kind: 'prayer',
        title: 'Twelfth Station — Jesus Dies on the Cross',
        text: VERSICLE + '\n\nAfter three hours of agony, Jesus bows His head and gives up His spirit. Thank You for the great love that saves me.',
      },
      {
        kind: 'prayer',
        title: 'Thirteenth Station — Jesus is Taken Down from the Cross',
        text: VERSICLE + '\n\nThe body of Jesus is placed in the arms of His Mother. May I receive You with reverence and love.',
      },
      {
        kind: 'prayer',
        title: 'Fourteenth Station — Jesus is Laid in the Tomb',
        text: VERSICLE + '\n\nJesus is laid in the tomb as we await the joy of the Resurrection. Bury my sins and raise me to new life with You.',
      },
      {
        kind: 'prayer',
        title: 'Closing Prayer',
        text:
          'Lord Jesus, by Your Passion and death You have redeemed the world. Grant that, having walked this holy way, I may share in the glory of Your Resurrection. Amen.',
      },
    ],
  },

  // ──────────────────────────────────────────── Novenas
  novenas: {
    title: 'Novenas',
    intro: 'A novena is nine days of prayer for a particular intention. Pray the chosen prayer once each day for nine days.',
    blocks: [
      { kind: 'heading', text: 'Novena to the Holy Spirit' },
      { kind: 'note', text: 'Traditionally prayed in the nine days before Pentecost.' },
      {
        kind: 'prayer',
        title: 'Daily Prayer',
        text:
          'Come, Holy Spirit, fill the hearts of Your faithful and kindle in them the fire of Your love. Send forth Your Spirit and they shall be created, and You shall renew the face of the earth. O God, who by the light of the Holy Spirit instructed the hearts of the faithful, grant us by the same Spirit to be truly wise and ever to rejoice in His consolation. Through Christ our Lord. Amen.',
      },
      { kind: 'heading', text: 'Novena to the Sacred Heart of Jesus' },
      {
        kind: 'prayer',
        title: 'Daily Prayer',
        text:
          'O most holy Heart of Jesus, fountain of every blessing, I adore You, I love You, and with lively sorrow for my sins I offer You this poor heart of mine. Make me humble, patient, pure, and wholly obedient to Your will. Grant, good Jesus, that I may live in You and for You. Protect me in the midst of danger; comfort me in my afflictions; give me health of body, assistance in my temporal needs, Your blessing on all that I do, and the grace of a holy death. Amen.',
      },
      { kind: 'heading', text: 'Novena to Saint Joseph' },
      {
        kind: 'prayer',
        title: 'Daily Prayer',
        text:
          'O glorious Saint Joseph, faithful follower of Jesus Christ, to you I raise my heart and hands to implore your powerful intercession. Obtain for me from the kind Heart of Jesus the help and graces necessary for my spiritual and temporal welfare, and the grace I particularly ask of you now. Guardian of the Word Incarnate, pray for me. Amen.',
      },
      { kind: 'heading', text: 'Novena to Saint Jude' },
      { kind: 'note', text: 'Patron of difficult and desperate causes.' },
      {
        kind: 'prayer',
        title: 'Daily Prayer',
        text:
          'Most holy Apostle Saint Jude, faithful servant and friend of Jesus, the Church honours and invokes you universally as the patron of hopeless cases and of things almost despaired of. Pray for me, who am so helpless and alone. Make use, I implore you, of that particular privilege given to you to bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need, that I may receive the consolation and help of heaven in all my necessities, and that I may praise God with you always. Amen.',
      },
    ],
  },

  // ──────────────────────────────────────────── Prayers & Novenas to Mary
  marian: {
    title: 'Prayers & Novenas to Mary',
    intro: 'Devotions to the Blessed Virgin Mary.',
    blocks: [
      {
        kind: 'prayer',
        title: 'The Angelus',
        text:
          'V. The Angel of the Lord declared unto Mary,\nR. And she conceived of the Holy Spirit. — Hail Mary…\n\nV. Behold the handmaid of the Lord,\nR. Be it done unto me according to thy word. — Hail Mary…\n\nV. And the Word was made flesh,\nR. And dwelt among us. — Hail Mary…\n\nV. Pray for us, O holy Mother of God,\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray. Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we to whom the Incarnation of Christ Thy Son was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Regina Caeli',
        note: 'Prayed during the Easter season in place of the Angelus',
        text:
          'Queen of Heaven, rejoice, alleluia.\nFor He whom you did merit to bear, alleluia,\nHas risen as He said, alleluia.\nPray for us to God, alleluia.\n\nV. Rejoice and be glad, O Virgin Mary, alleluia.\nR. For the Lord has truly risen, alleluia.',
      },
      {
        kind: 'prayer',
        title: 'The Memorare',
        text:
          'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession, was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.',
      },
      {
        kind: 'prayer',
        title: 'We Fly to Your Protection',
        note: 'Sub Tuum Praesidium',
        text:
          'We fly to thy protection, O holy Mother of God. Despise not our petitions in our necessities, but deliver us always from all dangers, O glorious and blessed Virgin. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Hail, Holy Queen',
        text:
          'Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.',
      },
      { kind: 'heading', text: 'The Three Hail Marys' },
      {
        kind: 'note',
        text:
          'A simple daily devotion for purity and protection: pray three Hail Marys each morning and evening in honour of Mary’s purity, asking her to keep you from sin.',
      },
      { kind: 'heading', text: 'Novena of the Three Hail Marys' },
      { kind: 'note', text: 'For nine days, pray three Hail Marys and the following prayer for your intention.' },
      {
        kind: 'prayer',
        title: 'Daily Prayer',
        text:
          'O Mary, my Mother, by thy great purity, obtain for me purity of heart, mind, and body. Most holy Virgin Mary, I beg thee to obtain for me the grace I now ask through thy powerful intercession with thy Son. Amen.',
      },
    ],
  },

  // ──────────────────────────────────────────── Mother of Perpetual Succor
  perpetualHelp: {
    title: 'Mother of Perpetual Succor',
    intro: 'Devotion to Our Lady under her title of Perpetual Help (Perpetual Succour).',
    blocks: [
      {
        kind: 'prayer',
        title: 'Prayer to Our Mother of Perpetual Help',
        text:
          'O Mother of Perpetual Help, grant that I may ever invoke thy most powerful name, which is the safeguard of the living and the salvation of the dying. O purest Mary, O sweetest Mary, let thy name henceforth be ever on my lips. Delay not, O Blessed Lady, to help me whenever I call on thee, for in all my needs, in all my temptations, I shall never cease to call on thee, ever repeating thy sacred name, Mary, Mary. O what consolation, what sweetness, what confidence fills my soul when I utter thy sacred name, or even only think of thee. I thank the Lord for having given thee so sweet, so powerful, so lovely a name. But I will not be content with merely uttering thy name; let my love for thee prompt me ever to hail thee, Mother of Perpetual Help. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Novena Prayer',
        note: 'Pray for nine days for your intention',
        text:
          'O Mother of Perpetual Help, with the greatest confidence I come before thy holy picture to be helped by thee. I come not relying on my own merits, but trusting in thy great goodness. Behold me, a poor sinner, kneeling at thy feet, and obtain for me from thy Son the grace I now ask of thee (mention your request). Help me, O Mother, in this and in all my needs, and be ever near me on the road to heaven. Amen.',
      },
      {
        kind: 'prayer',
        title: 'A Short Aspiration',
        text: 'Mother of Perpetual Help, pray for us.',
      },
    ],
  },

  // ──────────────────────────────────────────── Divine Peace
  divinePeace: {
    title: 'Divine Peace',
    intro: 'Prayers for peace of heart and peace in the world.',
    blocks: [
      {
        kind: 'prayer',
        title: 'Prayer for Peace',
        note: 'Attributed to Saint Francis of Assisi',
        text:
          'Lord, make me an instrument of Your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; and where there is sadness, joy.\n\nO Divine Master, grant that I may not so much seek to be consoled as to console; to be understood as to understand; to be loved as to love. For it is in giving that we receive; it is in pardoning that we are pardoned; and it is in dying that we are born to eternal life. Amen.',
      },
      {
        kind: 'prayer',
        title: 'Prayer to the Prince of Peace',
        text:
          'Lord Jesus Christ, You are the Prince of Peace. Grant to my restless heart Your peace, the peace the world cannot give. Calm my fears, quiet my anxieties, and let me rest in the knowledge of Your love, today and always. Amen.',
      },
      {
        kind: 'prayer',
        title: 'A Prayer for Peace in the World',
        text:
          'God of mercy, look upon our troubled world. Turn hearts hardened by anger to forgiveness, and minds set on conflict to understanding. Grant wisdom to leaders, comfort to the suffering, and to all peoples the gift of Your lasting peace. Through Christ our Lord. Amen.',
      },
    ],
  },
};
