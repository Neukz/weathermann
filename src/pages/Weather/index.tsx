import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import { useNavigate } from 'react-router-dom';
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
	const { loading, error } = useAppSelector(selectWeather);
	const { units } = useAppSelector(selectUnits);
	const dispatch = useAppDispatch();

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
		return (
			<Spinner
				variant="primary"
				animation="grow"
				role="status"
				className="d-block mx-auto mt-5"
			/>
		);
	}

	return (
		<Container className="mt-3">
			<Header />

			<Row md={2} lg={3} xxl={4} className="mt-3">
				<Col>
					<CurrentWeather />
				</Col>
			</Row>
		</Container>
	);
};

export default Weather;
