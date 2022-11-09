import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
	return (
		<MapContainer
			style={{ height: '480px' }}
			center={{ lat: 51.505, lng: -0.09 }}
			zoom={3}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
};

export default Map;
