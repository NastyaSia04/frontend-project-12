import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthHeaders } from '../../api/headers'
import { BASE_URL } from '../../config'
import { removeChannelMessagesAsync } from './messagesSlice'

const initialState = {
  list: [],
  currentChannelId: null,
  loading: false,
  error: null,
}

// Селекторы
export const selectChannels = state => state.channels.list
export const selectCurrentChannelId = state => state.channels.currentChannelId
export const selectCurrentChannel = createSelector(
  [selectChannels, state => state.channels.currentChannelId],
  (channels, currentId) => channels.find(c => c.id === currentId),
)
export const selectChannelsLoading = state => state.channels.loading
export const selectChannelsError = state => state.channels.error

// THUNK: получение каналов
export const fetchChannelsAsync = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/channels`,
        getAuthHeaders(),
      )
      return response.data
    }
    catch (error) {
      console.error('Error fetching channels:', error)
      return rejectWithValue(error.message)
    }
  },
)

// THUNK: добавление канала
export const addChannelAsync = createAsyncThunk(
  'channels/addChannelAsync',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/channels`,
        { name },
        getAuthHeaders(),
      )
      console.log('Добавленный канал из API:', response.data)
      return response.data
    }
    catch (error) {
      console.error('Error adding channel:', error)
      return rejectWithValue(error.message)
    }
  },
)

// THUNK: переименование канала
export const renameChannelAsync = createAsyncThunk(
  'channels/renameChannelAsync',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/channels/${id}`,
        { name },
        getAuthHeaders(),
      )
      return response.data
    }
    catch (error) {
      console.error('Error renaming channel:', error)
      return rejectWithValue(error.message)
    }
  },
)

// THUNK: удаление канала
export const removeChannelAsync = createAsyncThunk(
  'channels/removeChannelAsync',
  async (channelId, { rejectWithValue }) => {
    try {
      await removeChannelMessagesAsync(channelId)
      await axios.delete(
        `${BASE_URL}/channels/${channelId}`,
        getAuthHeaders(),
      )
      return channelId
    }
    catch (error) {
      console.error('Error removing channel:', error)
      return rejectWithValue(error.message)
    }
  },
)

const normalizeName = name =>
  typeof name === 'object' && name !== null ? name.name : name

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { id, name, removable } = action.payload
      const channelName = normalizeName(name)

      // Удаляем старый канал с таким же id перед добавлением
      state.list = state.list.filter(c => c.id !== id)
      state.list.push({ id, name: channelName, removable })
    },
    removeChannel: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload)
      if (state.currentChannelId === action.payload) {
        const general = state.list.find(c => c.name === 'general')
        state.currentChannelId = general ? general.id : (state.list[0]?.id || null)
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      const channel = state.list.find(c => c.id === id)
      if (channel) {
        channel.name = normalizeName(name)
      }
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH CHANNELS ===
      .addCase(fetchChannelsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChannelsAsync.fulfilled, (state, action) => {
        state.loading = false
        // Убираем дубликаты по id
        const uniqueChannels = []
        const seenIds = new Set()
        action.payload.forEach((c) => {
          if (!seenIds.has(c.id)) {
            uniqueChannels.push({ ...c, name: normalizeName(c.name) })
            seenIds.add(c.id)
          }
        })
        state.list = uniqueChannels

        if (!state.currentChannelId) {
          const general = state.list.find(c => c.name === 'general')
          state.currentChannelId = general?.id || null
        }
      })
      .addCase(fetchChannelsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // === ADD CHANNEL ===
      .addCase(addChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        const { id, name, removable } = action.payload
        const channelName = normalizeName(name)

        // Перед добавлением — убираем старый с таким же id
        state.list = state.list.filter(c => c.id !== id)
        state.list.push({ id, name: channelName, removable })
        state.currentChannelId = id
      })
      .addCase(addChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // === RENAME CHANNEL ===
      .addCase(renameChannelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(renameChannelAsync.fulfilled, (state, action) => {
        state.loading = false
        const { id, name } = action.payload
        const channel = state.list.find(c => c.id === id)
        if (channel) {
          channel.name = normalizeName(name)
        }
      })
      .addCase(renameChannelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // === REMOVE CHANNEL ===
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
        state.error = action.payload
      })
  },
})

export const {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} = channelsSlice.actions

export default channelsSlice.reducer
