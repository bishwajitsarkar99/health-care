import { string } from "zod";

const MODULE_NAME = "BackendModule";
const STORAGE_KEY = `ApplicationRAM_${MODULE_NAME}`;

function getUserRAMKey() {
  return STORAGE_KEY;
}

export function getRAM(DataTable: string, key: string | null = null) {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const data = JSON.parse(raw);
  const table = data?.AppSetting?.[DataTable];
  if (!table) return null;

  return key ? table[key] ?? null : table;
}

export function setRAM(DataTable: string, key: string, value: any) {
  if (typeof window === "undefined") return;

  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};

  data.AppSetting ??= {};
  data.AppSetting[DataTable] ??= {};
  data.AppSetting[DataTable][key] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function cleanupInvalidMenuRAM() {
  if (typeof window === "undefined") return;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const data = JSON.parse(raw);
  if (!data?.AppSetting) return;

  let changed = false;

  Object.keys(data.AppSetting).forEach((key) => {
    // remove non-indexed keys
    if (key === "productSidebarMenu" || key === "documentSidebarMenu") {
      delete data.AppSetting[key];
      changed = true;
    }
  });

  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}
