import { configureStore } from "@reduxjs/toolkit";
import categoryReducer  from './slices/Category/categorySlice'
import servicesReducer from './slices/Services/serviceSlice'
import authReducer from './slices/auth/authSlice'

export const store = configureStore({
    reducer : {
        category : categoryReducer,
        services : servicesReducer,
        auth : authReducer
    }
})