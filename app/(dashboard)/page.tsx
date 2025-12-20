import React from "react";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LandingPage from "../page";



const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <LandingPage/>
    </div>
  );
};

export default page;
