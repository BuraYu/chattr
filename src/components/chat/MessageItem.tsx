type Props = {
  name: string;
  text: string;
  time: string;
  avatarUrl?: string;
};

export default function MessageItem({ name, text, time, avatarUrl }: Props) {
  return (
    <div className="flex gap-3 items-start py-2">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <div className="text-sm font-semibold">
          {name}{" "}
          <span className="text-xs text-muted-foreground ml-1">{time}</span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
