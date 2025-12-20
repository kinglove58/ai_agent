import { auth } from "@/app/lib/auth";
import SignInView from "@/app/modules/auth/ui/view/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) {
    redirect("/meetings");
  }
  return <SignInView />;
};

export default page;
