"use client";
import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import AgentIdViewHeader from "./AgentIdViewHeader";
import GenerateAvatar from "@/components/generateImage";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/UseConfirm";
import { useState } from "react";
import { UpdateAgentsDialog } from "@/app/modules/dashboard/ui/component/UpdateAgentsDialogu";

interface Props {
  agentId: string;
}
const AgentIdView = ({ agentId }: Props) => {
  const [updateAgentDialogue, setUpdateAgentDialogue] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const queryClient = useQueryClient();

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );

        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meeting`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentsDialog
        open={updateAgentDialogue}
        onOpenChange={setUpdateAgentDialogue}
        initialValues={data}
      />
      <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogue(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex flex-col col-span-5 gap-y-5 py-5 px-4">
            <div className="flex flex-col gap-x-3">
              <div className="flex px-2 gap-x-4 items-center mb-4">
                <GenerateAvatar
                  variant="botttsNeutral"
                  seed={data.name}
                  className="size-10"
                />
                <h2 className="text-2xl font-medium">{data.name}</h2>
              </div>
              <Badge
                variant="outline"
                className="[&>svg]:size-4 gap-x-2 flex items-center"
              >
                <VideoIcon className="text-blue-700" /> {data.meetingCount}{" "}
                {data.meetingCount === 1 ? "Meeting" : "Meetings"}
              </Badge>
              <div className="flex flex-col gap-y-4">
                <p className="text-lg font-medium">Instructions:</p>
                <p className="text-neutral-800">{data.instruction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentIdView;

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  );
};

export const AgentIdsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="There was an error loading the agents. Please try again later."
    />
  );
};
