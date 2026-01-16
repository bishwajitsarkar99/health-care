import React, { ElementType, ReactNode, createElement } from "react"
import { twMerge } from "tailwind-merge"

interface GridProps {
  as?: ElementType
  children?: ReactNode
  className?: string

  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  rows?: 1 | 2 | 3 | 4 | 5 | 6

  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10
  gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10
  gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10

  flow?: "row" | "col" | "dense" | "row-dense" | "col-dense"

  autoCols?: "auto" | "min" | "max" | "fr"
  autoRows?: "auto" | "min" | "max" | "fr"

  placeItems?: "start" | "center" | "end" | "stretch"
  justifyItems?: "start" | "center" | "end" | "stretch"
  items?: "start" | "center" | "end" | "stretch"

  subgrid?: boolean

  [key: string]: any
}

export const Grid = (props: GridProps) => {
  const {
    as: Component = "div",
    className,
    children,

    cols,
    rows,
    gap,
    gapX,
    gapY,
    flow,

    autoCols,
    autoRows,

    placeItems,
    justifyItems,
    items,

    subgrid,
    ...rest
  } = props

  const flowMap = {
    row: "row",
    col: "column",
    dense: "dense",
    "row-dense": "row dense",
    "col-dense": "column dense",
  }

  return createElement(
    Component,
    {
      className: twMerge(
        "grid",
        placeItems && `place-items-${placeItems}`,
        justifyItems && `justify-items-${justifyItems}`,
        items && `items-${items}`,
        subgrid && "subgrid",
        className
      ),
      style: {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        ...(rows && {
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }),
        ...(gap !== undefined && { gap: `${gap * 0.25}rem` }),
        ...(gapX !== undefined && { columnGap: `${gapX * 0.25}rem` }),
        ...(gapY !== undefined && { rowGap: `${gapY * 0.25}rem` }),
        ...(flow && { gridAutoFlow: flowMap[flow] }),
        ...(autoCols && { gridAutoColumns: autoCols }),
        ...(autoRows && { gridAutoRows: autoRows }),
      },
      ...rest,
    },
    children
  )
}

export default Grid
