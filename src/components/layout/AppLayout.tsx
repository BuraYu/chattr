import type { ReactNode } from "react";

type AppLayoutProps = {
  children?: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side */}
      <aside className="w-[280px] border-r border-muted bg-background hidden md:block">
        <p>This is the Sidebar</p>
      </aside>

      {/* right side */}
      <main className="flex-1 bg-muted/40">
        <p>This is the Chat area</p>
      </main>
    </div>
  );
}
