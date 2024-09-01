import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

const initialState: AlertState = {
    message: '',
    type: 'success',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        }
    },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
