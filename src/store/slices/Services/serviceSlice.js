import { createSlice } from '@reduxjs/toolkit'
import { fetchServices ,fetchServicesByCat,fetchsServicesBySubCat} from './serviceAction'

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
    }
})


export const { } = servicesSlice.actions

export default servicesSlice.reducer