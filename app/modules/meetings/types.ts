import { AppRouter } from "@/app/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type MeetingsGetOne =
  inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingsGetMany =
  inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export enum MeetingStatus {
  upcoming = "upcoming",
  completed = "completed",
  active = "active",
  processing = "processing",
}

export type StreamTranscriptItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};
