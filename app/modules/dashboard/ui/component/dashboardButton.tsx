import { authClient } from "@/app/lib/auth-client";
import React from "react";

const DashboardButton = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }
  return <div>DashboardButton</div>;
};

export default DashboardButton;
