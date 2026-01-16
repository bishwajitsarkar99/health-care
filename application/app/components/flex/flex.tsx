import React, { createElement, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface FlexProps {
    className? : string;
    children? : ReactNode;
    as? : ElementType;
    direction? : "row" | "col";
    justify? : "start" | "center" | "between" | "end";
    items? : "start" | "center" | "end";
    gap? : 1 | 2 | 3 | 4 | 5 | 6;
    [key: string] : any
}

export const Flex = (props: FlexProps) => {
    const {
        as: Component = "div",
        className,
        direction = "row",
        justify = "start",
        items = "start",
        gap = "3",
        children,
        ...rest 
    } = props;

    const directions = {
        row: "flex-row",
        col: "flex-col"
    }

    const justifycontent = {
        start: "justify-start",
        end: "justify-end",
        between: "justify-between",
        center: "justify-center"
    }

    const justifyItems = {
        start: "items-start",
        end: "items-end",
        center: "items-center"
    }

    const gaps = {
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
    }

    return createElement(Component, {
        className: twMerge(
            "flex",
            directions[direction],
            justifycontent[justify],
            justifyItems[items],
            gaps[gap],
            className
        ),
        ...rest
    }, children);
};

export default Flex;
