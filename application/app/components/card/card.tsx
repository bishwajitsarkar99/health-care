import { createElement, ReactNode, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children?: ReactNode;
  Component?: ElementType;
  [key: string]: any; // Allow additional props (e.g., onClick, id, etc.)
}

const Card = (props: CardProps) => {
  const { className, children, as: Component = "div", ...rest } = props;
  return createElement(
    Component,
    {
      className: twMerge(
        "card w-full p-3 shadow-xs",
        ["dark:bg-gray-800 dark:border-gray-700 rounded-s-sm rounded-r-sm transform-3d"],
        "bg-white rounded-sm border border-[rgba(0,128,255,0.1)] transition duration-300 ease-in-out",
        "hover:shadow-[0px_3px_6px_rgb(0,0,0,0.2)] hover:opacity-100", 
        className
      ),
      ...rest,
    },
    children
  );
};

export default Card;