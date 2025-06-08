import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchChannels } from "@/store/slices/channelSlice";
import ChannelItem from "./ChannelItem";

export default function ChannelList() {
  const dispatch = useAppDispatch();
  const { channels, loading, error } = useAppSelector((state) => state.channel);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-sm text-muted-foreground">Loading channels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {channels.length === 0 ? (
        <div className="text-sm text-muted-foreground p-2">
          No channels found. Create your first channel!
        </div>
      ) : (
        channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))
      )}
    </div>
  );
}
