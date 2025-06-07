import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Channel {
  name: string;
  unread?: boolean;
  unreadCount?: number;
}

interface ChannelState {
  currentChannel: string;
  channels: Channel[];
}

const initialState: ChannelState = {
  currentChannel: "general",
  channels: [
    { name: "general", unread: true, unreadCount: 2 },
    { name: "dev-chat" },
    { name: "design", unread: true, unreadCount: 2 },
    { name: "random" },
    { name: "product" },
    { name: "sales" },
  ],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannel = action.payload;
    },
    addChannel: (state, action: PayloadAction<{ name: string }>) => {
      state.channels.push({
        name: action.payload.name,
        unread: false,
        unreadCount: undefined,
      });
    },
  },
});

export const selectChannels = (state: RootState) => state.channel.channels;
export const { setCurrentChannel, addChannel } = channelSlice.actions;
export default channelSlice.reducer;
