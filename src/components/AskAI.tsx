import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, X } from 'lucide-react'
import { ASK_AI, PROFILE } from '../data/content'
import { EASE } from './ui'

type Msg = { role: 'user' | 'ai'; text: string }

// Local keyword matcher: a lightweight stand-in until a real model endpoint is wired up
function answer(q: string) {
  const s = q.toLowerCase()
  return ASK_AI.answers.find((a) => a.keys.some((k) => s.includes(k)))?.text ?? ASK_AI.fallback
}

export default function AskAI() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: `你好，我是${PROFILE.name}的 AI 分身。可以问我关于经历、项目和文章的任何问题。` },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 250)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const ask = (q: string) => {
    const text = q.trim()
    if (!text || thinking) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: answer(text) }])
      setThinking(false)
    }, 700)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: open ? 0 : 1, y: open ? 16 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2.5 rounded-full paper border border-[var(--rule)] bg-[var(--paper)]/85 px-5 py-2.5 text-sm text-[var(--ink)] shadow-[0_12px_32px_-16px_rgba(34,32,29,0.35)] backdrop-blur-md transition-colors hover:border-[var(--accent)]"
        style={{ pointerEvents: open ? 'none' : 'auto' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="breathe absolute inset-0 rounded-full bg-[var(--accent)]" />
        </span>
        问问{PROFILE.name} AI
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="ask-ai"
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#22201D]/35 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`问问${PROFILE.name} AI`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative flex max-h-[80vh] w-full max-w-lg flex-col paper rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-6 text-[var(--ink)] shadow-[0_30px_80px_-30px_rgba(34,32,29,0.45)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm text-[var(--on-accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {PROFILE.initials}
                  </span>
                  <div>
                    <div className="text-[15px]">{PROFILE.name} AI</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">Digital twin · beta</div>
                  </div>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--rule)] text-[var(--muted)] transition-colors hover:text-[var(--ink)] hover:border-[var(--rule-strong)]" aria-label="关闭">
                  <X size={16} />
                </button>
              </div>

              <div ref={listRef} className="mt-5 flex min-h-[200px] flex-1 flex-col gap-3 overflow-y-auto pr-1">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                      m.role === 'user' ? 'self-end bg-[var(--ink)] text-[var(--paper)]' : 'self-start bg-[var(--surface)] text-[var(--ink)]'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {thinking && (
                  <div className="self-start flex gap-1 rounded-2xl bg-[var(--surface)] px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="breathe h-1.5 w-1.5 rounded-full bg-[var(--muted)]" style={{ animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {ASK_AI.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-[var(--rule)] px-3 py-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form
                className="mt-4 flex items-center gap-2 rounded-full border border-[var(--rule)] bg-white/60 p-1.5 pl-5 focus-within:border-[var(--accent)] transition-colors"
                onSubmit={(e) => {
                  e.preventDefault()
                  ask(input)
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="问点什么……"
                  className="flex-1 bg-transparent text-[14px] text-[var(--ink)] placeholder:text-[var(--muted)]/70 outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-[opacity,background-color] hover:bg-[var(--accent-hover)] disabled:opacity-30"
                  aria-label="发送"
                >
                  <ArrowUp size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
