import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface AlertState {
	alert: string | null;
}

const initialState: AlertState = {
	alert: null
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		setAlert: (state, action: PayloadAction<string>) => {
			state.alert = action.payload;
		},

		clearAlert: state => {
			state.alert = null;
		}
	}
});

export const { setAlert, clearAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
