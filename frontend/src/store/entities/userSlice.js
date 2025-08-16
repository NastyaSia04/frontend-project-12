import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
}

export const selectUsername = state => state.user.username

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload
    },
    clearUser(state) {
      state.username = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
