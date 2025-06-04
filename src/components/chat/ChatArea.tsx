import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInputBox from "./MessageInputBox";

export default function ChatArea() {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <MessageList className="flex-1 overflow-y-auto px-4 py-2" />
      <MessageInputBox className="border-t px-4 py-2" />
    </div>
  );
}
