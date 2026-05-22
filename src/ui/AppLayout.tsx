import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import type { MouseEvent } from "react"

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const firstPaintRef = useRef(true)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (firstPaintRef.current) {
      firstPaintRef.current = false
      return
    }
    setOverlayVisible(false)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const navigateWithOverlay = (to: string) => {
    const currentRoute = `${location.pathname}${location.search}${location.hash}`
    if (to === currentRoute) return

    setOverlayVisible(true)
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      navigate(to)
    }, 700)
  }

  const routeFromHref = (href: string) => {
    if (href === "#" || href.startsWith("#!")) return null
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) return null

    if (url.hash.startsWith("#/")) {
      return url.hash.slice(1)
    }

    return `${url.pathname}${url.search}${url.hash}`
  }

  const handleClickCapture = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    const navTarget = target.closest("[data-nav-to]") as HTMLElement | null
    if (navTarget) {
      const to = navTarget.getAttribute("data-nav-to")
      if (!to) return
      event.preventDefault()
      navigateWithOverlay(to)
      return
    }

    const anchor = target.closest("a[href]") as HTMLAnchorElement | null
    if (!anchor) return
    if (anchor.target === "_blank") return
    if (anchor.hasAttribute("download")) return

    const to = routeFromHref(anchor.href)
    if (!to) return
    event.preventDefault()
    navigateWithOverlay(to)
  }

  return (
    <div onClickCapture={handleClickCapture} className="min-h-screen">
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[rgb(33,33,33)]/95 backdrop-blur-lg"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/15"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute h-full w-full -rotate-90"
              >
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="276.46"
                  initial={{ strokeDashoffset: 276.46 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                />
              </motion.svg>
              <span className="text-2xl text-white">...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="page-wrap min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
