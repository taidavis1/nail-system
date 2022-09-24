import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
  name: 'category',
  initialState : {
    items : [],
    currentCategory : '',
    choosedColor : ''
  },
  reducers: {
    addCategory: (state,action) => {
      const {id} = action.payload
        state.currentCategory = id
      },
    addListCategory : (state,action) => {
      state.items = action.payload.data
    },

  },
})


export const { addCategory ,addListCategory} = categorySlice.actions

export default categorySlice.reducer