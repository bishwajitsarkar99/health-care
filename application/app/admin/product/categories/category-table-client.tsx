"use client"

import { useEffect, useRef, useState } from "react"
import { useTableResize } from "@/hooks/useTableResize"
import { useColumnDragAndDrop } from "@/hooks/useColumnDragAndDrop"
import { activeTableRow } from "@/hooks/useTableActiveRow"
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/custom-table/table"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel 
} from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"

import Image from "@/components/image/image"
import Link from "next/link"
import { DeleteCategoryButton } from "./delete-category-button"
import Div from "@/components/div/div"
import Span from "@/components/span/span"
import { MoveIcon, DownArrow, UpArrow, EditIcon } from "@/components/ui/icons/appIcon"
import { twMerge } from "tailwind-merge"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export function CategoryTableClient({
  data,
  meta,
}: {
  data: any[]
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}) {
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement>(null as any)
  // Data Sorting 
  const [sorting, setSorting] = useState([{ id: "id", desc: true }])
  // TABLE HEADINGS
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "image",
      header: "Image",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "products",    // column id used for sorting
      header: "Products",
      accessorFn: (row: any) => row._count?.products ?? 0,  // pull nested value
      sortingFn: "basic",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
    },
  ]

  /* ---------------- TABLE STATE (PAGINATION ONLY) ---------------- */
  const router = useRouter()
  const params = useSearchParams()
  const perPage = Number(params.get("perPage") || 10)
  const [perPageState, setPerPageState] = useState(String(perPage))
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
  
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
  
    return () => clearTimeout(timer)
  }, [params.get("page"), params.get("perPage")])

  useEffect(() => {
  setPerPageState(String(perPage))
  }, [perPage])
  const table = useReactTable({
    data,
    columns: columns as any,
    manualPagination: true,
    pageCount: meta.totalPages,
    state: {
      pagination: {
        pageIndex: meta.page - 1,
        pageSize: perPage,
    
      },
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  
  // CALL THE TABLE RESIZE HOOK
  useTableResize({
    tableRef,
    DataTable: "categories-table",
    colClass: "col-resizer",
    rowClass: "row-resizer",
  })
  // CALL THE TABLE COLOUMN DRAG AND DROP HOOK
  useColumnDragAndDrop(
    tableRef,
    "categories-table",
    ".move-icon"
  )

  function updatePage(page: number) {
    const safePage = Math.min(
      Math.max(page, 1),
      meta.totalPages
    )
    const newParams = new URLSearchParams(params.toString())
    newParams.set("page", String(safePage))
    router.push(`?${newParams.toString()}`)
  }

  return (
    <Div className={twMerge(
      "rounded-lg relative",
      "",
    )}>
      {isLoading && (
        <Div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <div className="loader-lg" />
          <img className="w-10 h-10" src="/loading.gif" alt="loader" />
        </Div>
      )}
      <TableContainer>
        <Table ref={tableRef}>
          <TableHeader>
            <TableRow className="cursor-alias">
              {columns.map((column) => (
                <TableHead key={String(column.id ?? column.accessorKey)} className="select-none">
                  {column.header}
                  <Span className="ms-2">
                    <MoveIcon className="move-icon ms-2 text-neutral-500 hover:text-emerald-600" />
                    {(column.accessorKey ?? column.id) && (column.accessorKey ?? column.id) !== "actions" && (
                      <span
                        className="ms-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          table.getColumn((column.id ?? column.accessorKey) as string)?.toggleSorting?.()
                        }}
                      >
                        {table.getColumn((column.id ?? column.accessorKey) as string)?.getIsSorted() === "asc" && (
                          <DownArrow className="ms-2 text-neutral-600 hover:text-emerald-600" />
                        )}
                        {table.getColumn((column.id ?? column.accessorKey) as string)?.getIsSorted() === "desc" && (
                          <UpArrow className="ms-2 text-neutral-600 hover:text-emerald-600" />
                        )}
                        {table.getColumn((column.id ?? column.accessorKey) as string)?.getIsSorted() === false && (
                          <UpArrow className="ms-2 text-neutral-600 hover:text-emerald-600" />
                        )}
                      </span>
                    )}
                  </Span>
                  <Div className="col-resizer" />
                  <Div className="row-resizer" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="body-bottom-line">
            {table.getRowModel().rows.map((row, index) => {
              const category = row.original
              return (
                <TableRow className="table-row tbody-row" key={category.id} onClick={(e:any) => activeTableRow(e.currentTarget)}>
                  <TableCell className="td-cell-first">
                    {category.id}
                    <Div className="row-resizer" />
                  </TableCell>

                  <TableCell className="td-cell-middle">
                    {category.image ? (
                      <Image className="img-hover ms-5" src={category.image} alt={category.name} width={25} height={25} />
                    ) : (
                      <Div>No image</Div>
                    )}
                    <Div className="row-resizer" />
                  </TableCell>

                  <TableCell className="td-cell-middle">
                    {category.name}
                    <Div className="row-resizer" />
                  </TableCell>

                  <TableCell className="td-cell-middle">
                    {category._count.products}.00
                    <Div className="row-resizer" />
                  </TableCell>

                  <TableCell className="td-cell-last text-right">
                    {loadingRowId === category.id ? (
                      <Span className={twMerge(
                        "table-cell-loader-overlay cell-loader-text",
                        "inline-flex items-center gap-2 text-xs text-neutral-100"
                      )}>
                        <span className="loader-sm" />
                        Loading
                        <Span className="dot dot-1 text-indigo-800 size-4">.</Span>
                        <Span className="dot dot-2 text-indigo-800 size-4">.</Span>
                        <Span className="dot dot-3 text-indigo-800 size-4">.</Span>
                        <Span className="dot dot-4 text-indigo-800 size-4">.</Span>
                      </Span>
                    ) : (
                      <>
                        <Link 
                          href={`/admin/product/categories/${category.id}/edit`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setLoadingRowId(category.id)
                          }}
                        >
                          <EditIcon className="text-indigo-400" />
                        </Link>
                        <DeleteCategoryButton
                          id={category.id}
                          name={category.name}
                          productCount={category._count.products}
                        />
                      </>
                    )}
                    <Div className="row-resizer" />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter className="border-none bg-white">
            <TableRow>
              <TableCell colSpan={5} className="px-0 pt-4">
                <Div className="flex items-center justify-between">
                  {/* Rows per page */}
                  <Div className="hidden items-center gap-2 lg:flex">
                    <Label className="text-sm font-medium">Per page</Label>
                    <Select
                      key={perPage}
                      value={perPageState}
                      onValueChange={(value) => {
                        setPerPageState(value)
                        const newParams = new URLSearchParams(params.toString())
                        newParams.set("perPage", value)
                        newParams.set("page", "1")

                        router.push(`?${newParams.toString()}`)
                      }}
                    >
                      <SelectTrigger className={twMerge(
                        "w-20 data-[size=default]:h-7 cursor-pointer focus-visible:ring-0 shadow-none",
                        "border border-gray-300"
                      )}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[5, 10, 20, 30, 40, 50].map((size) => (
                          <SelectItem key={size} value={`${size}`}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Div>

                  {/* Pagination */}
                  <Div className="flex items-center gap-6">
                    {/* Selected rows info */}
                    <Div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                      Showing {data.length} of {meta.total} row(s)
                    </Div>

                    {/* Page info */}
                    <Div className="text-sm font-medium">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </Div>

                    {/* Navigation */}
                    <Div className="flex items-center gap-2">
                      <Button
                        className="size-7 border border-gray-300 cursor-pointer"
                        size="icon"
                        variant="outline"
                        onClick={() => updatePage(1)}
                        disabled={meta.page === 1}
                      >
                        <IconChevronsLeft />
                      </Button>

                      <Button
                        className="size-7 border border-gray-300 cursor-pointer"
                        size="icon"
                        variant="outline"
                        onClick={() => updatePage(meta.page - 1)}
                        disabled={meta.page === 1}
                      >
                        <IconChevronLeft />
                      </Button>

                      <Button
                        className="size-7 border border-gray-300 cursor-pointer"
                        size="icon"
                        variant="outline"
                        onClick={() => updatePage(meta.page + 1)}
                        disabled={meta.page === meta.totalPages}
                      >
                        <IconChevronRight />
                      </Button>

                      <Button
                        className="size-7 border border-gray-300 cursor-pointer"
                        size="icon"
                        variant="outline"
                        onClick={() => updatePage(meta.totalPages)}
                        disabled={meta.page === meta.totalPages}
                      >
                        <IconChevronsRight />
                      </Button>
                    </Div>
                  </Div>
                </Div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Div>
  )
}
