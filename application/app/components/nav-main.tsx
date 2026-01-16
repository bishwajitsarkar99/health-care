"use client"
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { motion } from "framer-motion";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "../components/ui/sidebar"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import Div from "./div/div"
import Span from "./span/span"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuArrow
} from '../components/dropdown-menu/dropdown-sidebar-menu'
import {
  RightResizer,
  TopResizer,
  BottomResizer
} from '../components/resizer/resizer'
import { useMenuCardResize } from "@/hooks/useMenuCardResize";
import {getRAM} from "@/helper/MenuCardDesignmemory"
import { ElementType, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    group?: {
      icon: ElementType
      title: string
      url: string
    }[]
  }[]
}) {

  const { state, isMobile } = useSidebar()
  const isIcon = state === "collapsed" && !isMobile  
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setLoading(null)
  }, [pathname])

  // === CALL HOOKS ===
  const menuResizeRefs = items.map((_, index) => {
    const cardId = `productSidebarMenu_${(index + 1).toString().padStart(2, "0")}`
    return useMenuCardResize(cardId)
  })

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, index) => {
            // generate unique cardId per item
            const { cardRef, svgRectRef, onResizeStart } = menuResizeRefs[index]
            const cardId = `productSidebarMenu_${(index + 1).toString().padStart(2, "0")}`

            return (
              <SidebarMenuItem key={item.title}>
                {isIcon ? (
                  // COLLAPSED MODE: icon-only top-level button
                  <DropdownMenu>
                    <SidebarMenuButton id="dropbtn" className="justify-center p-2 relative">
                      {item.icon && <item.icon className="size-4 text-gray-500" />}
                    </SidebarMenuButton>
                    
                    <DropdownMenuContent
                      ref={cardRef}
                      style={{
                        width: getRAM(cardId, "Width") ?? undefined,
                        height: getRAM(cardId, "Height") ?? undefined,
                      }}
                      className="menu-card lg:ml-8.5 lg:-mt-8 xl:ml-8.5 xl:-mt-7 relative mb-1"
                    >
                      <Div className="menu-card-inner flex flex-col h-full w-full overflow-hidden">
                        <DropdownMenuHeader className="pb-1 pt-1">
                          <Div className="flex justify-center items-center ms-2.5">
                            {item.icon && <item.icon className="size-4 text-gray-500" />}
                            <Div className="ms-1.5 text-gray-500 font-medium text-sm">{item.title}</Div>
                          </Div>
                        </DropdownMenuHeader>
                        <Div className="tree-root pl-4 pr-4 pb-4">
                          <motion.ul
                            className="tree-root tree-list pl-4"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                              collapsed: {},
                            }}
                          >
                            {item.group?.map((child) => {
                              const ItemIcon = child.icon;
                              const isActive = pathname === child.url
                              return (
                                <motion.li
                                  key={child.title}
                                  className="tree-item"
                                  variants={{ open: { opacity: 1, y: 0 }, collapsed: { opacity: 0, y: -10 } }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <Link
                                    href={child.url}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      
                                      if (isActive) return
                                      setLoading(child.url)
                                      setTimeout(() => {
                                        router.push(child.url!)
                                      }, 1000)
                                    }}
                                    className={twMerge(
                                      "tree-link flex justify-items-start items-center gap-2 rounded-md p-1 pl-4 text-left text-sm cursor-pointer",
                                      "hover:bg-white hover:bg-[linear-gradient(90deg,#80808020_1px,transparent_1px),linear-gradient(180deg,#80808020_1px,transparent_1px)] hover:bg-size-[5px_5px] mask-size-[50%] hover:animate-[rotatedGrid_6s_linear_infinite]",
                                      isActive
                                      ? "text-indigo-600 font-semibold"
                                      : "text-gray-600",
                                      "bg-white"
                                    )}
                                  >
                                    {ItemIcon && <ItemIcon className="size-4 text-gray-500 transition-all duration-200" />}
                                    <Span className="text-gray-600 hover:text-gray-800 font-medium text-sm">
                                      {loading === child.url ? (
                                        <Span className={twMerge(
                                          "cell-loader-text",
                                          "text-neutral-100"
                                        )}>
                                          Loading
                                          <Span className="dot dot-1 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-2 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-3 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-4 text-indigo-800 size-4">.</Span>
                                        </Span>
                                      ) : (
                                        child.title
                                      )}
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
                        <RightResizer onPointerDown={onResizeStart("right")} />
                        <TopResizer onPointerDown={onResizeStart("top")} />
                        <BottomResizer onPointerDown={onResizeStart("bottom")} />
                      </Div>
                      <DropdownMenuArrow />
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // EXPANDED MODE
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className={twMerge(
                        "peer/menu-button overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50",
                        "hover:bg-white hover:bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] hover:bg-size-[5px_5px] mask-size-[50%] hover:animate-[rotatedGrid_6s_linear_infinite]",
                        "hover:no-underline cursor-pointer"
                      )}>
                        <Div className="flex w-full items-center gap-2 text-accent-foreground text-sm group">
                          {item.icon && <item.icon className="size-4 text-gray-500 group-hover:text-orange-400 group-hover:transform-3d group-hover:transition group-hover:duration-200" />}
                          <Span className={twMerge(
                            "text-gray-700 group-hover:text-gray-800 group-hover:transform-3d group-hover:transition group-hover:duration-200"
                          )}>
                            {item.title}
                          </Span>
                        </Div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Div className="tree-root pl-4">
                          <motion.ul
                            className="tree-root tree-list pl-4"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                              collapsed: {},
                            }}
                          >
                            {item.group?.map((child) => {
                              const ItemIcon = child.icon;
                              const isActive = pathname === child.url
                              return (
                                <motion.li
                                  key={child.title}
                                  className="tree-item"
                                  variants={{ open: { opacity: 1, y: 0 }, collapsed: { opacity: 0, y: -10 } }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <Link
                                    href={child.url}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()

                                      if (isActive) return
                                      setLoading(child.url)
                                      setTimeout(() => {
                                        router.push(child.url!)
                                      }, 1000)
                                    }}
                                    className={twMerge(
                                      "tree-link flex justify-items-start items-center gap-2 rounded-md p-1 pl-4 text-left text-sm cursor-pointer",
                                      "hover:bg-white hover:bg-[linear-gradient(90deg,#80808020_1px,transparent_1px),linear-gradient(180deg,#80808020_1px,transparent_1px)] hover:bg-size-[5px_5px] mask-size-[50%] hover:animate-[rotatedGrid_6s_linear_infinite]",
                                      isActive
                                      ? "text-indigo-600 font-semibold"
                                      : "text-gray-600",
                                      "bg-white"
                                    )}
                                  >
                                    {ItemIcon && <ItemIcon className="size-4 text-gray-500" />}
                                    <Span className="hover:text-gray-800 font-medium">
                                      {loading === child.url ? (
                                        <Span className={twMerge(
                                          "cell-loader-text",
                                          "text-neutral-100"
                                        )}>
                                          Loading
                                          <Span className="dot dot-1 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-2 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-3 text-indigo-800 size-4">.</Span>
                                          <Span className="dot dot-4 text-indigo-800 size-4">.</Span>
                                        </Span>
                                      ) : (
                                        child.title
                                      )}
                                    </Span>
                                  </Link>
                                </motion.li>
                              )
                            })}
                          </motion.ul>
                        </Div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
