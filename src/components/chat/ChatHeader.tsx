import { Hash, Ellipsis } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex justify-between border-b-2 p-4">
      <div className="flex items-center gap-1">
        <Hash className="w-4 h-4" />
        <h2 className="text-base leading-none font-bold">general</h2>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-200 transition">
        <Ellipsis w-5 h-5 />
      </button>
    </div>
  );
}
