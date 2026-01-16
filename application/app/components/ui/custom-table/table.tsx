"use client"

import { ElementType, ReactNode, createElement } from "react";
import { twMerge } from "tailwind-merge";

interface TableContainerProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableContainer(props: TableContainerProps) {

    const {className, children, as:Component="div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "relative w-full overflow-x-auto",
            className
        ),
        ...rest
    }, children)
}

interface TableProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key: string]: any
}

function Table(props: TableProps) {

    const {className, children, as:Component="table" ,...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "table w-full caption-bottom text-sm",
            className
        ),
        ...rest
    }, children)
}

interface TableHeaderProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableHeader(props:TableHeaderProps) {

    const {className, children, as:Component="thead", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "table-head",
            className
        ),
        ...rest
    }, children)
}

interface TableBodyProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableBody(props: TableBodyProps) {
    
    const {className, children, as:Component="tbody", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "bg-white tab",
            className
        ),
        ...rest
    }, children)
}

interface TableFooterProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key: string]: any
}

function TableFooter(props:TableFooterProps) {

    const {className, children, as:Component="tfoot", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "bg-muted/50 border-t font-medium",
            className
        ),
        ...rest
    }, children)
}

interface TableRowProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableRow(props: TableRowProps) {

    const {className, children, as:Component="tr", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children) 
}

interface TableHeadProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableHead(props:TableHeadProps) {

    const {className, children, as:Component="th", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "th-head",
            className
        ),
        ...rest
    }, children)
}

interface TableCellProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableCell(props:TableCellProps) {

    const {className, children, as:Component="td", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children)
}

interface TableCaptionProps {
    as? : ElementType
    children? : ReactNode
    className? : string
    [key:string]: any
}

function TableCaption(props:TableCaptionProps) {

    const {className, children, as:Component="caption", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "text-muted-foreground mt-4 text-sm",
            className
        ),
        ...rest
    }, children)
}

export {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}
