import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './entities/channelsSlice'
import messagesReducer from './entities/messagesSlice'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  }
})

export default store //НА УДАЛЕНИЕ