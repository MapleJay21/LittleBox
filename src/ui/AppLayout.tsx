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
  }, [location.pathname])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleClickCapture = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const anchor = target.closest("a[href]") as HTMLAnchorElement | null
    if (!anchor) return
    if (anchor.target === "_blank") return
    if (anchor.hasAttribute("download")) return

    const url = new URL(anchor.href, window.location.href)
    if (url.origin !== window.location.origin) return
    if (url.pathname === location.pathname && url.search === location.search) return

    event.preventDefault()
    setOverlayVisible(true)
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      navigate(`${url.pathname}${url.search}${url.hash}`)
    }, 700)
  }

  return (
    <div onClickCapture={handleClickCapture}>
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
              <span className="text-2xl text-white">􀣺</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 1, y: 8, scale: 1.005, filter: "blur(1px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 1, y: -6, scale: 0.997, filter: "blur(1px)" }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="page-wrap"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
