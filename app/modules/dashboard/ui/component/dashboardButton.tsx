import { authClient } from "@/app/lib/auth-client";
import GenerateAvatar from "@/components/generateImage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/sign-in") },
    });
  };

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
        <div className="flex flex-col text-left flex-1 min-w-0 overflow-hidden gap-0.5 mr-2 ml-1">
          <p className="truncate w-full text-sm">{data.user.name}</p>
          <p className="truncate w-full text-sm">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-medium truncate">{data.user.name}</span>
            <span className="text-sm text-muted-foreground font-normal truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex justify-between items-center">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>{" "}
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex justify-between items-center"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardButton;
