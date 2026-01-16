"use client"

import toastLib from "react-hot-toast"

type ToastOptions = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = ({ title, description, variant }: ToastOptions) => {
    if (variant === "destructive") {
      toastLib.error(`${title}${description ? description : ""}`)
    } else {
      toastLib.success(`${title}${description ? description : ""}`)
    }
  }

  return { toast }
}
