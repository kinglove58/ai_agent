import React from "react";

import SignUpView from "@/app/modules/auth/ui/view/sign-up-view";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) {
    redirect("/meetings");
  }
  return <SignUpView />;
};

export default page;
