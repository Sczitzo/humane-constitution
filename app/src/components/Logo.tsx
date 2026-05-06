interface LogoProps {
  size?: number
  color?: string
  gold?: string
  className?: string
}

// Five classical pillars in a double ring — the five governance instruments
// as a constitutional temple: entablature cap, two-step stylobate base, gold diamond apex
export function Logo({ size = 32, color = 'currentColor', gold = '#c9a84c', className }: LogoProps) {
  // All coordinates in 32×32 viewBox
  const cx = 16, cy = 16

  // Column geometry — 1:1 width-to-gap ratio (classical Doric)
  const n = 5
  const pw = 1.85   // pillar width
  const pg = 1.85   // pillar gap (= pillar width)
  const tw = n * pw + (n - 1) * pg  // total width = 16.65
  const sx = cx - tw / 2            // start x = 7.675

  const pillarH  = 11.8
  const baselineY = 22.2
  const topY      = baselineY - pillarH  // = 10.4

  // Entablature widths (project beyond columns)
  const archW  = tw + 1.6;  const archX  = cx - archW / 2
  const cornW  = tw + 3.0;  const cornX  = cx - cornW / 2

  // Stylobate widths
  const sty1W  = tw + 1.8;  const sty1X  = cx - sty1W / 2
  const sty2W  = tw + 3.2;  const sty2X  = cx - sty2W / 2

  const pillars = Array.from({ length: n }, (_, i) => sx + i * (pw + pg))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={14.6} stroke={color} strokeWidth="0.75" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={13.5} stroke={color} strokeWidth="0.3" />

      {/* Cornice (top cap — projects furthest) */}
      <rect x={cornX} y={topY - 2.2} width={cornW} height={1.4} fill={color} />

      {/* Architrave (sits directly on pillar tops) */}
      <rect x={archX} y={topY - 0.8} width={archW} height={0.8} fill={color} />

      {/* Five columns */}
      {pillars.map((px, i) => (
        <rect key={i} x={px} y={topY} width={pw} height={pillarH} fill={color} />
      ))}

      {/* Stylobate — step 1 */}
      <rect x={sty1X} y={baselineY} width={sty1W} height={0.9} fill={color} />
      {/* Stylobate — step 2 */}
      <rect x={sty2X} y={baselineY + 0.9} width={sty2W} height={0.85} fill={color} />

      {/* Gold diamond — pediment apex */}
      <polygon
        points={`${cx},${topY - 3.5} ${cx + 1},${topY - 2.5} ${cx},${topY - 1.5} ${cx - 1},${topY - 2.5}`}
        fill={gold}
      />
    </svg>
  )
}
