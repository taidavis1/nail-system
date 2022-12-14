import { createSlice, current } from '@reduxjs/toolkit'
import { addService, deleteService, fetchServices ,fetchServicesByCat,fetchsServicesBySubCat, getServiceByID} from './serviceAction'

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        serviceList: [],
        loading: false,
    },
    reducers: {
        resetServiceList : (state) => {
            state.serviceList = []
        }
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
            const currentServiceList = current(state).serviceList
            // const newList = [...currentServiceList,action.payload[0]]
            // state.serviceList = newList
            state.loading = false
            state.message = 'Success'
        },
        [addService.rejected] : (state, {payload}) => {
            state.loading = false,
            state.message = 'Fail Request!'
        },
        [deleteService.pending] : (state) => {
            state.loading = true
        },
        [deleteService.fulfilled] : (state,action) => {
            state.loading = false
            state.message = 'Success'
            const currentServiceList = current(state).serviceList
            const newList = currentServiceList.filter(
                item => item.id !== action.payload.deletedID
            )
            state.serviceList = newList
        },
        [deleteService.rejected] : (state,action) => {
            state.loading = false
            state.message = 'Fail request!'
        },
        // Maybe dont use
        [getServiceByID.pending] : (state) => {
            state.loading = true
        },
        [getServiceByID.fulfilled] : (state,action) => {
            state.loading = false
        },
        [getServiceByID.rejected] : (state) => {
            state.loading = false
            state.message  = 'Fail request!'
        }
        // 
        // Edit Service Info
    }
})


export const { resetServiceList} = servicesSlice.actions

export default servicesSlice.reducer