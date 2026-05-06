interface LogoProps {
  size?: number
  color?: string
  gold?: string
  className?: string
}

// Five classical pillars in a double ring.
// Designed for legibility at 36px — strokes and gaps sized so both rings
// and individual columns are clearly distinct at actual display size.
export function Logo({ size = 36, color = 'currentColor', gold = '#c9a84c', className }: LogoProps) {
  // 40×40 viewBox gives enough precision for all features to render at 36px
  const cx = 20, cy = 20

  // Double ring — 2-unit gap so both rings read at small sizes
  const R1 = 18.2   // outer ring radius
  const R2 = 15.8   // inner ring radius (gap = 2.4 units ≈ 2px at 36px)

  // Column geometry — 1:1 width-to-gap (Doric)
  const n  = 5
  const pw = 2.6    // pillar width
  const pg = 2.6    // pillar gap
  const tw = n * pw + (n - 1) * pg  // = 23.4
  const sx = cx - tw / 2            // start x

  const pillarH   = 13.5
  const baselineY = 26.5
  const topY      = baselineY - pillarH  // = 13.0

  // Entablature
  const capW = tw + 3.0;  const capX = cx - capW / 2
  const cornW = tw + 5.0; const cornX = cx - cornW / 2

  // Stylobate
  const sty1W = tw + 3.2; const sty1X = cx - sty1W / 2
  const sty2W = tw + 5.6; const sty2X = cx - sty2W / 2

  const pillars = Array.from({ length: n }, (_, i) => sx + i * (pw + pg))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring — bold */}
      <circle cx={cx} cy={cy} r={R1} stroke={color} strokeWidth="1.3" />
      {/* Inner ring — thinner, clearly separated */}
      <circle cx={cx} cy={cy} r={R2} stroke={color} strokeWidth="0.6" />

      {/* Cornice */}
      <rect x={cornX} y={topY - 2.6} width={cornW} height={1.6} fill={color} />
      {/* Architrave */}
      <rect x={capX}  y={topY - 1.0} width={capW}  height={1.0} fill={color} />

      {/* Five columns */}
      {pillars.map((px, i) => (
        <rect key={i} x={px} y={topY} width={pw} height={pillarH} fill={color} />
      ))}

      {/* Stylobate step 1 */}
      <rect x={sty1X} y={baselineY}        width={sty1W} height={1.1} fill={color} />
      {/* Stylobate step 2 */}
      <rect x={sty2X} y={baselineY + 1.1}  width={sty2W} height={1.0} fill={color} />

      {/* Gold diamond — apex */}
      <polygon
        points={`${cx},${topY - 4.4} ${cx + 1.4},${topY - 3.0} ${cx},${topY - 1.6} ${cx - 1.4},${topY - 3.0}`}
        fill={gold}
      />
    </svg>
  )
}
