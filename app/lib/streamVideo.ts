import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_VIDEO_SECRET_KEY;

if (!apiKey || !secret) {
  throw new Error(
    "Missing Stream API credentials. Please set NEXT_PUBLIC_STREAM_API_KEY and STREAM_VIDEO_SECRET_KEY environment variables."
  );
}

// Note: StreamClient expects (apiKey, secret) in that order
export const StreamVideo = new StreamClient(apiKey, secret);

// Log initialization for debugging (remove in production)
console.log(
  "[Stream] Initialized with API Key:",
  apiKey.substring(0, 5) + "..."
);
