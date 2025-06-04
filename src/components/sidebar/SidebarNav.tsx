"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = {
  name: string;
  unread?: boolean;
  unreadCount?: number;
};

const mockChannels: Channel[] = [
  { name: "general", unread: true, unreadCount: 3 },
  { name: "dev-chat" },
  { name: "design", unread: true, unreadCount: 7 },
  { name: "random" },
];

export default function SidebarNav() {
  return (
    <aside className="h-full w-[280px] border-r bg-muted/40 p-4 hidden md:flex flex-col">
      <div className="mb-4 font-semibold text-xl tracking-tight">Chattr</div>

      <div className="mb-2 flex items-center justify-between text-muted-foreground text-xs font-medium uppercase">
        <span>Channels</span>
        <button className="hover:text-primary transition">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {/* TODO remove outline button. Shadcn? */}
      <ScrollArea className="flex-1 pr-1">
        <div className="space-y-1">
          {mockChannels.map((channel) => (
            <button
              key={channel.name}
              className={cn(
                "flex items-center justify-between px-2 py-1.5 rounded-md text-sm w-full text-left hover:bg-accent transition",
                "focus-visible:outline-none",
                channel.unread && "font-semibold text-primary"
              )}
            >
              <span className="flex items-center gap-2">
                <Hash className="w-4 h-4 shrink-0" />
                {channel.name}
              </span>

              {channel.unreadCount && (
                <span className="ml-auto text-xs bg-gray-200 text-primary-foreground text-black rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {channel.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
      {/*TODO add user infor here logout button */}
      <div className="mt-4 text-xs text-muted-foreground">User info</div>
    </aside>
  );
}
