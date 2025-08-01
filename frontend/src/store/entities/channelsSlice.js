import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [], // здесь список каналов
  currentChannelId: null, // пригодится позже
  loading: false,
  error: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState, 
  reducers: {
    setChannels: (state, action) => {
      state.list = action.payload
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setChannels,
  setCurrentChannelId,
  setLoading,
  setError, 
} = channelsSlice.actions

export default channelsSlice.reducer