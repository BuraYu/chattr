export type Channel = {
  name: string;
  unread?: boolean;
  unreadCount?: number;
};

export const mockChannels: Channel[] = [
  { name: "general", unread: true, unreadCount: 3 },
  { name: "dev-chat" },
  { name: "design", unread: true, unreadCount: 7 },
  { name: "random" },
  { name: "product" },
  { name: "sales", unread: true, unreadCount: 1 },
];
