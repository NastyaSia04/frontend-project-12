import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload
    },
    closeModal: (state) => {
      state.modal = null
    },
  },
})

export const { openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
