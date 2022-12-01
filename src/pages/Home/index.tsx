import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Map from '../../components/Map';
import AlertStack from '../../layout/AlertStack';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import { selectPosition, clearAlert, clearError } from '../../store';

const Home = () => {
	const { position } = useAppSelector(selectPosition);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(clearAlert());
		dispatch(clearError());
		navigate('/weather');
	};

	return (
		<Container fluid className="p-0 overflow-hidden">
			<Map />

			<AlertStack />

			<Button
				size="lg"
				className="d-block mx-auto mt-3 px-5"
				disabled={!position}
				onClick={handleClick}
			>
				Get weather
			</Button>
		</Container>
	);
};

export default Home;
