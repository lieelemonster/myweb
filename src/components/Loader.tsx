import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PROFILE } from '../data/content'
import { EASE } from './ui'

const MIN_MS = 400
const MAX_MS = 900

/** Full-screen intro. Waits for the hero video (or a timeout), then fades out and calls onDone. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      const wait = Math.max(0, MIN_MS - (performance.now() - start))
      setTimeout(() => setVisible(false), wait)
    }
    const video = document.querySelector('video')
    if (!video || video.readyState >= 2) finish()
    else video.addEventListener('loadeddata', finish, { once: true })
    const cap = setTimeout(finish, MAX_MS)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      clearTimeout(cap)
      video?.removeEventListener('loadeddata', finish)
    }
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = ''
        onDone()
      }}
    >
      {visible && (
        <motion.div
          key="loader"
          className="paper fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--paper)] text-[var(--ink)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[64px] sm:text-[88px] tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {PROFILE.initials}
            <span className="align-top text-[0.35em] ml-1 text-[var(--accent)]">✳︎</span>
          </motion.div>
          <div className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
            {PROFILE.name} · {PROFILE.role}
          </div>
          <div className="absolute bottom-12 left-1/2 w-[min(280px,60vw)] -translate-x-1/2">
            <div className="h-px w-full overflow-hidden bg-[var(--rule)]">
              <motion.div
                className="h-full bg-[var(--accent)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: MIN_MS / 1000, ease: EASE }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
              <span>LOADING</span>
              <span>ARCHIVE SINCE {PROFILE.since}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
