"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import Span from "../span/span"
import Div from "../div/div"

export default function RouteChangeLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);

    return () => clearTimeout(timer);
    
  }, [pathname])

  return (
    // page loader
    loading &&(
      <Span className={twMerge(
        "table-loader-overlay bg-[#000000a3] cell-loader-text",
        "inline-flex items-center gap-2 text-xs text-neutral-100"
      )}>
        <Div className="flex justify-center items-center">
          <img className="w-20 h-full" src="/load-30.gif" alt="Loading..." />
        </Div>
        <Span className="dot dot-1 text-indigo-800 size-4">.</Span>
        <Span className="dot dot-2 text-indigo-800 size-4">.</Span>
        <Span className="dot dot-3 text-indigo-800 size-4">.</Span>
        <Span className="dot dot-4 text-indigo-800 size-4">.</Span>
      </Span>
    )
  )
}
