import { useMemo } from 'react'

export default function StarsBackground({ count = 180 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const sz = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3
        const isCyan = Math.random() > 0.6
        return {
          id: i,
          size: sz,
          top: Math.random() * 100,
          left: Math.random() * 100,
          color: isCyan ? '#a0fff8' : '#ffffff',
          opacity: 0.1 + Math.random() * 0.55,
          duration: 2 + Math.random() * 5,
          delay: Math.random() * 5,
        }
      }),
    [count],
  )

  return (
    <div className="absolute inset-0 pointer-events-none stars-bg">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star-dot"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            background: s.color,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
