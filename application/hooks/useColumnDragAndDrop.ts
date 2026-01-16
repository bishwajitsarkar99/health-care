"use client"

import { useEffect } from "react"
import { getRAM, setRAM, removeRAM } from "@/helper/tableDesignMemory"
import { tableState, isRowResizeActive } from "@/helper/tableInteractionState"

export function useColumnDragAndDrop(
  tableRef: React.RefObject<HTMLTableElement>,
  DataTable: string,
  iconClass: string
) {
  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const thead = table.querySelector<HTMLTableSectionElement>("thead")
    const tbody = table.querySelector<HTMLTableSectionElement>("tbody")
    if (!thead || !tbody) return

    // freeze (TS narrowing)
    const safeThead = thead
    const safeTbody = tbody

    const saved = getRAM(DataTable) || {}

    const getHeaderIndex = (el: HTMLElement) =>
      [...el.parentElement!.children].indexOf(el)

    // === Overlay Helper Functions ===
    function addOverlayToOtherColumns(exceptIndex: number) {
      const ths = safeThead.querySelectorAll("th")

      ths.forEach((th, i) => {
        if (i === exceptIndex) {
          const overlay = document.createElement("div")
          overlay.className = "table-column-loader-overlay"
          overlay.style.position = "absolute"
          overlay.style.top = "0"
          overlay.style.left = "0"
          overlay.style.width = "100%"
          overlay.style.height = "100%"
          overlay.style.pointerEvents = "none"
          overlay.style.background = "rgb(0 0 0 / 25%)"

          th.style.position = "relative"
          th.appendChild(overlay)

          safeTbody.querySelectorAll("tr").forEach(row => {
            const td = row.children[i] as HTMLElement | undefined
            if (td) {
              const tdOverlay = overlay.cloneNode(true) as HTMLElement
              td.style.position = "relative"
              td.appendChild(tdOverlay)
            }
          })
        }
      })
    }

    function removeOverlays() {
      table
        .querySelectorAll(".table-column-loader-overlay")
        .forEach(el => el.remove())
    }

    // === Load Column Order ===
    function loadColumnOrder() {
      if (!saved.columnOrder) return

      const headers = [...safeThead.rows[0].children] as HTMLElement[]

      const headerMap: Record<string, number> = {}
      headers.forEach((th, i) => {
        const key = th.textContent?.trim()
        if (key) headerMap[key] = i
      })

      const newOrder = saved.columnOrder
        .map((name: string) => headers[headerMap[name]])
        .filter(Boolean)

      newOrder.forEach((th: any) => safeThead.rows[0].appendChild(th));
      [...safeTbody.rows].forEach(row => {
        const cells = [...row.children] as HTMLElement[]
        const newCells = saved.columnOrder
          .map((name: string) => {
            const index = headerMap[name]
            return index !== undefined ? cells[index] : null
          })
          .filter(Boolean)

        newCells.forEach((td: any) => row.appendChild(td))
      })
    }

    // === Save Column Order ===
    function saveColumnOrder() {
      const order = [...safeThead.rows[0].children].map(
        th => th.textContent?.trim() || ""
      )

      const tableData = getRAM(DataTable) || {}
      tableData.columnOrder = order

      setRAM(DataTable, tableData)
    }

    // === Move Column ===
    function moveColumn(fromIndex: number, toIndex: number) {
      const rows = table.querySelectorAll("tr")

      rows.forEach(row => {
        const cells = [...row.children]
        if (fromIndex >= cells.length || toIndex >= cells.length) return

        const cell = cells[fromIndex]
        const ref = cells[toIndex]

        fromIndex < toIndex ? ref.after(cell) : ref.before(cell)
      })

      saveColumnOrder()
    }

    let dragSrcIndex: number | null = null

    // === Bind Drag Events ===
    safeThead.querySelectorAll("th").forEach(th => {
      const moveIcon = th.querySelector(iconClass)
      if (!moveIcon) return

      th.setAttribute("draggable", "true")

      moveIcon.addEventListener("mousedown", e => {
        e.stopPropagation()
        dragSrcIndex = getHeaderIndex(th)
      })

      th.addEventListener("dragstart", e => {
        if (tableState.isResizingColumn || isRowResizeActive()) {
          e.preventDefault()
          return
        }

        tableState.isDraggingColumn = true
        dragSrcIndex = getHeaderIndex(th)
        th.classList.add("dragging")

        addOverlayToOtherColumns(dragSrcIndex)
      })

      th.addEventListener("dragover", e => e.preventDefault())

      th.addEventListener("drop", e => {
        e.preventDefault()

        const dropIndex = getHeaderIndex(th)
        if (dragSrcIndex !== null && dropIndex !== dragSrcIndex) {
          moveColumn(dragSrcIndex, dropIndex)
          dragSrcIndex = null
        }
      })

      th.addEventListener("dragend", () => {
        tableState.isDraggingColumn = false
        th.classList.remove("dragging")
        removeOverlays()
      })
    })

    // === Apply Saved Order on Init ===
    loadColumnOrder()
  }, [tableRef, DataTable, iconClass])
}
