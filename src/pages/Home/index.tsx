import Container from 'react-bootstrap/Container';
import Map from '../../components/Map';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import AlertStack from '../../layout/AlertStack';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';
import { useLoadScript } from '@react-google-maps/api';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import { selectPosition, clearAlert, clearError } from '../../store';

const Home = () => {
	useTitle('Weathermann');

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
	});

	const { position } = useAppSelector(selectPosition);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(clearAlert());
		dispatch(clearError());
		navigate('/weather');
	};

	if (!isLoaded) {
		return <Spinner />;
	}

	return (
		<Container fluid className="p-0 mb-3 overflow-hidden">
			<Map />

			<AlertStack />

			<Button disabled={!position} onClick={handleClick}>
				Get Weather
			</Button>
		</Container>
	);
};

export default Home;
