import { createSlice } from '@reduxjs/toolkit'
import { fetchCategory } from './categoryAction'

export const categorySlice = createSlice({
  name: 'category',
  initialState : {
    category : [],
    currentCategory : null,
    loading : false,
    // currentSubCat : []
  },
  reducers: {
    addCurrentCategoryID: (state,action) => {
      const {id} = action.payload
        state.currentCategory = id
      },
  },
  extraReducers : {
    [fetchCategory.pending] : (state) => {
      state.loading = true
    },
    [fetchCategory.fulfilled] : (state,{payload}) => {
      state.category = payload.response,
      state.currentCategory = !state.currentCategory ? payload.response[0].id : payload.currentID ,
      // state.currentSubCat = state.category[state.currentCategory].subCategories
      state.loading = false
    }
  }
})


export const {addCurrentCategoryID} = categorySlice.actions

export default categorySlice.reducer