import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectWeather } from '../../store';
import { airQuality } from '../../constants/airQuality';

const AirPollution = () => {
	const { data } = useAppSelector(selectWeather);

	return (
		<Card>
			<Card.Header className="text-center">Air Pollution</Card.Header>

			{data?.air && (
				<ListGroup variant="flush">
					<ListGroup.Item className="d-flex justify-content-between fw-semibold text-muted">
						<span>Component</span>
						<span>
							&micro;g/m<sup>3</sup>
						</span>
					</ListGroup.Item>

					{Object.entries(data.air.list[0].components).map(([key, value]) => (
						<ListGroup.Item
							key={key}
							className="d-flex justify-content-between"
						>
							<span>
								{key.toUpperCase().match(/[A-Z]/g)}
								<sub>{key.replace('_', '.').match(/[0-9.]/g)}</sub>
							</span>
							<span>{value}</span>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			<Card.Footer
				className={
					'fw-semibold text-center text-' +
					airQuality.get(data?.air.list[0].main.aqi!)?.variant
				}
			>
				{airQuality.get(data?.air.list[0].main.aqi!)?.value}{' '}
				<span className="text-muted fw-normal">
					(AQI {data?.air.list[0].main.aqi})
				</span>
			</Card.Footer>
		</Card>
	);
};

export default AirPollution;
