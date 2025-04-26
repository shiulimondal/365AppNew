import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        login_status: false,
        guest_status: false,
    },
    reducers: {
        setUser(state, action) {
            state.userData = action.payload;
            state.login_status = true;
            state.guest_status = false;
        },
        logout(state) {
            state.userData = null;
            state.login_status = false;
            state.guest_status = false;
        },
        setGuest(state) {
            state.login_status = false;
            state.guest_status = true;
        },
    },
});

export const { setUser, logout, setGuest } = UserSlice.actions;
export default UserSlice.reducer;
