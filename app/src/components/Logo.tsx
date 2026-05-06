interface LogoProps {
  size?: number
  color?: string
  className?: string
}

// Constitutional seal mark — thin circle, five radial ticks (one per instrument), HC monogram centre
export function Logo({ size = 32, color = 'currentColor', className }: LogoProps) {
  const r = 13.5
  const cx = 16
  const cy = 16

  // Five tick marks at 72° intervals starting from top (−90°)
  const ticks = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    return {
      x1: cx + (r - 3.5) * Math.cos(angle),
      y1: cy + (r - 3.5) * Math.sin(angle),
      x2: cx + r * Math.cos(angle),
      y2: cy + r * Math.sin(angle),
    }
  })

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
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="1" />

      {/* Five instrument ticks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1}
          x2={t.x2} y2={t.y2}
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}

      {/* HC monogram — H */}
      <line x1="9.5" y1="12" x2="9.5" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9.5" y1="16" x2="13.5" y2="16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13.5" y1="12" x2="13.5" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="round" />

      {/* HC monogram — C */}
      <path
        d="M22 13.2 C20.5 11.8 17.5 11.8 17.5 16 C17.5 20.2 20.5 20.2 22 18.8"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
