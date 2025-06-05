import { mockChannels } from "@/data/channels";
import ChannelList from "./ChannelList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

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

      <ScrollArea className="flex-1 pr-1">
        <ChannelList channels={mockChannels} />
      </ScrollArea>

      <div className="mt-4 text-xs text-muted-foreground">User info</div>
    </aside>
  );
}
