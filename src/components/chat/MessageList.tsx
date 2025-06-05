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
      {channelMessages.length > 0 ? (
        channelMessages.map((msg, i) => <MessageItem key={i} {...msg} />)
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Start the conversation by sending a message!
          </p>
        </div>
      )}
    </div>
  );
}
