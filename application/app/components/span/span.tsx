import React, { createElement, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface SpanProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [Key: string] : any;
}

export const Span = (props: SpanProps) => {
    
    const {className, children, as: Component = "span", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children)
}

export default Span;
