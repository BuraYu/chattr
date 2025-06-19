import { useState } from "react";

type Props = {
  name: string;
  text: string;
  time: string;
  avatarUrl?: string;
};

export default function MessageItem({ name, text, time, avatarUrl }: Props) {
  const handleEmojiClick = (emoji: string) => {
    console.log("Reacted with:", emoji);
  };

  return (
    <div className="flex items-start gap-3 py-2 group cursor-pointer">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex flex-col">
        <div className="text-sm font-semibold">
          {name}{" "}
          <span className="text-xs text-muted-foreground ml-1">{time}</span>
        </div>
        <div className="relative inline-block bg-white px-3 py-2 rounded-2xl max-w-[75vw]">
          <p className="text-sm">{text}</p>
          <div className="absolute -right-10 -bottom-2 hidden group-hover:flex">
            <button
              className="px-2 py-1 text-sm bg-white rounded-full hover:bg-gray-200 shadow "
              onClick={() => handleEmojiClick("❤️")}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
