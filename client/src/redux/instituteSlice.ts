import { createSlice } from "@reduxjs/toolkit";

export const instituteSlice = createSlice({
    name: 'institute',
    initialState: {
        logged: false,
        details: {
            id: '',
            name: '',
            AISHE: '',
            projects: 0,
            students: 0,
            workshops: 0
        }
    },
    reducers: {
        instituteLogin: (state,actions) => {
            state.logged = true;
            const {details} = actions.payload
            state.details.id = details.id;
            state.details.name = details.name;
            state.details.AISHE = details.AISHE;
            state.details.projects = details.projects;
            state.details.students = details.students;
            state.details.workshops = details.workshops;
        },
        instituteLogout: (state) => {
            sessionStorage.clear();
            state.logged = false;
        }
    }
})

export const { instituteLogin } = instituteSlice.actions;
export const { instituteLogout } = instituteSlice.actions;
export default instituteSlice.reducer;