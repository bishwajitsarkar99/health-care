import React, { createElement, ElementType, Fragment, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export const Header = (props: HeaderProps) => {
  
    const {className, children, as: Component = "header", ...rest} = props;

    return createElement(Component, {
        className: twMerge(
            "z-9999 bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_100%)] bg-size-[5px_5px] mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)] w-full border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm",
            "w-full h-auto border border-neutral-200 text-gray-800 font-bold items-center fixed top-0 inset-shadow-sm",
            className
        ),
        ...rest
    }, children)

}

export default Header;
