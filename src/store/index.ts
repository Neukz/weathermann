import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const store = configureStore({
	reducer: rootReducer
});

export * from './reducers/position';
export * from './reducers/weather';
export * from './reducers/alert';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
