import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export default function ScrubVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarse) {
      // Static first frame on touch / reduced-motion devices — no scrub seeking
      video.preload = 'metadata'
      video.currentTime = 0
      return
    }

    let targetTime = 0
    let seeking = false
    let prevX: number | null = null
    let raf = 0
    let active = true
    let watchdog: ReturnType<typeof setTimeout> | undefined

    const flush = () => {
      raf = 0
      if (!active || seeking) return
      if (Math.abs(video.currentTime - targetTime) < 0.02) return
      seeking = true
      video.currentTime = targetTime
      clearTimeout(watchdog)
      watchdog = setTimeout(() => {
        seeking = false
      }, 250)
    }

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const onSeeked = () => {
      seeking = false
      clearTimeout(watchdog)
      if (Math.abs(video.currentTime - targetTime) > 0.02) queue()
    }

    const onMove = (e: PointerEvent) => {
      if (!active) return
      const x = e.clientX
      if (prevX === null) {
        prevX = x
        return
      }
      const delta = x - prevX
      prevX = x
      const duration = video.duration
      if (!duration || !isFinite(duration)) return
      targetTime = Math.min(
        Math.max(targetTime + (delta / window.innerWidth) * SENSITIVITY * duration, 0),
        duration,
      )
      queue()
    }

    // Only scrub / keep video in the layer while the hero is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        wrap.style.visibility = entry.isIntersecting ? 'visible' : 'hidden'
        if (!entry.isIntersecting) {
          prevX = null
          if (raf) {
            cancelAnimationFrame(raf)
            raf = 0
          }
        }
      },
      { rootMargin: '0px', threshold: 0.05 },
    )
    const hero = document.getElementById('top')
    if (hero) io.observe(hero)
    else active = true

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      clearTimeout(watchdog)
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ transform: 'scale(0.86)', transformOrigin: '70% 100%', willChange: 'contents' }}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="h-full w-full object-cover"
          style={{ objectPosition: '70% center' }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 70% 60%, transparent 55%, #000 100%), linear-gradient(to bottom, transparent 85%, #000 100%)',
        }}
      />
    </div>
  )
}
