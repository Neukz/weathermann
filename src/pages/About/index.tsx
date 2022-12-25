import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import {
	openWeatherMap,
	proxyRepo,
	projectRepo,
	techStack
} from '../../constants/links';

const About = () => {
	return (
		<Container className="mt-4 mb-3 text-center text-md-start lh-1">
			<p className="fs-5">
				Weather app built with{' '}
				<a
					className="text-decoration-none"
					href={openWeatherMap}
					target="_blank"
				>
					OpenWeatherMap API
				</a>
				.
			</p>

			<p className="fs-5">
				Project uses author's{' '}
				<a className="text-decoration-none" href={proxyRepo} target="_blank">
					proxy server
				</a>
				.
			</p>

			<h2 className="fs-3 fw-normal">
				<i className="bi-code-slash" /> Tech Stack
			</h2>
			<Nav className="align-items-center justify-content-center justify-content-md-start">
				{techStack.map(tech => (
					<Nav.Link key={tech.name} href={tech.href} target="_blank">
						<Image src={tech.imagePath} alt={tech.name} width={50} />
					</Nav.Link>
				))}
			</Nav>

			<Nav.Link href={projectRepo} target="_blank" className="fs-5 mt-4">
				<i className="bi-github" /> Source
			</Nav.Link>
		</Container>
	);
};

export default About;
