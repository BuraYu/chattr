import { useSelector } from "react-redux";
import mockMessages from "@/data/messages";
import type { RootState } from "@/store/store";
import MessageItem from "./MessageItem";

type Props = {
  className?: string;
};

export default function MessageList({ className }: Props) {
  const currentChannel = useSelector(
    (state: RootState) => state.channel.currentChannel
  );

  const channelMessages = mockMessages[currentChannel] || [];

  return (
    <div className={className}>
      {channelMessages.map((msg, i) => (
        <MessageItem key={i} {...msg} />
      ))}
    </div>
  );
}
