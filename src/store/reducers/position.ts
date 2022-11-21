import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Use object literal interface as it's not recommended to use non-seriazable values in Redux
// See: https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
export interface Position {
	lat: number;
	lng: number;
}

interface PositionState {
	position: Position | null;
}

const initialState: PositionState = {
	position: null
};

const positionSlice = createSlice({
	name: 'position',
	initialState,
	reducers: {
		setPosition: (state, action: PayloadAction<Position>) => {
			state.position = action.payload;
		}
	}
});

export const { setPosition } = positionSlice.actions;

export const selectPosition = (state: RootState) => state.position;

export default positionSlice.reducer;
