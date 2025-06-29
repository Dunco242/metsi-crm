import Link from "next/link";
import Image from "next/image";

import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full w-full p-4 bg-muted dark:bg-purple-950 text-foreground transition-colors duration-300">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={164}
          height={48}
          className="dark:brightness-90"
        />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
