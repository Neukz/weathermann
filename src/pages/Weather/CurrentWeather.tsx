import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectUnits } from '../../store';
import { weatherUnits } from '../../constants/units';

const CurrentWeather = () => {
	const current = useAppSelector(state => state.weather.data?.current);
	const { units } = useAppSelector(selectUnits);

	return (
		<Card>
			<Card.Header className="text-center">Current Weather</Card.Header>
			<Card.Body>
				<Container fluid className="p-0">
					<Row md={2} className="overflow-hidden">
						<Col>
							<Card.Title>
								{current?.main.temp.toFixed(0)}
								{weatherUnits.temp[units]}
							</Card.Title>

							<Card.Subtitle className="text-primary">
								Feels like {current?.main.feels_like.toFixed(0)}
								{weatherUnits.temp[units]}, {current?.weather[0].description}
							</Card.Subtitle>

							<Card.Text className="mt-2 mb-0 text-muted">
								Sunrise:{' '}
								<Moment
									utc
									date={current?.sys.sunrise! * 1000}
									add={{ seconds: current?.timezone }}
									format="LT"
								/>
							</Card.Text>

							<Card.Text className="text-muted">
								Sunset:{' '}
								<Moment
									utc
									date={current?.sys.sunset! * 1000}
									add={{ seconds: current?.timezone }}
									format="LT"
								/>
							</Card.Text>
						</Col>

						<Col>
							{current?.weather[0].icon && (
								<Image
									className="d-block mx-auto"
									src={`https://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`}
									alt=""
								/>
							)}
						</Col>
					</Row>
				</Container>
			</Card.Body>

			<ListGroup variant="flush">
				<ListGroup.Item className="d-flex justify-content-between">
					<span>Humidity:</span>
					<span>{current?.main.humidity}%</span>
				</ListGroup.Item>

				<ListGroup.Item className="d-flex justify-content-between">
					<span>Pressure:</span>
					<span>{current?.main.pressure}hPa</span>
				</ListGroup.Item>

				<ListGroup.Item className="d-flex justify-content-between">
					<span>Visibility:</span>
					<span>{current?.visibility! / 1000}km</span>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
};

export default CurrentWeather;
