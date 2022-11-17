import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Container className="mt-3">
			<header>
				<h1 className="text-center">Page Not Found</h1>
			</header>

			<Image
				className="d-block mx-auto"
				src="https://img.icons8.com/cotton/256/000000/error-cloud.png"
				alt=""
			/>

			<Button
				variant="warning"
				size="lg"
				className="d-block mx-auto mt-3 px-5"
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
		</Container>
	);
};

export default NotFound;
