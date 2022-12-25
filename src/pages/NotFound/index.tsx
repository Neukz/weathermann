import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';

const NotFound = () => {
	useTitle('404 - Page Not Found');

	const navigate = useNavigate();

	return (
		<Container className="my-3">
			<header>
				<h1 className="text-center">Page Not Found</h1>
			</header>

			<Image
				className="d-block mx-auto"
				src="https://img.icons8.com/cotton/256/000000/error-cloud.png"
				alt=""
			/>

			<Button variant="warning" onClick={() => navigate(-1)}>
				Back
			</Button>
		</Container>
	);
};

export default NotFound;
