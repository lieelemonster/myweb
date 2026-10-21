import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.85

export default function ScrubVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    // Show the first frame as soon as metadata is ready — never block paint on a full download
    const showFirstFrame = () => {
      try {
        video.currentTime = 0.001
      } catch {
        /* ignore */
      }
    }
    if (video.readyState >= 1) showFirstFrame()
    else video.addEventListener('loadedmetadata', showFirstFrame, { once: true })

    if (reduceMotion || coarse) return

    let targetTime = 0
    let seeking = false
    let ready = false
    let prevX: number | null = null
    let raf = 0
    let active = true
    let watchdog: ReturnType<typeof setTimeout> | undefined

    const flush = () => {
      raf = 0
      if (!ready || !active || seeking) return
      if (Math.abs(video.currentTime - targetTime) < 0.015) return
      seeking = true
      try {
        video.currentTime = targetTime
      } catch {
        seeking = false
        return
      }
      clearTimeout(watchdog)
      watchdog = setTimeout(() => {
        seeking = false
      }, 160)
    }

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const onSeeked = () => {
      seeking = false
      clearTimeout(watchdog)
      if (Math.abs(video.currentTime - targetTime) > 0.015) queue()
    }

    const onMove = (e: PointerEvent) => {
      if (!ready || !active) return
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

    const enableScrub = () => {
      ready = true
    }
    // Scrub as soon as we can decode a frame; don't wait for full buffer
    if (video.readyState >= 2) enableScrub()
    else {
      video.addEventListener('loadeddata', enableScrub, { once: true })
      video.addEventListener('canplay', enableScrub, { once: true })
      setTimeout(enableScrub, 800)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        // Keep the element painted; only pause scrubbing off-screen
        if (!entry.isIntersecting) {
          prevX = null
          if (raf) {
            cancelAnimationFrame(raf)
            raf = 0
          }
        }
      },
      { threshold: 0.02 },
    )
    const hero = document.getElementById('top')
    if (hero) io.observe(hero)

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      clearTimeout(watchdog)
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('pointermove', onMove)
    }
  }, [src])

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute inset-0" style={{ transform: 'scale(0.86)', transformOrigin: '70% 100%' }}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          autoPlay={false}
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
