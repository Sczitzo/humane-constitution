interface LogoProps {
  size?: number
  /** Primary mark color — defaults to silver for dark backgrounds */
  color?: string
  gold?: string
  className?: string
}

// Constitutional temple mark — matches the reference design:
// double ring, five classical columns, thick entablature + stylobate,
// 4-pointed compass star at apex.
export function Logo({ size = 36, color = 'currentColor', gold = '#c9a84c', className }: LogoProps) {
  const cx = 20, cy = 20

  // Rings — wide gap so both are clearly visible at small sizes
  const R1 = 18.4  // outer ring
  const R2 = 16.2  // inner ring (2.2-unit gap)

  // Column geometry — thicker columns, matching reference proportions
  const n  = 5
  const pw = 3.0   // pillar width
  const pg = 2.2   // pillar gap
  const tw = n * pw + (n - 1) * pg  // = 23.8
  const sx = cx - tw / 2

  const pillarH   = 12.8
  const baselineY = 26.8
  const topY      = baselineY - pillarH  // = 14.0

  // Entablature — single thick band (matches reference: one solid cap)
  const capW = tw + 4.4;  const capX = cx - capW / 2
  const capH = 2.4

  // Stylobate — single solid band at base
  const styW = tw + 4.8;  const styX = cx - styW / 2

  // 4-pointed compass star above entablature
  const scy  = topY - 3.6   // star center y
  const Ro   = 1.9           // outer spike radius
  const Ri   = 0.55          // inner indent radius
  const s45  = 0.7071
  const star = [
    `${cx},${scy - Ro}`,                              // top
    `${cx + Ri * s45},${scy - Ri * s45}`,             // inner top-right
    `${cx + Ro},${scy}`,                               // right
    `${cx + Ri * s45},${scy + Ri * s45}`,             // inner bottom-right
    `${cx},${scy + Ro}`,                               // bottom
    `${cx - Ri * s45},${scy + Ri * s45}`,             // inner bottom-left
    `${cx - Ro},${scy}`,                               // left
    `${cx - Ri * s45},${scy - Ri * s45}`,             // inner top-left
  ].join(' ')

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
      {/* Double concentric rings */}
      <circle cx={cx} cy={cy} r={R1} stroke={color} strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r={R2} stroke={color} strokeWidth="0.55" />

      {/* Entablature — thick single band */}
      <rect x={capX} y={topY - capH} width={capW} height={capH} fill={color} />

      {/* Five columns */}
      {pillars.map((px, i) => (
        <rect key={i} x={px} y={topY} width={pw} height={pillarH} fill={color} />
      ))}

      {/* Stylobate — thick base band */}
      <rect x={styX} y={baselineY} width={styW} height={2.0} fill={color} />

      {/* 4-pointed compass star — gold */}
      <polygon points={star} fill={gold} />
    </svg>
  )
}
