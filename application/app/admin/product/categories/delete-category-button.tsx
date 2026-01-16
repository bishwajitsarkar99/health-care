"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { deleteCategory } from "./_actions"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import Span from "@/app/components/span/span"
import { DeleteButton } from "@/app/components/button/delete-button"
import { DeleteIcon } from "@/app/components/ui/icons/appIcon"


interface DeleteCategoryButtonProps {
    id: number
    name: string
    productCount: number
}

export function DeleteCategoryButton({
    id,
    name,
    productCount,
}: DeleteCategoryButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    // const handleDelete = async () => {
    //     setIsDeleting(true)
    //     try {
    //         const result = await deleteCategory(id)
    //         if (result.success) {
    //             toast({
    //                 title: "Success",
    //                 description: "Category deleted successfully",
    //             })
    //             router.refresh()
    //         } else {
    //             toast({
    //                 title: "Error",
    //                 description: result.error || "Failed to delete category",
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
    //         setIsDeleting(false)
    //     }
    // }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="bg-white p-0 hover:bg-white h-0.5 cursor-pointer"
                    variant="destructive"
                    size="sm"
                    disabled={productCount > 0}
                >
                    <DeleteIcon className="ms-2" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-none transform scale-3d">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-800 font-medium">
                        Would you like to delete the <Span className="text-red-700 font-medium italic">(category: {name})</Span> permanently?
                        If you delete this category item, you will not to recover.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border border-gray-300 text-red-600 cursor-pointer">Cancel</AlertDialogCancel>
                    <DeleteButton
                        // onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-white hover:text-white cursor-pointer"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </DeleteButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}