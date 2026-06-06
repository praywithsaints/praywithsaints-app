import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONT_SCALE_OPTIONS, useSettings } from '../settings/SettingsContext';
import { baseFontSizes, colors, fonts, radius, spacing } from '../theme';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { fontScaleId, setFontScaleId } = useSettings();

  // Hold the choice locally; only commit it when the user taps Save.
  const [pendingId, setPendingId] = useState(fontScaleId);
  const pendingScale =
    (FONT_SCALE_OPTIONS.find((o) => o.id === pendingId) ?? FONT_SCALE_OPTIONS[1]).value;

  const onSave = () => {
    setFontScaleId(pendingId);
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Font size</Text>
        <Text style={styles.sectionHint}>Choose how large the prayer text appears.</Text>

        <View style={styles.options}>
          {FONT_SCALE_OPTIONS.map((opt) => {
            const active = opt.id === pendingId;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setPendingId(opt.id)}
                style={[styles.option, active && styles.optionActive]}
              >
                <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                  {opt.label}
                </Text>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Live preview using the pending size */}
        <Text style={styles.previewLabel}>Preview</Text>
        <View style={styles.previewCard}>
          <Text style={[styles.previewTitle, { fontSize: baseFontSizes.prayerTitle * pendingScale }]}>
            The Hail Mary
          </Text>
          <Text
            style={[
              styles.previewBody,
              {
                fontSize: baseFontSizes.prayerBody * pendingScale,
                lineHeight: baseFontSizes.prayerBody * pendingScale * 1.5,
              },
            ]}
          >
            Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and
            blessed is the fruit of thy womb, Jesus.
          </Text>
        </View>
      </ScrollView>

      {/* Save bar pinned to the bottom */}
      <View style={styles.footer}>
        <Pressable
          onPress={onSave}
          style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
        >
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.primaryDark },
  sectionHint: { fontSize: 14, color: colors.textMuted, marginTop: 2, marginBottom: spacing.md },

  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionActive: { borderColor: colors.primary },
  optionLabel: { fontSize: 16, fontWeight: '600', color: colors.text },
  optionLabelActive: { color: colors.primaryDark },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },

  previewLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  previewCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewTitle: { fontFamily: fonts.bold, color: colors.primaryDark, marginBottom: spacing.sm },
  previewBody: { fontFamily: fonts.regular, color: colors.text },

  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonPressed: { backgroundColor: colors.primaryDark },
  saveText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
