"use client";

import { Smile, Send } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { sendMessage } from "@/store/slices/messageSlice";
import { selectCurrentChannel } from "@/store/slices/channelSlice";

type Props = {
  className?: string;
};

export default function MessageInputBox({ className }: Props) {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const currentChannel = useAppSelector(selectCurrentChannel);

  function handleSend() {
    if (!input.trim()) return;

    dispatch(
      sendMessage({
        channel: currentChannel,
        message: {
          id: crypto.randomUUID(),
          sender: "The User",
          content: input,
          timestamp: Date.now(),
        },
      })
    );

    setInput("");
  }

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
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="text-muted-foreground hover:text-primary transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
