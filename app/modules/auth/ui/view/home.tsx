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
      hello
    </div>
  );
};

export default HomePage;
