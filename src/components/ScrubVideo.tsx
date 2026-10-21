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
    let objectUrl: string | null = null
    let cancelled = false

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
      }, 180)
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
      { threshold: 0.02 },
    )
    const hero = document.getElementById('top')
    if (hero) io.observe(hero)

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('pointermove', onMove, { passive: true })

    const enable = () => {
      if (cancelled || ready) return
      ready = true
      video.currentTime = 0
      wrap.dataset.ready = '1'
    }

    const boot = async () => {
      if (reduceMotion || coarse) {
        video.preload = 'auto'
        video.src = src
        const show = () => {
          video.currentTime = 0
          ready = false
        }
        if (video.readyState >= 1) show()
        else video.addEventListener('loadedmetadata', show, { once: true })
        return
      }

      try {
        // Fetch the whole clip first so scrubbing never waits on network mid-drag
        const res = await fetch(src, { cache: 'force-cache' })
        const blob = await res.blob()
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        video.src = objectUrl
        video.load()
        const onMeta = () => {
          // Touch a mid frame once to warm the decoder, then start at 0
          const mid = Math.min(0.5, (video.duration || 1) * 0.4)
          const warm = () => {
            video.removeEventListener('seeked', warm)
            video.currentTime = 0
            const start = () => {
              video.removeEventListener('seeked', start)
              enable()
            }
            video.addEventListener('seeked', start, { once: true })
          }
          video.addEventListener('seeked', warm, { once: true })
          video.currentTime = mid
        }
        if (video.readyState >= 1) onMeta()
        else video.addEventListener('loadedmetadata', onMeta, { once: true })
        // Safety: enable even if seek chain stalls
        setTimeout(enable, 2500)
      } catch {
        video.src = src
        video.load()
        video.addEventListener('canplaythrough', enable, { once: true })
        setTimeout(enable, 2000)
      }
    }

    boot()

    return () => {
      cancelled = true
      clearTimeout(watchdog)
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('pointermove', onMove)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute inset-0" style={{ transform: 'scale(0.86)', transformOrigin: '70% 100%' }}>
        <video
          ref={videoRef}
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
