import Sidebar from "@/app/components/sibebar/sidebar";
import Main from "@/app/components/main/main"
import { SiteHeader } from "@/app/components/site-header"
import RouteChangeLoader from "@/app/components/route-change-loader/routeChangeLoader";
import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/ui/sidebar"
import NavBarProductWrapper from '@/app/components/page-navbar-url/navbarproduct-wrapper'

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--sidebar-width-icon": "40px", // mini sidebar
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar variant="inset" collapsible="icon" />

      <SidebarInset>
        <SiteHeader />
        <Main className="p-0 mt-10">
          <RouteChangeLoader />
          <NavBarProductWrapper />
          {children}
        </Main>
      </SidebarInset>
    </SidebarProvider>
  )
}
