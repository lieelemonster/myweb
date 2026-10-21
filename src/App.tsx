import { useState } from 'react'
import heroVideo from './assets/hero.mp4'
import ScrubVideo from './components/ScrubVideo'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Viewpoint from './components/Viewpoint'
import SelectedWork from './components/SelectedWork'
import InPractice from './components/InPractice'
import ArticleCarousel from './components/ArticleCarousel'
import AboutMe from './components/AboutMe'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { useScrollTheme } from './hooks/useScrollTheme'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useScrollTheme()

  return (
    <main className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ScrubVideo src={heroVideo} />
      <Navbar />
      <Hero start={loaded} />
      <Viewpoint />
      <SelectedWork />
      <InPractice />
      <ArticleCarousel />
      <AboutMe />
      <Footer />
      <Loader onDone={() => setLoaded(true)} />
    </main>
  )
}
