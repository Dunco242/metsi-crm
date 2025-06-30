import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();


    const mutation = useMutation<
        ResponseType,
        Error

   >({
    mutationFn: async () => {
        const response = await client.api.auth.logout["$post"]();

        if(!response.ok) {
            throw new Error("Failed to log out");
        }

        return await response.json();
    },
    onSuccess: () => {
        router.refresh();
        toast.success("Logged out")
        queryClient.invalidateQueries();
    },
    onError: () => {
        toast.error("Failed to log out");
    }
   });

   return mutation;

};
