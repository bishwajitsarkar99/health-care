import React, { ElementType, ReactNode, createElement, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface DropdownSidebarMenuProps {
    as? : ElementType
    className? : string
    children? : ReactNode
    [key: string] : any
}

export const DropdownMenu = (props: DropdownSidebarMenuProps) => {

    const {className, children, as: Component="div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "dropdown menubar-component",
            className
        ),
        ...rest 
    }, children)
}

interface DropdownMenuTriggerProps {
    as? : ElementType
    className? : string
    children? : ReactNode
    [key: string] : any
}

export const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => {

    const {className, children, as: Component="button", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        type: Component === "button" ? "button" : undefined,
        ...rest 
    }, children)
}

interface DropdownMenuContentProps {
    as?: ElementType;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
}
  
export const DropdownMenuContent = forwardRef<
    HTMLDivElement,
    DropdownMenuContentProps
    >(({ className, children, as: Component = "div", ...rest }, ref) =>
    createElement(
        Component,
        {
        ref,
        className: twMerge(
            "dropdown-content dropdown-menu-component",
            className?.toString() // <-- ensure it's a string
        ),
        ...rest,
        },
        children
    )
);

interface DropdownMenuHeaderProps {
    as? : ElementType
    className? : string
    children? : ReactNode
    [key: string] : any
}

export const DropdownMenuHeader = (props: DropdownMenuHeaderProps) => {
    const {className, children, as: Component="div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "menu-card-header",
            className
        ),
        ...rest, 

    },  
        <>
            {children}
            <span className="ms-2" />
        </>
    )}

interface DropdownMenuArrowProps {
    as? : ElementType
    className? : string
    children? : ReactNode
    [key: string] : any
}

export const DropdownMenuArrow = (props: DropdownMenuArrowProps) => {
    const {className, children, as: Component="div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "sub-menu-card-arrow",
            className
        ),
        ...rest
    }, children)
}

export const DropdownMenuUpArrow = (props: DropdownMenuArrowProps) => {
    const {className, children, as: Component="div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "menu-card-arrow",
            className
        ),
        ...rest
    }, children)
}

export default {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuHeader,
    DropdownMenuArrow,
    DropdownMenuUpArrow
}
