import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './entities/channelsSlice'
import messagesReducer from './entities/messagesSlice'
import userReducer from './entities/userSlice'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  }
})

export default store
