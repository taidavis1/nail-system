import { createSlice } from '@reduxjs/toolkit'
import { addService, fetchServices ,fetchServicesByCat,fetchsServicesBySubCat} from './serviceAction'

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        serviceList: [],
        loading: false,
    },
    reducers: {
    },
    extraReducers: {
        [fetchServices.pending]: (state) => {
            state.loading = true
        },
        [fetchServices.fulfilled]: (state, { payload }) => {
            state.serviceList = payload,
            state.loading = false
            state.message = 'Success'
        },
        [fetchServices.rejected]: (state) => {
            state.loading = false,
            state.message = 'Fail Request!'
        },
        [fetchServicesByCat.pending] : (state) => {
            state.loading = true
        },
        [fetchServicesByCat.fulfilled]: (state, { payload }) => {
            state.serviceList = payload,
            state.loading = false
            state.message = 'Success'
        },
        [fetchServicesByCat.rejected]: (state) => {
            state.loading = false,
            state.message = 'Fail Request!'
        },
        [fetchsServicesBySubCat.pending] : (state) => {
            state.loading = true
        },
        [fetchsServicesBySubCat.fulfilled]: (state, { payload }) => {
            state.serviceList = payload,
            state.loading = false
            state.message = 'Success'
        },
        [fetchsServicesBySubCat.rejected]: (state) => {
            state.loading = false,
            state.message = 'Fail Request!'
        },
        [addService.pending] : (state, {payload}) => {
            state.loading = true
        },
        [addService.fulfilled] : (state, action) => {
            const currentState = {...state}
            console.log(currentState)
            // state.serviceList = [...state.serviceList,payload]
            state.loading = false
            state.message = 'Success'
        },
        [addService.rejected] : (state, {payload}) => {
            state.loading = false,
            state.message = 'Fail Request!'
        }
    }
})


export const { } = servicesSlice.actions

export default servicesSlice.reducer