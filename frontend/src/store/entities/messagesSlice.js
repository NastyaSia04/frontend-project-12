import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { getAuthHeaders } from '../../api/headers'
import { BASE_URL } from '../../config'

const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Селекторы 
export const selectMessages = (state) => state.messages.list;
export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesError = (state) => state.messages.error;
export const selectMessagesByChannelId = createSelector(
  [selectMessages, (state, channelId) => channelId],
  (messages, channelId) => messages.filter(m => m.channelId === channelId)
);

// Thunk'и
export const fetchMessagesAsync = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/messages`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessageAsync = createAsyncThunk(
  'messages/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/messages`,
        messageData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Добавлен новый thunk для удаления сообщений канала
export const removeChannelMessagesAsync = createAsyncThunk(
  'messages/removeChannelMessages',
  async (channelId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/messages/channel/${channelId}`,
        getAuthHeaders()
      );
      return channelId; // Возвращаем ID канала для обработки в редюсере
    } catch (error) {
      console.error('Error deleting channel messages:', error);
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.list.push(action.payload);
    },
    // Добавлен редьюсер для удаления сообщений канала
    removeChannelMessages: (state, action) => {
      state.list = state.list.filter(m => m.channelId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMessagesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeChannelMessagesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeChannelMessagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(m => m.channelId !== action.payload);
      })
      .addCase(removeChannelMessagesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  addMessage,
  removeChannelMessages 
} = messagesSlice.actions;

export default messagesSlice.reducer;
