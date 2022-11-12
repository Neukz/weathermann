import { combineReducers } from '@reduxjs/toolkit';
import positionReducer from './position';
import weatherReducer from './weather';
import alertReducer from './alert';

const rootReducer = combineReducers({
	position: positionReducer,
	weather: weatherReducer,
	alert: alertReducer
});

export default rootReducer;
