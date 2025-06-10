import { Hash, Ellipsis } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { selectCurrentChannelName } from "@/store/slices/channelSlice";

export default function ChatHeader() {
  const currentChannelName = useAppSelector(selectCurrentChannelName);
  
  return (
    <div className="flex justify-between border-b-2 p-4">
      <div className="flex items-center gap-1">
        <Hash className="w-4 h-4" />
        <h2 className="text-base leading-none font-bold">
          {currentChannelName || "Select a channel"}
        </h2>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-200 transition">
        <Ellipsis className="w-5 h-5" />
      </button>
    </div>
  );
}