import { useTRPC } from "@/app/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { MeetingsInsertSchema } from "@/app/modules/meetings/Schemas";
import { CommandSelect } from "./CommandSelect";
import GenerateAvatar from "./generateImage";
import { Input } from "./ui/input";
import { NewAgentsDialogu } from "@/app/modules/dashboard/ui/component/NewAgentsDialogu";
import { MeetingsGetOne } from "@/app/modules/meetings/types";

interface MeetingsFormProps {
  onSuccess: (id?: string) => void;
  onCancel: () => void;
  initialValues?: MeetingsGetOne;
}

const MeetingsForm = () => {
  return <div>MeetingsForm</div>;
};

export default MeetingsForm;

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [agentSearch, setAgentSearch] = useState("");
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(
          error.message || "There was an error creating the Meeting."
        );
        // TODO: check if error code is forbidden and redirect to /upgrade
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        // Invalidate the single meeting detail page cache
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        //TODO: invalidate free tier

        onSuccess();
      },
      onError: (error) => {
        toast.error(
          error.message || "There was an error updating the meeting."
        );
        // TODO: check if error code is forbidden and redirect to /upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof MeetingsInsertSchema>>({
    resolver: zodResolver(MeetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof MeetingsInsertSchema>) => {
    if (isEdit && initialValues) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentsDialogu
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. civil engineer consultant"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>AgentId</FormLabel>

                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GenerateAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    placeholder="select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                onClick={() => onCancel()}
                type="button"
              >
                cancel
              </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
