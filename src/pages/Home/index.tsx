import Container from 'react-bootstrap/Container';
import Map from '../../components/Map';
import Button from '../../components/Button';
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

			<Button disabled={!position} onClick={handleClick}>
				Get Weather
			</Button>
		</Container>
	);
};

export default Home;
