import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const group = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={group} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

export function Eyebrow({ index, en, cn }: { index: string; en: string; cn?: string }) {
  return (
    <div className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
      <span className="text-[var(--accent)]">{index}</span> / {en}
      {cn && <span className="tracking-[0.1em]"> · {cn}</span>}
    </div>
  )
}

export function Arrow({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <ArrowUpRight
      size={size}
      strokeWidth={1.5}
      className={`shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
      aria-hidden="true"
    />
  )
}

export function Section({
  id,
  theme,
  children,
  className = '',
}: {
  id?: string
  theme: 'dark' | 'light'
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={`relative z-[2] scroll-mt-16 bg-[var(--bg)] text-[var(--fg)] px-5 sm:px-8 md:px-10 py-24 md:py-36 ${className}`}
    >
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
      {children}
    </span>
  )
}
