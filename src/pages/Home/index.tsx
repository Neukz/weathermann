import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Map from '../../components/Map';

const Home = () => {
	return (
		<Container fluid className="p-0 overflow-hidden">
			<Row>
				<Col>
					<Map />
				</Col>
			</Row>

			<Row className="mt-3">
				<Col xs={7} sm={5} md={4} lg={3} xxl={2} className="mx-auto">
					<Button size="lg" className="w-100">
						Search
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
