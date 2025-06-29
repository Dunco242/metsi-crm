"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import ModeToggle from "./mode-toggle";

const pathnameMap = {
    "tasks": {
        title: "My tasks",
        description: "View all of your tasks here",
    },
    "projects": {
        title: "My Project",
        description: "View tasks of your project here"
    },
};

const defaultMap = {
    title: "Home",
    description: "Monitor all of your projects and tasks here"
};

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="bg-card text-card-foreground border-b border-border px-6 py-4 flex items-center justify-between transition-colors duration-300">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <ModeToggle />
                <UserButton />
            </div>
        </nav>
    );
};
