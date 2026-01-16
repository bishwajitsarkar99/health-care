export async function uploadImage(file: File, folder: string) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    })

    const result = await response.json()
    if (!result.success) {
        throw new Error(result.error || "Failed to upload image")
    }

    return result.url as string
}