import { authClient } from "@/app/lib/auth-client";
import GenerateAvatar from "@/components/generateImage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

const DashboardButton = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} alt="user image" />
          </Avatar>
        ) : (
          <GenerateAvatar
            seed={data.user.name || "U"}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col items-left flex-1 min-w-0 overflow-hidden">
          <p>{data.user.name}</p>
          <p>{data.user.email}</p>
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default DashboardButton;
