import { useEffect } from 'react'

/** Sets <html data-theme> to the theme of whichever [data-theme] section crosses the viewport middle. */
export function useScrollTheme() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            document.documentElement.dataset.theme = (e.target as HTMLElement).dataset.theme
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
}
