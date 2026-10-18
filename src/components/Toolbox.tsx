import { useRef } from 'react'
import { motion } from 'motion/react'
import { TOOLS } from '../data/content'

// Scattered starting positions (% of the container) and tilt for each sticker
const LAYOUT = [
  { x: 6, y: 14, r: -5 },
  { x: 46, y: 10, r: 4 },
  { x: 18, y: 30, r: 3 },
  { x: 58, y: 28, r: -6 },
  { x: 4, y: 48, r: 6 },
  { x: 40, y: 46, r: -3 },
  { x: 66, y: 50, r: 5 },
  { x: 14, y: 66, r: -4 },
  { x: 48, y: 66, r: 2 },
  { x: 8, y: 82, r: 5 },
  { x: 44, y: 82, r: -5 },
]

export default function Toolbox() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="relative w-full flex-1 min-h-[420px] overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8"
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
        <span>Toolbox</span>
        <span className="tracking-[0.1em]">日常工具箱 · 拖动试试 ↗</span>
      </div>

      {TOOLS.map((tool, i) => {
        const pos = LAYOUT[i % LAYOUT.length]
        const accent = i === 0
        const filled = !accent && i % 3 === 0
        return (
          <motion.div
            key={tool}
            drag
            dragConstraints={ref}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
            initial={{ rotate: pos.r }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.08, rotate: -3 }}
            whileDrag={{ scale: 1.1, zIndex: 20, cursor: 'grabbing' }}
            className={`absolute cursor-grab select-none touch-none whitespace-nowrap rounded-full border px-4 py-2 text-sm md:text-[15px] shadow-[0_6px_18px_-12px_rgba(34,32,29,0.35)] ${
              accent
                ? 'border-transparent bg-[var(--accent)] text-[var(--on-accent)]'
                : filled
                  ? 'border-transparent bg-[var(--fg)] text-[var(--bg)]'
                  : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--fg)]'
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {tool}
          </motion.div>
        )
      })}
    </div>
  )
}
