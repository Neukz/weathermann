import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Map from '../../components/Map';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import {
	selectPosition,
	selectWeather,
	fetchWeather,
	clearWeather,
	selectAlert,
	clearAlert,
	clearError
} from '../../store';
import { useUnits } from '../../hooks/useUnits';

const Home = () => {
	const [units] = useUnits();
	const { position } = useAppSelector(selectPosition);
	const { loading, data, error } = useAppSelector(selectWeather);
	const { alert } = useAppSelector(selectAlert);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// In case user wants to go back from weather page
	useEffect(() => {
		dispatch(clearWeather());
	}, []);

	useEffect(() => {
		if (data) {
			navigate('/weather');
		}
	}, [data]);

	const handleClick = () => {
		dispatch(clearAlert());
		dispatch(clearError());
		// @ts-ignore - it won't be clickable if position is null
		dispatch(fetchWeather({ position, units }));
	};

	return (
		<Container fluid className="p-0 overflow-hidden">
			<Map />

			<Alert
				className="w-75 mx-auto mt-3"
				variant="warning"
				dismissible
				show={alert !== null}
				onClose={() => dispatch(clearAlert())}
			>
				{alert}
			</Alert>

			<Alert
				className="w-75 mx-auto mt-3"
				variant="danger"
				dismissible
				show={error !== null}
				onClose={() => dispatch(clearError())}
			>
				{error}
			</Alert>

			<Button
				size="lg"
				className="d-block mx-auto mt-3 px-5"
				disabled={!position || loading}
				onClick={handleClick}
			>
				{loading && (
					<Spinner
						className="align-baseline"
						as="span"
						size="sm"
						animation="grow"
						role="status"
						aria-hidden="true"
					/>
				)}

				{loading ? ' Loading...' : 'Get weather'}
			</Button>
		</Container>
	);
};

export default Home;
