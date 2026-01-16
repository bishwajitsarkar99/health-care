import { twMerge } from "tailwind-merge";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
      <input
        type={type}
        data-slot="input"
        className={twMerge(
            "w-full h-fit border border-[rgba(0,128,255,0.1)]",
            "bg-white text-sm md-text-sm lg:text-md xl:text-md font-medium",
            "focus:ring-1 focus:outline-none focus:ring-blue-600 dark:focus:ring-blue-800",
          className
        )}
        {...props}
      />
    )
  }

export default Input;