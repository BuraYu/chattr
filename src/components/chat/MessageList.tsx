import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchMessagesByChannel,
  selectMessagesByChannel,
} from "@/store/slices/messageSlice";
import {
  selectCurrentChannelId,
  selectCurrentChannelName,
} from "@/store/slices/channelSlice";
import MessageItem from "./MessageItem";

type Props = {
  className?: string;
};

export default function MessageList({ className }: Props) {
  const dispatch = useAppDispatch();
  const currentChannelId = useAppSelector(selectCurrentChannelId);
  const currentChannelName = useAppSelector(selectCurrentChannelName);
  const messages = useAppSelector(selectMessagesByChannel(currentChannelId));

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessagesByChannel(currentChannelId));
    }
  }, [currentChannelId, dispatch]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            name={msg.user_id || "Unknown"}
            text={msg.content}
            time={new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        ))
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
