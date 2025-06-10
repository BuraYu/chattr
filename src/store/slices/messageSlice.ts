import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import type { RootState } from "../store";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type Message = {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

type NewMessagePayload = {
  channel_id: string;
  user_id?: string;
  content: string;
};

interface MessagesState {
  messagesByChannel: {
    [channelId: string]: Message[];
  };
  loading: boolean;
  error?: string;
}

const initialState: MessagesState = {
  messagesByChannel: {},
  loading: false,
};

export const fetchMessagesByChannel = createAsyncThunk<Message[], string>(
  "messages/fetchByChannel",
  async (channelId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data as Message[];
  }
);

export const sendMessageToDB = createAsyncThunk<Message, NewMessagePayload>(
  "messages/sendMessageToDB",
  async ({ channel_id, user_id, content }) => {
    const { data, error } = await supabase
      .from("messages")
      .insert({ channel_id, user_id, content })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Message;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (
      state,
      action: { payload: { channel: string; message: Message } }
    ) => {
      const { channel, message } = action.payload;
      if (!state.messagesByChannel[channel]) {
        state.messagesByChannel[channel] = [];
      }
      state.messagesByChannel[channel].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChannel.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMessagesByChannel.fulfilled, (state, action) => {
        const messages = action.payload;
        if (messages.length > 0) {
          state.messagesByChannel[messages[0].channel_id] = messages;
        }
        state.loading = false;
      })
      .addCase(fetchMessagesByChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessageToDB.fulfilled, (state, action) => {
        const msg = action.payload;
        const ch = msg.channel_id;
        if (!state.messagesByChannel[ch]) {
          state.messagesByChannel[ch] = [];
        }
        state.messagesByChannel[ch].push(msg);
      });
  },
});

export const { sendMessage } = messageSlice.actions;
export const selectMessagesByChannel =
  (channel: string) => (state: RootState) =>
    state.messages.messagesByChannel[channel] || [];

export default messageSlice.reducer;
