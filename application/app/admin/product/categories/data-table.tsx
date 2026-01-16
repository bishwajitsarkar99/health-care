import Card from "@/app/components/card/card"
import Div from "@/app/components/div/div"
import { getCategories } from "./_actions"
import { CategoryTableClient } from "./category-table-client"
interface PageProps {
  searchParams?: {
    page?: string
    perPage?: string
    search?: string
  }
}
export default async function CategoryDataTable({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    perPage?: string
    search?: string
  }>
}) {
  const params = await searchParams

  const page = Number(params?.page) || 1
  const perPage = Number(params?.perPage) || 10
  const search = params?.search || ""

  const result = await getCategories({ page, perPage, search })

  // server Error
  // if (!result.success || !result.data) {
  //   return (
  //     <Div className="border border-red-200 bg-red-100 rounded-lg p-8 text-center text-destructive">
  //       {result.error || "Failed to load categories"}
  //     </Div>
  //   )
  // }

  // // No search results found
  // if (result.data.length === 0) {
  //   return (
  //     <Div className="border border-emerald-200 bg-emerald-50 rounded-lg shadow-sm p-8 text-center text-muted-foreground">
  //       <p className="text-sm font-medium text-red-400">No categories found</p>
  //       {search && (
  //         <p className="mt-1 text-xs text-red-400">
  //           For search result <span className="font-semibold text-muted-foreground">“{search}”</span>
  //         </p>
  //       )}
  //     </Div>
  //   )
  // }

  return (
    <Card className="shadow-sm hover:shadow-sm p-5">
      {/* <CategoryTableClient data={result.data} meta={result.meta} /> */}
    </Card>
  )
}

