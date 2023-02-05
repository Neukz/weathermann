import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
interface PositionState {
	position: google.maps.LatLngLiteral | null;
}

const initialState: PositionState = {
	position: null
};

const positionSlice = createSlice({
	name: 'position',
	initialState,
	reducers: {
		setPosition: (state, action: PayloadAction<google.maps.LatLngLiteral>) => {
			state.position = action.payload;
		}
	}
});

export const { setPosition } = positionSlice.actions;

export const selectPosition = (state: RootState) => state.position;

export default positionSlice.reducer;
