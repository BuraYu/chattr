type MessageListProps = {
  className?: string;
};

export default function MessageList({ className }: MessageListProps) {
  return (
    <div className={className}>
      <h1>Message List</h1>
    </div>
  );
}
