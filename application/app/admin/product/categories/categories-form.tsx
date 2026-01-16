"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/app/components/ui/label"
import { createCategory, updateCategory, type CategoryFormData } from "./_actions"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/app/components/image-upload"
import { uploadImage } from "@/lib/upload-image"
import Form from "@/app/components/form/form"
import Card from "@/app/components/card/card"
import CardHeader from "@/app/components/card/card-header"
import Div from "@/app/components/div/div"
import CardDescription from "@/app/components/card/card-description"
import CardContent from "@/app/components/card/card-content"
import { twMerge } from "tailwind-merge"
import Span from "@/app/components/span/span"
import CardFooter from "@/app/components/card/card-footer"
import SecondaryButton from "@/app/components/button/button"
import Input from "@/app/components/input/input"

interface CategoryFormProps {
    category?: {
        id: number
        name: string
        image: string | null
    }
}

export function CategoryForm({ category }: CategoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isCanceling, setIsCanceling] = useState(false)
    const [isBacking, setIsBacking] = useState(false)
    const [name, setName] = useState(category?.name || "")
    const [file, setFile] = useState<File | null>(null)
    const [imageKey, setImageKey] = useState(0)
    const router = useRouter()
    const { toast } = useToast()

    const resetForm = () => {
        setName("")
        setFile(null)
        setImageKey(prev => prev + 1) 
    }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     setIsSubmitting(true)

    //     try {
    //         let imageUrl = category?.image || "";

    //         if (file) {
    //             setIsUploading(true)
    //             const uploadResponse = await uploadImage(file, "categories")
    //             setIsUploading(false)
    //             imageUrl = uploadResponse
    //         }

    //         const formData: CategoryFormData = {
    //             name,
    //             image: imageUrl || undefined,
    //         }

    //         const result = category
    //             ? await updateCategory(category.id, formData)
    //             : await createCategory(formData)

    //         if (result.success) {
    //             toast({
    //                 title: "Success",
    //                 description: category
    //                     ? "Category updated successfully"
    //                     : "Category created successfully",
    //             })
    //             resetForm()
    //             router.push("/admin/product/categories")
    //             router.refresh()
    //         } else {
    //             toast({
    //                 title: "Error",
    //                 description: result.error || "Failed to save category",
    //                 variant: "destructive",
    //             })
    //         }
    //     } catch (error) {
    //         toast({
    //             title: "Error",
    //             description: "An unexpected error occurred",
    //             variant: "destructive",
    //         })
    //     } finally {
    //         setIsSubmitting(false)
    //         setIsUploading(false)
    //     }
    // }

    // cancel button 
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCanceling(true);

        resetForm()

        const timer = setTimeout(() => {
            setIsCanceling(false)
        }, 500);
    }

    // back button
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsBacking(true);

        const timer = setTimeout(() => {
            router.push("/admin/product/categories")
            setIsBacking(false)
        }, 500);
    }

    // onSubmit={handleSubmit}
    return (
        <Form >
            <Card className="shadow-sm hover:shadow-sm">
                <CardHeader className="text-center">
                    <CardDescription className={twMerge(
                        "p-0 font-medium",
                        "bg-white bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_60%)] bg-size-[5px_5px]",
                        "mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)]",
                    )}>
                        {category ? "Update category" : "Create a new category"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Div className="mb-3 flex">
                        <Label className="ms-3.5" htmlFor="image">Category Name</Label>
                    </Div>
                    <Div className={twMerge("input-group")}>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={twMerge(
                            "ps-3 pt-1 pb-1",
                            "input_email bg-white border border-[rgba(0,128,255,0.2)] text-gray-900 text-sm rounded-lg",
                            "focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            )}
                            placeholder=""
                            required
                            autoComplete="off"
                        />
                        <label htmlFor="user-email" className={twMerge(
                            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        )}>Equipments of textile, garments etc.</label>
                    </Div>
                    <Div>
                        <ImageUpload
                            key={imageKey}
                            label="Category Image"
                            value={category?.image || ""}
                            disabled={isSubmitting || isUploading}
                            onFileSelected={(file) => setFile(file)}
                        />
                    </Div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <SecondaryButton
                        type="submit"
                        className="cursor-pointer w-full"
                        disabled={isSubmitting || !name || isUploading}
                    >
                        {isUploading ? (
                            <Div className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <Span>Uploading...</Span>
                            </Div>
                        ) : isSubmitting ? "Saving..." : category ? "Update" : "Create"}
                    </SecondaryButton>
                    <SecondaryButton
                        type="button"
                        className="cursor-pointer w-full"
                        onClick={handleCancel}
                        disabled={isCanceling}
                    >
                        {isCanceling ? (
                            <Div className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <Span>Canceling...</Span>
                            </Div>
                        ) : (
                            <Span>Cancel</Span>
                        )}
                    </SecondaryButton>
                </CardFooter>
                <CardFooter>
                    {category? (
                        <SecondaryButton
                            type="button"
                            className="cursor-pointer w-full"
                            onClick={handleBack}
                            disabled={isBacking}
                        >
                            {isBacking ? (
                                <Div className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <Span>Uploading...</Span>
                                </Div>
                            ) : (
                                <Span>Back</Span>
                            )}
                        </SecondaryButton>
                    ) : (
                        ""
                    )}
                </CardFooter>
                
            </Card>
        </Form>
    )
}