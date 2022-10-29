import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../../Services/AuthServices";

export const userLogin = createAsyncThunk(
    'auth/login',
    async(data, thunkAPI) => {
        const {email,password} = data
        const res = await authServices.userLogin(email,password)
        return res
    }
)