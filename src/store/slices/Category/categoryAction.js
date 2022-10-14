import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryServices from '../../../Services/CategoryServices';

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async (data, thunkAPI) => {
        const response = await CategoryServices.getCategory()
        return {response,
            currentID : data.currentCategoryID,
            currentSubCatID : data.currentCatID}
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (data,thunkAPI) => {
        const {categoryName, color} = data
        const response = await CategoryServices.addCategory(categoryName,color)
        return response
    }
)

export const addSubCat = createAsyncThunk(
    'category/addSubCat',
    async (data, thunkAPI) =>{
        const {name, category} = data
        const res = await CategoryServices.addSubCat(name,category)
        return res
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (data, thunkAPI) => {
        const {category_id} = data
        const response = await CategoryServices.deleteCategory(category_id)
        return {
            response,
            category_id : category_id
        }
    }
)

export const deleteSubCat = createAsyncThunk(
    'category/deleteSubCat',
    async (data, thunkAPI) => {
        const {subcat_id} = data
        const response = await CategoryServices.deleteSubCat(subcat_id)
        console.log(response)
        return {
            response,
            subcat_id : subcat_id
        }
    }
)

export const editSubCat = createAsyncThunk(
    'category/editSubCat',
    async(data, thunkAPI) => {
        const {subcat_id,name} = data
        const res = await CategoryServices.editSubCatInfo(subcat_id,name)
        return res
    }
)

export const editCategory = createAsyncThunk(
    'category,editCategory',
    async (data, thunkAPI) => {
        const {category_id, name, color} = data
        const res = await CategoryServices.editCategoryInfo(category_id, name, color)
        return {
            res,
            category_id : category_id
        }
    }
)