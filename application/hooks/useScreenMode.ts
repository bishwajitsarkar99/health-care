"use client"
import { useCallback, useEffect, useState } from "react"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const openFullscreen = useCallback(() => {
    const elem = document.documentElement

    if (elem.requestFullscreen) elem.requestFullscreen()
    else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen()
    else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen()
  }, [])

  const closeFullscreen = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen()
    else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen()
    else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen()
  }, [])

  // Track fullscreen change
  useEffect(() => {
    function handler() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  return {
    isFullscreen,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen: () =>
      isFullscreen ? closeFullscreen() : openFullscreen(),
  }
}
