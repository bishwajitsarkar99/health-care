import React, { ElementType, ReactNode, createElement } from "react";
import { twMerge } from "tailwind-merge";

interface ResizerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  onMouseDown?: React.MouseEventHandler;
  [key: string]: any;
}

const createResizer = (
  baseClass: string
) => ({ className, as: Component = "div", children, ...rest }: ResizerProps) =>
  createElement(
    Component,
    {
      className: twMerge(baseClass, className),
      ...rest,
    },
    children
  );

export const LeftResizer = createResizer("width-resizer left-resizer");
export const RightResizer = createResizer("width-resizer right-resizer");
export const TopResizer = createResizer("height-resizer top-resizer");
export const BottomResizer = createResizer("height-resizer bottom-resizer");

export default {
  LeftResizer,
  RightResizer,
  TopResizer,
  BottomResizer,
};
