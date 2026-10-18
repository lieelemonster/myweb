import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ARTICLES } from '../data/content'
import { Arrow, Eyebrow, Reveal, Section } from './ui'

function usePerView() {
  const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
  const [perView, setPerView] = useState(get)
  useEffect(() => {
    const onResize = () => setPerView(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return perView
}

const INTERVAL = 3000
const N = ARTICLES.length

/** Wait two frames so a no-transition jump is painted before transitions are re-enabled. */
const nextFrame = (fn: () => void) => requestAnimationFrame(() => requestAnimationFrame(fn))

export default function ArticleCarousel() {
  const perView = usePerView()
  // Clone the first `perView` cards onto the end so sliding past the last card loops seamlessly
  const slides = [...ARTICLES, ...ARTICLES.slice(0, perView)]
  const [index, setIndex] = useState(0) // 0..N, where N is the clone of slide 0
  const [animate, setAnimate] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const inView = useInView(viewportRef, { amount: 0.3 })
  const touchX = useRef<number | null>(null)
  const indexRef = useRef(index)
  indexRef.current = index

  const paused = hovered || hidden || reduced || !inView

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      mq.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const next = useCallback(() => {
    if (indexRef.current >= N) {
      // Still parked on the clone (e.g. transitionend was missed): snap home, then advance
      setAnimate(false)
      setIndex(0)
      nextFrame(() => {
        setAnimate(true)
        setIndex(1)
      })
      return
    }
    setAnimate(true)
    setIndex((i) => i + 1)
  }, [])

  const prev = useCallback(() => {
    if (indexRef.current <= 0) {
      // Jump to the clone without animation, then slide back one
      setAnimate(false)
      setIndex(N)
      nextFrame(() => {
        setAnimate(true)
        setIndex(N - 1)
      })
      return
    }
    setAnimate(true)
    setIndex((i) => i - 1)
  }, [])

  const goTo = (i: number) => {
    setAnimate(true)
    setIndex(i)
  }

  // Autoplay: one step right-to-left every 3s; restarts after any manual move
  useEffect(() => {
    if (paused) return
    const t = setTimeout(next, INTERVAL)
    return () => clearTimeout(t)
  }, [index, paused, next])

  // Re-enable transitions after a silent jump
  useEffect(() => {
    if (animate) return
    nextFrame(() => setAnimate(true))
  }, [animate])

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (indexRef.current >= N) {
      setAnimate(false)
      setIndex(0)
    }
  }

  const active = index % N

  const arrowBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]'

  return (
    <Section id="writing" theme="light">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow index="03" en="Selected Writing" cn="精选文章" />
          <h2 className="mt-5 text-3xl md:text-5xl font-medium tracking-tight leading-tight">产品思考与实践</h2>
        </Reveal>
        <Reveal delay={0.08} className="flex gap-3">
          <button type="button" className={arrowBtn} onClick={prev} aria-label="上一篇">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button type="button" className={arrowBtn} onClick={next} aria-label="下一篇">
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-14 md:mt-20">
        <div
          ref={viewportRef}
          className="overflow-hidden -mx-2.5 py-2"
          aria-roledescription="carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
            touchX.current = null
          }}
        >
          <div
            className={`flex ease-[cubic-bezier(0.22,1,0.36,1)] ${animate ? 'transition-transform duration-700' : 'transition-none'}`}
            style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            onTransitionEnd={onTransitionEnd}
          >
            {slides.map((a, k) => (
              <article
                key={`${a.title}-${k}`}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={k >= N || undefined}
              >
                <a
                  href={a.href}
                  tabIndex={k >= N ? -1 : undefined}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--card)] p-3 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)]"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[18px] bg-[var(--surface)]">
                    <img src={a.cover} alt="" loading="lazy" className="img-editorial h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent)]">{a.category}</span>
                      <span className="font-mono text-xs tracking-[0.1em] text-[var(--muted)]">{a.date}</span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <h3 className="text-[19px] md:text-xl leading-snug tracking-tight">{a.title}</h3>
                      <Arrow className="mt-1 text-[var(--muted)] group-hover:text-[var(--accent)]" />
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)] line-clamp-2">{a.excerpt}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {ARTICLES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`第 ${i + 1} 篇`}
              aria-current={i === active}
              className={`relative h-[6px] overflow-hidden rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-[var(--line-strong)]' : 'w-[6px] bg-[var(--line-strong)] hover:bg-[var(--muted)]'
              }`}
            >
              {i === active && (
                <span
                  key={index}
                  className="carousel-progress absolute inset-y-0 left-0 w-full origin-left bg-[var(--accent)]"
                  style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
