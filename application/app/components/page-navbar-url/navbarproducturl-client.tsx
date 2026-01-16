"use client"

import { usePathname } from "next/navigation"
import NavBarUrl from "./navbarurl"
import { data } from "@/config/sidebar"

export default function NavBarProductUrlClient() {
  const pathname = usePathname()
  const productNav = data.navMain.find(item => item.title === "Products")
  if (!productNav) return null

  const groups = productNav.group.map(item => ({
    groupTitle: item.title,
    url: item.url,
  }))

  return (
    <NavBarUrl
      activeNav={{
        moduleTitle: productNav.title,
        groups,
        currentPath: pathname,
      }}
    />
  )
}
