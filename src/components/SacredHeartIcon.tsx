import React from 'react';
import Svg, { Line, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

/**
 * Custom Sacred Heart icon: a radiant sunburst of rays behind a heart with a
 * flame above and a thorn band across — a simplified line-art version of the
 * supplied artwork. Stroked only, so it tints to the drawer colour.
 */
export default function SacredHeartIcon({ size = 24, color = '#000' }: Props) {
  const cx = 50;
  const cy = 52;

  // Sunburst rays around the heart.
  const rays = [];
  const RAY_COUNT = 24;
  for (let i = 0; i < RAY_COUNT; i++) {
    const a = (i / RAY_COUNT) * Math.PI * 2 - Math.PI / 2;
    const inner = 26;
    const outer = i % 2 === 0 ? 47 : 40; // alternate long/short rays
    rays.push(
      <Line
        key={i}
        x1={cx + inner * Math.cos(a)}
        y1={cy + inner * Math.sin(a)}
        x2={cx + outer * Math.cos(a)}
        y2={cy + outer * Math.sin(a)}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />,
    );
  }

  // Heart outline.
  const heart =
    'M50 66 C43 59 33 53 33 46 C33 41 37 38 41 38 C45 38 48 41 50 44 ' +
    'C52 41 55 38 59 38 C63 38 67 41 67 46 C67 53 57 59 50 66 Z';

  // Flame rising from the dip at the top of the heart.
  const flame = 'M50 41 C46 36 47 31 50 27 C53 31 54 36 50 41 Z';

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {rays}
      <Path d={heart} stroke={color} strokeWidth={3.5} fill="none" strokeLinejoin="round" />
      {/* Thorn band across the heart */}
      <Path
        d="M35 49 C42 53 58 53 65 49"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path d={flame} stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}
