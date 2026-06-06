import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  size?: number;
  color?: string; // unused — full artwork, not a tintable glyph
}

/**
 * "Prayers & Novenas to Mary" icon, rendered from the supplied artwork
 * (assets/icons/mary-praying.png) on a white background.
 */
export default function MaryPrayingIcon({ size = 24 }: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Image
        source={require('../../assets/icons/mary-praying.png')}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
}
