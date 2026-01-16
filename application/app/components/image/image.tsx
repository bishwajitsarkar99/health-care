import React, { createElement, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface ImageProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export const Image = (props: ImageProps) => {
    
    const {className, children, as: Component = "img", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children)
}

export default Image;
