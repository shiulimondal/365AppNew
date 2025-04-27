import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userData: null,
    login_status: false,
    guest_status: true,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.userData = action.payload.userData;
            state.login_status = action.payload.login_status;
            state.guest_status = action.payload.guest_status;
        },
        setGuest: (state) => {
            state.token = null;
            state.userData = null;
            state.login_status = false;
            state.guest_status = true;
        },
        logoutUser: (state) => {
            state.token = null;
            state.userData = null;
            state.login_status = false;
            state.guest_status = true;
        },
    },
});

export const { setUser, setGuest, logoutUser } = userSlice.actions;

export default userSlice.reducer;
