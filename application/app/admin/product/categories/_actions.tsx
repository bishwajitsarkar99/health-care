"use server"

// import { Prisma } from "@/app/generated/prisma/client"
// import prisma from "@/app/lib/prisma"
import { unlink } from "fs/promises"
import { revalidatePath } from "next/cache"
import { join } from "path"

export type CategoryFormData = {
    name: string
    image?: string
}

interface GetCategoriesParams {
    page?: number
    perPage?: number
    search?: string
}

export async function getCategories({
    page = 1,
    perPage = 5,
    search = "",
  }: GetCategoriesParams) {
    try {
      const skip = (page - 1) * perPage
  
    //   const where: Prisma.CategoryWhereInput | undefined = search
    //     ? {
    //         name: {
    //             contains: search,
    //             mode: Prisma.QueryMode.insensitive,
    //         },
    //     }: undefined
  
    //   const [categories, total] = await Promise.all([
    //     prisma.category.findMany({
    //       where,
    //       orderBy: { id: "desc" },
    //       skip,
    //       take: perPage,
    //       include: {
    //         _count: {
    //           select: {
    //             products: true,
    //           },
    //         },
    //       },
    //     }),
    //     prisma.category.count({ where }),
    //   ])
  
      return {
        // success: true,
        // data: categories,
        // meta: {
        //   page,
        //   perPage,
        //   total,
        //   totalPages: Math.ceil(total / perPage),
        // },
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      return { success: false, error: "Failed to fetch categories" }
    }
}

export async function getCategoryById(id: number) {
    // try {
    //     const category = await prisma.category.findUnique({
    //         where: { id },
    //     })
    //     if (!category) {
    //         return { success: false, error: "Category not found" }
    //     }
    //     return { success: true, data: category }
    // } catch (error) {
    //     console.error("Error fetching category:", error)
    //     return { success: false, error: "Failed to fetch category" }
    // }
}

export async function createCategory(data: CategoryFormData) {
    // try {
    //     const category = await prisma.category.create({
    //         data: {
    //             name: data.name,
    //             image: data.image || null,
    //         },
    //     })
    //     revalidatePath("/admin/product/categories")
    //     return { success: true, data: category }
    // } catch (error) {
    //     console.error("Error creating category:", error)
    //     return { success: false, error: "Failed to create category" }
    // }
}

export async function updateCategory(id: number, data: CategoryFormData) {
    // try {
    //     // Get existing image
    //     const existing = await prisma.category.findUnique({
    //         where: { id },
    //         select: { image: true },
    //     })

    //     // Delete old image if replaced
    //     if(existing?.image && data.image && existing?.image !== data.image){
    //         const oldImagePath = join(
    //             process.cwd(),
    //             "public",
    //             existing.image
    //         )

    //         try {
    //             await unlink(oldImagePath)
    //         } catch (err) {
    //             // file may not exist – ignore safely
    //             console.warn("Old image not found:", oldImagePath)
    //         }
    //     }

    //     // Update DB
    //     const category = await prisma.category.update({
    //         where: { id },
    //         data: {
    //             name: data.name,
    //             image: data.image || null,
    //         },
    //     })

    //     revalidatePath("/admin/categories")
    //     revalidatePath(`/admin/categories/${id}/edit`)
    //     return { success: true, data: category }
    // } catch (error) {
    //     console.error("Error updating category:", error)
    //     return { success: false, error: "Failed to update category" }
    // }
}

export async function deleteCategory(id: number) {
    // try {
    //     // Check if category has products
    //     const category = await prisma.category.findUnique({
    //         where: { id },
    //         include: {
    //             _count: {
    //                 select: {
    //                     products: true,
    //                 },
    //             },
    //         },
    //     })

    //     if (!category) {
    //         return { success: false, error: "Category not found" }
    //     }

    //     if (category._count.products > 0) {
    //         return {
    //             success: false,
    //             error: `Cannot delete category with ${category._count.products} product(s)`,
    //         }
    //     }

    //     // Delete image file
    //     if (category.image) {
    //         const imagePath = join(
    //             process.cwd(),
    //             "public",
    //             category.image
    //         )

    //         try {
    //             await unlink(imagePath)
    //         } catch (err) {
    //             console.warn("Image file not found:", imagePath)
    //         }
    //     }

    //     await prisma.category.delete({
    //         where: { id },
    //     })

    //     revalidatePath("/admin/product/categories")
    //     return { success: true }
    // } catch (error) {
    //     console.error("Error deleting category:", error)
    //     return { success: false, error: "Failed to delete category" }
    // }
}