import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UseGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { UseGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
    onCancel: () => void;
    id: string;
};

export const EditTaskFormWrapper = ({
    onCancel,
    id,
}: EditTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const { data: initialValues, isLoading: isLoadingTask } = UseGetTask({
        taskId: id,
    })


  const { data: projects, isLoading: isLoadingProjects } = UseGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
  }));

  const isLoading = isLoadingMembers || isLoadingMembers || isLoadingTask || isLoadingProjects;

  if (isLoading) {
    return (
        <Card className="w-full h-[714px] border-none shadow-none">
            <CardContent className="flex items-center justify-center h-full">
                <Loader className="size-5 animate-spin text-muted-foreground"/>
            </CardContent>
        </Card>
    )
  }

  if (!initialValues) {
    return null;
  }

  return (
    <EditTaskForm
       onCancel={onCancel}
       projectOptions={projectOptions ?? []}
       memberOptions={memberOptions ?? []}
       initialValues={initialValues}
    />
  );
};
