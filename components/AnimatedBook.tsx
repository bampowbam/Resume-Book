'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const DEMOS = [
  { name: 'Kitkat', id: 'LYpNyvm' },
  { name: 'Newton', id: 'abzeaWJ' },
  { name: 'Launch', id: 'rNOqzbN' },
  { name: 'Birthday', id: 'BaobKOJ' },
  { name: 'Impossible', id: 'ZjLKGY' },
  { name: 'Care', id: 'RwPrOoz' },
  { name: 'Cubes', id: 'QWbRxXb' },
  { name: 'Elon', id: 'RwWMwvY' },
  { name: 'Gun', id: 'GRoKOyg' },
  { name: 'Moon', id: 'NWqemYK' },
  { name: 'Pokedex', id: 'eYpGQxr' },
  { name: 'Record', id: 'RwraKYZ' },
  { name: 'Tcannon', id: 'eYpmBxQ' },
  { name: 'Cloud', id: 'MWwRKvd' },
  { name: 'Fireflies', id: 'zYGQYWJ' },
  { name: 'Train', id: 'eYpdPWa' },
  { name: 'Pancake', id: 'jJVpWZ' },
  { name: 'Earth', id: 'aPzVme' },
  { name: 'Matryoshka', id: 'jOOYMLm' },
  { name: 'Truck', id: 'MWWowEb' },
]

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

  const codeSnippet = `set(FOLD,{transformOrigin:"50% 100%",scaleY:0}),set(CLIPS,{transformOrigin:"50% 0"}),set(".cannon__shirt",{opacity:0}),set(".cannon",{y:28}),set(".text--ordered .char",{y:"100%"});const SPEED=.15,FOLD_TL=()=>new timeline().to(LEFT_ARM,{duration:SPEED,rotateY:-180,transformOrigin:\`\${100*(22/65.3)}% 50%\`},0).to(RIGHT_ARM,{duration:SPEED,rotateY:-180,transformOrigin:\`\${100*((65.3-22)/65.3)}% 50%\`},SPEED).to(FOLD,{duration:SPEED/4,scaleY:1},2*SPEED).to(FOLD,{duration:SPEED,y:-47},2*SPEED+.01).to(CLIPS,{duration:SPEED,scaleY:.2},2*SPEED).to(".cannon",{duration:SPEED,y:0},2*SPEED)`

  return (
    <div className="book">
      <div className="book__spine"></div>
      
      {/* Front Cover */}
      <div className="page book__page book__cover book__cover--front" style={{'--page-index': 1} as React.CSSProperties}>
        <div className="page__half page__half--front">
          {/* Custom book cover background image will show here */}
        </div>
        <div className="page__half page__half--back">
          <div className="book__insert"></div>
        </div>
      </div>

      {/* Pages 1-10 */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="page book__page" style={{'--page-index': i + 2} as React.CSSProperties}>
          <div className="page__half page__half--front">
            <a href={`https://codepen.io/jh3y/full/${DEMOS[i * 2]?.id}`} target="_blank" rel="noreferrer noopener">
              <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/${DEMOS[i * 2]?.name}-sketch.svg`} alt={DEMOS[i * 2]?.name} />
            </a>
            <div className="page__number">{i * 2 + 1}</div>
          </div>
          <div className="page__half page__half--back">
            <a href={`https://codepen.io/jh3y/full/${DEMOS[i * 2 + 1]?.id}`} target="_blank" rel="noreferrer noopener">
              <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/${DEMOS[i * 2 + 1]?.name}-sketch.svg`} alt={DEMOS[i * 2 + 1]?.name} />
            </a>
            <div className="page__number">{i * 2 + 2}</div>
          </div>
        </div>
      ))}

      {/* Back Cover */}
      <div className="page book__page book__cover book__cover--back" style={{'--page-index': 12} as React.CSSProperties}>
        <div className="page__half page__half--front"></div>
        <div className="page__half page__half--back">
          <span className="code">{codeSnippet}</span>
          <div className="book__insert">
            <a href="https://jhey.dev" target="_blank" rel="noopener noreferrer">
              <img className="logo" src="https://assets.codepen.io/605876/bear-with-cap.svg" alt="Jhey Logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
