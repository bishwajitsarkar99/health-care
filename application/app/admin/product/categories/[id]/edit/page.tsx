import { CategoryForm } from "../../categories-form";
import { getCategoryById } from "../../_actions"
import { notFound } from "next/navigation"
import Section from "@/app/components/section/section";
import Grid from "@/app/components/grid/grid"
import GridItem from "@/app/components/grid/gridItem"
import CategoryDataTable from "../../data-table";
import { MenuCard } from "@/app/components/table-menu-card/menu-card";
import SearchInput from "@/app/components/input/searchInput";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id: paramId } = await params
    const id = parseInt(paramId)
    const result = await getCategoryById(id)

    // if (!result.success || !result.data) {
    //     notFound()
    // }

    return (
        <Section className="mx-5 my-2">
            <Grid className="sm:grid-flow-row md:grid-flow-col lg:grid-flow-col-dense xl:grid-flow-col mb-2" cols={3} gap={2}>
                <GridItem className="flex justify-between gap-4 h-10" colSpan={2}>
                <MenuCard />
                <SearchInput />
                </GridItem>
            </Grid>
            <Grid className="sm:grid-flow-row md:grid-flow-col lg:grid-flow-col-dense xl:grid-flow-col" cols={3} gap={4}>
                <GridItem colSpan={2}>
                    <CategoryDataTable />
                </GridItem>
                <GridItem>
                    {/* <CategoryForm category={result.data} /> */}
                </GridItem>
            </Grid>
        </Section>
    )
}
