import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export default function ScrubVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let targetTime = video.currentTime || 0
    let seeking = false
    let prevX: number | null = null
    let watchdog: ReturnType<typeof setTimeout> | undefined

    const seek = () => {
      if (Math.abs(video.currentTime - targetTime) < 0.001) return
      seeking = true
      video.currentTime = targetTime
      // Safety net: never let a missed `seeked` event freeze scrubbing
      clearTimeout(watchdog)
      watchdog = setTimeout(() => {
        seeking = false
      }, 400)
    }

    const onSeeked = () => {
      seeking = false
      clearTimeout(watchdog)
      // Queue the next seek only if the target moved while the last one was in flight
      if (Math.abs(video.currentTime - targetTime) > 0.001) seek()
    }

    const onMove = (e: MouseEvent) => {
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
      if (!seeking) seek()
    }

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMove)
    return () => {
      clearTimeout(watchdog)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Scale lives on a wrapper, not the <video>, so seek frames always repaint */}
      <div className="absolute inset-0" style={{ transform: 'scale(0.86)', transformOrigin: '70% 100%' }}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ objectPosition: '70% center' }}
        />
      </div>
      {/* Vignette overlay blends the scaled-down frame edges into black */}
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
