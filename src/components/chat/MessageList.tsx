import MessageItem from "./MessageItem";

const mockMessages = [
  { name: "Alice", text: "Good morning!", time: "08:45", avatarUrl: "" },
  { name: "Bob", text: "Did you finish the report?", time: "08:50" },
  {
    name: "Charlie",
    text: "I'll check it now.",
    time: "08:55",
    avatarUrl: "",
  },
  { name: "Diana", text: "Let's meet at 10.", time: "09:00" },
  { name: "Eve", text: "Sounds good!", time: "09:05", avatarUrl: "" },
  {
    name: "Frank",
    text: "See you then.",
    time: "09:10",
    avatarUrl: "",
  },
  { name: "Grace", text: "Don't forget the slides.", time: "09:15" },
  { name: "Hank", text: "Got it, thanks!", time: "09:20", avatarUrl: "" },
];

type Props = {
  className?: string;
};

export default function MessageList({ className }: Props) {
  return (
    <div className={className}>
      {mockMessages.map((msg, i) => (
        <MessageItem key={i} {...msg} />
      ))}
    </div>
  );
}
