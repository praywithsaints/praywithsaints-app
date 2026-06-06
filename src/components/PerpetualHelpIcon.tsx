import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  size?: number;
  color?: string; // unused — this icon is the full artwork, not a tintable glyph
}

/**
 * Mother of Perpetual Help icon, rendered from the supplied artwork
 * (assets/icons/perpetual-help.png) on a white background.
 */
export default function PerpetualHelpIcon({ size = 24 }: Props) {
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
        source={require('../../assets/icons/perpetual-help.png')}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
}
