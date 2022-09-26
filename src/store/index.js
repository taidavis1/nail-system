import { configureStore } from "@reduxjs/toolkit";
import categorySlice  from './slices/Category/categorySlice'

export const store = configureStore({
    reducer : {
        category : categorySlice
    }
})