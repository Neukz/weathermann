import { LatLngLiteral } from 'leaflet';
import { Position } from '../store/reducers/position';

// Function to convert a LatLngLiteral instance to an object literal used in Redux store
export const latLngToObject = (latlng: LatLngLiteral) => {
	return {
		lat: latlng.lat,
		lng: latlng.lng
	} as Position;
};
