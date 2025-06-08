import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
};

interface MessagesState {
  messagesByChannel: {
    [channelName: string]: Message[];
  };
}

const initialState: MessagesState = {
  messagesByChannel: {
    general: [
      {
        id: crypto.randomUUID(),
        sender: "Alice",
        content: "Welcome to #general!",
        timestamp: Date.now(),
      },
    ],
  },
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (
      state,
      action: PayloadAction<{
        channel: string;
        message: Message;
      }>
    ) => {
      const { channel, message } = action.payload;
      if (!state.messagesByChannel[channel]) {
        state.messagesByChannel[channel] = [];
      }
      state.messagesByChannel[channel].push(message);
    },
  },
});

export const { sendMessage } = messageSlice.actions;
export const selectMessagesByChannel =
  (channel: string) => (state: RootState) =>
    state.messages.messagesByChannel[channel] || [];

export default messageSlice.reducer;
