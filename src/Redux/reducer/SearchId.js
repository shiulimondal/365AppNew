import { createSlice } from '@reduxjs/toolkit';

export const UserIDSlice = createSlice({
    name: 'userId',
    initialState: {
        userData: null,
        selectedUserId: null,
    },
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        logout(state) {
            state.userData = null;
            state.selectedUserId = null;
        },
        setSelectedUserId(state, action) {
            state.selectedUserId = action.payload;
        },
    },
});

export const { setUserData, logout, setSelectedUserId } = UserIDSlice.actions;
export default UserIDSlice.reducer;
