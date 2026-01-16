function getRAMKey(dataTable: string) {
    const moduleName = "BackendModule"
    return `ApplicationRAM_${moduleName}_${dataTable}`
}

// Get RAM value
export function getRAM(DataTable: string, key: string | null = null) {
    if (typeof window === "undefined") return null
    const storageKey = getRAMKey(DataTable)
    const fullData = JSON.parse(localStorage.getItem(storageKey) || "{}")
    const appSetting = fullData.AppSetting || {}
    const tableData = appSetting[DataTable] || {}
    return key ? tableData[key] : tableData
}

// Set RAM value
export function setRAM(DataTable: string, value: any) {
    if (typeof window === "undefined") return
    const storageKey = getRAMKey(DataTable)
    const fullData = JSON.parse(localStorage.getItem(storageKey) || "{}")
    fullData.AppSetting = fullData.AppSetting || {}
    fullData.AppSetting[DataTable] = value
    localStorage.setItem(storageKey, JSON.stringify(fullData))
}

// Remove RAM
export function removeRAM(DataTable: string) {
    if (typeof window === "undefined") return
    const storageKey = getRAMKey(DataTable)
    localStorage.removeItem(storageKey)
}
