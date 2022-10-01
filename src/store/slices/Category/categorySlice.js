import { createSlice } from '@reduxjs/toolkit'
import { fetchCategory } from './categoryAction'

export const categorySlice = createSlice({
  name: 'category',
  initialState : {
    category : [],
    currentCategory : null,
    chooseCategory : null,
    chooseSubCat : null,
    loading : false,
    message : '',
    currentSubCat : null,
  },
  reducers: {
    addCurrentCategoryID: (state,action) => {
      const {id} = action.payload
        state.currentCategory = id
      },
    addCurrentSubCatID : (state,action) => {
      const {id} = action.payload
      state.currentSubCat = id
    },
    addChooseCategory : (state,action) => {
      state.chooseCategory = action.payload.categoryID
    },
    addChooseSubCat : (state,action) => {
      state.chooseSubCat = action.payload.subCatID
    }
  },
  extraReducers : {
    [fetchCategory.pending] : (state) => {
      state.loading = true
    },
    [fetchCategory.fulfilled] : (state,{payload}) => {
      state.category = payload.response,
      state.currentCategory = !state.currentCategory ? payload.response[0].id : payload.currentID ,
      state.chooseCategory = !state.chooseCategory ? payload.response[0].id : state.chooseCategory,
      state.currentSubCat = !state.currentSubCat ? payload.response[0].subCategories[0].id: payload.currentSubCatID
      state.loading = false
      state.message = 'Success'
    },
    [fetchCategory.rejected] : (state) => {
      state.loading = false,
      state.message = 'Fail Request!'
    }
  }
})


export const {addCurrentCategoryID, addCurrentSubCatID,addChooseCategory,addChooseSubCat} = categorySlice.actions

export default categorySlice.reducer