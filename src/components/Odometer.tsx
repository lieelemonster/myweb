import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const DIGITS = '0123456789'.split('')

/** Slot-machine counter: each digit scrolls down a 0-9 reel when the value enters the viewport. */
export default function Odometer({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  let digitIndex = 0

  return (
    <span ref={ref} className={`inline-flex items-baseline leading-none tabular-nums ${className}`} aria-label={value}>
      {value.split('').map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} aria-hidden="true" className="ml-0.5 text-[0.45em] self-start mt-[0.1em]">
              {ch}
            </span>
          )
        }
        const d = Number(ch)
        const delay = digitIndex++ * 0.06
        return (
          <span key={i} aria-hidden="true" className="inline-flex h-[1em] overflow-hidden">
            <motion.span
              className="flex flex-col"
              initial={{ y: '0em' }}
              animate={{ y: inView ? `-${d}em` : '0em' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
            >
              {DIGITS.map((n) => (
                <span key={n} className="h-[1em] leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
