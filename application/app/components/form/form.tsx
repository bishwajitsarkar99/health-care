import React, { createElement, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface FormProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export const Form = (props: FormProps) => {
    const {className, children, as: Component = "form", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "",
            className
        ),
        ...rest
    }, children)
}

export default Form;
