import { createElement, ReactNode, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface CardHeaderProps {
  className?: string;
  children?: ReactNode;
  Component?: ElementType;
  [key: string]: any; // Allow additional props (e.g., onClick, id, etc.)
}

const CardHeader = (props: CardHeaderProps) => {
  const { className, children, as: Component = "div", ...rest } = props;
  return createElement(
    Component,
    {
      className: twMerge(
        "w-full p-3",
        ["dark:bg-gray-800 dark:border-gray-700"],
        "bg-white rounded-sm transition duration-300 ease-in-out",
        className
      ),
      ...rest,
    },
    children
  );
};

export default CardHeader;