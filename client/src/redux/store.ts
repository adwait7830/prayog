import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice';
import studentReducer from './studentSlice';
import instituteReducer from './instituteSlice';
import adminReducer from './adminSlice'
const store =  configureStore({
    reducer:{
        theme:themeReducer,
        admin:adminReducer,
        student:studentReducer,
        institute:instituteReducer
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
