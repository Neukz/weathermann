import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectWeather, selectUnits } from '../../store';
import { weatherUnits } from '../../constants/units';

const CurrentWeather = () => {
	const { data } = useAppSelector(selectWeather);
	const { units } = useAppSelector(selectUnits);

	return (
		<Card>
			<Card.Header className="text-center">Current weather</Card.Header>
			<Card.Body>
				<Container fluid className="p-0">
					<Row md={2} className="overflow-hidden">
						<Col>
							<Card.Title>
								{data?.current.main.temp.toFixed(0)}
								{weatherUnits.temp[units]}
							</Card.Title>

							<Card.Subtitle className="text-primary">
								Feels like {data?.current.main.feels_like.toFixed(0)}
								{weatherUnits.temp[units]},{' '}
								{data?.current.weather[0].description}
							</Card.Subtitle>

							<Card.Text className="mt-2 mb-0 text-muted">
								Sunrise:{' '}
								<Moment
									utc
									date={data?.current.sys.sunrise! * 1000}
									add={{ seconds: data?.current.timezone }}
									format="LT"
								/>
							</Card.Text>

							<Card.Text className="text-muted">
								Sunset:{' '}
								<Moment
									utc
									date={data?.current.sys.sunset! * 1000}
									add={{ seconds: data?.current.timezone }}
									format="LT"
								/>
							</Card.Text>
						</Col>

						<Col>
							{data?.current.weather[0].icon && (
								<Image
									className="d-block mx-auto"
									src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
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
					<span>{data?.current.main.humidity}%</span>
				</ListGroup.Item>

				<ListGroup.Item className="d-flex justify-content-between">
					<span>Pressure:</span>
					<span>{data?.current.main.pressure}hPa</span>
				</ListGroup.Item>

				<ListGroup.Item className="d-flex justify-content-between">
					<span>Visibility:</span>
					<span>{data?.current.visibility! / 1000}km</span>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
};

export default CurrentWeather;
