import { useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import { selectPosition, setPosition } from '../../store';
import { latLngToObject } from '../../utils/latLngToObject';

const LocationMarker = () => {
	const { position } = useAppSelector(selectPosition);
	const dispatch = useAppDispatch();

	useEffect(() => {
		map.locate();
	}, []);

	const map = useMapEvents({
		click(e) {
			dispatch(setPosition(latLngToObject(e.latlng)));
		},
		locationfound(e) {
			dispatch(setPosition(latLngToObject(e.latlng)));
			map.flyTo(e.latlng, 13, { animate: false });
		}
	});

	return position === null ? null : <Marker position={position} />;
};

export default LocationMarker;
