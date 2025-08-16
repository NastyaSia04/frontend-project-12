import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './entities/channelsSlice'
import messagesReducer from './entities/messagesSlice'
import userReducer from './entities/userSlice'
import uiReducer from './entities/uiSlice'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
    ui: uiReducer,
  },
})

export default store
