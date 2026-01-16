"use client"
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';
import Link from 'next/link'
import { useState } from 'react'

interface LinkProps {
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export const LinkButton = (props: LinkProps) => {
    
    const {className, children, href} = props;

    const [active, setActive] = useState(false);
    
    return (
        <Link
            className={twMerge(
                "px-5 py-1.5 text-white font-medium rounded-sm text-center cursor-pointer",
                "focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
                "text-xs md:text-sm lg:text-md xl:text-md 2xl:text-lg",
                "secondary-btn",
                className,
            )}
            href={href}
            prefetch={active ? null : false}
            onMouseEnter={() => setActive(true)}
            >
            {children}
        </Link>
    );
};

export default LinkButton;
