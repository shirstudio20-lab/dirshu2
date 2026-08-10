import type { CSSProperties, ReactNode } from 'react'
import { DESIGN_WIDTH } from '../../hooks/useViewport'
import './ScaledStage.css'

type ScaledStageProps = {
  /** Height of the section on the 1920px Figma canvas. */
  designHeight: number
  scale: number
  /** Render children in normal flow instead of on the scaled canvas. */
  fluid?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Renders a 1920 × designHeight canvas and scales it to the viewport. The
 * scaling transform lives on the inner canvas only, so ancestors are free to
 * use `position: sticky` around it.
 *
 * In fluid mode the canvas is dropped entirely and the section lays itself
 * out in flow — see each section's `max-width: 1023px` rules.
 */
export function ScaledStage({
  designHeight,
  scale,
  fluid = false,
  children,
  className,
  style,
}: ScaledStageProps) {
  const classes = ['scaled-stage', fluid ? 'scaled-stage--fluid' : null, className]
    .filter(Boolean)
    .join(' ')

  if (fluid) {
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div className={classes} style={{ height: designHeight * scale, ...style }}>
      <div
        className="scaled-stage__canvas"
        style={{
          width: DESIGN_WIDTH,
          height: designHeight,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
