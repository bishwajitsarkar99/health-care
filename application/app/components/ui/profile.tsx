"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"
import { motion} from "framer-motion";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Div from "@/components/div/div"
import Span from "@/components/span/span"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuArrow
} from '@/components/dropdown-menu/dropdown-sidebar-menu'
import {
  RightResizer,
  TopResizer,
  BottomResizer
} from '@/components/resizer/resizer'
import { useMenuCardResize } from "@/hooks/useMenuCardResize";
import {getRAM} from "@/helper/MenuCardDesignmemory"
import { useEffect, useState } from "react";

export function NavDocuments({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
  const { state, isMobile } = useSidebar()

  return (
    <DropdownMenu>
        <SidebarMenuButton id="dropbtn" className="justify-center p-2 relative">

        </SidebarMenuButton>
        
        <DropdownMenuContent
            className="menu-card lg:ml-8.5 lg:-mt-8 xl:ml-8.5 xl:-mt-7 relative mb-1"
        >
            <Div className="menu-card-inner flex flex-col h-full w-full overflow-hidden">
                <DropdownMenuHeader className="pb-1 pt-1">
                <Div className="flex justify-center items-center ms-2.5">
                    <Div className="ms-1.5 text-gray-500 font-medium text-sm"></Div>
                </Div>
                </DropdownMenuHeader>
                <Div className="pl-4 pr-4 pb-4">
                
                </Div>
            </Div>
            <DropdownMenuArrow />
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
