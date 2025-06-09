import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error?: string;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: undefined,
};

// Fetch messages for a specific channel
export const fetchMessages = createAsyncThunk<Message[], string>(
  "messages/fetchMessages",
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

export const sendMessageToDB = createAsyncThunk<
  Message,
  { channel_id: string; user_id: string; content: string }
>("messages/sendMessageToDB", async ({ channel_id, user_id, content }) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({ channel_id, user_id, content })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Message;
});

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(sendMessageToDB.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessageToDB.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectMessagesLoading = (state: RootState) =>
  state.messages.loading;
export default messageSlice.reducer;
