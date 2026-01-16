// import { getRAM } from "@/helper/tableDesignMemory"

// export function restoreRowHeights(DataTable: string) {
//   const rowHeights = getRAM(DataTable, "rowHeights") as Record<string, number> | null
//   if (!rowHeights) return

//   const table = document.getElementById(DataTable) as HTMLTableElement | null
//   if (!table) return

//   const tbody = table.querySelector("tbody")
//   if (!tbody) return

//   const bodyRows = tbody.querySelectorAll("tr")

//   bodyRows.forEach((row, index) => {
//     const height = rowHeights[`tr_${index}`]
//     if (typeof height === "number") {
//       row.style.height = `${height}px`
//     }
//   })

//   // restore thead height
//   const theadHeight = rowHeights["thead"]
//   if (typeof theadHeight === "number") {
//     const theadRow = table.querySelector("thead tr") as HTMLTableRowElement | null
//     if (theadRow) {
//       theadRow.style.height = `${theadHeight}px`
//     }
//   }
// }
