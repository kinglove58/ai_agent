"use client";

import { useTRPC } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const HomePage = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "jesus" }));
  return <div className="flex flex-col gap-y-4 p-4">{data?.greeting}</div>;
};

export default HomePage;
