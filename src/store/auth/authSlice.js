import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        status: 'checking',
        uid: null,
        displayName: null,
        email: null,
        password: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.errorMessage = payload.errorMessage;
        },
        logout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.displayName = null;
            state.email = null;
            if(payload?.errorMessage){
                state.errorMessage = payload.errorMessage;
            }
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        }, 
        setIsRegistering: (state, {payload}) => {
            state.status = payload;
        },
        
    }
});

export const {
    login,
    logout,
    checkingCredentials,
    clearErrorMessage,
    setIsRegistering
} = authSlice.actions;