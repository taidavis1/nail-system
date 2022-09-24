import { configureStore } from "@reduxjs/toolkit";
import categorySlice  from './slices/category'

export const store = configureStore({
    reducer : {
        category : categorySlice
    }
})