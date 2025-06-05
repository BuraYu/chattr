import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChannelState {
  currentChannel: string;
}

const initialState: ChannelState = {
  currentChannel: "general",
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;
