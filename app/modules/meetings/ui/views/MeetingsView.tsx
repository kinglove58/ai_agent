"use client";

import { useTRPC } from "@/app/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { json } from "stream/consumers";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <div className="overflow-x-scroll">page</div>;
};

export default MeetingsView;
