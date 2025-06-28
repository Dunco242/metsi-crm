import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskviewSwitcher } from "@/features/tasks/components/task-view-switcher";

const TaskPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");
    return (
    <div className="h-full flex flex-col">
        <TaskviewSwitcher />;
    </div>
    );
};

export default TaskPage;
