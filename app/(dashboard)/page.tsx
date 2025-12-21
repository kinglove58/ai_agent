import React from "react";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "../modules/auth/ui/view/Home";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
