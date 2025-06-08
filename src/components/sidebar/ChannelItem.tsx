import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setCurrentChannel } from "@/store/slices/channelSlice";
import { cn } from "@/lib/utils";
import { Hash } from "lucide-react";

type Props = {
  channel: {
    name: string;
    unread?: boolean;
    unreadCount?: number;
  };
};

export default function ChannelItem({ channel }: Props) {
  const dispatch = useDispatch();
  const currentChannel = useSelector(
    (state: RootState) => state.channel.currentChannel
  );

  const isActive = currentChannel === channel.name;

  return (
    <button
      onClick={() => dispatch(setCurrentChannel(channel.name))}
      className={cn(
        "flex items-center justify-between px-2 py-1.5 rounded-md text-sm w-full text-left hover:bg-accent transition",
        isActive
          ? "bg-accent font-semibold text-primary"
          : "text-muted-foreground"
      )}
    >
      <div className="flex items-center gap-2">
        <Hash className="w-4 h-4 shrink-0" />
        {channel.name}
      </div>

      {channel.unreadCount && (
        <span className="ml-auto text-xs bg-primary text-white rounded-full px-2 py-0.5">
          {channel.unreadCount}
        </span>
      )}
    </button>
  );
}
