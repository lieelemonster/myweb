import { PROJECTS } from '../data/content'
import { Arrow, Eyebrow, Reveal, Section, Stagger, StaggerItem, Tag } from './ui'

// Asymmetric bento rhythm on a 12-column grid
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-6', 'md:col-span-6']

export default function SelectedWork() {
  return (
    <Section id="work" theme="light">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow index="01" en="Selected Work" cn="精选项目" />
          <h2 className="mt-5 text-5xl md:text-8xl tracking-tight leading-[0.95]">WORK</h2>
        </Reveal>
        <Reveal delay={0.08} className="max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
          用 AI 把想法在一个周末变成能跑的产品，每个项目都从一个真实痛点出发。
        </Reveal>
      </div>

      <Stagger className="mt-14 md:mt-20 grid grid-cols-1 gap-5 md:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <StaggerItem key={p.name} className={SPANS[i % SPANS.length]}>
            <article className="group h-full rounded-3xl border border-[var(--line)] bg-[var(--card)] p-3 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--line-strong)]">
              <a href={p.demo} className="block overflow-hidden rounded-[18px] bg-[var(--surface)]" aria-label={`${p.name} 在线体验`}>
                <img
                  src={p.preview}
                  alt={`${p.name} 预览`}
                  loading="lazy"
                  className={`img-editorial w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                    i % 2 === 0 ? 'aspect-[16/9]' : 'aspect-[4/3] md:aspect-[16/11]'
                  }`}
                />
              </a>
              <div className="px-3 pt-5 pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">
                      {String(i + 1).padStart(2, '0')} · {p.category}
                    </div>
                    <h3 className="mt-2 text-2xl md:text-[28px] tracking-tight">{p.name}</h3>
                  </div>
                  <a href={p.demo} className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)]" aria-label="打开项目">
                    <Arrow />
                  </a>
                </div>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">{p.pitch}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <div className="flex gap-4 text-[13px]">
                    <a href={p.demo} className="text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:text-[var(--accent-hover)] hover:decoration-[var(--accent-hover)] transition-colors">Live Demo</a>
                    <a href={p.source} className="text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:text-[var(--accent-hover)] hover:decoration-[var(--accent-hover)] transition-colors">源码</a>
                  </div>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
