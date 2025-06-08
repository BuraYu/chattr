import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Channel {
  id: string; 
  name: string;
  unread?: boolean;
  unreadCount?: number;
}

interface ChannelState {
  currentChannel: string;
  channels: Channel[];
  loading: boolean;
  error?: string;
}

export const fetchChannels = createAsyncThunk<Channel[]>(
  "channel/fetchChannels",
  async () => {
    const { data, error } = await supabase.from("channels").select("*");

    if (error) throw new Error(error.message);
    return (data as Channel[]) ?? [];
  }
);

export const addChannelToDB = createAsyncThunk<Channel, { name: string }>(
  "channel/addChannelToDB",
  async ({ name }) => {
    const { data, error } = await supabase
      .from("channels")
      .insert({ name })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Channel;
  }
);

const initialState: ChannelState = {
  currentChannel: "general",
  channels: [],
  loading: false,
  error: undefined,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addChannelToDB.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addChannelToDB.fulfilled, (state, action) => {
        state.channels.push(action.payload);
      })
      .addCase(addChannelToDB.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectChannels = (state: RootState) => state.channel.channels;
export const selectCurrentChannel = (state: RootState) =>
  state.channel.currentChannel;
export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;
