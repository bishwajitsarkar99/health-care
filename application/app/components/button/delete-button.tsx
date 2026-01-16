import { ElementType, ReactNode, createElement } from "react";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps {
    as? : ElementType;
    children? : ReactNode;
    className? : string;
    [key: string] : any;
}

export function DeleteButton(props: DeleteButtonProps) {

   const {className, children, as: Component = 'button', ...rest} = props;

    return (
        <>
            {createElement(Component, {
                className: twMerge(
                    "px-5 py-1.5 text-white font-medium rounded-sm text-center cursor-pointer",
                    "focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
                    "text-xs md:text-sm lg:text-md xl:text-md 2xl:text-lg",
                    "delete-btn",
                    className
                ),
                ...rest
            },  <span>{children}</span>)}
        </>
    )
}

export default {DeleteButton}