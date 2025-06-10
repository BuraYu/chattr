import { Smile, Send } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectCurrentChannelId } from "@/store/slices/channelSlice";
import { sendMessageToDB } from "@/store/slices/messageSlice";

type Props = {
  className?: string;
};

export default function MessageInputBox({ className }: Props) {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const currentChannelId = useAppSelector(selectCurrentChannelId);

  const sendMessage = async () => {
    if (!input.trim() || !currentChannelId) return;
    // TODO FIX user id
    try {
      await dispatch(
        sendMessageToDB({
          channel_id: currentChannelId,
          // user_id: "test user",
          content: input,
        })
      ).unwrap();

      setInput("");
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 border rounded-md px-3 py-2">
        <button className="text-muted-foreground hover:text-primary transition">
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 outline-none bg-transparent text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="text-muted-foreground hover:text-primary transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
