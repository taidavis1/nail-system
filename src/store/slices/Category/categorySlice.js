import { createSlice, current } from '@reduxjs/toolkit'
import { deleteCategory, deleteSubCat, editCategory, fetchCategory } from './categoryAction'

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
    subCatList : []
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
      state.chooseSubCat = current(state.subCatList)? current(state.subCatList)[0]?.id : null
      state.currentSubCat = current(state.subCatList)? current(state.subCatList)[0]?.id : null
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
      state.category = payload.response
      const currentList = current(state).category
      if (payload.currentID && currentList) { 
        const currentCatList = currentList.filter(item => item.id === payload.currentID)
        const listSubCat = currentCatList[0].subCategories
        if (listSubCat.length >=1) {
          state.subCatList = listSubCat
          state.currentSubCat = listSubCat[0].id
        }else {
          state.subCatList = []
          state.currentSubCat = null
        }
      }
      state.loading = false
      state.message = 'Success'
    },
    [fetchCategory.rejected] : (state) => {
      state.loading = false,
      state.message = 'Fail Request!'
    },
    [deleteCategory.pending] : (state) => {
      state.loading = true
    },
    [deleteCategory.fulfilled] : (state, action) => {
      state.loading = false
      state.message = 'Success'
      const currentCategoryList = current(state.category)
      const newList = currentCategoryList?.filter(item => item.id !== action.payload.category_id)
      state.category = newList 
      state.subCatList = []
    },
    [deleteCategory.rejected] :(state) => {
      state.loading = false
      state.message = 'Fail Request!'
    }, 
    [editCategory.pending] : (state) => {
      state.loading = true
    },
    [editCategory.fulfilled] : (state, action) => {
      state.loading = false
      const currentList = [...current(state.category)]
      // replace old item by new item
      let index = currentList.map(el => el.id).indexOf(action.payload.category_id)
      const newItem = action.payload.res[0]
      currentList[index] = newItem
      state.category = currentList
    },
    [editCategory.rejected] : (state) => {
      state.loading = false
      state.message  = 'Fail Request!'
    },
    [deleteSubCat.pending] : (state) => {
      state.loading = true
    },
    [deleteSubCat.fulfilled] : (state,action) => {
      state.loading = false
      const currentSubCatList = current(state.subCatList)
      if (currentSubCatList) {
        // kiem tra hien tai list co ton tai khong ?
        if (currentSubCatList.length > 1) { //Check length xem truoc khi xoa list co bao nhieu gia tri
          // Neu array length > 1 thi co the set lai array khac voi gia tri vua xoa
          const newList = currentSubCatList.filter(item => item.id !== action.payload.subcat_id)
          state.subCatList = newList
          state.currentSubCat = newList[0].id
        }else {
          // neu arr chi co 1 gia tri thi sau khi xoa se khong con gia tri nao nua => set lai state = []
          state.subCatList = []
          state.currentSubCat = null
        }
      }else {
        state.subCatList = []
        state.currentSubCat = null
      }
    }
  }
})


export const {addCurrentCategoryID, addCurrentSubCatID,addChooseCategory,addChooseSubCat} = categorySlice.actions

export default categorySlice.reducer