"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuHeader,
    DropdownMenuArrow,
    DropdownMenuUpArrow
} from "@/app/components/dropdown-menu/dropdown-sidebar-menu"
import {
    RightResizer,
    TopResizer,
    BottomResizer,
    LeftResizer
} from '@/app/components/resizer/resizer'
import { useMenuCardResize } from "@/hooks/useMenuCardResize";
import {getRAM} from "@/helper/MenuCardDesignmemory"
import Div from "../div/div";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Span from "../span/span";
import { MenuIcon } from "../ui/icons/appIcon";
import { menuData } from "@/config/tableMenuData"
import { useTableTheme } from "@/hooks/useTableTheme"
import { removeRAM } from "@/helper/tableDesignMemory";

export function MenuCard() {

    // === CALL HOOKS ===
    const cardId = useMenuCardResize("CategoryTableMenuCard")
    const { cardRef, svgRectRef, onResizeStart } = cardId

    const [mounted, setMounted] = useState(false);
    // active Table Theme
    const [isActiveTheme, setIsActiveTheme] = useState("simple")
    const savedTheme = getRAM("CategoryTable")
    
    useEffect(() => {
        if(savedTheme){
            setIsActiveTheme(savedTheme)
        }
        setMounted(true);
    }, []);

    const ulVariants = {
        open: {
          transition: {
            staggerChildren: 0.06,
          },
        },
        closed: {},
    };
      
    const liVariants = {
        open: {
            opacity: 1,
            y: 0,
        },
        closed: {
            opacity: 0,
            y: -8,
        },
    };
    const Icon = menuData.setting.icon;

    // change Table Theme
    const { handleThemeChange } = useTableTheme({
        DataTable: "CategoryTable",
        themeLinkId: "themeStylesheet",
        folderPath: "/table-design",
        defaultTheme: "simple",
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger id="dropbtn" className="justify-center p-1 relative">
                <Span className="text-neutral-600 hover:text-indigo-400">
                    <MenuIcon className="text-neutral-500" />
                </Span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                ref={cardRef}
                style={
                    mounted
                    ? {
                        width: getRAM("CategoryTableMenuCard", "Width") ?? undefined,
                        height: getRAM("CategoryTableMenuCard", "Height") ?? undefined,
                    }
                    : undefined
                }
                className="menu-card relative mb-1"
            >
                <Div className="menu-card-inner flex flex-col h-full w-full overflow-hidden">
                    <DropdownMenuHeader className="pb-1 pt-1">
                        <Div className="flex justify-center items-center ms-2.5">
                            <Div className="ms-1.5 p-1 text-gray-500 font-medium text-sm flex">
                                <Icon />
                                <Span className="ms-1">{menuData.setting.title}</Span>
                            </Div>
                        </Div>
                    </DropdownMenuHeader>
                    <Div className="tree-root pl-4 pr-4 pb-4">
                        <motion.ul
                            className="tree-root tree-list pl-4"
                            variants={ulVariants}
                            initial="closed"
                            animate="open"
                            >
                            {menuData.listBtn.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <motion.li
                                    key={item.btn}
                                    variants={liVariants}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="tree-item"
                                    >
                                    <Link
                                        href="#"
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            if (item.cssFile === "#") {
                                                removeRAM("CategoryTable");
                                                removeRAM("categories-table");
                                                handleThemeChange("simple");
                                                setIsActiveTheme("simple");
                                                return;
                                            }
                                            handleThemeChange(item.cssFile)
                                            setIsActiveTheme(item.cssFile)
                                        }}
                                        className={twMerge(
                                        "tree-link flex justify-items-start items-center gap-2 rounded-md p-1 pl-4 text-left text-sm cursor-pointer",
                                        "hover:bg-white hover:bg-[linear-gradient(90deg,#80808020_1px,transparent_1px),linear-gradient(180deg,#80808020_1px,transparent_1px)] hover:bg-size-[5px_5px] mask-size-[50%] hover:animate-[rotatedGrid_6s_linear_infinite]",
                                        "bg-white"
                                        )}
                                    >
                                        <ItemIcon />
                                        <Span className={twMerge(
                                            "font-medium",
                                            isActiveTheme === item.cssFile ? "text-indigo-600 text-sm" : "text-gray-500 text-sm hover:text-indigo-600",
                                        )}>
                                            {item.label}
                                        </Span>
                                    </Link>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </Div>
                    <svg className="connectorSVG">
                        <rect ref={svgRectRef} className="connectorPath" />
                    </svg>
                    <LeftResizer onPointerDown={onResizeStart("left")} />
                    <RightResizer onPointerDown={onResizeStart("right")} />
                    <TopResizer onPointerDown={onResizeStart("top")} />
                    <BottomResizer onPointerDown={onResizeStart("bottom")} />
                </Div>
                <DropdownMenuUpArrow />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
