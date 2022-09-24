import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
  name: 'category',
  initialState : {
    items : [],
    currentCategory : ''
  },
  reducers: {
    addCategory: (state,action) => {
      const {id} = action.payload
        state.currentCategory = id
      },
    addListCategory : (state,payload) => {
      state.items = [...payload.data]
    }
  },
})


export const { addCategory ,addListCategory} = categorySlice.actions

export default categorySlice.reducer