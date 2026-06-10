import { useEffect, useRef } from 'react'

export function usePointerParallax() {
  const offsetRef = useRef({ nx: 0, ny: 0 })

  useEffect(() => {
    let w = window.innerWidth
    let h = window.innerHeight

    const onMove = (x, y) => {
      offsetRef.current = {
        nx: (x / w - 0.5) * 2,
        ny: (y / h - 0.5) * 2,
      }
    }

    const onMouse = (e) => onMove(e.clientX, e.clientY)
    const onTouch = (e) => {
      if (e.touches?.[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return offsetRef
}
