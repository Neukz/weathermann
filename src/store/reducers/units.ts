import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export type Units = 'metric' | 'imperial';

interface UnitsState {
	units: Units;
}

const initialState: UnitsState = {
	units: 'metric'
};

const unitsSlice = createSlice({
	name: 'units',
	initialState,
	reducers: {
		toggleUnits: state => {
			state.units = state.units === 'metric' ? 'imperial' : 'metric';
		}
	}
});

export const { toggleUnits } = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units;

export default unitsSlice.reducer;
