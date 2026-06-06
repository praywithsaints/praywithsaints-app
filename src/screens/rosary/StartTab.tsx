import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrayerCard from '../../components/PrayerCard';
import { PRAYERS } from '../../content/prayers';
import { colors, spacing } from '../../theme';

// The opening prayers of the Rosary, in order.
const ORDER = [
  PRAYERS.signOfTheCross,
  PRAYERS.apostlesCreed,
  PRAYERS.ourFather,
  PRAYERS.hailMary, // prayed three times — noted on the card
  PRAYERS.gloryBe,
];

export default function StartTab() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>How to begin</Text>
        <Text style={styles.introText}>
          Begin with the Sign of the Cross, then pray these opening prayers on the
          crucifix and the first beads of the Rosary.
        </Text>
      </View>
      {ORDER.map((prayer, i) => (
        <PrayerCard key={prayer.id} prayer={prayer} step={i + 1} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  intro: { marginBottom: spacing.md },
  introTitle: { fontSize: 16, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.xs },
  introText: { fontSize: 14, lineHeight: 21, color: colors.textMuted },
});
