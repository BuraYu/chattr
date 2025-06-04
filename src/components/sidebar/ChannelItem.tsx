import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  unread?: boolean;
  unreadCount?: number;
  onClick?: () => void;
};

export default function ChannelItem({
  name,
  unread,
  unreadCount,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-2 py-1.5 rounded-md text-sm w-full text-left hover:bg-accent transition",
        "focus-visible:outline-none",
        unread && "font-semibold text-primary"
      )}
    >
      <span className="flex items-center gap-2">
        <Hash className="w-4 h-4 shrink-0" />
        {name}
      </span>

      {unreadCount && (
        <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5 min-w-[20px] text-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
