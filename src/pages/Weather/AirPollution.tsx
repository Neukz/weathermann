import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { airQuality } from '../../constants/airQuality';

const AirPollution = () => {
	const air = useAppSelector(state => state.weather.data?.air);

	return (
		<Card>
			<Card.Header className="text-center">Air Pollution</Card.Header>

			{air && (
				<ListGroup variant="flush">
					<ListGroup.Item className="d-flex justify-content-between fw-semibold text-muted">
						<span>Component</span>
						<span>
							&micro;g/m<sup>3</sup>
						</span>
					</ListGroup.Item>

					{Object.entries(air.list[0].components).map(([key, value]) => (
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
					airQuality.get(air?.list[0].main.aqi!)?.variant
				}
			>
				{airQuality.get(air?.list[0].main.aqi!)?.value}{' '}
				<Badge pill bg="secondary">
					AQI {air?.list[0].main.aqi}
				</Badge>
			</Card.Footer>
		</Card>
	);
};

export default AirPollution;
