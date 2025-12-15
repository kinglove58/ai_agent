import { GenerateAvatarUri } from "@/app/lib/avatar";
import { useTRPC } from "@/app/trpc/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import Highlighter from "react-highlight-words";

interface props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-5 w-full border">
      <p className="text-sm font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="search transcript"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-7 h-9 w-60"
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filteredData.length === 0 ? (
            <p className="p-1">No results found</p>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar className="size-6">
                    <AvatarImage
                      src={
                        item.speaker.image ??
                        GenerateAvatarUri({
                          seed: item.speaker.name,
                          variant: "initials",
                        })
                      }
                      alt="user avatar"
                    />
                  </Avatar>
                  <p className="text-sm font-medium">{item.speaker.name}</p>
                  <p className="text-sm font-medium text-blue-500">
                    {" "}
                    {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                  </p>
                </div>
                <Highlighter
                  className="text-sm text-neutral-700"
                  highlightClassName="bg-yellow-200"
                  searchWords={[searchQuery]}
                  textToHighlight={item.text}
                  autoEscape={true}
                />
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
