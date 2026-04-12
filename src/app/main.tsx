import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { initWebVitals } from '@/shared/lib/analytics'
import '../app/styles/index.css'
import App from './App.tsx'

// Register GSAP plugins once at top level
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer analytics after hydration (per Vercel best practice: bundle-defer-third-party)
initWebVitals()
