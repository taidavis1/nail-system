import { configureStore } from "@reduxjs/toolkit";
import categorySlice  from './slices/Category/categorySlice'
import servicesSlice from './slices/Services/serviceSlice'

export const store = configureStore({
    reducer : {
        category : categorySlice,
        services : servicesSlice
    }
})