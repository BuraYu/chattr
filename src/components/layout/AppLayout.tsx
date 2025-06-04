import type { ReactNode } from "react";
import SidebarNav from "../sidebar/SidebarNav";
import ChatArea from "../chat/ChatArea";

type AppLayoutProps = {
  children?: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side */}
      <aside className="w-[280px] border-r border-muted bg-background hidden md:block">
        <SidebarNav />
      </aside>

      {/* right side */}
      <main className="flex-1 bg-muted/40">
        <ChatArea />
      </main>
    </div>
  );
}
