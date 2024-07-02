import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import crudSlice from '../slice/crudSlice'
export const store=configureStore({
    reducer:{
        Auth:authSlice,
        crud:crudSlice,
    }
})