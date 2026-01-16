"use client"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { twMerge } from "tailwind-merge"
import HeaderProfile from "./ui/header-profile"

import {
  InputGroup,
  InputGroupAddon,

} from "@/app/components/ui/input-group"
// import { LoaderIcon, SearchIcon } from "lucide-react"
import SecondaryButton from "./button/button"
import Input from "./input/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuArrow
} from '@/app/components/dropdown-menu/dropdown-sidebar-menu'
import {
  SidebarMenuButton,
} from "@/app/components/ui/sidebar"
import Div from "./div/div"
import HeaderSearch from "./input/headerSearchInputGroup"
import { useRouter } from "next/navigation"
import { authService } from "../services/authService"
import toast from "react-hot-toast"

export function SiteHeader() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.clear();
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      localStorage.clear();
      router.push("/login");
    }
  };
  return (
    <header className={twMerge(
      "flex  h-(--header-height) shrink-0 items-center gap-2 border-b border-b-gray-200 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
      "bg-white bg-[repeating-linear-gradient(315deg,#80808010_0,#80808050_1px,transparent_0,transparent_60%)] bg-size-[5px_5px]",
      "mask-size-[50%] mask-image-[radial-gradient(ellipse_100%_100%_at_20%_20%,#000_80%,transparent_100%)]",
      "border border-[rgba(0,128,255,0.1)] rounded-sm",
      "fixed z-40 top-0 inset-shadow",
      )}>
      <Div className="w-full grid grid-cols-4 justify-between gap-1 pb-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="ml-0 [&_svg:not([class*='size-'])]:size-8 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-8"
        />
        <Div></Div>
        <Div className="flex justify-end items-end">
          <HeaderSearch />
          <Div className="hidden sm:flex max-w-20 h-full ms-5">
            <Div
              className="size-4 bg-white shadow-sm text-accent-foreground rounded-full font-extrabold cursor-pointer border border-neutral-100"
            >
              <DropdownMenu>
                <SidebarMenuButton id="dropbtn" className="justify-center p-2 relative">
                  B
                </SidebarMenuButton>
                
                <DropdownMenuContent
                  className="sub-menu-card lg:ml-8.5 lg:-mt-8 xl:ml-8.5 xl:-mt-7 relative mb-1"
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
            </Div>
          </Div>
        </Div>
      </Div>
    </header>
  )
}
