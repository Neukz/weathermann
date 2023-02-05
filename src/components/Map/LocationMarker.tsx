import { useEffect } from 'react';
import { MarkerF, useGoogleMap } from '@react-google-maps/api';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectPosition } from '../../store';

const LocationMarker = () => {
	const map = useGoogleMap();

	const { position } = useAppSelector(selectPosition);

	useEffect(() => {
		if (position) {
			map?.setZoom(12);
			map?.panTo(position);
		}
	}, [position]);

	return position === null ? null : <MarkerF position={position} />;
};

export default LocationMarker;
