import { Smile, Send } from "lucide-react";

type Props = {
  className?: string;
};

export default function MessageInputBox({ className }: Props) {
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
        />
        <button className="text-muted-foreground hover:text-primary transition">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
