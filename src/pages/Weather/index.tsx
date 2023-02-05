import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import AirPollution from './AirPollution';
import Forecast from './Forecast';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import {
	selectPosition,
	selectWeather,
	fetchWeather,
	selectUnits,
	setAlert
} from '../../store';

const Weather = () => {
	const { position } = useAppSelector(selectPosition);
	const { data, loading, error } = useAppSelector(selectWeather);
	const { units } = useAppSelector(selectUnits);
	const dispatch = useAppDispatch();

	useTitle(data?.current.name || 'Weather');

	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			navigate('/');
		}

		if (!position) {
			dispatch(setAlert('You need to select a location first'));
			navigate('/');
		} else {
			dispatch(fetchWeather({ position, units }));
		}
	}, [units, error]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<Container className="my-3">
			<Header />

			<Row xs={1} sm={2} lg={3} className="mt-1 gy-3">
				<Col sm={12} md={8} lg={5} className="mx-auto">
					<CurrentWeather />
				</Col>

				<Col sm={7}>
					<Forecast />
				</Col>

				<Col sm={5} lg={3}>
					<AirPollution />
				</Col>
			</Row>
		</Container>
	);
};

export default Weather;
