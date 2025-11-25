import { authClient } from "@/app/lib/auth-client";
import { LoaderIcon } from "lucide-react";
import { CallConnect } from "./CallConnect";
import { GenerateAvatarUri } from "@/app/lib/avatar";

interface props {
  meetingId: string;
  meetingName: string;
}
export const CallProvide = ({ meetingId, meetingName }: props) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return (
      <div className="flex items-center h-screen justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="text-white animate-spin size-6" />
      </div>
    );
  }
  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name} 
      userImage={
        data.user.image ??
        GenerateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};
