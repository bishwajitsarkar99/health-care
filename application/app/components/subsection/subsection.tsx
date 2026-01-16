import React, { createElement, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface SubSectionProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export const SubSection = (props: SubSectionProps) => {
   
    const {className, children, as: Component = "div", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children)
}

export default SubSection;
