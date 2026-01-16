"use client"

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import Div from "@/components/div/div"
import { twMerge } from "tailwind-merge"

interface PageLoadingProps {
    open: boolean
}

export default function PageLoading({open} : PageLoadingProps) {
    return (
        <Drawer  open={open} direction="top">
            <DrawerTitle className="sr-only">Loading</DrawerTitle>
            <DrawerContent className={twMerge(
                    "bg-transparent",
                    "h-screen w-full",
                    "flex items-center justify-center border-none",
                )}>
                <Div className="flex justify-center items-center p-5">
                    <img className="w-20 h-full" src="/load-30.gif" alt="Loading..." />
                </Div>
            </DrawerContent>
        </Drawer>
    )
}
