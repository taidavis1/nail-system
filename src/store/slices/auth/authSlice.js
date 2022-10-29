
import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authAction';
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        loading : false,
        token : null,
        isLogin : false
    },
    reducers : {
        logOut : (state) => {
            state.token = null
            state.isLogin = false
        }
    },
    extraReducers : {
        [userLogin.pending] : (state) => {
            state.loading = true
        },
        [userLogin.fulfilled] : (state,action) => {
            state.loading = false
            state.token = action.payload.token
            state.isLogin = true
        },
        [userLogin.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const { logOut} = authSlice.actions

export default authSlice.reducer
