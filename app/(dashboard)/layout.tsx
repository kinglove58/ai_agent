import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardNavbar from "../modules/dashboard/ui/component/dashboardNavbar";
import { DashboardSidebar } from "../modules/dashboard/ui/component/dashboard-sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
