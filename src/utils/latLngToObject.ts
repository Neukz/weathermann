import { LatLngLiteral } from 'leaflet';

// Use object literal interface as it's not recommended to use non-seriazable values in Redux
// See: https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
export interface PositionSchema {
	lat: number;
	lng: number;
}

// Function to convert a LatLngLiteral instance to an object literal used in Redux store
export const latLngToObject = (latlng: LatLngLiteral) => {
	return {
		lat: latlng.lat,
		lng: latlng.lng
	} as PositionSchema;
};
