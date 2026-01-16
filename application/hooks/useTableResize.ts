"use client"

import { useEffect } from "react"
import { getRAM, setRAM } from "@/helper/tableDesignMemory"
import { tableState, isRowResizeActive } from "@/helper/tableInteractionState"

type UseTableResizeProps = {
    tableRef: React.RefObject<HTMLTableElement>
    DataTable: string
    colClass: string
    rowClass: string
}

export function useTableResize({
    tableRef,
    DataTable,
    colClass,
    rowClass,
}: UseTableResizeProps) {
    useEffect(() => {
        const table = tableRef.current
        if (!table) return

        const columnWidths = getRAM(DataTable, "columnWidths") || {}
        const rowHeights = getRAM(DataTable, "rowHeights") || {}

        const headers = table.querySelectorAll<HTMLTableCellElement>("thead th")
        const theadRow = table.querySelector<HTMLTableRowElement>("thead tr")
        const bodyRows = table.querySelectorAll<HTMLTableRowElement>("tbody tr")

        // Restore column widths
        headers.forEach((th, colIndex) => {
            const width = columnWidths[colIndex]
            if (width) {
                th.style.width = `${width}px`
                bodyRows.forEach(row => {
                    const td = row.children[colIndex] as HTMLElement
                    if (td) td.style.width = `${width}px`
                })
            }
        })

        // Restore row heights
        if (rowHeights.thead && theadRow) {
            theadRow.style.height = `${rowHeights.thead}px`
        }
        bodyRows.forEach((tr, rowIndex) => {
            const height = rowHeights[`tr_${rowIndex}`]
            if (height) (tr as HTMLElement).style.height = `${height}px`
        })

        function onMouseDown(e: MouseEvent) {
            const target = e.target as HTMLElement
            const isColResize = target.classList.contains(colClass)
            const isRowResize = target.classList.contains(rowClass)
            if (!isColResize && !isRowResize) return

            const cell = target.closest("th, td") as HTMLElement | null
            if (!cell) return

            const colIndex = Array.from(cell.parentNode!.children).indexOf(cell)
            const rowElement = cell.closest("tr") as HTMLTableRowElement
            if (!rowElement) return

            const rowIndex = Array.from(bodyRows).indexOf(rowElement)
            const isThead = rowElement.parentElement?.tagName === "THEAD"

            const startX = e.pageX
            const startY = e.pageY
            const startWidth = cell.offsetWidth
            const startHeight = rowElement.offsetHeight

            function save() {
                setRAM(DataTable, { columnWidths, rowHeights })
            }

            // Column resize
            if (isColResize && cell.tagName === "TH") {
                if (tableState.isDraggingColumn) return
                tableState.isResizingColumn = true
                cell.classList.add('col-resizing');
            
                const targetCell = cell 
            
                function colMove(ev: MouseEvent) {
                    const newWidth = startWidth + (ev.pageX - startX)
                    targetCell.style.width = `${newWidth}px`
            
                    bodyRows.forEach(row => {
                        const td = row.children[colIndex] as HTMLElement
                        if (td) {
                            td.style.width = `${newWidth}px`;
                            td.classList.add('col-resizing');
                        }
                    })
            
                    columnWidths[colIndex] = newWidth
                    save()
                }
            
                function stopCol() {
                    targetCell.classList.remove('col-resizing');
                    tableState.isResizingColumn = false
                    bodyRows.forEach(row => {
                        const td = row.children[colIndex];
                        if (td) td.classList.remove('col-resizing');
                    });
                    document.removeEventListener("mousemove", colMove)
                    document.removeEventListener("mouseup", stopCol)
                }
            
                document.addEventListener("mousemove", colMove)
                document.addEventListener("mouseup", stopCol)
            }

            // Row resize
            if (isRowResize) {
                tableState.isResizingRow = true
                rowElement.classList.add('row-resizing');
                [...rowElement.children].forEach(cell => cell.classList.add('row-resizing'));

                function rowMove(ev: MouseEvent) {
                    const newHeight = startHeight + (ev.pageY - startY)
                    rowElement.style.height = `${newHeight}px`

                    if (isThead) {
                        rowHeights['thead'] = newHeight;
                    } else {
                        rowHeights[`tr_${rowIndex}`] = newHeight;
                    }
                    save()
                }

                function stopRow() {
                    tableState.isResizingRow = false
                    rowElement.classList.remove('row-resizing');
                    [...rowElement.children].forEach(cell => cell.classList.remove('row-resizing'));
                    document.removeEventListener("mousemove", rowMove)
                    document.removeEventListener("mouseup", stopRow)
                }

                document.addEventListener("mousemove", rowMove)
                document.addEventListener("mouseup", stopRow)
            }
        }

        table.addEventListener("mousedown", onMouseDown)

        return () => {
            table.removeEventListener("mousedown", onMouseDown)
        }
    }, [tableRef, DataTable, colClass, rowClass])
}
