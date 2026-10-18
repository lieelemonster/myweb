import { VIEWPOINT } from '../data/content'
import { Eyebrow, Reveal, Section, Stagger, StaggerItem } from './ui'

export default function Viewpoint() {
  return (
    <Section id="viewpoint" theme="light">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <Eyebrow index="00" en="Viewpoint" cn="我怎么看" />
        </Reveal>
        <Reveal className="lg:col-span-9" delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight">{VIEWPOINT.headline}</h2>
        </Reveal>
      </div>

      <Stagger className="mt-16 md:mt-24 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
        {VIEWPOINT.items.map((v, i) => (
          <StaggerItem key={v.title} className="bg-[var(--bg)] p-8 md:p-10 flex flex-col gap-10 min-h-[240px]">
            <span className="font-mono text-5xl md:text-6xl tracking-tight text-[var(--line-strong)]">{String(i + 1).padStart(2, '0')}</span>
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl tracking-tight">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{v.note}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
