"use client"

import { useEffect, useRef } from "react"
import { getRAM, setRAM } from "@/helper/tableDesignMemory"

interface UseTableThemeProps {
    DataTable: string
    themeLinkId: string
    folderPath: string
    defaultTheme?: string
}

export function useTableTheme({
    DataTable,
    themeLinkId,
    folderPath,
    defaultTheme = "simple",
}: UseTableThemeProps) {
    const themeLinkRef = useRef<HTMLLinkElement | null>(null)

    useEffect(() => {
        let link = document.getElementById(themeLinkId) as HTMLLinkElement | null

        if (!link) {
            link = document.createElement("link")
            link.id = themeLinkId
            link.rel = "stylesheet"
            document.head.appendChild(link)
        }

        themeLinkRef.current = link

        const savedTheme = getRAM(DataTable) || defaultTheme
        applyTheme(savedTheme)
    }, [])

    const applyTheme = (themeName: string) => {
        if (!themeName || !themeLinkRef.current) return
        themeLinkRef.current.href = `${folderPath}/${themeName}.css`
    }

    const handleThemeChange = (themeName: string) => {
        if (!themeName) return

        applyTheme(themeName)
        setRAM(DataTable, themeName)

        localStorage.setItem(
            `${themeLinkId}_${DataTable}_theme`,
            themeName
        )
    }
    return { handleThemeChange }
}
