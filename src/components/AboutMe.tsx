import { ABOUT } from '../data/content'
import Odometer from './Odometer'
import { Arrow, Eyebrow, Reveal, Section, Stagger, StaggerItem, Tag } from './ui'

export default function AboutMe() {
  return (
    <Section id="about" theme="light">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index="04" en="More About Me" cn="关于我" />
            <h2 className="mt-5 text-3xl md:text-5xl font-medium tracking-tight leading-tight">{ABOUT.headline}</h2>
            <p className="mt-6 max-w-xl text-[15px] md:text-base leading-relaxed text-[var(--muted)]">{ABOUT.bio}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {ABOUT.interests.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <a href="#" className="group mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)]/50 pb-1 text-[15px] text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] hover:border-[var(--accent-hover)]">
              更多关于我
              <Arrow size={16} />
            </a>
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-3 gap-4 border-t border-[var(--accent)]/40 pt-10">
            {ABOUT.milestones.map((m) => (
              <StaggerItem key={m.label}>
                <Odometer value={m.value} className="text-4xl sm:text-5xl md:text-6xl tracking-tight" />
                <div className="mt-3 text-[12px] sm:text-[13px] leading-snug text-[var(--muted)]">{m.label}</div>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-14">
            <StaggerItem>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] mb-4">My Journey</div>
            </StaggerItem>
            {ABOUT.journey.map((j) => (
              <StaggerItem key={j.year}>
                <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[110px_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-[var(--line)] py-5">
                  <span className="font-mono text-2xl sm:text-3xl tracking-tight">{j.year}</span>
                  <span className="text-[16px] sm:text-lg">{j.title}</span>
                  <span className="col-start-2 sm:col-start-auto flex gap-1.5">
                    {j.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="relative grid grid-cols-2 gap-4 lg:sticky lg:top-28">
            <div className="col-span-2 overflow-hidden rounded-3xl border border-[var(--line)]">
              <img src={ABOUT.photos[0]} alt="工作台一角" loading="lazy" className="img-editorial aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
              <img src={ABOUT.photos[1]} alt="城市街头" loading="lazy" className="img-editorial aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
            </div>
            <div className="flex flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)]">Now</span>
              <p className="text-[14px] leading-relaxed">正在做一个帮 PM 自动生成评测集的小工具。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
