import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import React from "react"
import ProductIcon from "@/app/components/ui/icons/icon";
import { TableIcon } from "@/app/components/ui/icons/appIcon";
// sidebar url
export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    dashboard: {
      title: "Supplier Management",
      url: "/admin/dashboard",
      icon: ProductIcon as React.ComponentType<{ className?: string }>,
    },
    home: {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard
    },
    navMain: [
      {
        title: "Products",
        url: "#",
        icon: IconFolder,
        group: [
          {
            icon: TableIcon,
            title: "Category",
            url: "/admin/product/categories",
          },
          {
            icon: TableIcon,
            title: "Sub Category",
            url: "/admin/product/sub-categories",
          },
          {
            icon: TableIcon,
            title: "Brand",
            url: "/admin/product/brand",
          },
          {
            icon: TableIcon,
            title: "Model",
            url: "/admin/product/model",
          },
          {
            icon: TableIcon,
            title: "Group",
            url: "/admin/product/group",
          },
          {
            icon: TableIcon,
            title: "Color Varient",
            url: "/admin/product/color-varient",
          },
          {
            icon: TableIcon,
            title: "Product",
            url: "/admin/product/product",
          }
        ]
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
        group: [
          {
            icon: TableIcon,
            title: "Details",
            url: "#",
          }
        ]
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
    ],
    documents: [
      {
        title: "Auth",
        url: "#",
        icon: IconFolder,
        group: [
          {
            icon: TableIcon,
            title: "User",
            url: "/admin/auth/users",
          },
          {
            icon: TableIcon,
            title: "Role",
            url: "/admin/role/create",
          },
        ]
      },
      {
        title: "Forntend",
        url: "#",
        icon: IconFolder,
        group: [
          {
            icon: TableIcon,
            title: "Post",
            url: "/admin/post/post-create",
          },
        ]
      },
    ],
}