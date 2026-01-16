export const tableState = {
    isDraggingColumn: false,
    isResizingColumn: false,
    isResizingRow: false,
}

export function isRowResizeActive() {
    return tableState.isResizingRow
}
