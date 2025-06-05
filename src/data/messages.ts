type Message = {
  id: string;
  name: string;
  avatarUrl?: string;
  text: string;
  time: string;
};

type ChannelMessages = {
  [channelName: string]: Message[];
};

const mockMessages: ChannelMessages = {
  general: [
    {
      id: "1",
      name: "Dieter",
      avatarUrl: "",
      text: "Hey team, morning!",
      time: "09:00",
    },
    {
      id: "2",
      name: "Ulf",
      avatarUrl: "",
      text: "Morning Ali!",
      time: "09:01",
    },
  ],
  "dev-chat": [
    {
      id: "1",
      name: "Canye",
      avatarUrl: "",
      text: "Anyone working on the build error?",
      time: "10:12",
    },
    {
      id: "2",
      name: "Lars",
      avatarUrl: "",
      text: "Yes, I'm debugging it now.",
      time: "10:14",
    },
    {
      id: "3",
      name: "Mia",
      avatarUrl: "",
      text: "Let me know if you need help.",
      time: "10:15",
    },
    {
      id: "4",
      name: "John",
      avatarUrl: "",
      text: "The server is down again.",
      time: "10:16",
    },
    {
      id: "5",
      name: "Sophia",
      avatarUrl: "",
      text: "I'm restarting it now.",
      time: "10:17",
    },
    {
      id: "6",
      name: "Ethan",
      avatarUrl: "",
      text: "Can someone review my PR?",
      time: "10:18",
    },
    {
      id: "7",
      name: "Olivia",
      avatarUrl: "",
      text: "I'll take a look in a few minutes.",
      time: "10:19",
    },
    {
      id: "8",
      name: "Noah",
      avatarUrl: "",
      text: "The deployment pipeline is fixed.",
      time: "10:20",
    },
    {
      id: "9",
      name: "Emma",
      avatarUrl: "",
      text: "Great! Thanks for fixing it.",
      time: "10:21",
    },
    {
      id: "10",
      name: "Liam",
      avatarUrl: "",
      text: "Does anyone have updates on the client meeting?",
      time: "10:22",
    },
  ],
  design: [
    {
      id: "1",
      name: "Wolfgang",
      avatarUrl: "",
      text: "I updated the Figma file!",
      time: "11:00",
    },
    {
      id: "2",
      name: "Gin",
      avatarUrl: "",
      text: "Thanks, looks great!",
      time: "11:02",
    },
  ],
  random: [
    {
      id: "1",
      name: "Preik",
      avatarUrl: "",
      text: "Fun fact: cats can't taste sweetness 🐱",
      time: "08:00",
    },
    {
      id: "2",
      name: "Tim",
      avatarUrl: "",
      text: "What? 😂",
      time: "08:02",
    },
  ],
};

export default mockMessages;
