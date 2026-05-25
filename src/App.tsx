import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { kurals, pickRandomKural, type Kural } from './kurals'
import './App.css'

const INITIAL_KURAL = kurals[0]!
const FADE_MS = 380
const MIN_LINE1_PX = 13

function useFitLine1(text: string) {
  const verseRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const verse = verseRef.current
    const line1 = line1Ref.current
    if (!verse || !line1) return

    const fit = () => {
      line1.style.fontSize = ''
      let size = Number.parseFloat(getComputedStyle(line1).fontSize)

      while (line1.scrollWidth > verse.clientWidth && size > MIN_LINE1_PX) {
        size -= 0.5
        line1.style.fontSize = `${size}px`
      }
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(verse)
    return () => {
      observer.disconnect()
      line1.style.fontSize = ''
    }
  }, [text])

  return { verseRef, line1Ref }
}

function App() {
  const [kural, setKural] = useState<Kural>(INITIAL_KURAL)
  const [loading, setLoading] = useState(false)
  const [fading, setFading] = useState(false)

  const generateKural = useCallback(() => {
    setLoading(true)
    setFading(true)

    window.setTimeout(() => {
      setKural(pickRandomKural())
      setFading(false)
      setLoading(false)
    }, FADE_MS)
  }, [])

  const autoPlayed = useRef(false)
  const { verseRef, line1Ref } = useFitLine1(kural.line1)

  useEffect(() => {
    if (autoPlayed.current) return
    autoPlayed.current = true
    const timer = window.setTimeout(generateKural, 1200)
    return () => window.clearTimeout(timer)
  }, [generateKural])

  return (
    <div className="page-wrapper">
      <header>
        <div className="tamil-title">திருக்குறள்</div>
        <div className="english-title">Thirukkural · The Sacred Couplets of Thiruvalluvar</div>
        <div className="title-divider">
          <span className="lotus">✦</span>
        </div>
      </header>

      <div className="kural-card">
        <div className="card-frame">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className={`card-content ${fading ? 'fade-out' : 'fade-in'}`}>
            <div className="kural-badge">
              Kural <span className="kural-number">#{kural.number}</span>
            </div>
            <div className="adhikaram">{kural.adhikaram}</div>

            <div className="tamil-verse" ref={verseRef}>
              <span ref={line1Ref} className="verse-line verse-line-1">
                {kural.line1}
              </span>
              <span className="verse-line">{kural.line2}</span>
            </div>

            <div className="sep">
              <div className="sep-line" />
              <div className="sep-diamond" />
              <div className="sep-line" />
            </div>

            <div className="translation-label">English Rendering</div>
            <div className="english-translation">{kural.translation}</div>

            <div className="explanation-label">Elucidation</div>
            <div className="explanation">{kural.explanation}</div>
          </div>
        </div>

        <div className="btn-row">
          <button
            type="button"
            className={`generate-btn ${loading ? 'loading' : ''}`}
            onClick={generateKural}
          >
            ✦ &nbsp; New Kural &nbsp; ✦
          </button>
        </div>
      </div>

      <footer>தமிழ் · 2,000 years of wisdom · 1330 couplets</footer>
    </div>
  )
}

export default App
