import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";


interface UseGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatus | null;
    search?: string | null;
    assigneeId?: string | null;
    dueDate?: string | null;
};

export const UseGetTasks = ({
    workspaceId,
    projectId,
    status,
    search,
    assigneeId,
    dueDate
}: UseGetTasksProps) => {
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            projectId,
            status,
            search,
            assigneeId,
            dueDate
        ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
               query: {
                workspaceId,
                ...(projectId && { projectId }),
                ...(status && { status }),
                ...(assigneeId && { assigneeId }),
                ...(search && { search }),
                ...(dueDate && { dueDate }),
            },
        });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
