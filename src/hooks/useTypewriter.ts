import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600, enabled = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) return
    setDisplayed('')
    setDone(false)
    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay, enabled])

  return { displayed, done }
}
