export type Channel = {
  name: string;
  unread?: boolean;
  unreadCount?: number;
};

export const mockChannels: Channel[] = [
  { name: "general", unread: true, unreadCount: 2 },
  { name: "dev-chat" },
  { name: "design", unread: true, unreadCount: 2 },
  { name: "random" },
  { name: "product" },
  { name: "sales" },
];
