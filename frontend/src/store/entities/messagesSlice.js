import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false,
  error: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.list = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    addMessage: (state, action) => {
      state.list.push(action.payload)
    },
  },
})

export const {
  setMessages,
  setLoading,
  setError,
  addMessage,
} = messagesSlice.actions

export default messagesSlice.reducer
