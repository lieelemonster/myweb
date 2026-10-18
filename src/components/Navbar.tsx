import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'

export const NAV_LINKS = [
  { no: '01', label: '首页', href: '#top' },
  { no: '02', label: '文章', href: '#writing' },
  { no: '03', label: '项目', href: '#work' },
  { no: '04', label: '关于我', href: '#about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5 text-[var(--fg)] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled ? 'backdrop-blur-md border-[var(--line)]' : 'border-transparent'
        } ${open ? 'paper' : ''}`}
        style={{ backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 70%, transparent)' : 'transparent' }}
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {PROFILE.name}
          </span>
          <span className="text-[25px] sm:text-[30px] select-none" style={{ letterSpacing: '-0.02em' }} aria-hidden="true">
            ✳︎
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="group flex items-baseline gap-1.5 text-[16px] lg:text-[17px] hover:text-[var(--accent-hover)] transition-colors">
              <span className="font-mono text-[11px] tracking-[0.1em] opacity-50">{link.no}</span>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full border border-[var(--fg)]/40 px-4 py-1.5 text-[14px] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
          >
            聊聊
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-[5px] p-1"
        >
          <span className={`block w-6 h-[2px] bg-[var(--fg)] transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-[2px] bg-[var(--fg)] transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-[var(--fg)] transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-30 md:hidden flex flex-col justify-center items-start px-8 gap-7 paper bg-[var(--paper)]/95 backdrop-blur-md text-[var(--ink)] transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="flex items-baseline gap-3 text-[32px] font-medium" onClick={() => setOpen(false)}>
            <span className="font-mono text-sm text-[var(--accent)]">{link.no}</span>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="text-[32px] font-medium underline underline-offset-4" onClick={() => setOpen(false)}>
          聊聊也可以
        </a>
      </div>
    </>
  )
}
