import { PRACTICE } from '../data/content'
import { Eyebrow, Reveal, Section, Stagger, StaggerItem } from './ui'
import Toolbox from './Toolbox'

export default function InPractice() {
  return (
    <Section id="practice" theme="light">
      <Reveal>
        <Eyebrow index="02" en="In Practice" cn="我怎么做" />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-[var(--accent)]/40 pb-8">
              <span className="text-6xl md:text-8xl tracking-tight leading-none">
                {PRACTICE.years.product}
                <span className="font-mono text-sm md:text-base tracking-[0.2em] ml-2 text-[var(--muted)]">YEARS IN PRODUCT</span>
              </span>
              <span className="text-6xl md:text-8xl tracking-tight leading-none">
                {PRACTICE.years.ai}
                <span className="font-mono text-sm md:text-base tracking-[0.2em] ml-2 text-[var(--muted)]">YEARS IN AI</span>
              </span>
            </div>
          </Reveal>

          <Stagger className="mt-5 grid gap-5 sm:grid-cols-2">
            {PRACTICE.questions.map((q, i) => (
              <StaggerItem key={q.key}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-[var(--card)] p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)]">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')} / {q.key}
                  </div>
                  <h3 className="mt-6 text-xl tracking-tight">{q.q}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">{q.a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="lg:col-span-5 flex flex-col" delay={0.1}>
          <Toolbox />
        </Reveal>
      </div>
    </Section>
  )
}
