import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        logged: false,
        details: {
            id: '',
            name: '',
            college: '',
            degree: '',
            projects: 0
        }
    },
    reducers: {
        studentLogin: (state,actions) => {
            state.logged = true;
            const {details} = actions.payload
            state.details.id = details.id;
            state.details.name = details.name;
            state.details.college = details.college;
            state.details.degree = details.degree;
            state.details.projects = details.projects;
        },
        studentLogout: (state) => {
            sessionStorage.clear();
            state.logged = false;
        }
    }
})

export const { studentLogin } = studentSlice.actions;
export const { studentLogout } = studentSlice.actions;
export default studentSlice.reducer;