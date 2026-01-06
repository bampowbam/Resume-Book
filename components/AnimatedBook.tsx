'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const RESUME_PAGE_COUNT = 6

const getResumePageSrc = (pageNumber: number) =>
  `/book-resume-page-${pageNumber}.png`

export default function AnimatedBook() {
  useEffect(() => {
    // Load GSAP scripts
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const initGSAP = async () => {
      try {
        await loadScript('https://unpkg.co/gsap@3/dist/gsap.min.js')
        await loadScript('https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js')

        const { gsap, ScrollTrigger } = window
        const { to, set } = gsap

        if (!gsap || !ScrollTrigger) {
          console.error('GSAP libraries not loaded properly')
          return
        }

        gsap.registerPlugin(ScrollTrigger)

        // Book scale animation
        to('.book', {
          scrollTrigger: {
            scrub: 1,
            start: () => 0,
            end: () => window.innerHeight * 0.25,
          },
          scale: 1,
        })

        // Title fade out
        to('h1', {
          scrollTrigger: {
            scrub: true,
            start: () => 13.5 * (window.innerHeight * 0.25),
            end: () => 14 * (window.innerHeight * 0.25),
          },
          opacity: 0,
        })

        // Page animations
        const PAGES = Array.from(document.querySelectorAll('.book__page'))
        PAGES.forEach((page, index) => {
          set(page, { z: index === 0 ? 13 : -index * 1 })
          if (index === 11) return false
          to(page, {
            rotateY: `-=${180 - index / 2}`,
            scrollTrigger: {
              scrub: 1,
              start: () => (index + 1) * (window.innerHeight * 0.25),
              end: () => (index + 2) * (window.innerHeight * 0.25),
            },
          })
          to(page, {
            z: index === 0 ? -13 : index,
            scrollTrigger: {
              scrub: 1,
              start: () => (index + 1) * (window.innerHeight * 0.25),
              end: () => (index + 1.5) * (window.innerHeight * 0.25),
            },
          })
        })
      } catch (error) {
        console.error('Failed to load GSAP:', error)
      }
    }

    initGSAP()
  }, [])

  const sheetCount = Math.ceil(RESUME_PAGE_COUNT / 2)
  const backCoverIndex = sheetCount + 2

  return (
    <div className="book">
      <div className="book__spine"></div>

      {/* Front Cover */}
      <div className="page book__page book__cover book__cover--front" style={{ '--page-index': 1 } as React.CSSProperties}>
        <div
          className="page__half page__half--front"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            background: '#ff0000'
          }}
        >
          <img
            src="/BookCover.png"
            alt="Book Cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: 1,
              border: '3px solid #2c3e50',
              borderRadius: '4px',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)'
            }}
            onLoad={() => console.log('Image loaded successfully')}
            onError={(e) => {
              console.error('Image failed to load:', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="page__half page__half--back">
          <div className="page__content">
            <div className="book__insert"></div>
          </div>
        </div>
      </div>

      {/* Resume pages */}
      {Array.from({ length: sheetCount }, (_, sheetIndex) => {
        const frontPageNumber = sheetIndex * 2 + 1
        const backPageNumber = sheetIndex * 2 + 2
        const frontSrc = frontPageNumber <= RESUME_PAGE_COUNT ? getResumePageSrc(frontPageNumber) : null
        const backSrc = backPageNumber <= RESUME_PAGE_COUNT ? getResumePageSrc(backPageNumber) : null

        return (
          <div
            key={sheetIndex}
            className="page book__page"
            style={{ '--page-index': sheetIndex + 2 } as React.CSSProperties}
          >
            <div className="page__half page__half--front">
              {frontSrc ? <img src={frontSrc} alt={`Resume page ${frontPageNumber}`} /> : null}
            </div>
            <div className="page__half page__half--back">
              <div className="page__content">
                {backSrc ? <img src={backSrc} alt={`Resume page ${backPageNumber}`} /> : null}
              </div>
            </div>
          </div>
        )
      })}

      {/* Back Cover */}
      <div
        className="page book__page book__cover book__cover--back"
        style={{ '--page-index': backCoverIndex } as React.CSSProperties}
      >
        <div className="page__half page__half--front"></div>
        <div className="page__half page__half--back">
          <div className="page__content">
            <div className="book__insert">
              <a href="https://jhey.dev" target="_blank" rel="noopener noreferrer">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
