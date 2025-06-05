"use client";

import ChannelItem from "./ChannelItem";

type Channel = {
  name: string;
  unread?: boolean;
  unreadCount?: number;
};

type Props = {
  channels: Channel[];
};

export default function ChannelList({ channels }: Props) {
  return (
    <div className="space-y-1">
      {channels.map((channel) => (
        <ChannelItem key={channel.name} channel={channel} />
      ))}
    </div>
  );
}
