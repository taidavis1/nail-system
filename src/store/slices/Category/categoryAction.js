import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryServices from '../../../Services/CategoryServices';

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async (data, thunkAPI) => {
        const response = await CategoryServices.getCategory()
        return {response,
            currentID : data.currentCategoryID}
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