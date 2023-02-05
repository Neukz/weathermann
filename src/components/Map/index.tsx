import { useEffect, useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import LocationMarker from './LocationMarker';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { setPosition } from '../../store';
import { useGeolocation } from '../../hooks/useGeolocation';

const Map = () => {
	const dispatch = useAppDispatch();

	const geolocation = useGeolocation();
	const center = useMemo(() => {
		if (geolocation) {
			return {
				lat: geolocation.coords.latitude,
				lng: geolocation.coords.longitude
			};
		}

		return {
			lat: 51.505,
			lng: -0.09
		};
	}, []);

	useEffect(() => {
		if (geolocation) {
			dispatch(
				setPosition({
					lat: geolocation.coords.latitude,
					lng: geolocation.coords.longitude
				})
			);
		}
	}, [geolocation]);

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={3}
			onClick={e => dispatch(setPosition(e.latLng!.toJSON()))}
		>
			<LocationMarker />
		</GoogleMap>
	);
};

const containerStyle: React.CSSProperties = {
	height: '480px'
};

export default Map;
