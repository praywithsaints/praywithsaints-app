import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

/**
 * Custom rosary icon: two arcs of beads (rings) meeting at a centre bead, with
 * an outlined cross hanging below — matching the supplied artwork. Drawn with
 * strokes only so it tints to the drawer's active/inactive colour.
 */
export default function RosaryIcon({ size = 24, color = '#000' }: Props) {
  // Bead ring positions on a 100×100 canvas.
  const beads: [number, number][] = [
    [30, 22],
    [22, 37],
    [24, 53],
    [35, 64], // left arc
    [70, 22],
    [78, 37],
    [76, 53],
    [65, 64], // right arc
    [50, 70], // centre bead above the cross
  ];

  // Outlined cross (plus shape) below the centre bead.
  const cross =
    'M45 73 L55 73 L55 81 L64 81 L64 91 L55 91 L55 99 L45 99 L45 91 L36 91 L36 81 L45 81 Z';

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {beads.map(([cx, cy], i) => (
        <Circle key={i} cx={cx} cy={cy} r={5.5} stroke={color} strokeWidth={4.5} fill="none" />
      ))}
      <Path
        d={cross}
        stroke={color}
        strokeWidth={4.5}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
