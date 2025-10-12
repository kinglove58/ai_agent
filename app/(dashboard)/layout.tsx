import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main className="flex flex-col h-screen w-sreen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
