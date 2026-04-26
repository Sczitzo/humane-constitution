import { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  bornAt: number
}

const GRID_SPACING = 28
const POINTER_RADIUS = 148
const POINTER_PUSH = 7
const RIPPLE_LIFETIME = 1500
const RIPPLE_BAND = 28
const RIPPLE_SPEED = 0.26
const MAX_DEVICE_PIXEL_RATIO = 2
const MAX_RIPPLES = 6

function readCssVariable(name: string, fallback: string): string {
  if (typeof window === 'undefined') {
    return fallback
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export function DotMatrixField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvasElement = canvasRef.current

    if (!canvasElement) {
      return
    }

    const context = canvasElement.getContext('2d')

    if (!context) {
      return
    }

    const canvas = canvasElement
    const host = canvas.parentElement ?? canvas
    const ctx = context

    let animationFrame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let mounted = true
    const pointer = { x: 0, y: 0, active: false }
    const ripples: Ripple[] = []
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dotColor = readCssVariable('--matrix-dot', 'rgba(43, 48, 53, 0.16)')
    const activeColor = readCssVariable('--matrix-active', 'rgba(166, 111, 43, 0.42)')
    const rippleColor = readCssVariable('--matrix-ripple', 'rgba(111, 123, 101, 0.16)')

    function resizeCanvas() {
      const bounds = host.getBoundingClientRect()

      if (bounds.width < 2 || bounds.height < 2) {
        return
      }

      width = Math.round(bounds.width)
      height = Math.round(bounds.height)
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function updatePointer(clientX: number, clientY: number) {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = clientX - bounds.left
      pointer.y = clientY - bounds.top
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y >= 0 &&
        pointer.y <= bounds.height
    }

    function handlePointerMove(event: PointerEvent) {
      updatePointer(event.clientX, event.clientY)
    }

    function handlePointerDown(event: PointerEvent) {
      updatePointer(event.clientX, event.clientY)
      if (!pointer.active || reducedMotion) {
        return
      }

      ripples.push({
        x: pointer.x,
        y: pointer.y,
        bornAt: performance.now(),
      })

      if (ripples.length > MAX_RIPPLES) {
        ripples.shift()
      }
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    function drawFrame(now: number) {
      if (!mounted) {
        return
      }

      ctx.clearRect(0, 0, width, height)

      if (!reducedMotion) {
        for (let index = ripples.length - 1; index >= 0; index -= 1) {
          const ripple = ripples[index]
          const age = now - ripple.bornAt

          if (age >= RIPPLE_LIFETIME) {
            ripples.splice(index, 1)
            continue
          }

          const radius = age * RIPPLE_SPEED
          const alpha = (1 - age / RIPPLE_LIFETIME) * 0.1

          ctx.beginPath()
          ctx.strokeStyle = rippleColor
          ctx.lineWidth = 1
          ctx.globalAlpha = alpha
          ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      for (let y = GRID_SPACING * 0.5; y <= height; y += GRID_SPACING) {
        for (let x = GRID_SPACING * 0.5; x <= width; x += GRID_SPACING) {
          let drawX = x
          let drawY = y
          let highlight = 0

          if (pointer.active && !reducedMotion) {
            const dx = x - pointer.x
            const dy = y - pointer.y
            const distance = Math.hypot(dx, dy)
            const influence = Math.max(0, 1 - distance / POINTER_RADIUS)

            if (influence > 0) {
              const directionX = distance > 0 ? dx / distance : 0
              const directionY = distance > 0 ? dy / distance : 0
              const push = influence * POINTER_PUSH
              drawX += directionX * push
              drawY += directionY * push
              highlight = Math.max(highlight, influence)
            }
          }

          if (!reducedMotion && ripples.length) {
            for (const ripple of ripples) {
              const age = now - ripple.bornAt
              const radius = age * RIPPLE_SPEED
              const distance = Math.hypot(x - ripple.x, y - ripple.y)
              const delta = Math.abs(distance - radius)
              const bandInfluence = Math.max(0, 1 - delta / RIPPLE_BAND) * (1 - age / RIPPLE_LIFETIME)

              if (bandInfluence <= 0) {
                continue
              }

              highlight = Math.max(highlight, bandInfluence * 1.15)
            }
          }

          const baseRadius = 1.05
          const radius = baseRadius + highlight * 1.85

          ctx.beginPath()
          ctx.fillStyle = highlight > 0.08 ? activeColor : dotColor
          ctx.globalAlpha = 0.34 + highlight * 0.4
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(drawFrame)
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame)
          animationFrame = 0
        }
      } else if (mounted && !animationFrame) {
        animationFrame = window.requestAnimationFrame(drawFrame)
      }
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas())
    resizeObserver.observe(host)
    resizeCanvas()

    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('blur', handlePointerLeave)
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    animationFrame = window.requestAnimationFrame(drawFrame)

    return () => {
      mounted = false
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
      resizeObserver.disconnect()
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('blur', handlePointerLeave)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="matrix-layer pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
