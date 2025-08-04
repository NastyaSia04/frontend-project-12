import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthHeaders } from '../../api/headers'
import { BASE_URL } from '../../config'

const initialState = {
  list: [], // здесь список каналов
  currentChannelId: null, // пригодится позже
  loading: false,
  error: null,
}

// Добавление канала
export const addChannelAsync = createAsyncThunk(
  'channels/addChannelAsync',
  async (channelName, thunkAPI) => {
    const payload = { name: channelName }
    const response = await axios.post(`${BASE_URL}/channels`, payload, getAuthHeaders())
    return response.data
  }
)

// Удаление канала
export const removeChannelAsync = createAsyncThunk(
  'channels/removeChannelAsync',
  async (channelId) => {
    await axios.delete(`${BASE_URL}/channels/${channelId}`, getAuthHeaders())
    return channelId // Возвращаем id, чтобы удалить в state
  }
)

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
    addChannel: (state, action) => {
      state.list.push(action.payload)
    },
    removeChannel: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload)
      // Если удаляем текущий канал — переключаемся на general
      if (state.currentChannelId === action.payload) {
        const general = state.list.find(c => c.name === 'general')
        state.currentChannelId = general ? general.id : (state.list[0]?.id || null)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        state.currentChannelId = action.payload.id
      })
      .addCase(addChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // удаление
      .addCase(removeChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        state.list = state.list.filter(c => c.id !== action.payload)
        if (state.currentChannelId === action.payload) {
          const general = state.list.find(c => c.name === 'general')
          state.currentChannelId = general ? general.id : (state.list[0]?.id || null)
        }
      })
      .addCase(removeChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {
  setChannels,
  setCurrentChannelId,
  addChannel,
  removeChannel,
} = channelsSlice.actions

export default channelsSlice.reducer
