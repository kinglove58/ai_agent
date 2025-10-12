"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/app/modules/dashboard/ui/component/dashboard-sidebar";

const HomePage = () => {
  const { data: session } = authClient.useSession();
  const routers = useRouter();
  return (
    <div>
      <DashboardSidebar />
      page
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: { onSuccess: () => routers.push("/sign-in") },
          });
        }}
      >
        sign out
      </Button>
    </div>
  );
};

export default HomePage;
