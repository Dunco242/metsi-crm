import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";
import { parse } from "path";

export const useEditTaskModal = () => {
    const [taskId, setTaskId] = useQueryState(
        "edit-task",
        parseAsString
    );

    const open = (id: string) => setTaskId(id);
    const close = () => setTaskId(null);

    return {
        taskId,
        open,
        close,
        setTaskId,
    };
};
