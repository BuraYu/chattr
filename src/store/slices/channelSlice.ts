import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
  currentChannelId: string;
  channels: Channel[];
  idToNameMap: Record<string, string>;
  nameToIdMap: Record<string, string>;
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
  currentChannelId: "",
  channels: [],
  idToNameMap: {},
  nameToIdMap: {},
  loading: false,
  error: undefined,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setCurrentChannelId: (state, action: PayloadAction<string>) => {
      state.currentChannelId = action.payload;
    },
    setCurrentChannelByName: (state, action: PayloadAction<string>) => {
      const id = state.nameToIdMap[action.payload];
      if (id) state.currentChannelId = id;
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

        state.idToNameMap = {};
        state.nameToIdMap = {};
        for (const ch of action.payload) {
          state.idToNameMap[ch.id] = ch.name;
          state.nameToIdMap[ch.name] = ch.id;
        }

        if (!state.currentChannelId && state.nameToIdMap["general"]) {
          state.currentChannelId = state.nameToIdMap["general"];
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addChannelToDB.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addChannelToDB.fulfilled, (state, action) => {
        const newChannel = action.payload;
        state.channels.push(newChannel);
        state.idToNameMap[newChannel.id] = newChannel.name;
        state.nameToIdMap[newChannel.name] = newChannel.id;
      })
      .addCase(addChannelToDB.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectChannels = (state: RootState) => state.channel.channels;
export const selectCurrentChannelId = (state: RootState) =>
  state.channel.currentChannelId;
export const selectCurrentChannelName = (state: RootState) =>
  state.channel.idToNameMap[state.channel.currentChannelId];

export const selectChannelIdByName = (name: string) => (state: RootState) =>
  state.channel.nameToIdMap[name];

export const selectChannelNameById = (id: string) => (state: RootState) =>
  state.channel.idToNameMap[id];

export const { setCurrentChannelId, setCurrentChannelByName } =
  channelSlice.actions;

export default channelSlice.reducer;
