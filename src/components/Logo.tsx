import React from 'react';
import Svg, { Circle, Ellipse, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { fonts } from '../theme';

interface Props {
  width?: number;
  /** Show the "PrayWithSaints" wordmark + tagline below the mark. */
  showWordmark?: boolean;
}

// Logo palette (from the supplied artwork).
const C = {
  ringFaint: '#7F77DD',
  ring: '#534AB7',
  ray: '#7F77DD',
  orb: '#EEEDFE',
  candle: '#D3D1C7',
  candleShade: '#B4B2A9',
  wick: '#444441',
  flameOuter: '#EF9F27',
  flameMid: '#FAC775',
  flameCore: '#FFF7ED',
  dot: '#AFA9EC',
  divider: '#AFA9EC',
  wordmark: '#CECBF6',
  tagline: '#B4B2A9',
};

const CX = 340;
const CY = 160;

/**
 * "Pray with Saints" logo: a candle flame within a radiant halo. Rebuilt from
 * the brand SVG as react-native-svg primitives so the wordmark can use the
 * app's loaded serif font and it scales cleanly.
 */
export default function Logo({ width = 220, showWordmark = true }: Props) {
  // Crop tightly to the artwork; include the wordmark area only when shown.
  const viewBox = showWordmark ? '150 61 380 303' : '236 56 208 208';
  const ratio = showWordmark ? 303 / 380 : 208 / 208;
  const height = width * ratio;

  // 12 halo rays (short ticks at radius 86→94).
  const rays = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * (Math.PI / 180);
    rays.push(
      <Line
        key={i}
        x1={CX + 86 * Math.cos(a)}
        y1={CY + 86 * Math.sin(a)}
        x2={CX + 94 * Math.cos(a)}
        y2={CY + 94 * Math.sin(a)}
        stroke={C.ray}
        strokeWidth={1.5}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      {/* Halo rings */}
      <Circle cx={CX} cy={CY} r={96} fill="none" stroke={C.ringFaint} strokeWidth={1} strokeDasharray="4 6" opacity={0.2} />
      <Circle cx={CX} cy={CY} r={78} fill="none" stroke={C.ring} strokeWidth={1.5} />
      {rays}

      {/* Orb behind the candle */}
      <Circle cx={CX} cy={CY} r={60} fill={C.orb} />

      {/* Candle */}
      <Rect x={328} y={168} width={24} height={36} rx={3} fill={C.candle} />
      <Rect x={344} y={168} width={8} height={36} rx={1} fill={C.candleShade} opacity={0.5} />
      <Ellipse cx={340} cy={168} rx={12} ry={3} fill={C.candle} />
      <Line x1={340} y1={168} x2={340} y2={157} stroke={C.wick} strokeWidth={1.5} strokeLinecap="round" />

      {/* Flame */}
      <Path d="M340 108 C328 120 320 135 325 148 C328 156 335 160 340 158 C345 160 352 156 355 148 C360 135 352 120 340 108 Z" fill={C.flameOuter} />
      <Path d="M340 116 C333 126 329 138 333 147 C335 153 338 156 340 155 C342 156 345 153 347 147 C351 138 347 126 340 116 Z" fill={C.flameMid} />
      <Path d="M340 128 C337 134 336 141 337 146 C338 149 339 151 340 151 C341 151 342 149 343 146 C344 141 343 134 340 128 Z" fill={C.flameCore} />

      {/* Cardinal halo dots */}
      <Circle cx={340} cy={82} r={3} fill={C.dot} />
      <Circle cx={418} cy={160} r={3} fill={C.dot} />
      <Circle cx={340} cy={238} r={3} fill={C.dot} />
      <Circle cx={262} cy={160} r={3} fill={C.dot} />

      {showWordmark && (
        <>
          <Line x1={180} y1={270} x2={500} y2={270} stroke={C.divider} strokeWidth={0.5} />
          <SvgText x={340} y={301} fill={C.wordmark} fontFamily={fonts.bold} fontSize={23} textAnchor="middle">
            Lord, melt me like wax
          </SvgText>
          <SvgText x={340} y={329} fill={C.wordmark} fontFamily={fonts.bold} fontSize={23} textAnchor="middle">
            while You burn in me.
          </SvgText>
          <SvgText x={340} y={354} fill={C.tagline} fontFamily={fonts.regular} fontSize={13} textAnchor="middle">
            PRAYWITHSAINTS.COM
          </SvgText>
        </>
      )}
    </Svg>
  );
}
