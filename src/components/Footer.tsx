import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { PROFILE } from '../data/content'
import { NAV_LINKS } from './Navbar'
import { Arrow, Reveal } from './ui'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <footer
      id="contact"
      data-theme="light"
      className="relative z-[2] scroll-mt-16 overflow-hidden bg-[var(--bg)] text-[var(--fg)] px-5 sm:px-8 md:px-10 pt-24 md:pt-36 pb-28"
    >
      {/* Grid pattern backdrop, faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
            <span className="text-[var(--accent)]">05</span> / Contact · 联系
          </div>
          <h2 className="mt-6 text-[clamp(56px,13vw,180px)] leading-[0.9] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            LET'S TALK
          </h2>
          <p className="mt-4 text-2xl md:text-4xl tracking-tight text-[var(--muted)]">聊聊也可以。</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-7 py-4 text-lg md:text-2xl text-[var(--on-accent)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
          >
            {PROFILE.email}
            <Arrow size={22} />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-[56px] md:h-[64px] items-center gap-2 rounded-full border border-[var(--line-strong)] px-6 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '已复制' : '复制邮箱'}
          </button>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-[var(--accent)]/40 pt-10 sm:grid-cols-3">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] mb-4">Index</div>
            <ul className="space-y-2 text-[15px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[var(--accent-hover)] transition-colors">
                    <span className="font-mono text-[11px] text-[var(--muted)] mr-2">{l.no}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] mb-4">Elsewhere</div>
            <ul className="space-y-2 text-[15px]">
              {PROFILE.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="group inline-flex items-center gap-1 hover:text-[var(--accent-hover)] transition-colors">
                    {s.label}
                    <Arrow size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase leading-relaxed text-[var(--muted)] sm:text-right">
            <div>Operating from {PROFILE.location} · UTC+8</div>
            <div>Archive since {PROFILE.since}</div>
            <div className="mt-4 normal-case tracking-normal">
              © {new Date().getFullYear()} {PROFILE.name}. 用 AI 搭建，用心维护。
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
