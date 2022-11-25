import { combineReducers } from '@reduxjs/toolkit';
import positionReducer from './position';
import weatherReducer from './weather';
import unitsReducer from './units';
import alertReducer from './alert';

const rootReducer = combineReducers({
	position: positionReducer,
	weather: weatherReducer,
	units: unitsReducer,
	alert: alertReducer
});

export default rootReducer;
