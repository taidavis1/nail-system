import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryServices from '../../../Services/CategoryServices';

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async (data, thunkAPI) => {
        const response = await CategoryServices.getServices()
        return response
    }
)

export const fetchServicesByCat = createAsyncThunk(
    'services/fetchServicesByCat',
    async (data, thunkAPI) => {
        const {categoryID} = data
        const response = await CategoryServices.getServicesByCat(categoryID)
        return response
    }
)


export const fetchsServicesBySubCat = createAsyncThunk(
    'services/fetchServicesBySubCat',
    async (data, thunkAPI) => {
        const {categoryID,subCatID} = data
        const response = await CategoryServices.getServiceBySubCat(categoryID , subCatID)
        return response
    }
)