import React, { ElementType, ReactNode, createElement } from "react"
import { twMerge } from "tailwind-merge"

interface GridItemProps {
  as?: ElementType
  children?: ReactNode
  className?: string

  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6

  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

  rowStart?: 1 | 2 | 3 | 4 | 5 | 6
  rowEnd?: 1 | 2 | 3 | 4 | 5 | 6

  placeSelf?: "start" | "center" | "end" | "stretch"
  justifySelf?: "start" | "center" | "end" | "stretch"
  self?: "start" | "center" | "end" | "stretch"

  [key: string]: any
}

export const GridItem = (props: GridItemProps) => {
  const {
    as: Component = "div",
    className,
    children,

    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,

    placeSelf,
    justifySelf,
    self,

    ...rest
  } = props

  return createElement(
    Component,
    {
      className: twMerge(
        placeSelf && `place-self-${placeSelf}`,
        justifySelf && `justify-self-${justifySelf}`,
        self && `self-${self}`,
        className
      ),
      style: {
        ...(colSpan && { gridColumn: `span ${colSpan} / span ${colSpan}` }),
        ...(rowSpan && { gridRow: `span ${rowSpan} / span ${rowSpan}` }),
        ...(colStart && { gridColumnStart: colStart }),
        ...(colEnd && { gridColumnEnd: colEnd }),
        ...(rowStart && { gridRowStart: rowStart }),
        ...(rowEnd && { gridRowEnd: rowEnd }),
      },
      ...rest,
    },
    children
  )
}

export default GridItem
