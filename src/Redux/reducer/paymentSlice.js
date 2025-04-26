import { createSlice } from '@reduxjs/toolkit';

export const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        token: null,
        transactionId: null,
    },
    reducers: {
        setPaymentData(state, action) {
            state.token = action.payload.token;
            state.transactionId = action.payload.transactionId;
        },
        clearPaymentData(state) {
            state.token = null;
            state.transactionId = null;
        }
    }
});

export const { setPaymentData, clearPaymentData } = PaymentSlice.actions;
export default PaymentSlice.reducer;
