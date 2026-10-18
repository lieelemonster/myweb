import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { PROFILE } from '../data/content'

const CONTACT_EMAIL = PROFILE.email

const TAGLINE = '把 AI 能力变成用户真正愿意用的产品。'
const FOCUS = ['AI 产品落地', '大模型应用', 'Agent 设计', 'Vibe Coding']
const STATS = [
  { value: '6+', label: '年产品经验' },
  { value: '10+', label: 'AI 项目落地' },
  { value: '20+', label: 'Vibe Coding 作品' },
]

const pill =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200'

export default function Hero({ start = true }: { start?: boolean }) {
  const { displayed, done } = useTypewriter(TAGLINE, 60, 600, start)
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setShow(true), 400)
    return () => clearTimeout(t)
  }, [start])

  const reveal = (delay: number) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  })

  const copy = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section
      id="top"
      data-theme="hero"
      className="relative z-[1] min-h-screen flex flex-col justify-end pt-24 pb-28 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <div className="max-w-xl relative z-10">
        <div className="flex items-center gap-3 text-[13px] sm:text-[15px] text-white/60 mb-5" style={reveal(0)}>
          <span className="h-2 w-2 rounded-full bg-white" />
          <span>AI 产品经理 · AI Product Manager</span>
        </div>

        <h1
          className="text-white tracking-tight mb-4"
          style={{ fontSize: 'clamp(56px, 11vw, 120px)', lineHeight: 0.95, fontFamily: 'var(--font-heading)', ...reveal(0.05) }}
        >
          金超
        </h1>

        <p
          className="text-white mb-5 sm:mb-6"
          style={{ fontSize: 'clamp(18px, 3.4vw, 26px)', lineHeight: 1.35, minHeight: '1.35em' }}
          aria-label={TAGLINE}
        >
          {displayed}
          {!done && <span className="cursor-blink inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]" />}
        </p>

        <p className="text-white/60 text-[14px] sm:text-[16px] leading-relaxed max-w-md mb-6" style={reveal(0.1)}>
          专注大模型应用与 AI 产品落地，从用户痛点出发定义问题，用数据与评测驱动迭代，也习惯亲手用 AI 编程把想法快速做成可用的原型。
        </p>

        <ul className="flex flex-wrap gap-1.5 mb-7" style={reveal(0.15)}>
          {FOCUS.map((f) => (
            <li key={f} className="rounded-full border border-white/30 px-3 py-[0.2em] text-[12px] sm:text-[13px] text-white/80">
              {f}
            </li>
          ))}
        </ul>

        <dl className="flex gap-8 sm:gap-10 mb-8" style={reveal(0.2)}>
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-white text-[28px] sm:text-[34px] leading-none tracking-tight tabular-nums">{s.value}</dd>
              <dd className="mt-2 text-[12px] sm:text-[13px] text-white/50">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-y-1 -mx-[0.2em]" style={reveal(0.25)}>
          <a href="#lab" className={`${pill} bg-white text-black border border-black/10 hover:bg-black hover:text-white`}>
            查看作品
          </a>
          <a href="#writing" className={`${pill} bg-white text-black border border-black/10 hover:bg-black hover:text-white`}>
            阅读文章
          </a>
          <button
            type="button"
            onClick={copy}
            className={`${pill} gap-2 sm:gap-3 text-white bg-transparent border border-white hover:bg-white hover:text-black`}
          >
            <span>{copied ? '已复制邮箱' : <span className="underline underline-offset-1">{CONTACT_EMAIL}</span>}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="8" height="8" rx="1" stroke="currentColor" />
              <path d="M8.5 1.5V1a.5.5 0 0 0-.5-.5H1A.5.5 0 0 0 .5 1v7a.5.5 0 0 0 .5.5h.5" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-5 right-5 sm:left-8 sm:right-8 md:left-10 md:right-10 z-10 hidden md:flex items-end justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-white/60"
        style={reveal(0.4)}
      >
        <div className="flex items-center gap-3">
          <span className="relative block h-10 w-px overflow-hidden bg-white/20">
            <span className="scroll-line absolute inset-0 bg-white" />
          </span>
          SCROLL
        </div>
        <span>
          OPERATING FROM {PROFILE.location} · UTC+8
        </span>
      </div>
    </section>
  )
}
