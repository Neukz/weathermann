import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setPosition, selectPosition } from './reducers/position';
import { fetchWeather, clearError, selectWeather } from './reducers/weather';
import { setAlert, clearAlert, selectAlert } from './reducers/alert';

export const store = configureStore({
	reducer: rootReducer
});

export {
	setPosition,
	selectPosition,
	fetchWeather,
	clearError,
	selectWeather,
	setAlert,
	clearAlert,
	selectAlert
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
