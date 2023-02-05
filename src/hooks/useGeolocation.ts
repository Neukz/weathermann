import { useEffect, useState } from 'react';

export const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(
		null
	);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setGeolocation);
		}
	}, []);

	return geolocation;
};
