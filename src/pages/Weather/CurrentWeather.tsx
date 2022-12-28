import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import dayjs from '../../utils/dayjs';
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
				<Container>
					<Row xs={2} className="gx-sm-5 gx-lg-3 gx-xl-5">
						<Col>
							<Card.Title className="fs-3 d-flex align-items-center">
								{current?.weather[0].icon && (
									<Image
										src={`https://openweathermap.org/img/wn/${current?.weather[0].icon}.png`}
										alt=""
									/>
								)}
								{current?.main.temp.toFixed(0)}
								{weatherUnits.temp[units]}
							</Card.Title>

							<Card.Subtitle className="text-primary">
								Feels like {current?.main.feels_like.toFixed(0)}
								{weatherUnits.temp[units]}, {current?.weather[0].description}
							</Card.Subtitle>
						</Col>

						<Col className="text-nowrap">
							<Card.Text className="mt-2 mb-0">
								<i className="bi-sunrise" />{' '}
								<time>
									{dayjs
										.unix(current?.sys.sunrise!)
										.add(current?.timezone!, 'second')
										.utc()
										.format('hh:mm A')}
								</time>
							</Card.Text>

							<Card.Text>
								<i className="bi-sunset" />{' '}
								<time>
									{dayjs
										.unix(current?.sys.sunset!)
										.add(current?.timezone!, 'second')
										.utc()
										.format('hh:mm A')}
								</time>
							</Card.Text>
						</Col>

						<Col className="mt-2">
							<Card.Text>
								<i className="bi-thermometer-half" /> Pressure:{' '}
								{current?.main.pressure}hPa
							</Card.Text>
						</Col>

						<Col className="mt-2">
							<Card.Text>
								<i className="bi-wind" /> Wind: {current?.wind.speed}
								{weatherUnits.speed[units]}
							</Card.Text>
						</Col>

						<Col>
							<Card.Text>
								<i className="bi-moisture" /> Humidity: {current?.main.humidity}
								%
							</Card.Text>
						</Col>

						<Col>
							<Card.Text>
								<i className="bi-cloud-haze2" /> Visibility:{' '}
								{current?.visibility! / 1000}km
							</Card.Text>
						</Col>

						{current?.rain && (
							<Col>
								<Card.Text>
									<i className="bi-umbrella" /> Rain: {current?.rain['1h']}mm
								</Card.Text>
							</Col>
						)}

						{current?.snow && (
							<Col>
								<Card.Text>
									<i className="bi-snow" /> Snow: {current?.snow['1h']}mm
								</Card.Text>
							</Col>
						)}
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default CurrentWeather;
